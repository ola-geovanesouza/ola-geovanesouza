#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist", "client");
const vite = await createServer({
  root,
  plugins: [{
    name: "static-motion-for-prerender",
    enforce: "pre",
    resolveId(source) {
      if (source === "motion/react") return path.join(root, "scripts", "prerender-motion.mjs");
    },
  }],
  optimizeDeps: { noDiscovery: true, include: [], entries: [] },
  // SSR runs inside the build script, so it does not need a live HMR socket.
  // Disabling it also avoids conflicts with the user's local preview server.
  server: { middlewareMode: true, hmr: false, preTransformRequests: false },
  appType: "custom",
  logLevel: "error",
});

try {
  const { App } = await vite.ssrLoadModule("/src/App.jsx");
  const manifest = JSON.parse(await readFile(path.join(dist, ".vite", "manifest.json"), "utf8"));
  const body = renderToString(React.createElement(App)).replace(/\/src\/assets\/([^"\s<>]+)/g, (url, filename) => {
    const built = manifest[`src/assets/${filename}`]?.file;
    if (!built) throw new Error(`Missing built asset for prerender: ${filename}`);
    return `/${built}`;
  });
  const indexFile = path.join(dist, "index.html");
  const index = await readFile(indexFile, "utf8");
  if (!index.includes('<div id="root"></div>')) throw new Error("Missing root mount point in built HTML");
  await writeFile(indexFile, index.replace('<div id="root"></div>', `<div id="root">${body}</div>`));
  console.log(`Prerendered homepage content into dist/client/index.html (${body.length} characters)`);
} finally {
  await vite.close();
}
