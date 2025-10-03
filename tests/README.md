# テストスクリプト

このディレクトリには、ウェブサイトとゲームの自動テストスクリプトが含まれています。

## 前提条件

- 開発サーバーが起動していること (`npm run dev`)
- Chrome/Chromiumがインストールされていること

## テストスクリプト

### 1. `run-100-times.cjs`
ウェブサイト全体を100回読み込むテスト

```bash
node tests/run-100-times.cjs
```

### 2. `run-game-test.cjs`
ゲームページを100回読み込み、JavaScriptエラーをチェック

```bash
node tests/run-game-test.cjs
```

### 3. `play-game-test.cjs`
実際にゲームを30秒間プレイして動作確認

```bash
node tests/play-game-test.cjs
```

### 4. `intensive-game-test.cjs`
ゲームを100回、各10秒間プレイする高強度テスト

```bash
node tests/intensive-game-test.cjs
```

## テスト結果

結果は各スクリプトの実行時にコンソールに表示され、以下のファイルに保存されます：

- `test-results.txt` - ウェブサイトテストの結果
- `game-test-results.txt` - ゲームページテストの結果
- `intensive-game-results.txt` - 高強度テストの結果

## 最新テスト結果（参考）

✅ すべてのテストが100%成功
- ウェブサイト: 100/100成功
- ゲームページ: 100/100成功
- ゲームプレイ: エラー0件
