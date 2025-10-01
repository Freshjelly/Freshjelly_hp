# Freshjelly Web (Vite + React + TypeScript)

モダンな開発環境（Vite/React/TypeScript）で構築したランディング/コーポレート向けのスターターです。テーマトークン、レスポンシブ、軽量なUIコンポーネントを含みます。

## セットアップ

1. 依存をインストール

```bash
npm i
```

2. ローカル開発

```bash
npm run dev
```

3. ビルド

```bash
npm run build
npm run preview
```

## 構成

- `index.html` — ベースHTMLとSEOメタ
- `src/styles/global.css` — デザイントークンとスタイル
- `src/components/*` — UIコンポーネント
- `public/` — 画像/アイコン

## デザイン(Figma)の進め方

- 低〜中解像度のワイヤーフレーム → UIキット/トークン（カラー、タイポ、スペーシング） → ハイファイ画面の順で進めると、手戻りが少なく綺麗にまとまります。
- 事前に共有いただきたいもの: ロゴ/ブランドカラー、ターゲット、主CTA、参考サイト、文言のトーン。

## 次にやると良いこと

- ルーティング導入（`react-router-dom`）やCMS連携
- 分析（GA4/タグマネ）
- 画像最適化/OGP画像
- フォーム送信のバックエンド or 外部サービス接続

