const readFileSync = require("fs").readFileSync;
const prh = require("textlint-rule-prh");
import type { TextlintRuleModule } from "@textlint/types";

export interface Options {
  allows?: string[];
}

export const report: TextlintRuleModule<Options> = (context) => {
  const ruleFilePath = "prh.yml";
  const ruleContent = readFileSync(ruleFilePath, "utf-8");
  return prh.fixer(context, {
    ruleContents: [ruleContent],
  });
};
