// Vite
import { defineConfig } from "vite"

// React
import reactPlugin from "@vitejs/plugin-react"

//
// Vite configuration
//
export default defineConfig({
    plugins: [
        reactPlugin() // Integrates ReactJS
    ],
    server: {
        port: 3000
    }
})
