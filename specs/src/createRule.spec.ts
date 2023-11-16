import * as yaml from "yaml";

jest.mock("fs")

import {createRule} from "../../src/createRule";
import {dummyFetchData} from "./dummy";
import {writeFileSync} from "fs";
import {join} from "path";

describe("createRule()", () => {
    let expectedYmlObject: Object

    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(dummyFetchData),
            } as Response)
        );

        expectedYmlObject = {
            version: 1,
            rules: [
                {
                    expected: "Test Product 1",
                    options: {
                        wordBoundary: true
                    }
                },
                {
                    expected: "Test Product 1",
                    patterns: [
                        "TestProduct1"
                    ],
                    options: {
                        wordBoundary: true
                    }
                },
                {
                    expected: "Test Product 1",
                    options: {
                        wordBoundary: true
                    }
                },
                {
                    expected: "Test Product 1",
                    patterns: [
                        "TestProduct1"
                    ],
                    options: {
                        wordBoundary: true
                    }
                }
            ]
        }
    })

    it("calls createRegularFile()", async () => {
        // arrange
        const doc = new yaml.Document(expectedYmlObject);
        const ymlString = doc.toString();
        const mockWriteFileSync = writeFileSync as jest.MockedFunction<typeof writeFileSync>


        // act
        await createRule()

        // assert
        expect(mockWriteFileSync).toHaveBeenCalledWith(join("dict", "auto-create-regular-rules.yml"), ymlString)
    })


    afterEach(() => {
        jest.resetAllMocks()
    })

})
