# 🌊 Freshjelly - ポートフォリオウェブサイト

**没入感あるデジタル体験を、軽やかに。**

React + TypeScript + Vite で構築されたモダンなポートフォリオサイトです。サイバーパンク調のデザインと、スムーズなアニメーション、高いパフォーマンスを実現しています。

## ✨ 特徴

- 🎨 **サイバーパンク調デザイン** - ネオンカラーとグリッド背景
- ⚡ **高速パフォーマンス** - Viteによる高速ビルドとHMR
- 🎮 **Space Invadersゲーム** - Canvas APIを使用したゲーム実装
- 📱 **完全レスポンシブ** - モバイルからデスクトップまで対応
- 🔍 **SEO最適化** - メタタグとOGP対応
- 🎯 **カスタムカーソル** - インタラクティブなUI要素
- 🚀 **ローディング画面** - サイバーパンク調のアニメーション
- 🛡️ **エラーハンドリング** - ErrorBoundaryによる堅牢な実装

## 🚀 セットアップ

### 前提条件

- Node.js 18.x 以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# プレビュー
npm run preview
```

## 📂 プロジェクト構成

```
web/
├── src/
│   ├── components/          # 再利用可能なコンポーネント
│   │   ├── CustomCursor.tsx # カスタムカーソル
│   │   ├── ErrorBoundary.tsx # エラーハンドリング
│   │   ├── LoadingScreen.tsx # ローディング画面
│   │   ├── SEO.tsx          # SEOメタタグ管理
│   │   └── Layout.tsx       # レイアウト
│   ├── pages/               # ページコンポーネント
│   │   ├── Home.tsx         # ホームページ
│   │   ├── Services.tsx     # スキル・技術スタック
│   │   ├── Works.tsx        # 作品集
│   │   ├── About.tsx        # 自己紹介
│   │   ├── Contact.tsx      # お問い合わせ
│   │   ├── Game.tsx         # Space Invadersゲーム
│   │   └── NotFound.tsx     # 404ページ
│   ├── styles/              # スタイルシート
│   │   ├── global.css       # グローバルスタイル
│   │   ├── loading.css      # ローディング画面
│   │   └── game.css         # ゲーム用スタイル
│   ├── types/               # TypeScript型定義
│   ├── App.tsx              # アプリケーションルート
│   └── main.tsx             # エントリーポイント
├── tests/                   # テストスクリプト
├── public/                  # 静的ファイル
└── package.json             # 依存関係とスクリプト
```

## 🎮 Space Invadersゲーム

サイト内に実装されたレトロ風シューティングゲームです。

### 遊び方

- ⬅️ **左矢印キー** - 左に移動
- ➡️ **右矢印キー** - 右に移動
- **スペースキー** - 弾を発射

### 特徴

- ステージ制（5ステージごとにボス登場）
- スムーズなアニメーション
- パーティクルエフェクト
- スコア・残機システム

## 🧪 テスト

自動テストスクリプトが用意されています。詳細は [tests/README.md](tests/README.md) を参照してください。

```bash
# ウェブサイト全体のテスト
node tests/run-100-times.cjs

# ゲームのテスト
node tests/run-game-test.cjs
```

**テスト結果:** ✅ 100%成功率（エラー0件）

## 🛠️ 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - 型安全な開発
- **Vite** - 高速ビルドツール
- **React Router** - ルーティング
- **CSS Variables** - テーマシステム

## 🌐 デプロイ

```bash
# Vercelにデプロイ（推奨）
npm install -g vercel
vercel
```

その他、Netlify、GitHub Pages、AWS S3などにもデプロイ可能です。

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)

