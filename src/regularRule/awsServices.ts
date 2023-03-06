import { FetchResponse } from "./fetchResponse";

const prefixAmazon = "Amazon ";
const prefixAWS = "AWS ";

type ProductPrefix = "" | typeof prefixAmazon | typeof prefixAWS;

export interface AwsServiceParam {
  productName: string;
  prefix: ProductPrefix;
}

export class AwsServices {
  readonly fetchResponse: FetchResponse;

  constructor(fetchResponse: FetchResponse) {
    this.fetchResponse = fetchResponse;
  }

  public async get(): Promise<AwsService[]> {
    const items = await this.fetchResponse.result();
    const awsServices: AwsService[] = items.map((item) => {
      const productName = item.additionalFields.productName;
      const prefix = AwsService.getPrefix(productName);
      const awsService = new AwsService(productName, prefix);
      return awsService.get();
    });
    return awsServices;
  }
}

export class AwsService implements AwsServiceParam {
  readonly productName: string;
  readonly prefix: ProductPrefix;

  constructor(productName: string, prefix: ProductPrefix) {
    this.productName = productName;
    this.prefix = prefix;
  }

  public static getPrefix(product: string): ProductPrefix {
    if (product.startsWith(prefixAmazon)) return prefixAmazon;
    if (product.startsWith(prefixAWS)) return prefixAWS;
    return "";
  }

  public get(): AwsService{
    const removePrefix = this.getPrefixRemovedService();
    const removeParentheses = removePrefix.getParenthesesRemovedService();
    return new AwsService(
      removeParentheses.productName,
      removeParentheses.prefix
    );
  }

  public getParam(): AwsServiceParam {
    return {
      productName: this.productName,
      prefix: this.prefix,
    };
  }

  private getPrefixRemovedService(): AwsService{
    if (this.prefix === "") {
      return new AwsService(this.productName, this.prefix);
    }
    const removedProductName = this.productName.replace(this.prefix, "");
    return new AwsService(removedProductName, this.prefix);
  }

  // remove parentheses like Supply Chain (Preview) => Supply Chain
  private getParenthesesRemovedService(): AwsService{
    const regex = / \(.*\)$/;
    const removedProductName = this.productName.replace(regex, "");
    return new AwsService(removedProductName, this.prefix);
  }
}
