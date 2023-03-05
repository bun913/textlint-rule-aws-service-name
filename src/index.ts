const readFileSync = require('fs').readFileSync
import { join } from "path";
import type { TextlintRuleModule } from "@textlint/types";
import * as prh from "textlint-rule-prh";

export interface Options {
  allows?: string[];
}

export const report: TextlintRuleModule<Options> = (context) => {
  const ruleFilePath = join("dict", "aws_service.yml");
  const ruleContent = readFileSync(ruleFilePath, "utf-8");
  return prh.fixer(context, {
    ruleContents: [ruleContent],
  });
};
