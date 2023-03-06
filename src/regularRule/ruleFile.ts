import { AwsService, prefixAWS, prefixAmazon } from "./awsServices";
import * as yaml from "yaml";

type Option = {
  wordBoundary?: true;
};

type RuleParam = {
  expected: string;
  options?: Option;
  patterns?: string[];
};

type RuleStruct = {
  version: 1
  rules: RuleParam[]
}

export class RuleFile {
  readonly rules: Rules;

  constructor(rules: Rules) {
    this.rules = rules;
  }

  getYaml(): string {
    const rules = this.rules.get();
    const ruleObj: RuleStruct = {
      version: 1,
      rules
    }
    const doc = new yaml.Document(ruleObj);
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
      options: { wordBoundary: true },
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
      patterns: [this.escapePattern(wrongPattern)],
      options: { wordBoundary: true },
    };
    return rule;
  }

  // prh本体でpatternの方に-が入った文字列が指定されるとエラーになる
  // https://github.com/prh/prh/issues/34
  // そのため-の入ったpatternの際には//で囲む必要がある
  private escapePattern(pattern: string): string {
    if (!pattern.match(/-/)) return pattern
    return `/${pattern}/`
  }

  private getPettern(): string {
    if (this.service.isPrefixAmazon()) {
      return `${prefixAWS} ${this.service.productName}`;
    }
    return `${prefixAmazon} ${this.service.productName}`;
  }
}
