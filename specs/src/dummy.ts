import {ResoponseBody} from "../../src/regularRule/types";

export const dummyFetchData: ResoponseBody = {
    items: [
        {
            item: {
                id: "1",
                locale: "en_US",
                directoryId: "aws-products",
                name: "test1",
                author: "author1",
                createdBy: "creator1",
                lastUpdatedBy: "updater1",
                dateCreated: "2022-03-15T05:23:24.208Z",
                dateUpdated: "2022-03-15T05:23:24.208Z",
                additionalFields: {
                    pricingUrl: "https://aws.amazon.com",
                    freeTierAvailability: "unavailable",
                    productSummary: "test1 summary",
                    launchDate: "2022-03-15T05:23:24.208Z",
                    productUrl: "https://aws.amazon.com/test1",
                    productName: "Test Product 1",
                    productNameLowercase: "test product 1",
                    productCategory: "service",
                },
            },
            tags: [],
        },
    ],
    metadata: {
        count: 1,
        // It has next pages
        totalHits: 2,
    },
}
