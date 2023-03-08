import * as yaml from "yaml";
import { join } from "path";
import { RuleParam, Rules } from "./rules";
const writeFileSync = require("fs").writeFileSync;

type RuleStruct = {
  version: 1;
  rules: RuleParam[];
};

export class RuleFile {
  readonly rules: Rules;
  readonly RegularFilePath = join("dict", "auto-create-regular-rules.yml");

  constructor(rules: Rules) {
    this.rules = rules;
  }

  createRegularRuleFile(): string {
    const rules = this.rules.get();
    const ruleObj: RuleStruct = {
      version: 1,
      rules,
    };
    const doc = new yaml.Document(ruleObj);
    const ymlString = doc.toString();
    writeFileSync(this.RegularFilePath, ymlString);
    return this.RegularFilePath;
  }
}
