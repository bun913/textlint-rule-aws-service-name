import { RuleUtil, WordBundaryRule } from "../../../src/regularRule/rules";
import { AwsService, prefixAmazon } from "../../../src/regularRule/awsServices";

describe("RuleUtil", () => {
  it("escapePattern() return /pattern/ if including -", () => {
    const ruleUtil = new RuleUtil();
    expect(ruleUtil.escapePattern("Sample-Service")).toBe("/Sample-Service/");
  });
  it("escapePattern() return pattern if not including -", () => {
    const ruleUtil = new RuleUtil();
    expect(ruleUtil.escapePattern("Sample Service")).toBe("Sample Service");
  });
});

describe("WordBundaryRule", () => {
  it("get() return rule", () => {
    const awsService = new AwsService("EC2", prefixAmazon);
    const rule = new WordBundaryRule(awsService);
    const result = rule.get();
    expect(result.expected).toBe("EC2");
    expect(result?.options?.wordBoundary).toBe(true);
  });
});
