# textlint-rule-aws-service-name

重要: **AWS公式のサービスではありません。1ユーザーの活動です。**

Important: **This Project is UnOffical.**

textlint rule for AWS product Names.

AWSのサービス名やプロダクト名の表記揺れをチェックするためのtexlintのルールです。

以下のように表記揺れを検出します。（画像はVSCodeの拡張機能を利用）

![lintImage](https://user-images.githubusercontent.com/73948280/223648022-c5f1b015-3c1c-4456-8792-3f2c03c9bd67.png)

このプロジェクトは以下のリポジトリの影響をモロに受けています。

2019年という早い段階から仕組みづくりをされている　@37108氏に強いリスペクトを表明いたします！

https://github.com/37108/textlint-rule-aws-spellcheck

## できること・できないこと

### できること

- 大文字・小文字の表記揺れの検出
    - `Ec2` -> `EC2`
- 本来スペースが必要なサービスにスペースがないことを検出
    - `SecurityHub` -> `Security Hub`
- 本来スペースが不要なサービスにスペースがあることを検出
    - `Cloud Front` -> `CloudFront`
- `Amazon` と `AWS` の接頭辞の間違い検出
    - `AWS EC2` -> `Amazon EC2`
    - `Amazon Security Hub` -> `AWS Security Hub`

## 開発者・コントリビュータの皆様へ

こちらのファイルをご参照ください。

[CONTRIBUTING.md](https://github.com/bun913/textlint-rule-aws-service-name/blob/main/CONTRIBUTING.md)

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-aws-service-name

## Usage

### textlintrcを利用する場合

Installの後に`.textlintrc.json`に以下のように記述します。

```json
{
    "rules": {
        "aws-service-name": true
    }
}
```

.textlinrc.ymlのようにyml（yaml）の場合は以下のように記載します。

```yml
rules:
  aws-service-name: true
```

### CLIで使う場合

Installの後に以下のようにCLIでも実行できます。

```
textlint --rule aws-service-name README.md
```

### VSCodeで利用する場合

textlintrcを設定の上、以下記事を参考に[拡張機能](https://marketplace.visualstudio.com/items?itemName=taichi.vscode-textlint)を導入してください。

https://qiita.com/takasp/items/22f7f72b691fda30aea2

### 注意事項

以下textlint公式のGitHubにも記載がありますが、textlintのインストール場所とルールのインストール場所が異なる場合はエラーがでます。

https://github.com/textlint/textlint/blob/master/docs/faq/failed-to-load-textlints-module.md

```bash
# NG
npm i -g textlint
npm i textlint-rule-aws-service-name --save-dev
```

```bash
# OK
npm i -g textlint
npm i -g textlint-rule-aws-service-name
```
### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    yarn build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    yarn test

## License

MIT © bun913
