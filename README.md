# MerchForge website templates

Each storefront template is an independent Vite + React application living in its
own folder at the repository root. Every one of them is discovered, built and
published to GitHub Pages automatically.

```
MerchForge-Website-Template/
├── electronic-template/
├── electronic-template-02/
├── fashion-template/
├── fashion-template-02/
├── grocery-template/
├── scripts/                     deployment helpers, not a template
└── .github/workflows/
```

## Published URLs

The site root lists every template; each one is served from its own folder:

```
https://<username>.github.io/<repository>/                          index of templates
https://<username>.github.io/<repository>/fashion-template/
https://<username>.github.io/<repository>/grocery-template/
```

Neither the username nor the repository name appears anywhere in this repository.
The workflow derives the base path from `GITHUB_REPOSITORY` at build time, so
renaming or forking the repository needs no code change.

### On a custom domain

A custom domain on Pages serves the site from the domain root instead, so the
repository segment disappears:

```
https://templates.merchforge.com/
https://templates.merchforge.com/fashion-template/
```

Set the `PAGES_BASE` repository variable to `/` for that case. The deep-link
handler derives how much of the path is the site rather than the route from the
same value, so nothing else changes.

## Adding a template

1. Create a folder at the repository root.
2. Put the template project in it.
3. Make sure it has `package.json` with a `build` script, an `index.html`, and a
   `vite.config.ts`.
4. Copy the three deployment lines from an existing template (below).
5. Push to `main`.

That is the whole process — no workflow edit, no list to update.

### What a template must have

A root folder is treated as a template when **all** of these are true. Anything
that fails a check is skipped silently, which is why `scripts/` and `.github/` need
no exclusion list:

| Requirement | Why |
|---|---|
| `package.json` with a `build` script | there is something to run |
| `index.html` | it is a web app, not a library |
| `vite.config.ts` / `.js` / `.mjs` | the base-path handling assumes Vite |

### The three lines a template needs

**`vite.config.ts`** — serve from wherever the deployment says:

```ts
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  // ...
})
```

**`src/main.tsx`** — tell the router the same thing:

```tsx
<BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
```

