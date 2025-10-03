const { Builder, Browser, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function playGame() {
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
    console.log('ゲームページを読み込んでいます...');
    await driver.get('http://localhost:5173/game');
    await driver.sleep(3000);

    console.log('ゲームを開始します...');
    // Wait for button to be available and clickable
    await driver.sleep(2000);

    const startButton = await driver.findElement({ css: 'button.btn.primary' });
    await driver.executeScript('arguments[0].scrollIntoView(true);', startButton);
    await driver.sleep(500);
    await driver.executeScript('arguments[0].click();', startButton);
    await driver.sleep(1000);

    console.log('\nゲームプレイ開始！\n');
    const body = await driver.findElement({ css: 'body' });

    // 30秒間ゲームをプレイ
    const playDuration = 30000;
    const startTime = Date.now();
    let shotCount = 0;
    let moveCount = 0;

    while (Date.now() - startTime < playDuration) {
      // ランダムな動きをシミュレート
      const action = Math.floor(Math.random() * 4);
      
      switch(action) {
        case 0: // 左移動
          await body.sendKeys(Key.ARROW_LEFT);
          moveCount++;
          break;
        case 1: // 右移動
          await body.sendKeys(Key.ARROW_RIGHT);
          moveCount++;
          break;
        case 2: // 発射
          await body.sendKeys(Key.SPACE);
          shotCount++;
          break;
        case 3: // 発射しながら移動
          await body.sendKeys(Key.SPACE);
          await body.sendKeys(Math.random() > 0.5 ? Key.ARROW_LEFT : Key.ARROW_RIGHT);
          shotCount++;
          moveCount++;
          break;
      }

      await driver.sleep(100 + Math.random() * 200);

      // 5秒ごとにスコアをチェック
      if ((Date.now() - startTime) % 5000 < 300) {
        try {
          const scoreElement = await driver.findElement({ css: '.game-score .score-value' });
          const score = await scoreElement.getText();
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          console.log('[' + elapsed + '秒] 発射: ' + shotCount + '回 | 移動: ' + moveCount + '回');
        } catch (e) {
          // スコア要素が見つからない場合は無視
        }
      }
    }

    console.log('\n=== ゲームプレイ完了 ===');
    console.log('プレイ時間: ' + (playDuration / 1000) + '秒');
    console.log('総発射回数: ' + shotCount);
    console.log('総移動回数: ' + moveCount);

    // 最終スコアを取得
    try {
      const scoreElements = await driver.findElements({ css: '.game-score .score-value' });
      if (scoreElements.length >= 3) {
        const lives = await scoreElements[0].getText();
        const stage = await scoreElements[1].getText();
        const score = await scoreElements[2].getText();
        console.log('\n最終状態:');
        console.log('残機: ' + lives);
        console.log('ステージ: ' + stage);
        console.log('スコア: ' + score);
      }
    } catch (e) {
      console.log('最終スコア取得エラー:', e.message);
    }

    // コンソールエラーをチェック
    const logs = await driver.manage().logs().get('browser');
    const errors = logs.filter(entry => entry.level.name === 'SEVERE');
    
    if (errors.length > 0) {
      console.log('\n⚠️ JavaScriptエラー検出: ' + errors.length + '件');
      errors.forEach((error, idx) => {
        console.log((idx + 1) + '. ' + error.message);
      });
    } else {
      console.log('\n✅ エラーなし - ゲームは正常に動作しました');
    }

    await driver.sleep(2000);

  } catch (error) {
    console.error('ゲームプレイ中にエラーが発生:', error.message);
  } finally {
    await driver.quit();
  }
}

playGame().catch(console.error);
