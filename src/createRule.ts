import { AwsServices } from "./regularRule/awsServices";
import { AwsApi } from "./regularRule/awsApi";
import { RuleFile } from "./regularRule/ruleFile";
import { Rules } from "./regularRule/rules";

const createRule = async () => {
  const awsApi = new AwsApi();
  const awsServices = new AwsServices(awsApi);
  const services = await awsServices.get();
  const rules = new Rules(services);
  const rulefiles = new RuleFile(rules);
  rulefiles.createRegularRuleFile();
};
createRule();
