import * as yaml from "yaml";

jest.mock("fs")
import {Rules} from "../../../src/regularRule/rules";
import {AwsService, prefixAmazon} from "../../../src/regularRule/awsServices";
import {RuleFile} from "../../../src/regularRule/ruleFile";
import {writeFileSync} from "fs";

describe("RuleFile", () => {
    let ruleFile: RuleFile

    beforeEach(() => {
        const awsService = new AwsService("EC2", prefixAmazon);
        const rules = new Rules([awsService])
        ruleFile = new RuleFile(rules)
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    describe("createRegularRuleFile()", () => {
        let expectedYmlObject: Object

        beforeEach(() => {
            expectedYmlObject = {
                version: 1,
                rules: [
                    {
                        expected: "EC2",
                        options: {
                            wordBoundary: true
                        }
                    },
                    {
                        expected: "Amazon EC2",
                        patterns: [
                            "AWS EC2"
                        ],
                        options: {
                            wordBoundary: true
                        }
                    }
                ]
            }
        })

        it("writes yml file with expected format", () => {
            // arrange
            const mockWriteFileSync = writeFileSync as jest.MockedFunction<typeof writeFileSync>
            const doc = new yaml.Document(expectedYmlObject);
            const ymlString = doc.toString();

            // act
            ruleFile.createRegularRuleFile()

            // assert
            expect(mockWriteFileSync).toHaveBeenCalledWith(ruleFile.RegularFilePath, ymlString)
        })

    })
})