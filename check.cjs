// Run: node check.cjs
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const html = fs.readFileSync(`${__dirname}/index.html`, 'utf8');
new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
for (let i = 1; i <= 10; i++) assert(fs.existsSync(`${__dirname}/assets/2026-09-13/2026-09-13_카드뉴스_${String(i).padStart(2,'0')}.png`));
for (const feature of ['scroll-snap-type:x mandatory', 'navigator.canShare({files})', 't.me/share/url', 'ArrowRight']) assert(html.includes(feature));
console.log('PASS: script syntax, 10 assets, gallery and sharing controls');