**`index.html`** — the deep-link snippet, copied verbatim from any existing
template (see [SPA routing](#spa-routing) for what it does).

## Local development

Unchanged. `BASE_PATH` is unset locally, so everything serves from `/` exactly as
before:

```bash
cd fashion-template
npm install
npm run dev
```

Each template needs its own `.env` — copy `.env.example` and fill it in. The
template throws a clear error naming any missing variable rather than failing
silently.

### Local production build

A plain build is a root-hosted build, which is usually what you want:

```bash
npm run build && npm run preview
```

To reproduce exactly what gets published, add the base path and the rewrite step:

```bash
BASE_PATH=/MerchForge-Website-Template/fashion-template/ npm run build
node ../scripts/apply-pages-base.mjs dist /MerchForge-Website-Template/fashion-template/ public
```

## Development vs production API

The same template must talk to a local backend while you develop and to the hosted
one once published. That switch is per-variable and needs no code change.

| | Where the values come from | Result |
|---|---|---|
| `npm run dev` | the template's own `.env` | `https://localhost:7021` |
| `npm run build` locally | the template's own `.env` | `https://localhost:7021` |
| GitHub Actions | repository **Variables** | the hosted API |

Shell environment variables take precedence over `.env`, which is what the workflow
relies on, and the precedence is per-variable rather than all-or-nothing: setting
only `VITE_API_ORIGIN` in CI leaves the others to their usual resolution.

Two properties make this safe rather than merely convenient:

- **`.env` is not in the repository.** It is gitignored, so a CI build has no local
  configuration to fall back on and a published template can never silently ship
  `localhost`.
- **A missing value fails the build, loudly.** Each template's `src/config/env.ts`
  throws naming the variable, and the workflow checks all of them up front so you
  get one actionable message instead of five identical failures mid-run.

### Before the hosted API exists

Until `VITE_API_ORIGIN` is set, the workflow stops at the configuration check and
deploys nothing. That is deliberate: publishing a storefront wired to `localhost`
would look broken to anyone who opened it. When the server is live, set the
variable — no commit, no code change, and the next run picks it up.

To deploy earlier anyway, set the variable to whatever placeholder you like; the
choice is then explicit rather than accidental.

### Testing a production build against your local API

A local `npm run build` already uses `.env`, so it points at localhost and
`npm run preview` works against your running backend. To check what a deployed
build will actually do, override just the one variable:

```bash
VITE_API_ORIGIN=https://api.example.com npm run build
```

## Base-path handling

GitHub Pages serves each template from a subdirectory, not a domain root, so every
asset URL has to carry that prefix. Two mechanisms cover it, because Vite alone
does not.

**Vite's `base`** handles everything Vite manages: the script and stylesheet tags
in `index.html`, imported assets, and `url()` in stylesheets it processes. The
workflow sets `BASE_PATH` per template; locally it is unset and defaults to `/`.

**`scripts/apply-pages-base.mjs`** handles what Vite leaves alone, which in these
templates is a lot:

- **Plain string literals in components** — `src="/images/banner/fashion-2.jpg"`.
  Vite sees an opaque string, so it survives the build unchanged and then resolves
  against the domain root at runtime. `fashion-template` alone has 43 of these.
- **Files copied verbatim from `public/`** — `public/fonts/font-icons.css`
  contains `url("/fonts/icomoon.woff")` and nothing processes it at all.

The script rewrites the built output rather than the source, so templates keep
using ordinary absolute paths and there is no build-time indirection to learn. The
names it rewrites come from each template's own `public/` directory, so a template
that adds `public/videos/` is handled without touching the script. When the base is
`/` it does nothing at all.

## SPA routing

GitHub Pages has no server-side rewrite, so a client-side route such as
`/fashion-template/product/123` is not a real file and Pages answers with the
site's **root** `404.html` — it does not look inside subdirectories.

`scripts/make-site-shell.mjs` generates two files at the site root:

- **`404.html`** works out which template was requested and re-encodes the rest of
  the route as a query string, then redirects into that template.
- **`index.html`** lists the templates. It also stops the site root itself from
  404ing, which would otherwise bounce into a redirect loop.

The snippet in each template's `index.html` turns that query string back into a
real path before React Router mounts. Deep links and refreshes then behave exactly
as they do locally, and no route changes. Nothing but that redirect ever produces a
`?/` query, so the snippet is inert during local development.

## Deployment workflow

`.github/workflows/deploy-templates.yml` runs on every push to `main`, and can be
run by hand from **Actions → Deploy templates to GitHub Pages → Run workflow**.

1. Checks out this repository.
2. Checks out `MohammadRstm/MerchForgeSDK` and builds it. Every template depends on
   it via `file:../../MerchForgeSDK`, a path beside the repository, so it is moved
   one level up to make that resolve. The SDK does not commit its build output,
   hence building it here.
3. Runs `scripts/list-templates.mjs` to discover the templates.
4. Builds each one with `BASE_PATH` set to its own subdirectory, then applies the
   asset rewrite.
5. Copies each `dist/` into `_site/<template>/`.
6. Writes the site root, uploads one Pages artifact, and deploys it.

It is a single job with a loop rather than a matrix, because the SDK has to be
built once and shared — a matrix would rebuild it per template for no gain.

### When a template fails to build

The run continues through the remaining templates so a single log shows every
failure, then fails at the end and **deploys nothing**. The previously published
site stays up untouched. Partial deploys were deliberately avoided: silently
dropping a template from a published site is worse than an obvious red run.

## GitHub configuration required

Before the first deployment:

- **Settings → Pages → Source: GitHub Actions.**
- **Settings → Secrets and variables → Actions → Variables**, add:

  | Variable | Purpose |
  |---|---|
  | `VITE_API_ORIGIN` | the MerchForge API the storefronts fetch from |
  | `VITE_PLATFORM_ORIGIN` | the MerchForge platform, for customer login |
  | `VITE_BUSINESS_ID` | which business's catalog to render |

  Any of them can be overridden per template by appending the folder name,
  uppercased with dashes as underscores — `VITE_BUSINESS_ID_FASHION_TEMPLATE`
  gives that one template its own catalog while the rest share the default.

- **`SDK_ACCESS_TOKEN`** (secret) — only while `MerchForgeSDK` is private. The
  default workflow token cannot read another repository. Not needed once it is
  public.

> These `VITE_*` values are compiled into the JavaScript that ships to the browser,
> so **none of them are secret**. They belong in Variables, not Secrets. Putting
> them in Secrets would hide them from the Actions UI while still publishing them
> in the bundle.

### The API has to be publicly reachable

These templates are live applications, not static pages: they fetch their catalog
at runtime. `.env.example` points at `https://localhost:7021`, which nothing on the
public internet can reach. Unless `VITE_API_ORIGIN` points at a publicly hosted API
that allows CORS from the Pages origin, the published pages will render their
layout and then fail to load any product data.
