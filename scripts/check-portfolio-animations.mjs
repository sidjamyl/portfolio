import assert from "node:assert/strict"

// Run against a Chrome started with --remote-debugging-port=9223.
const origin = process.argv[2] || "http://localhost:3000"
const debuggerUrl = process.env.CHROME_DEBUG_URL || "http://127.0.0.1:9223"
const tab = await (await fetch(`${debuggerUrl}/json/new?${encodeURIComponent(origin)}`, { method: "PUT" })).json()
const socket = new WebSocket(tab.webSocketDebuggerUrl)
await new Promise(resolve => socket.addEventListener("open", resolve, { once: true }))
let sequence = 0
const pending = new Map()
const errors = []
socket.addEventListener("message", event => {
  const message = JSON.parse(event.data)
  if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.text)
  if (pending.has(message.id)) { const { resolve, reject, timer } = pending.get(message.id); clearTimeout(timer); pending.delete(message.id); message.error ? reject(new Error(message.error.message)) : resolve(message.result) }
})
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence
  const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Chrome timed out: ${method}`)) }, 15000)
  pending.set(id, { resolve, reject, timer }); socket.send(JSON.stringify({ id, method, params }))
})
const evaluate = async expression => { const response = await send("Runtime.evaluate", { expression, returnByValue: true }); if (response.exceptionDetails) throw new Error(response.exceptionDetails.text); return response.result.value }
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
const waitFor = async expression => { for (let i = 0; i < 90; i++) { if (await evaluate(expression)) return; await pause(1000) } throw new Error(`Page did not become ready: ${expression}`) }
const topFunction = `const top = element => { let y = 0; for(let node = element; node; node = node.offsetParent) y += node.offsetTop; return y }`
try {
  await send("Runtime.enable")
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
  await waitFor(`Boolean(document.querySelector('.portrait-playing') && document.querySelector('.projects-scroll-space')?.style.height && [...document.images].every(image => image.complete))`)
  await pause(4500)
  assert.equal(await evaluate(`document.querySelectorAll('.project-card').length`), 7)
  assert.equal(await evaluate(`document.querySelectorAll('.client-shot').length`), 3)
  assert.equal(await evaluate(`[...document.images].filter(image => !image.naturalWidth).map(image => image.src).length`), 0, "Broken images")
  const marquee = await evaluate(`getComputedStyle(document.querySelector('.marquee-track')).transform`)
  await pause(200)
  assert.notEqual(await evaluate(`getComputedStyle(document.querySelector('.marquee-track')).transform`), marquee, "Marquee is static")
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('.portrait-photo')).opacity`), "0", "Photo must transition into drawing")
  assert.equal(await evaluate(`[...document.querySelectorAll('.portrait-lines path')].every(path => getComputedStyle(path).strokeDashoffset === '0px')`), true, "Portrait paths did not finish")
  const gallery = await evaluate(`(() => { ${topFunction}; const space = document.querySelector('.projects-scroll-space'), pin = document.querySelector('.projects-pinned'); return { start: top(space) - parseFloat(pin.style.top), height: pin.offsetHeight, width: space.clientWidth } })()`)
  const scroll = async y => { await evaluate(`scrollTo(0,${y})`); await pause(250) }
  await scroll(gallery.start + 80)
  assert.ok(Math.abs(await evaluate(`new DOMMatrix(getComputedStyle(document.querySelector('.projects-track')).transform).m41`)) < 2, "Initial project pause missing")
  await pause(2500)
  assert.ok(await evaluate(`Number(document.querySelector('canvas').dataset.drawnSegments) > 20`), "Mechanical scene did not draw")
  const canvas = await evaluate(`document.querySelector('canvas').toDataURL()`)
  await pause(150)
  assert.notEqual(await evaluate(`document.querySelector('canvas').toDataURL()`), canvas, "Mechanical scene is static")
  await scroll(gallery.start + 220 + gallery.height / 2)
  assert.ok(Math.abs(await evaluate(`new DOMMatrix(getComputedStyle(document.querySelector('.projects-track')).transform).m41`) + gallery.width / 2) < 5, "Project movement does not follow scroll")
  await scroll(gallery.start + 220 + gallery.height + 70)
  assert.equal(await evaluate(`document.querySelector('.project-controls').getAttribute('aria-label')`), "Project 2 of 7")
  assert.equal(await evaluate(`document.querySelectorAll('.project-card:not([inert])').length`), 1, "Hidden project links must be inaccessible")
  assert.ok(await evaluate(`Math.abs(document.querySelector('#skills').getBoundingClientRect().top - document.querySelector('.projects-pinned').getBoundingClientRect().bottom) < 2`), "Blank gap below gallery")
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
  await scroll(0)
  assert.equal(await evaluate(`document.body.scrollWidth <= innerWidth`), true, "Mobile horizontal overflow")
  await evaluate(`document.querySelector('.menu-toggle').click()`)
  assert.equal(await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')`), "true")
  await evaluate(`document.querySelector('.mobile-nav a[href="#projects"]').click()`)
  await pause(1800)
  assert.equal(await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')`), "false")
  const mobileTransform = await evaluate(`getComputedStyle(document.querySelector('.projects-track')).transform`)
  await evaluate(`scrollBy(0,450)`); await pause(200)
  assert.notEqual(await evaluate(`getComputedStyle(document.querySelector('.projects-track')).transform`), mobileTransform, "Mobile gallery is static")
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] })
  await scroll(0)
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('.marquee-track')).animationName`), "none")
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('.portrait-photo')).opacity`), "1")
  assert.deepEqual(errors, [], "Browser runtime errors")
  console.log("Desktop/mobile: portrait, marquees, mechanical scenes, project pauses, compact layout, menu, images and reduced motion passed.")
} finally {
  socket.close()
  await fetch(`${debuggerUrl}/json/close/${tab.id}`)
}
