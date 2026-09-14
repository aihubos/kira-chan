// Run with Playwright available: node check-layout.cjs
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const server = require('node:http').createServer((req, res) => {
  const file = path.resolve(__dirname, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (!file.startsWith(__dirname + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', file.endsWith('.css') ? 'text/css' : file.endsWith('.png') ? 'image/png' : 'text/html');
    res.end(data);
  });
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({headless:true});
    const pages=process.argv.slice(2).length?process.argv.slice(2):['index.html','2026-09-13/index.html','2026-09-14/index.html','2026-09-14/economy/index.html'];
    for (const file of pages) {
      for (const [width,height] of [[390,844],[320,568],[844,390],[1440,900]]) {
        const page = await browser.newPage({viewport:{width,height}});
        const errors = []; page.on('pageerror', e => errors.push(e.message));
        await page.goto(`http://127.0.0.1:${server.address().port}/${file}`);
        await page.locator('.slide img').first().evaluate(img => img.decode());
        const check = async () => {
          const box = await page.evaluate(() => {
            const r=document.querySelector('.slides').getBoundingClientRect();
            return {height:document.documentElement.scrollHeight, width:document.documentElement.scrollWidth, y:scrollY, top:r.top,bottom:r.bottom};
          });
          assert(box.height<=height && box.width<=width, `${file} ${width}x${height}: overflow ${JSON.stringify(box)}`);
          assert.equal(box.y,0); assert(box.top>=0 && box.bottom<height);
        };
        await check();
        await page.mouse.wheel(0,700); await check();
        await page.locator('#next').click();
        await page.waitForTimeout(500);
        assert.equal(await page.locator('#position').textContent(),'2 / 10');
        await page.locator('#extras summary').click(); await check();
        assert(await page.locator('#copy').isVisible());
        await page.locator('#extras summary').click();
        await page.locator('.kakao-float').click();
        assert(await page.locator('.share-sheet').isVisible());
        await page.locator('#dismissShare').click();
        assert.deepEqual(errors,[]);
        await page.close();
      }
    }
    console.log(`PASS: ${pages.length} pages × 4 viewports; no page scroll, navigation, text panel and share dialog`);
  } finally { if(browser) await browser.close(); server.close(); }
})().catch(e => { console.error(e); process.exitCode=1; });
