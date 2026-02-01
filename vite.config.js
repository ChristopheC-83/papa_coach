import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// 🚀 On recrée le __dirname manquant
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      // Si tu utilises des alias comme "@", c'est ici que ça se passe
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      devOptions: {
        enabled: true,
        type: "module",
      },
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "puzzles/*.png"],
      manifest: {
        name: "A.R.C.",
        short_name: "Analyse et Relation de Coaching",
        description: "Analyse et Relation de Coaching",
        theme_color: "#ffffff", // Le marron ambre de ton thème
        background_color: "#17240e",
        display: "standalone",
        orientation: "portrait", // On force le portrait au lancement
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/pwa-.*\.png$/, /^\/favicon\.ico$/], // Force la mise en cache pour le mode offline
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,woff,woff2}"],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
