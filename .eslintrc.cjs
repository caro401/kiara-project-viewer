module.exports = {
    extends: [
        "plugin:astro/recommended", "plugin:svelte/recommended"
    ],
    env: {
        es2022: true
    },

    // ...
    overrides: [
        {
            files: ["*.astro"],
            parser: "astro-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
                extraFileExtensions: [".astro"],
            },
        },
        {
            files: ["*.svelte"],
            parser: "svelte-eslint-parser",
            rules: {
                'svelte/no-at-html-tags': 'off',
            }
        },
    ],
}