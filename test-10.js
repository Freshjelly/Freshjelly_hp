/**
 * 10回テスト - デバッグ用
 */

import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function test() {
  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('http://localhost:5173/game');
    await driver.sleep(1000);

    // Use JavaScript to click the button (avoids interception issues)
    await driver.executeScript(`
      const button = document.querySelector('button.btn.primary');
      if (button) button.click();
    `);
    await driver.sleep(500);

    const body = await driver.findElement(By.css('body'));
    await body.sendKeys('ArrowLeft');
    await driver.sleep(50);
    await body.sendKeys(' ');
    await driver.sleep(200);

    const logs = await driver.manage().logs().get('browser');
    const errors = logs.filter(e => e.level.name === 'SEVERE');

    if (errors.length > 0) {
      throw new Error(errors[0].message);
    }

    return true;
  } finally {
    await driver.quit();
  }
}

async function run() {
  let passed = 0;
  let failed = 0;

  const totalTests = 100;
  console.log(`🧪 Running ${totalTests} tests...\n`);

  for (let i = 1; i <= totalTests; i++) {
    try {
      process.stdout.write(`\r🧪 Testing... ${i}/${totalTests} (✅ ${passed} ❌ ${failed})`);
      await test();
      passed++;
    } catch (error) {
      failed++;
    }
  }

  console.log('\n\n' + '='.repeat(40));
  console.log(`✅ Passed: ${passed}/${totalTests} (${(passed/totalTests*100).toFixed(1)}%)`);
  console.log(`❌ Failed: ${failed}/${totalTests} (${(failed/totalTests*100).toFixed(1)}%)`);
  console.log('='.repeat(40));

  if (failed === 0) {
    console.log('\n🎉 All tests passed!');
  }
}

run();
