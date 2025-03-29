// ESLint
import { defineConfig } from "eslint/config"

// Plugins
import globals from "globals"
import jsPlugin from "@eslint/js"
import tsPlugin from "typescript-eslint"

//
// ESLint configuration
//
export default defineConfig([
    //
    // Global
    //
    {
        ignores: [
            "node_modules",
            "build",
            "dist",
            ".vite",
            ".npm"
        ]
    },
    //
    // JavaScript Rules
    //
    {
        name: "JavaScript Rules",
        files: [
            "**/*.js", 
            "**/*.jsx"
        ],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        ...jsPlugin.configs.recommended
    },
    //
    // TypeScript Rules
    //
    ...tsPlugin.configs.recommendedTypeChecked.map((config) => ({
        name: "TypeScript Rules",
        files: [
            "**/*.ts",
            "**/*.tsx"
        ],
        languageOptions: {
            parser: tsPlugin.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: new URL(".", import.meta.url).pathname
            },
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        ...config
    }))
])
