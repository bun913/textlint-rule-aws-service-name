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
      // CloudFront を Cloud Front などと PascalCase をスペース区切りで書くような誤り防止ルール
      if (service.isIncludeBlank() || service.hasPascalCase()) {
        const blankCheckRule = new SpacingRule(service).get();
        rules.push(blankCheckRule);
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

class SpacingRule {
  readonly service: AwsService;


  private static readonly pascalCasePattern = /([A-Z][a-z]+)([A-Z][a-z]+)/g;

  constructor(service: AwsService) {
    this.service = service;
  }

  public get(): RuleParam {
    const noSpacePattern = this.noSpacePattern();
    const spaceDelimitedPattern = this.spaceDelimitedPattern();

    const patterns: string[] = [];
    if (noSpacePattern) {
      patterns.push(noSpacePattern);
    }
    if (spaceDelimitedPattern) {
      patterns.push(spaceDelimitedPattern);
    }

    const ruleUtil = new RuleUtil();
    const rule: RuleParam = {
      expected: this.service.productName,
      patterns: patterns.map(ruleUtil.escapePattern),
      options: { wordBoundary: true },
    };
    return rule;
  }

  private noSpacePattern(): string | null {
    const arrayServiceName = this.service.productName.split(" ");
    if (arrayServiceName.length === 1) {
      return null;
    }
    const deleteBlankServiceName = arrayServiceName.join("");
    return deleteBlankServiceName;
  }

  private spaceDelimitedPattern(): string | null {
    const spaceDelimitedName = this.service.productName.replace(SpacingRule.pascalCasePattern, "$1 $2");
    if (this.service.productName === spaceDelimitedName) {
      return null;
    }
    return spaceDelimitedName;
  }
}
