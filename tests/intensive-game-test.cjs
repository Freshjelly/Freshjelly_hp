const { Builder, Browser, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function intensiveGameTest(testNumber, duration) {
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
    await driver.get('http://localhost:5173/game');
    await driver.sleep(3000);

    await driver.sleep(2000);
    const startButton = await driver.findElement({ css: 'button.btn.primary' });
    await driver.executeScript('arguments[0].scrollIntoView(true);', startButton);
    await driver.sleep(500);
    await driver.executeScript('arguments[0].click();', startButton);
    await driver.sleep(1000);

    const body = await driver.findElement({ css: 'body' });
    const startTime = Date.now();
    let shotCount = 0;
    let moveCount = 0;
    let errors = [];

    while (Date.now() - startTime < duration) {
      try {
        // より高速なゲームプレイ
        const action = Math.floor(Math.random() * 5);
        
        if (action === 0 || action === 1) {
          await body.sendKeys(Key.ARROW_LEFT);
          moveCount++;
        } else if (action === 2 || action === 3) {
          await body.sendKeys(Key.ARROW_RIGHT);
          moveCount++;
        } else {
          await body.sendKeys(Key.SPACE);
          shotCount++;
        }

        await driver.sleep(50 + Math.random() * 100);
      } catch (e) {
        errors.push(e.message);
      }
    }

    const elapsed = Date.now() - startTime;

    // 最終状態を取得
    let finalState = { lives: '?', stage: '?', score: '?' };
    try {
      const scoreElements = await driver.findElements({ css: '.game-score .score-value' });
      if (scoreElements.length >= 3) {
        finalState.lives = await scoreElements[0].getText();
        finalState.stage = await scoreElements[1].getText();
        finalState.score = await scoreElements[2].getText();
      }
    } catch (e) {
      // 無視
    }

    // コンソールエラーをチェック
    const logs = await driver.manage().logs().get('browser');
    const jsErrors = logs.filter(entry => entry.level.name === 'SEVERE');
    
    const result = {
      testNumber,
      duration: elapsed,
      shotCount,
      moveCount,
      finalState,
      jsErrors: jsErrors.length,
      actionErrors: errors.length,
      success: jsErrors.length === 0 && errors.length === 0
    };

    const num = testNumber + 1;
    if (result.success) {
      console.log('テスト ' + num + '/100 ✅ - 時間: ' + (elapsed/1000).toFixed(1) + 's | 発射: ' + shotCount + ' | 移動: ' + moveCount + ' | スコア: ' + finalState.score);
    } else {
      console.log('テスト ' + num + '/100 ⚠️ - JSエラー: ' + jsErrors.length + ' | アクションエラー: ' + errors.length);
    }

    return result;

  } catch (error) {
    return {
      testNumber,
      error: error.message,
      success: false
    };
  } finally {
    await driver.quit();
  }
}

async function runIntensiveTests() {
  console.log('🎮 ゲームの高強度100回反復テストを開始します\n');
  console.log('各テスト: 10秒間の連続プレイ\n');
  
  const results = [];
  const testDuration = 10000; // 10秒

  for (let i = 0; i < 100; i++) {
    const result = await intensiveGameTest(i, testDuration);
    results.push(result);
  }

  console.log('\n\n=== 高強度テスト結果サマリー ===');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log('成功: ' + successful + '/100');
  console.log('失敗: ' + failed + '/100');

  if (successful > 0) {
    const totalShots = results.filter(r => r.success).reduce((sum, r) => sum + r.shotCount, 0);
    const totalMoves = results.filter(r => r.success).reduce((sum, r) => sum + r.moveCount, 0);
    const avgShots = totalShots / successful;
    const avgMoves = totalMoves / successful;

    console.log('\n操作統計:');
    console.log('平均発射回数: ' + avgShots.toFixed(1) + '回/テスト');
    console.log('平均移動回数: ' + avgMoves.toFixed(1) + '回/テスト');
    console.log('総発射回数: ' + totalShots + '回');
    console.log('総移動回数: ' + totalMoves + '回');
  }

  const jsErrorCount = results.reduce((sum, r) => sum + (r.jsErrors || 0), 0);
  const actionErrorCount = results.reduce((sum, r) => sum + (r.actionErrors || 0), 0);

  if (jsErrorCount > 0 || actionErrorCount > 0) {
    console.log('\n⚠️ エラー統計:');
    console.log('JavaScriptエラー: ' + jsErrorCount + '件');
    console.log('アクションエラー: ' + actionErrorCount + '件');
  } else {
    console.log('\n✅ 完全成功 - エラーゼロ！');
  }
}

runIntensiveTests().catch(console.error);
