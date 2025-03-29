// Makers
import { MakerSquirrel } from "@electron-forge/maker-squirrel"
import { MakerDMG } from "@electron-forge/maker-dmg"
import { MakerDeb } from "@electron-forge/maker-deb"
import { MakerRpm } from "@electron-forge/maker-rpm"
import { MakerZIP } from "@electron-forge/maker-zip"

// Vite
import { VitePlugin } from "@electron-forge/plugin-vite"

// Fuses
import { FuseVersion, FuseV1Options } from "@electron/fuses"
import { FusesPlugin } from "@electron-forge/plugin-fuses"

//
// Electron Forge configuration
//
export default {
    packagerConfig: {
        asar: true
    },
    plugins: [
        //
        // Vite configuration
        //
        new VitePlugin({
            build: [
                // Main context bundler configuration
                {
                    entry: "src/main.ts",
                    config: "vite.main.config.js",
                    target: "main"
                },
                // Preload context bundler configuration
                {
                    entry: "src/preload.ts",
                    config: "vite.preload.config.js",
                    target: "preload"
                }
            ],
            renderer: [
                // Renderer context bundler configuration
                {
                    name: "Main Window",
                    config: "vite.renderer.config.js"
                }
            ]
        }),
        //
        // Fuses configuration
        //
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true
        }),
        {
            name: "@electron-forge/plugin-auto-unpack-natives",
            config: {}
        }
    ],
    //
    // Makers
    //
    makers: [
        new MakerSquirrel({}, ["win32"]),
        new MakerDMG({}, ["darwin"]),
        new MakerDeb({}, ["linux"]),
        new MakerRpm({}, ["linux"]),
        new MakerZIP({}, ["win32", "darwin", "linux"])
    ],
}
