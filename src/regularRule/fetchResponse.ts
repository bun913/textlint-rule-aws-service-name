import { URLSearchParams } from "url";
import { Item, ResoponseBody } from "./types";

interface OptionParam {
  "item.directoryId": string;
  sort_by: string;
  sort_order: string;
  size: string;
  "item.locale"?: string;
  "tags.id": string;
  page: string;
}

export class FetchResponse {
  BASE_URL = "https://aws.amazon.com/api/dirs/items/search";
  readonly option: OptionParam;

  constructor(option?: OptionParam) {
    if (option) this.option = option;
    else this.option = this.getDefaultOption();
  }

  public async result(): Promise<Item[]> {
    let items: Item[] = [];
    let page = 0;
    let totalCount = 0;
    // 全ページのデータを取り終えるまで続ける
    while (true) {
      const data = await this.fetch(page);
      totalCount += data.metadata.count;
      data.items.forEach((elm) => {
        items.push(elm.item);
      });
      if (totalCount >= data.metadata.totalHits) break;
      page += 1;
    }
    return items;
  }

  private getDefaultOption(): OptionParam {
    const defaultOption: OptionParam = {
      "item.directoryId": "aws-products",
      sort_by: "item.additionalFields.productNameLowercase",
      sort_order: "asc",
      size: "100",
      "item.locale": "en_US",
      "tags.id": "aws-products#type#service",
      page: "1",
    };
    return defaultOption;
  }

  private async fetch(page: number): Promise<ResoponseBody> {
    const option = { ...this.option };
    const pageChangedOption = { ...option, page: page.toString() };
    const query = new URLSearchParams({ ...pageChangedOption });
    query.append("tags.id", "!aws-products#type#variant");
    const requestUrl = `${this.BASE_URL}?${query}`;
    const res = await fetch(requestUrl);
    if (!res.ok) throw new Error(`Request Fail: ${requestUrl}`);
    const data: ResoponseBody = await res.json();
    return data;
  }
}
