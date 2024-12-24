import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

const ignores = ["node_modules/", "dist/", "build/", "coverage/"];

export default [
    ...fixupConfigRules(
        compat.extends(
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:react-hooks/recommended",
            "plugin:prettier/recommended",
        ),
    ),
    ...fixupConfigRules(eslint.configs.recommended),
    ...fixupConfigRules(tseslint.configs.recommended),
    {
        plugins: {
            "@typescript-eslint": fixupPluginRules(typescriptEslint),
            "react-hooks": fixupPluginRules(reactHooks),
            prettier: fixupPluginRules(prettier),
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: "module",

            parserOptions: {
                project: "./tsconfig.json",
            },
        },

        rules: {
            "no-unused-vars": "off",
            "no-undef": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_",
                },
            ],
            "prettier/prettier": [
                "error",
                {
                    endOfLine: "auto",
                },
            ],
            "@typescript-eslint/explicit-module-boundary-types": "off",
        },
    },
];
