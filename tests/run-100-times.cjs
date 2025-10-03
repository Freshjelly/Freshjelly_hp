const { Builder, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTest(iteration) {
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
    await driver.get('http://localhost:5173');
    await driver.sleep(2000);
    const endTime = Date.now();
    const loadTime = endTime - startTime;

    const title = await driver.getTitle();
    const num = iteration + 1;
    console.log('実行 ' + num + '/100 - タイトル: ' + title + ' - 読み込み時間: ' + loadTime + 'ms');

    return { iteration: num, title, loadTime, success: true };
  } catch (error) {
    const num = iteration + 1;
    console.error('実行 ' + num + '/100 - エラー: ' + error.message);
    return { iteration: num, error: error.message, success: false };
  } finally {
    await driver.quit();
  }
}

async function runAllTests() {
  console.log('100回のウェブサイト実行を開始します...\n');
  const results = [];

  for (let i = 0; i < 100; i++) {
    const result = await runTest(i);
    results.push(result);
  }

  console.log('\n\n=== 実行結果サマリー ===');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  if (successful > 0) {
    const avgLoadTime = results
      .filter(r => r.success && r.loadTime)
      .reduce((sum, r) => sum + r.loadTime, 0) / successful;
    const minLoadTime = Math.min(...results.filter(r => r.success && r.loadTime).map(r => r.loadTime));
    const maxLoadTime = Math.max(...results.filter(r => r.success && r.loadTime).map(r => r.loadTime));

    console.log('成功: ' + successful + '/100');
    console.log('失敗: ' + failed + '/100');
    console.log('平均読み込み時間: ' + avgLoadTime.toFixed(2) + 'ms');
    console.log('最小読み込み時間: ' + minLoadTime + 'ms');
    console.log('最大読み込み時間: ' + maxLoadTime + 'ms');
  } else {
    console.log('成功: ' + successful + '/100');
    console.log('失敗: ' + failed + '/100');
  }
}

runAllTests().catch(console.error);
