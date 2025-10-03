/**
 * Automated game testing script using Selenium
 * Tests the Space Invaders game for critical bugs
 */

import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function testGame(runNumber) {
  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-gpu');
  options.addArguments('--window-size=1920,1080');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to game
    await driver.get('http://localhost:5173/game');
    await driver.sleep(300);

    // Click start button
    const startButton = await driver.wait(
      until.elementLocated(By.css('button.btn.primary')),
      3000
    );
    await startButton.click();
    await driver.sleep(200);

    // Test player movement and shooting
    const body = await driver.findElement(By.css('body'));
    await body.sendKeys('ArrowLeft');
    await driver.sleep(50);
    await body.sendKeys('ArrowRight');
    await driver.sleep(50);
    await body.sendKeys(' ');
    await driver.sleep(100);

    // Check for console errors
    const logs = await driver.manage().logs().get('browser');
    const errors = logs.filter(entry => entry.level.name === 'SEVERE');

    if (errors.length > 0) {
      throw new Error(`JavaScript errors: ${errors[0].message}`);
    }

    // Quick check other pages
    const pages = ['/', '/services', '/about'];
    for (const page of pages) {
      await driver.get(`http://localhost:5173${page}`);
      await driver.sleep(100);
    }

  } catch (error) {
    throw error;
  } finally {
    await driver.quit();
  }
}

// Run tests 100 times
async function runMultipleTests() {
  const totalRuns = 100;
  let passed = 0;
  let failed = 0;
  const failures = [];

  console.log(`\n🔄 Starting ${totalRuns} test runs...\n`);

  for (let i = 1; i <= totalRuns; i++) {
    try {
      process.stdout.write(`\r🧪 Testing... ${i}/${totalRuns} (✅ ${passed} ❌ ${failed})`);

      await testGame(i);
      passed++;
    } catch (error) {
      failed++;
      failures.push({ run: i, error: error.message });
    }

    // No pause for faster execution
  }
  console.log(''); // New line after progress

  // Final summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Runs:    ${totalRuns}`);
  console.log(`✅ Passed:     ${passed} (${(passed/totalRuns*100).toFixed(1)}%)`);
  console.log(`❌ Failed:     ${failed} (${(failed/totalRuns*100).toFixed(1)}%)`);

  if (failures.length > 0) {
    console.log('\n❌ Failed runs:');
    failures.forEach(f => {
      console.log(`   Run ${f.run}: ${f.error}`);
    });
  }

  if (failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! No bugs detected.');
  } else {
    console.log(`\n⚠️  ${failed} test(s) failed. Please review.`);
  }

  return failed === 0;
}

// Execute multiple test runs
runMultipleTests()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('\n💥 Testing suite failed:', error);
    process.exit(1);
  });
