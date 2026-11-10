import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const client = path.join(root, "dist", "client");
const html = await readFile(path.join(client, "index.html"), "utf8");

test("the built homepage contains crawlable content and canonical metadata", async () => {
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<title>Geovane Souza \| Product Manager, IA e produtos digitais<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/geovanesouza\.com\/"/);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.match(html, /<div id="root">[\s\S]*<h1 id="hero-title">/);
  for (const phrase of ["Geovane Vieira de Souza", "Cuida e Amor", "EduServen", "Dot10", "BR512025000624-1", "ola@geovanesouza.com"]) {
    assert.ok(html.includes(phrase), `Missing crawlable phrase: ${phrase}`);
  }
  assert.doesNotMatch(html, /registro de patente/i);
  assert.doesNotMatch(html, /\/src\/assets\//);
});

test("structured data describes the visible person and canonical page", () => {
  const script = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, "Missing JSON-LD");
  const entities = JSON.parse(script)["@graph"];
  const person = entities.find((item) => item["@type"] === "Person");
  const page = entities.find((item) => item["@type"] === "WebPage");
  assert.equal(person.name, "Geovane Vieira de Souza");
  assert.equal(person.jobTitle, "Product Manager e Engenheiro de Software com foco em IA");
  assert.equal(page.url, "https://geovanesouza.com/");
  assert.equal(page.mainEntity["@id"], person["@id"]);
});

test("robots, sitemap, share image and referenced assets ship with the built site", async () => {
  const robots = await readFile(path.join(client, "robots.txt"), "utf8");
  const sitemap = await readFile(path.join(client, "sitemap.xml"), "utf8");
  assert.match(robots, /Sitemap: https:\/\/geovanesouza\.com\/sitemap\.xml/);
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]), ["https://geovanesouza.com/"]);
  assert.match(html, /https:\/\/geovanesouza\.com\/og-geovane-souza\.png/);
  await access(path.join(client, "og-geovane-souza.png"));
  for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)) {
    await access(path.join(client, match[1]));
  }
});
