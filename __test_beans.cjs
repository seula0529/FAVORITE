const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push('console: ' + msg.text()); });

  await page.goto('http://localhost:5173/FAVORITE/', { waitUntil: 'networkidle' });

  await page.click('.btn_cover_main');

  for (let i = 0; i < 5; i++) {
    await page.locator('.card_q.active .btn_q_option').first().click();
    await page.locator('.footer_form .btn').click();
    await page.waitForTimeout(400);
  }

  await page.waitForTimeout(500);
  await page.locator('.section_result .footer_screen .btn').click();
  await page.waitForTimeout(500);

  await page.locator('.section_purpose .footer_screen .btn').click();
  await page.waitForTimeout(600);

  await page.evaluate(() => {
    const el = document.querySelector('.swiper_beans');
    if (el && el.swiper) el.swiper.slideTo(5, 0);
  });
  await page.waitForTimeout(400);

  const card = page.locator('.card_bean').filter({ hasText: '가디언' });
  await card.first().screenshot({ path: __dirname + '/__beans_type6_v2.png' });

  console.log('ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
