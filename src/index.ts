const readFileSync = require("fs").readFileSync;
import { join } from "path";
import type { TextlintRuleModule } from "@textlint/types";
import * as prh from "textlint-rule-prh";
import { AwsServices } from "./regularRule/awsServices";
import { FetchResponse } from "./regularRule/fetchResponse";
import { Rules } from "./regularRule/ruleFile";

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

const hey = async () => {
  const fetchResponse = new FetchResponse();
  const awsServices = new AwsServices(fetchResponse);
  const services = await awsServices.get();
  const rules = new Rules(services);
  console.log(JSON.stringify(rules.get()));
};
hey();
