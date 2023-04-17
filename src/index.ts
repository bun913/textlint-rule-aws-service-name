const fs = require("fs");
const path = require("path");
const prh = require("textlint-rule-prh");
import type { TextlintRuleModule } from "@textlint/types";

export interface Options {
  allows?: string[];
}

const report: TextlintRuleModule<Options> = (context) => {
  const autoCreatedRule = fs.readFileSync(
    path.join(__dirname, "..", "dict", "auto-create-regular-rules.yml"),
    "utf-8"
  );
  const manualCreatedRule = fs.readFileSync(
    path.join(__dirname, "..", "dict", "manual-added-rules.yml"),
    "utf-8"
  );
  return prh.fixer(context, {
    ruleContents: [autoCreatedRule, manualCreatedRule],
  });
};

export default {
  linter: report,
  fixer: report,
};
