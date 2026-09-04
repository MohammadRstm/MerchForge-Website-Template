#!/usr/bin/env node
// Writes the two files that live at the root of the published site, above the
// individual templates:
//
//   404.html    the deep-link redirect every SPA route depends on
//   index.html  a plain index of the templates
//
//   node scripts/make-site-shell.mjs <site-dir> <base-path> <template...>
//
// Both are generated rather than committed because both depend on the repository
// name, which belongs in the workflow and not in a checked-in file.

import fs from "node:fs";
import path from "node:path";

const [, , siteArg, baseArg, ...templates] = process.argv;

if (!siteArg || !baseArg || templates.length === 0) {
    console.error("usage: make-site-shell.mjs <site-dir> <base-path> <template...>");
    process.exit(1);
}

const siteDir = path.resolve(siteArg);
const base = baseArg.endsWith("/") ? baseArg : `${baseArg}/`;

// How much of the path identifies the site rather than the route. On a project
// site that is the repository name plus the template folder; on a custom domain
// served at the apex it is just the template folder. Derived so neither case has
// to be special-cased by hand.
const baseSegments = base.split("/").filter(Boolean).length;
const pathSegmentsToKeep = baseSegments + 1;

fs.mkdirSync(siteDir, { recursive: true });

// GitHub Pages answers any unmatched path with this one file, from the site root -
// it does not look for a 404.html inside subdirectories. So this has to work out
// which template was being asked for, and hand the rest of the route to that
// template's index.html as a query string, which the snippet in each index.html
// turns back into a real path. Standard technique for SPAs on Pages.
const notFound = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting…</title>
    <script>
      (function (location) {
        var pathSegmentsToKeep = ${pathSegmentsToKeep};
        var segments = location.pathname.split("/");

        location.replace(
          location.protocol +
            "//" +
            location.host +
            segments.slice(0, 1 + pathSegmentsToKeep).join("/") +
            "/?/" +
            segments
              .slice(1 + pathSegmentsToKeep)
              .join("/")
              .replace(/&/g, "~and~") +
            (location.search ? "&" + location.search.slice(1).replace(/&/g, "~and~") : "") +
            location.hash
        );
      })(window.location);
    </script>
  </head>
  <body>
    <p>Redirecting…</p>
  </body>
</html>
`;

fs.writeFileSync(path.join(siteDir, "404.html"), notFound);

// Without this the site root itself would 404, and the redirect above would bounce
// it back to a path that also does not exist - a loop. It doubles as a usable index
// of what is published.
const links = templates
    .map((name) => `        <li><a href="${base}${name}/">${name}</a></li>`)
    .join("\n");

const index = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>MerchForge Website Templates</title>
    <style>
      :root { color-scheme: light dark; }
      body {
        margin: 0; padding: 3rem 1.5rem;
        font: 16px/1.6 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        display: flex; justify-content: center;
      }
      main { width: 100%; max-width: 34rem; }
      h1 { font-size: 1.5rem; margin: 0 0 .25rem; }
      p { margin: 0 0 2rem; opacity: .7; }
      ul { list-style: none; margin: 0; padding: 0; display: grid; gap: .5rem; }
      a {
        display: block; padding: .85rem 1rem; border-radius: .5rem;
        border: 1px solid currentColor; text-decoration: none; color: inherit;
      }
      a:hover, a:focus-visible { outline: none; opacity: .65; }
    </style>
  </head>
  <body>
    <main>
      <h1>MerchForge website templates</h1>
      <p>${templates.length} template${templates.length === 1 ? "" : "s"} published from this repository.</p>
      <ul>
${links}
      </ul>
    </main>
  </body>
</html>
`;

fs.writeFileSync(path.join(siteDir, "index.html"), index);

console.log(
    `wrote 404.html (keeping ${pathSegmentsToKeep} path segment(s)) and an index of ${templates.length} template(s)`
);
