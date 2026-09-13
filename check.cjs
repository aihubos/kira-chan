// Run: node check.cjs
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const html = fs.readFileSync(`${__dirname}/index.html`, 'utf8');
new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
for (let i = 1; i <= 10; i++) assert(fs.existsSync(`${__dirname}/assets/2026-09-13/2026-09-13_카드뉴스_${String(i).padStart(2,'0')}.png`));
for (const feature of ['onpointerup', 'navigator.canShare({files})', 't.me/share/url', 'ArrowRight', '카카오톡 나에게 보내기']) assert(html.includes(feature));
const context = { now: 1000, performance: { now: () => context.now }, document: { querySelector: () => ({}) }, track: { style: {}, children: [] }, names: Array(10) };
vm.createContext(context);
vm.runInContext(html.match(/let current=0,lockedUntil=0;[\s\S]*?(?=\ndocument.querySelector\('#prev'\))/)[0] + ';this.position=()=>current;', context);
context.go(1);context.go(1);context.go(1);assert.equal(context.position(),1,'rapid inputs must not skip cards');
context.now+=500;context.go(100);assert.equal(context.position(),2,'one gesture advances only one card');
for(let i=0;i<20;i++){context.now+=500;context.go(-1)}assert.equal(context.position(),0);
for(let i=0;i<20;i++){context.now+=500;context.go(1)}assert.equal(context.position(),9);
console.log('PASS: syntax, 10 assets, sharing controls, one-card navigation and boundaries');
