import { AwsServices } from "./regularRule/awsServices";
import { FetchResponse } from "./regularRule/fetchResponse";
import { RuleFile } from "./regularRule/ruleFile";
import { Rules } from "./regularRule/rules";

const createRule = async () => {
  const fetchResponse = new FetchResponse();
  const awsServices = new AwsServices(fetchResponse);
  const services = await awsServices.get();
  const rules = new Rules(services);
  const rulefiles = new RuleFile(rules);
  console.log(rulefiles.createRegularRuleFile());
};
createRule();
