#!/usr/bin/env node
// Rewrites the root-absolute asset paths Vite leaves alone, so a built template
// works when it is served from a subdirectory instead of a domain root.
//
//   node scripts/apply-pages-base.mjs <dist-dir> <base-path> <public-dir>
//
// Vite's `base` covers everything it manages itself: the script and stylesheet
// tags it writes into index.html, imported assets, and url() in stylesheets it
// processes. It does not touch two things, and both are all over these templates:
//
//   1. Plain string literals in components - src="/images/banner/fashion-2.jpg".
//      To Vite these are opaque strings, so they survive the build unchanged and
//      then resolve against the domain root at runtime, which is a 404 under a
//      subpath. fashion-template alone has 43 of them.
//
//   2. Files copied verbatim from public/. public/fonts/font-icons.css contains
//      url("/fonts/icomoon.woff"), and nothing processes it at all.
//
// Rewriting the built output rather than the source is deliberate: the templates
// stay exactly as they are, developers keep writing ordinary absolute paths, and
// there is no build-time indirection to learn. The alternative was editing ~193
// literals across five templates and every future one.

import fs from "node:fs";
import path from "node:path";

const [, , distArg, baseArg, publicArg] = process.argv;

if (!distArg || !baseArg) {
    console.error("usage: apply-pages-base.mjs <dist-dir> <base-path> [public-dir]");
    process.exit(1);
}

const distDir = path.resolve(distArg);
const base = baseArg.endsWith("/") ? baseArg : `${baseArg}/`;
const publicDir = publicArg ? path.resolve(publicArg) : null;

// Serving from the domain root is what the source already assumes, so there is
// nothing to rewrite and local production builds are untouched.
if (base === "/") {
    console.log("base is '/', nothing to rewrite");
    process.exit(0);
}

if (!fs.existsSync(distDir)) {
    console.error(`dist directory not found: ${distDir}`);
    process.exit(1);
}

/**
 * The names to rewrite come from the template's own public/ directory rather than
 * a hardcoded list, so a template that adds public/videos/ is handled without
 * anyone remembering to update this script. It also keeps the match narrow: only
 * paths that genuinely correspond to a published asset are touched.
 */
const publicEntries = publicDir && fs.existsSync(publicDir)
    ? fs.readdirSync(publicDir).map((entry) => entry)
    : [];

if (publicEntries.length === 0) {
    console.log("no public/ entries to rewrite");
    process.exit(0);
}

const escaped = publicEntries
    .map((entry) => entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length); // longest first, so favicon.svg beats favicon

// Matched only where a URL can actually start - after a quote, an opening paren,
// or whitespace - and only when the next character ends the segment. That avoids
// rewriting an unrelated string that merely begins with the same letters.
const pattern = new RegExp(
    `(["'\`(=,\\s])/(${escaped.join("|")})(?=["'\`)\\s?#/]|$)`,
    "g"
);

const REWRITABLE = new Set([".js", ".css", ".html", ".mjs"]);

let filesChanged = 0;
let replacements = 0;

function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            walk(full);
            continue;
        }

        if (!REWRITABLE.has(path.extname(entry.name).toLowerCase())) continue;

        const original = fs.readFileSync(full, "utf8");
        let count = 0;

        const rewritten = original.replace(pattern, (_match, prefix, name) => {
            count++;
            return `${prefix}${base}${name}`;
        });

        if (count > 0) {
            fs.writeFileSync(full, rewritten);
            filesChanged++;
            replacements += count;
        }
    }
}

walk(distDir);

console.log(
    `rewrote ${replacements} asset path(s) across ${filesChanged} file(s) to base ${base}`
);
