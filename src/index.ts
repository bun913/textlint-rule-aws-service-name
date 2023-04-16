const fs = require("fs");
const path = require("path");
const prh = require("textlint-rule-prh");
import type { TextlintRuleModule } from "@textlint/types";

export interface Options {
  allows?: string[];
}

const report: TextlintRuleModule<Options> = (context) => {
  const ruleContent = fs.readFileSync(
    path.join(__dirname, "..", "prh.yml"),
    "utf-8"
  );
  return prh.fixer(context, {
    ruleContents: [ruleContent],
  });
};

export default {
  linter: report,
  fixer: report,
};
