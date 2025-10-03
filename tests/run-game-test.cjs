const { Builder, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Key } = require('selenium-webdriver');

async function runGameTest(iteration) {
  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--disable-gpu');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  try {
    const startTime = Date.now();
    await driver.get('http://localhost:5173/game');
    await driver.sleep(1000);

    // Check for JavaScript errors in console
    const logs = await driver.manage().logs().get('browser');
    const errors = logs.filter(entry => entry.level.name === 'SEVERE');

    // Try to start the game
    const startButton = await driver.findElements({ css: 'button.btn.primary' });
    if (startButton.length > 0) {
      await startButton[0].click();
      await driver.sleep(500);

      // Simulate some gameplay
      const body = await driver.findElement({ css: 'body' });
      await body.sendKeys(Key.SPACE);
      await driver.sleep(100);
      await body.sendKeys(Key.ARROW_LEFT);
      await driver.sleep(100);
      await body.sendKeys(Key.ARROW_RIGHT);
      await driver.sleep(100);
      await body.sendKeys(Key.SPACE);
      await driver.sleep(500);
    }

    const endTime = Date.now();
    const loadTime = endTime - startTime;

    const title = await driver.getTitle();
    const num = iteration + 1;

    if (errors.length > 0) {
      console.log('実行 ' + num + '/100 - エラー検出: ' + errors.length + '件 - 時間: ' + loadTime + 'ms');
      errors.forEach(error => {
        console.log('  ERROR: ' + error.message);
      });
      return { iteration: num, title, loadTime, errors: errors.map(e => e.message), success: false };
    } else {
      console.log('実行 ' + num + '/100 - 正常 - 時間: ' + loadTime + 'ms');
      return { iteration: num, title, loadTime, errors: [], success: true };
    }
  } catch (error) {
    const num = iteration + 1;
    console.error('実行 ' + num + '/100 - 例外エラー: ' + error.message);
    return { iteration: num, error: error.message, success: false };
  } finally {
    await driver.quit();
  }
}

async function runAllTests() {
  console.log('ゲームページの100回反復テストを開始します...\n');
  const results = [];

  for (let i = 0; i < 100; i++) {
    const result = await runGameTest(i);
    results.push(result);
    
    // If we find errors in first 10 runs, we can stop early for quick feedback
    if (i < 10 && !result.success) {
      console.log('\n早期エラー検出 - 最初の10回以内でエラーが見つかりました');
    }
  }

  console.log('\n\n=== ゲームテスト結果サマリー ===');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log('成功: ' + successful + '/100');
  console.log('失敗: ' + failed + '/100');

  if (successful > 0) {
    const avgLoadTime = results
      .filter(r => r.success && r.loadTime)
      .reduce((sum, r) => sum + r.loadTime, 0) / successful;
    const minLoadTime = Math.min(...results.filter(r => r.success && r.loadTime).map(r => r.loadTime));
    const maxLoadTime = Math.max(...results.filter(r => r.success && r.loadTime).map(r => r.loadTime));

    console.log('平均読み込み時間: ' + avgLoadTime.toFixed(2) + 'ms');
    console.log('最小読み込み時間: ' + minLoadTime + 'ms');
    console.log('最大読み込み時間: ' + maxLoadTime + 'ms');
  }

  // Show unique errors
  const allErrors = results.filter(r => r.errors && r.errors.length > 0).flatMap(r => r.errors);
  if (allErrors.length > 0) {
    console.log('\n検出されたエラー:');
    const uniqueErrors = [...new Set(allErrors)];
    uniqueErrors.forEach((err, idx) => {
      console.log((idx + 1) + '. ' + err);
    });
  }

  const exceptionErrors = results.filter(r => r.error);
  if (exceptionErrors.length > 0) {
    console.log('\n例外エラー:');
    const uniqueExceptions = [...new Set(exceptionErrors.map(r => r.error))];
    uniqueExceptions.forEach((err, idx) => {
      console.log((idx + 1) + '. ' + err);
    });
  }
}

runAllTests().catch(console.error);
