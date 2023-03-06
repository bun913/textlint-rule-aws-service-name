import { AwsService, prefixAWS, prefixAmazon } from "./awsServices";
import * as yaml from "yaml";

type Option = {
  wordBoundary?: true;
};

type RuleParam = {
  expected: string;
  options?: Option[];
  patterns?: string[];
};

export class RuleFile {
  readonly rules: Rules;

  constructor(rules: Rules) {
    this.rules = rules;
  }

  getYaml(): string {
    const ruleJsonObj = this.rules.get();
    const doc = new yaml.Document(ruleJsonObj);
    // TODO: あとは適当にymlファイルを生成するのみ
    return doc.toString();
  }
}

export class Rules {
  readonly services: AwsService[];

  constructor(services: AwsService[]) {
    this.services = services;
  }

  public get(): RuleParam[] {
    const rules: RuleParam[] = [];
    this.services.forEach((service) => {
      const wordBoundaryRule = new WordBundaryRule(service).get();
      rules.push(wordBoundaryRule);
      if (!service.isPrefixNone()) {
        const wrongPrefixRule = new WrongPrefixRule(service).get();
        rules.push(wrongPrefixRule);
      }
    });
    return rules;
  }
}

class WordBundaryRule {
  readonly service: AwsService;

  constructor(service: AwsService) {
    this.service = service;
  }
  public get(): RuleParam {
    const rule: RuleParam = {
      expected: this.service.productName,
      options: [{ wordBoundary: true }],
    };
    return rule;
  }
}

class WrongPrefixRule {
  readonly service: AwsService;

  constructor(service: AwsService) {
    this.service = service;
  }

  public get(): RuleParam {
    const wrongPattern = this.getPettern();
    const rule: RuleParam = {
      expected: this.service.getFullProductName(),
      patterns: [wrongPattern],
      options: [{ wordBoundary: true }],
    };
    return rule;
  }

  private getPettern(): string {
    if (this.service.isPrefixAmazon()) {
      return `${prefixAWS} ${this.service.productName}`;
    }
    return `${prefixAmazon} ${this.service.productName}`;
  }
}
