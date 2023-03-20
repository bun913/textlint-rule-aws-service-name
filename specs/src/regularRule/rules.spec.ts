import { RuleUtil } from "../../../src/regularRule/rules";

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
