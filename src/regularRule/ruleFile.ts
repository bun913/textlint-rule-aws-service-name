import { AwsService } from "./awsServices";

type Option = {
  wordBoundary?: true;
};

type RuleParam = {
  expected: string;
  options?: Option[];
  patterns?: string[];
};

// class RuleFile {
//   readonly services: AwsService[];

//   constructor(services: AwsService[]) {
//     this.services = services;
//   }
// }

export class Rules {
  readonly services: AwsService[];

  constructor(services: AwsService[]) {
    this.services = services;
  }

  public get(): RuleParam[] {
    // TODO: もう一つprefixを間違えないようなルールを追加する
    // 関数を2つに分けてルールを2つ返す
    const rules: RuleParam[] = this.services.map((service) => {
      const rule: RuleParam = {
        expected: service.productName,
        options: [{wordBoundary: true}]
      };
      return rule;
    });
    return rules;
  }
}
