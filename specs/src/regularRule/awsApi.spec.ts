import { AwsApi } from "../../../src/regularRule/awsApi";
import { ResoponseBody } from "../../../src/regularRule/types";

describe("AwsApi", () => {
  describe("result()", () => {

    afterEach(() => {
      jest.resetAllMocks();
    });

    describe("can not get aws services data", () => {

      beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
              status: 500,
              json: () => Promise.resolve({message: "Server Error"})
            } as Response )
        );
      });

      it("should throw an error when the request is failed", async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
              status: 500,
              json: () => Promise.resolve({message: "Server Error"})
            })
        );
        const awsApi = new AwsApi();
        await expect(awsApi.result()).rejects.toThrowError("Request Fail: ")
      });

    });


    describe("can get aws services data", () => {

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
        ],
        metadata: {
          count: 1,
          // It has next pages
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

      it("gets first page and second page", async () => {
        const option = {
          "item.directoryId": "aws-products",
          sort_by: "item.additionalFields.productNameLowercase",
          sort_order: "asc",
          size: "1",
          "item.locale": "en_US",
          "tags.id": "aws-products#type#service",
          page: "2",
        };

        const awsApi = new AwsApi(option);
        const items = await awsApi.result();
        expect(items).toHaveLength(2)
      });

    })
  });
});
