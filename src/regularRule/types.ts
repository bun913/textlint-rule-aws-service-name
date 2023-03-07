export type Item = {
  id: string;
  locale: string;
  directoryId: string;
  name: string;
  author: string;
  createdBy: string;
  lastUpdatedBy: string;
  dateCreated: string;
  dateUpdated: string;
  additionalFields: {
    pricingUrl: string;
    freeTierAvailability: string;
    productSummary: string;
    launchDate: string;
    productUrl: string;
    productName: string;
    productNameLowercase: string;
    productCategory: string;
  };
};

type ResponseItem = {
    item: Item
    tags: any[]
}

export type ResoponseBody = {
  items: ResponseItem[]
  metadata: {
    count: number
    totalHits: number
  }
};
