type AwsService = {
  productName: string;
  productNameLowercase: string;
};

export class AwsServices {
  BASE_URL = "https://aws.amazon.com/api/dirs/items/search";
  readonly option: OptionParam;

  constructor(option?: OptionParam) {
    if (option) this.option = option;
    else this.option = FetchOption.createDefault();
  }

  // TODO: ここにGET処理を記載する
  public fetch() {}
}

type OptionParam = {
  "item.directoryId": string;
  sort_by: string;
  sort_order: string;
  size: number;
  "item.locale"?: string;
  "tags.id": string;
  page: number;
};

class FetchOption {
  public static createDefault(): OptionParam {
    const defaultOption: OptionParam = {
      "item.directoryId": "aws-products",
      sort_by: "item.additionalFields.productNameLowercase",
      sort_order: "asc",
      size: 100,
      "item.locale": "ja_JP",
      "tags.id": "aws-products#type#service",
      page: 1,
    };
    return defaultOption;
  }
}
