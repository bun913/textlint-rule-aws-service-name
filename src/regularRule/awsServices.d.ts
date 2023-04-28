import { FetchResponse } from "./fetchResponse";
export declare const prefixAmazon = "Amazon";
export declare const prefixAWS = "AWS";
export declare const prefixNone = "";
type ProductPrefix = typeof prefixNone | typeof prefixAmazon | typeof prefixAWS;
export interface AwsServiceParam {
    productName: string;
    prefix: ProductPrefix;
}
export declare class AwsServices {
    readonly fetchResponse: FetchResponse;
    constructor(fetchResponse: FetchResponse);
    get(): Promise<AwsService[]>;
}
export declare class AwsService implements AwsServiceParam {
    readonly productName: string;
    readonly prefix: ProductPrefix;
    constructor(productName: string, prefix: ProductPrefix);
    static getPrefix(product: string): ProductPrefix;
    get(): AwsService;
    getParam(): AwsServiceParam;
    isPrefixNone(): boolean;
    isPrefixAWS(): boolean;
    isPrefixAmazon(): boolean;
    isIncludeBlank(): boolean;
    hasPascalCase(): boolean;
    getFullProductName(): string;
    private getPrefixRemovedService;
    private getParenthesesRemovedService;
}
export {};
