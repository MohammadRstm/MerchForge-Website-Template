#!/usr/bin/env node
// Lists the deployable templates at the repository root.
//
// There is no manifest to keep in sync: a directory is a template if it looks
// like one. That means dropping a new template folder in at the root is enough
// for CI to pick it up, and it also means a stray folder cannot be published by
// accident, because it will not satisfy all four checks.
//
//   node scripts/list-templates.mjs          one name per line
//   node scripts/list-templates.mjs --json   JSON array, for a workflow matrix

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * A directory qualifies when it has all of:
 *   - package.json with a "build" script   (there is something to run)
 *   - index.html                            (it is a web app, not a library)
 *   - vite.config.ts or vite.config.js      (it is a Vite app, which is what the
 *                                            base-path handling below assumes)
 *
 * Anything failing a check is skipped silently rather than failing the build, so
 * scripts/, docs/ and the like need no exclusion list.
 */
function isTemplate(dir) {
    const packageJsonPath = path.join(dir, "package.json");

    if (!fs.existsSync(packageJsonPath)) return false;
    if (!fs.existsSync(path.join(dir, "index.html"))) return false;

    const hasViteConfig = ["vite.config.ts", "vite.config.js", "vite.config.mjs"]
        .some((name) => fs.existsSync(path.join(dir, name)));

    if (!hasViteConfig) return false;

    try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
        return Boolean(packageJson.scripts?.build);
    } catch {
        // An unparseable package.json is a broken template, not a deployable one.
        return false;
    }
}

const templates = fs
    .readdirSync(repoRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    // Dot directories and node_modules are never templates, and skipping them up
    // front keeps the checks below off large trees.
    .filter((entry) => !entry.name.startsWith(".") && entry.name !== "node_modules")
    .map((entry) => entry.name)
    .filter((name) => isTemplate(path.join(repoRoot, name)))
    .sort();

if (templates.length === 0) {
    console.error("No deployable templates found at the repository root.");
    process.exit(1);
}

process.stdout.write(
    process.argv.includes("--json")
        ? JSON.stringify(templates)
        : templates.join("\n") + "\n"
);
