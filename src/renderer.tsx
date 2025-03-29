// React
import React from "react"
import ReactDOM from "react-dom/client"

// Styles
import styles from "./renderer.module.css"

console.log("Renderer process initialized w/ Vite")

//
// Main application component
//
function App() {
    return (
        <>
            <h1 className={styles.title}>Hello, world!</h1>
        </>
    )
}

//
// Rendering
//
const rootElement = document.getElementById("root")

if (rootElement && !rootElement.hasAttribute("data-react-root")) {
    rootElement.setAttribute("data-react-root", "true")

    const root = ReactDOM.createRoot(rootElement)
    root.render(<App />)
} else {
    console.error("Root element does not exist")
}
