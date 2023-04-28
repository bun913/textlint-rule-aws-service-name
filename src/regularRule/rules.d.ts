import { AwsService } from "./awsServices";
type Option = {
    wordBoundary?: true;
};
export type RuleParam = {
    expected: string;
    options?: Option;
    patterns?: string[];
};
export declare class Rules {
    readonly services: AwsService[];
    constructor(services: AwsService[]);
    get(): RuleParam[];
}
export declare class RuleUtil {
    constructor();
    escapePattern(pattern: string): string;
}
export declare class WordBundaryRule {
    readonly service: AwsService;
    constructor(service: AwsService);
    get(): RuleParam;
}
export declare class WrongPrefixRule {
    readonly service: AwsService;
    constructor(service: AwsService);
    get(): RuleParam;
    private getPettern;
}
/**
 * このルールはスペースの不足、またはスペースの過剰による誤りを検出する。
 * - 不足：Security Hub を SecurityHub と書く
 * - 過剰: CloudFront を Cloud Front と書く
 */
export declare class SpacingRule {
    readonly service: AwsService;
    private static readonly pascalCasePattern;
    constructor(service: AwsService);
    getMaybe(): RuleParam | null;
    private noSpacePattern;
    private spaceDelimitedPattern;
}
export {};
