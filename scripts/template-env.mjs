#!/usr/bin/env node
// Resolves the VITE_* build configuration for one template and prints it as shell
// export statements, for `eval` in the workflow.
//
//   node scripts/template-env.mjs fashion-template
//
// Each value is looked up twice: first with the template's name appended, then
// without. So a single VITE_API_ORIGIN covers every template, while
// VITE_BUSINESS_ID_FASHION_TEMPLATE overrides it for just that one.
//
// This lookup lives here rather than in the workflow so that adding a template
// never requires editing the workflow - the whole repository-variable set is
// handed over as JSON and matched by name at runtime.

const templateName = process.argv[2];

if (!templateName) {
    console.error("usage: template-env.mjs <template-name>");
    process.exit(1);
}

// VITE_* values are compiled into the JavaScript that ships to the browser, so
// none of them are secret. Repository variables are the correct home for them;
// the secrets fallback exists only so an already-configured repository keeps
// working. See README, "GitHub configuration required".
const repoVars = JSON.parse(process.env.REPO_VARS || "{}");

const suffix = templateName.replace(/[^A-Za-z0-9]/g, "_").toUpperCase();

const SETTINGS = [
    ["VITE_API_ORIGIN", process.env.FALLBACK_API_ORIGIN],
    ["VITE_PLATFORM_ORIGIN", process.env.FALLBACK_PLATFORM_ORIGIN],
    ["VITE_BUSINESS_ID", process.env.FALLBACK_BUSINESS_ID],
];

const missing = [];
const lines = [];

for (const [name, secretFallback] of SETTINGS) {
    const value = repoVars[`${name}_${suffix}`] || repoVars[name] || secretFallback || "";

    if (!value) {
        missing.push(name);
        continue;
    }

    // Single-quoted with embedded quotes escaped, so a value containing shell
    // metacharacters cannot break out of the assignment.
    lines.push(`export ${name}='${value.replace(/'/g, `'\\''`)}'`);
}

// --check reports what is missing and stops, so a deployment that cannot possibly
// work fails once with an actionable message rather than five identical build
// errors twenty minutes in.
if (process.argv.includes("--check")) {
    if (missing.length === 0) {
        console.log(`  ${templateName}: ok`);
        process.exit(0);
    }

    console.error(`  ${templateName}: missing ${missing.join(", ")}`);
    process.exit(1);
}

if (missing.length > 0) {
    // Not fatal on the build path. The template's own env.ts throws a message
    // naming the exact variable, which is more useful than a vaguer one here.
    console.error(
        `warning: ${templateName} has no value for ${missing.join(", ")} - ` +
        "the build will fail with the template's own message"
    );
}

process.stdout.write(lines.join("\n") + "\n");
