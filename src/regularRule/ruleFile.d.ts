import { Rules } from "./rules";
export declare class RuleFile {
    readonly rules: Rules;
    readonly RegularFilePath: string;
    constructor(rules: Rules);
    createRegularRuleFile(): string;
}
