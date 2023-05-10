import {
  AwsService,
  prefixAmazon,
  prefixAWS,
  prefixNone,
} from "../../../src/regularRule/awsServices";

describe("AwsService", () => {
  describe("getPrefix", () => {
    it(`should return prefixNone when the product name doesn't start with Amazon or AWS`, () => {
      const productName = "EC2";
      const prefix = AwsService.getPrefix(productName);
      expect(prefix).toBe(prefixNone);
    });

    it(`should return prefixAmazon when the product name starts with Amazon`, () => {
      const productName = "Amazon Chime SDK";
      const prefix = AwsService.getPrefix(productName);
      expect(prefix).toBe(prefixAmazon);
    });

    it(`should return prefixAWS when the product name starts with AWS`, () => {
      const productName = "AWS App Mesh";
      const prefix = AwsService.getPrefix(productName);
      expect(prefix).toBe(prefixAWS);
    });
  });

  describe("getParam", () => {
    it("should return an object with productName and prefix", () => {
      const awsService = new AwsService("product name", prefixNone);
      const awsServiceParam = awsService.getParam();
      expect(awsServiceParam).toEqual({
        productName: "product name",
        prefix: prefixNone,
      });
    });
  });

  describe("isPrefixNone", () => {
    it("should return true when prefix is prefixNone", () => {
      const awsService = new AwsService("product name", prefixNone);
      const isPrefixNone = awsService.isPrefixNone();
      expect(isPrefixNone).toBe(true);
    });

    it("should return false when prefix is not prefixNone", () => {
      const awsService = new AwsService("Amazon Chime SDK", prefixAmazon);
      const isPrefixNone = awsService.isPrefixNone();
      expect(isPrefixNone).toBe(false);
    });
  });

  describe("isPrefixNone", () => {
    test("should return true when prefix is none", () => {
      const service = new AwsService("service", prefixNone);
      expect(service.isPrefixNone()).toBe(true);
    });

    test("should return false when prefix is AWS", () => {
      const service = new AwsService("AWS service", prefixAWS);
      expect(service.isPrefixNone()).toBe(false);
    });

    test("should return false when prefix is Amazon", () => {
      const service = new AwsService("Amazon service", prefixAmazon);
      expect(service.isPrefixNone()).toBe(false);
    });
  });

  describe("isPrefixAWS", () => {
    test("should return true when prefix is AWS", () => {
      const service = new AwsService("AWS service", prefixAWS);
      expect(service.isPrefixAWS()).toBe(true);
    });

    test("should return false when prefix is none", () => {
      const service = new AwsService("service", prefixNone);
      expect(service.isPrefixAWS()).toBe(false);
    });

    test("should return false when prefix is Amazon", () => {
      const service = new AwsService("Amazon service", prefixAmazon);
      expect(service.isPrefixAWS()).toBe(false);
    });
  });

  describe("hasPascalCase()", () => {
    test("hasPascalCase() should return true if the product name contains pascal case words", () => {
      const awsService = new AwsService("Amazon CloudFront", prefixAmazon);
      expect(awsService.hasPascalCase()).toBe(true);
    });

    test("hasPascalCase() should return false if the product name does not contain pascal case words", () => {
      const awsService = new AwsService("Amazon S3", prefixAmazon);
      expect(awsService.hasPascalCase()).toBe(false);
    });
  });

  describe("getFullProductName()", () => {
    test("getFullProductName() should return the full product name with prefix if it exists", () => {
      const awsService = new AwsService("Elastic Block Store", prefixAWS);
      expect(awsService.getFullProductName()).toBe("AWS Elastic Block Store");
    });

    test("getFullProductName() should return the product name without prefix if the prefix is not specified", () => {
      const awsService = new AwsService("EC2", prefixNone);
      expect(awsService.getFullProductName()).toBe("EC2");
    });
  });

  describe("hasIntermediateBlank()", () => {
    test("hasIntermediateBlank() should return true if the product name contains any blank spaces", () => {
      const awsService = new AwsService(
        "Amazon Elastic Compute Cloud",
        prefixAmazon
      );
      expect(awsService.hasIntermediateBlank()).toBe(true);
    });

    test("hasIntermediateBlank() should return false if the product name does not contain any blank spaces", () => {
      const awsService = new AwsService("AmazonS3", prefixAmazon);
      expect(awsService.hasIntermediateBlank()).toBe(false);
    });
  });
});
