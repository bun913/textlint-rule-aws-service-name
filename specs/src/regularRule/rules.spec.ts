import {
  RuleUtil,
  WordBundaryRule,
  WrongPrefixRule,
} from "../../../src/regularRule/rules";
import {
  AwsService,
  prefixAmazon,
  prefixAWS,
} from "../../../src/regularRule/awsServices";

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

describe("WrongPrefixRule", () => {
  it("returns expected rule param with pattern for Amazon service", () => {
    const service = new AwsService("S3", prefixAmazon);
    const wrongPrefixRule = new WrongPrefixRule(service).get();

    expect(wrongPrefixRule).toEqual({
      expected: "Amazon S3",
      patterns: [`${prefixAWS} S3`],
      options: { wordBoundary: true },
    });
  });

  it("returns expected rule param with pattern for AWS service", () => {
    const service = new AwsService("Lambda", prefixAWS);
    const wrongPrefixRule = new WrongPrefixRule(service).get();

    expect(wrongPrefixRule).toEqual({
      expected: "AWS Lambda",
      patterns: [`${prefixAmazon} Lambda`],
      options: { wordBoundary: true },
    });
  });

  it("returns expected rule param with escaped pattern for AWS service", () => {
    const service = new AwsService("IoT 1-Click", prefixAWS);
    const wrongPrefixRule = new WrongPrefixRule(service).get();

    expect(wrongPrefixRule).toEqual({
      expected: "AWS IoT 1-Click",
      patterns: [`/${prefixAmazon} IoT 1-Click/`],
      options: { wordBoundary: true },
    });
  });
});
