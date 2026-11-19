import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                console: "readonly",
                document: "readonly",
                window: "readonly",
                screen: "readonly",
                Element: "readonly",
                HTMLVideoElement: "readonly",
                HTMLIFrameElement: "readonly",
                setTimeout: "readonly",
                clearTimeout: "readonly",
            },
        },
        rules: {
            "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "caughtErrorsIgnorePattern": "^_" }],
            "no-console": "off",
        },
    },
];