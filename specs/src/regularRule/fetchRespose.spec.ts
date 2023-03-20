import { FetchResponse } from "../../../src/regularRule/fetchResponse";
import { ResoponseBody } from "../../../src/regularRule/types";

describe("FetchResponse", () => {
  describe("result()", () => {
    const mockData: ResoponseBody = {
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
        {
          item: {
            id: "2",
            locale: "en_US",
            directoryId: "aws-products",
            name: "test2",
            author: "author2",
            createdBy: "creator2",
            lastUpdatedBy: "updater2",
            dateCreated: "2022-03-15T05:23:24.208Z",
            dateUpdated: "2022-03-15T05:23:24.208Z",
            additionalFields: {
              pricingUrl: "https://aws.amazon.com",
              freeTierAvailability: "unavailable",
              productSummary: "test2 summary",
              launchDate: "2022-03-15T05:23:24.208Z",
              productUrl: "https://aws.amazon.com/test2",
              productName: "Test Product 2",
              productNameLowercase: "test product 2",
              productCategory: "service",
            },
          },
          tags: [],
        },
      ],
      metadata: {
        count: 2,
        totalHits: 2,
      },
    };

    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        } as Response)
      );
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return an array of items", async () => {
      const fetchResponse = new FetchResponse();
      const items = await fetchResponse.result();
      expect(items).toEqual(mockData.items.map((i) => i.item));
    });

    it("should throw an error when the request is failed", async () => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.reject(new Error("Request Fail"))
      );
      const fetchResponse = new FetchResponse();
      await expect(fetchResponse.result()).rejects.toThrow("Request Fail");
    });
  });
});
