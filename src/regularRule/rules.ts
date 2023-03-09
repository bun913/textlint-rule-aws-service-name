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
      const maybeSpacingRule = new SpacingRule(service).getMaybe();
      if (maybeSpacingRule) {
        rules.push(maybeSpacingRule);
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

/**
 * このルールはスペースの不足、またはスペースの過剰による誤りを検出する。
 * - 不足：Security Hub を SecurityHub と書く
 * - 過剰: CloudFront を Cloud Front と書く
 */
class SpacingRule {
  readonly service: AwsService;

  private static readonly pascalCasePattern = /([A-Z][a-z]+)([A-Z][a-z]+)/g;

  constructor(service: AwsService) {
    this.service = service;
  }

  public getMaybe(): RuleParam | null {
    const patterns: string[] = [];
    if (this.service.isIncludeBlank()) {
      patterns.push(this.noSpacePattern());
    }
    if (this.service.hasPascalCase()) {
      patterns.push(this.spaceDelimitedPattern());
    }
    if (patterns.length === 0) {
      return null;
    }

    const ruleUtil = new RuleUtil();
    const rule: RuleParam = {
      expected: this.service.productName,
      patterns: patterns.map(ruleUtil.escapePattern),
      options: { wordBoundary: true },
    };
    return rule;
  }

  private noSpacePattern(): string {
    const arrayServiceName = this.service.productName.split(" ");
    const deleteBlankServiceName = arrayServiceName.join("");
    return deleteBlankServiceName;
  }

  private spaceDelimitedPattern(): string {
    return this.service.productName.replace(SpacingRule.pascalCasePattern, "$1 $2");
  }
}
