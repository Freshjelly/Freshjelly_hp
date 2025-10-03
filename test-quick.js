/**
 * Quick automated testing - 100 runs
 */

import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function quickTest() {
  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-gpu');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('http://localhost:5173/game');
    const startButton = await driver.wait(until.elementLocated(By.css('button.btn.primary')), 2000);
    await startButton.click();

    const body = await driver.findElement(By.css('body'));
    await body.sendKeys('ArrowLeft');
    await body.sendKeys(' ');

    const logs = await driver.manage().logs().get('browser');
    const errors = logs.filter(e => e.level.name === 'SEVERE');

    if (errors.length > 0) {
      throw new Error(errors[0].message);
    }
  } finally {
    await driver.quit();
  }
}

async function run100Tests() {
  let passed = 0;
  let failed = 0;
  const failures = [];

  console.log('🔄 Running 100 quick tests...\n');
  const startTime = Date.now();

  for (let i = 1; i <= 100; i++) {
    try {
      process.stdout.write(`\r🧪 ${i}/100 (✅ ${passed} ❌ ${failed})`);
      await quickTest();
      passed++;
    } catch (error) {
      failed++;
      failures.push({ run: i, error: error.message.substring(0, 50) });
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n\n' + '='.repeat(60));
  console.log('📊 FINAL RESULTS');
  console.log('='.repeat(60));
  console.log(`Total:     100`);
  console.log(`✅ Passed: ${passed} (${passed}%)`);
  console.log(`❌ Failed: ${failed} (${failed}%)`);
  console.log(`⏱️  Time:   ${duration}s`);

  if (failures.length > 0 && failures.length <= 10) {
    console.log('\n❌ Failures:');
    failures.forEach(f => console.log(`   Run ${f.run}: ${f.error}`));
  }

  if (failed === 0) {
    console.log('\n🎉 PERFECT! All 100 tests passed with no errors!');
  }

  process.exit(failed === 0 ? 0 : 1);
}

run100Tests();
