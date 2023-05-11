import {
  PatternEscaper,
  WordBundaryRule,
  WrongPrefixRule,
  SpacingRule,
  // RuleParam
} from "../../../src/regularRule/rules";
import {
  AwsService,
  prefixAmazon,
  prefixAWS,
} from "../../../src/regularRule/awsServices";

describe("PatternEscaper", () => {
  it("escapePattern() return /pattern/ if including -", () => {
    const patternEscaper = new PatternEscaper("Sample-Service");
    expect(patternEscaper.escapePattern()).toBe("/Sample-Service/");
  });
  it("escapePattern() return pattern if not including -", () => {
    const patternEscaper = new PatternEscaper("Sample Service");
    expect(patternEscaper.escapePattern()).toBe("Sample Service");
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

describe("SpacingRule", () => {
  describe("getMaybe", () => {
    it("should return null if there is no pattern", () => {
      const service = new AwsService("Product", prefixAmazon);
      const spacingRule = new SpacingRule(service);
      expect(spacingRule.getMaybe()).toBeNull();
    });
    // write test with noSpacePattern like CloudFront
    it("should return execessive space rule if there has pascalCasePattern", () => {
      const service = new AwsService("CloudFront", prefixAmazon);
      const spacingRule = new SpacingRule(service);
      const result = spacingRule.getMaybe();
      expect(result).toEqual({
        expected: "CloudFront",
        patterns: ["Cloud Front"],
        options: { wordBoundary: true },
      });
    });
    // write test with includeSpacePattern like Amazon Elastic Compute Cloud
    it("should return missing space rule if there has includeSpacePattern", () => {
      const service = new AwsService("Elastic Compute Cloud", prefixAmazon);
      const spacingRule = new SpacingRule(service);
      const result = spacingRule.getMaybe();
      expect(result).toEqual({
        expected: "Elastic Compute Cloud",
        patterns: ["ElasticComputeCloud"],
        options: { wordBoundary: true },
      });
    });
  });
});