import { AwsApi } from "../../../src/regularRule/awsApi";
import {dummyFetchData} from "../dummy";

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
        const awsApi = new AwsApi();
        await expect(awsApi.result()).rejects.toThrowError("Request Fail: ")
      });

    });


    describe("can get aws services data", () => {

      const mockData = dummyFetchData

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
