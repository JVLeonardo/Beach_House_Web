import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");
const publicEntries = [
  "index.html",
  "404.html",
  "_redirects",
  "assets/css/main.css",
  "assets/js/main.js",
  "assets/js/modal-manager.js",
  "assets/img"
];

await rm(dist, { recursive: true, force: true });

for (const entry of publicEntries) {
  const source = join(root, entry);
  const destination = join(dist, entry);
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination, { recursive: true });
}

console.log(`Static site created at ${dist}`);
