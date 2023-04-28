import { Item } from "./types";
interface OptionParam {
    "item.directoryId": string;
    sort_by: string;
    sort_order: string;
    size: string;
    "item.locale"?: string;
    "tags.id": string;
    page: string;
}
export declare class FetchResponse {
    BASE_URL: string;
    readonly option: OptionParam;
    constructor(option?: OptionParam);
    result(): Promise<Item[]>;
    private getDefaultOption;
    private fetch;
}
export {};
