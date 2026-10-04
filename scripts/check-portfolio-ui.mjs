import assert from "node:assert/strict"
import { DatabaseSync } from "node:sqlite"

const url = process.argv[2] || "http://localhost:3000"
const response = await fetch(url)
assert.equal(response.status, 200)
const html = await response.text()
const db = new DatabaseSync(new URL("../menu.db", import.meta.url).pathname)
const projects = db.prepare("SELECT title FROM projects").all()
for (const { title } of projects) assert.ok(html.includes(title), `Missing project: ${title}`)
assert.ok(html.includes("tel:+213553591781"), "Missing contact phone")
console.log(`Portfolio renders all ${projects.length} projects and contact links.`)
db.close()
