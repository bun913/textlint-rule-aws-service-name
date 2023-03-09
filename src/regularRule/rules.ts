import { AwsService, prefixAWS, prefixAmazon } from "./awsServices";

type Option = {
  wordBoundary?: true;
};

export type RuleParam = {
  expected: string;
  options?: Option;
  patterns?: string[];
};

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
      // Amazon AWSの接頭辞誤り防止ルール
      if (!service.isPrefixNone()) {
        const wrongPrefixRule = new WrongPrefixRule(service).get();
        rules.push(wrongPrefixRule);
      }
      // Security HubをSecurityHubと書くような誤り防止ルール
      if (service.isIncludeBlank()) {
        const blankCheckRule = new BlankCheckRule(service).get();
        rules.push(blankCheckRule);
      }
      // CloudFront を Cloud Front などと PascalCase をスペース区切りで書くような誤り防止ルール
      if (service.hasPascalCase()) {
        const spaceDelimiterRule = new SpaceDelimiterRule(service).get();
        rules.push(spaceDelimiterRule);
      }
    });
    return rules;
  }
}

export class RuleUtil {
  constructor() {
  }
  // prh本体でpatternの方に-が入った文字列が指定されるとエラーになる
  // https://github.com/prh/prh/issues/34
  // そのため-の入ったpatternの際には//で囲む必要がある
  public escapePattern(pattern: string): string {
    if (!pattern.match(/-/)) return pattern;
    return `/${pattern}/`;
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
    const ruleUtil = new RuleUtil();
    const rule: RuleParam = {
      expected: this.service.getFullProductName(),
      patterns: [ruleUtil.escapePattern(wrongPattern)],
      options: { wordBoundary: true },
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

class BlankCheckRule {
  readonly service: AwsService;

  constructor(service: AwsService) {
    this.service = service;
  }

  public get(): RuleParam {
    const wrongPattern = this.getPettern();
    const ruleUtil = new RuleUtil();
    const rule: RuleParam = {
      expected: this.service.productName,
      patterns: [ruleUtil.escapePattern(wrongPattern)],
      options: { wordBoundary: true },
    };
    return rule;
  }

  private getPettern(): string {
    const arryaServiceName = this.service.productName.split(" ");
    const deleteBlankServiceName = arryaServiceName.join("");
    return deleteBlankServiceName;
  }
}

class SpaceDelimiterRule {
  readonly service: AwsService;

  static readonly pascalCasePattern = /([A-Z][a-z]+)([A-Z][a-z]+)/g;

  constructor(service: AwsService) {
    this.service = service;
  }

  public get(): RuleParam {
    const wrongPattern = this.getPattern();
    const ruleUtil = new RuleUtil();
    const rule: RuleParam = {
      expected: this.service.productName,
      patterns: [ruleUtil.escapePattern(wrongPattern)],
      options: { wordBoundary: true },
    };
    return rule;
  }

  private getPattern(): string {
    const spaceDelimitedName = this.service.productName.replace(SpaceDelimiterRule.pascalCasePattern, "$1 $2");
    return spaceDelimitedName;
  }
}
