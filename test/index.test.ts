import TextLintTester from "textlint-tester";
import * as lint from "../src/index";

const report = lint.default.fixer;
const tester = new TextLintTester();
tester.run("EC2", report, {
  valid: ["EC2", "Amazon EC2"],
  invalid: [
    {
      text: "ec2",
      errors: [
        {
          message: "ec2 => EC2",
        },
      ],
      description: "Not Allowed invalid LowerCase",
    },
    {
      text: "Ec2",
      errors: [
        {
          message: "Ec2 => EC2",
        },
      ],
    },
    {
      text: "AWS EC2",
      errors: [
        {
          message: "AWS EC2 => Amazon EC2",
        },
      ],
      description: "Not Allowed wrong Prefix",
    },
  ],
});

tester.run("Security Hub", report, {
  valid: ["Security Hub", "AWS Security Hub"],
  invalid: [
    {
      text: "Amazon Security Hub",
      errors: [
        {
          message: "Amazon Security Hub => AWS Security Hub",
        },
      ],
      description: "Not Allowed wrong Prefix",
    },
    {
      text: "SecurityHub",
      errors: [
        {
          message: "SecurityHub => Security Hub",
        },
      ],
      description: "Not Allowed delete blank",
    },
  ],
});

tester.run("CloudFront", report, {
  valid: ["Amazon CloudFront", "CloudFront"],
  invalid: [
    {
      text: "Amazon Cloud Front",
      errors: [
        {
          message: "Cloud Front => CloudFront",
        },
      ],
    },
    {
      text: "Cloud Front",
      errors: [
        {
          message: "Cloud Front => CloudFront",
        },
      ],
    },
  ],
});

tester.run("Glue DataBrew", report, {
  valid: ["Glue DataBrew"],
  invalid: [
    {
      text: "Glue databrew",
      errors: [
        {
          message: "Glue databrew => Glue DataBrew",
        },
      ],
    },
  ],
});

tester.run("Bedrock", report, {
  valid: ["Amazon Bedrock"],
  invalid: [
    {
      text: "AWS Bedrock",
      errors: [
        {
          message: "AWS Bedrock => Amazon Bedrock",
        },
      ],
    },
  ],
});

tester.run("CodeWhisperer", report, {
  valid: ["Amazon CodeWhisperer"],
  invalid: [
    {
      text: "AWS CodeWhisperer",
      errors: [
        {
          message: "AWS CodeWhisperer => Amazon CodeWhisperer",
        },
      ],
    },
    {
      text: "Code Whisperer",
      errors: [
        {
          message: "Code Whisperer => CodeWhisperer",
        },
      ],
    },
  ],
});

tester.run("Dash Cart", report, {
  valid: ["Amazon Dash Cart", "Dash Cart"],
  invalid: [
    {
      text: "AWS Dash Cart",
      errors: [
        {
          message: "AWS Dash Cart => Amazon Dash Cart",
        },
      ],
    },
    {
      text: "DashCart",
      errors: [
        {
          message: "DashCart => Dash Cart",
        },
      ],
    },
  ],
});

tester.run("EC2 Image Builder", report, {
  valid: ["EC2 Image Builder"],
  invalid: [
    {
      text: "EC2 ImageBuilder",
      errors: [
        {
          message: "EC2 ImageBuilder => EC2 Image Builder",
        },
      ],
    },
  ],
});

tester.run("Amazon Q", report, {
  valid: ["Amazon Q"],
  invalid: [
    {
      text: "AWS Q",
      errors: [
        {
          message: "AWS Q => Amazon Q",
        },
      ],
    },
  ],
});

tester.run("App Fabric is wrong", report, {
  valid: ["AppFabric"],
  invalid: [
    {
      text: "App Fabric",
      errors: [
        {
          message: "App Fabric => AppFabric",
        },
      ],
    },
  ],
});
tester.run("Redshit is wrong", report, {
  valid: ["Redshift"],
  invalid: [
    {
      text: "Redshit",
      errors: [
        {
          message: "Redshit => Redshift",
        },
      ],
    },
    {
      text: "RedShit",
      errors: [
        {
          message: "RedShit => Redshift",
        },
      ],
    },
  ],
});
tester.run("Fault Injection Simulator is now Fault Injection Service", report, {
  valid: ["Fault Injection Service"],
  invalid: [
    {
      text: "Fault Injection Simulator",
      errors: [
        {
          message: "Fault Injection Simulator => Fault Injection Service",
        },
      ],
    },
    {
      text: "FaultInjection Simulator",
      errors: [
        {
          message: "FaultInjection Simulator => Fault Injection Service",
        },
      ],
    },
    {
      text: "FaultInjection Simulator",
      errors: [
        {
          message: "FaultInjection Simulator => Fault Injection Service",
        },
      ],
    },
  ],
});

tester.run("AWS Deadline Cloud", report, {
  valid: ["AWS Deadline Cloud, Deadline Cloud"],
  invalid: [
    {
      text: "Amazon Deadline Cloud",
      errors: [
        {
          message: "Amazon Deadline Cloud => AWS Deadline Cloud",
        },
      ],
    },
    {
      text: "DeadlineCloud",
      errors: [
        {
          message: "DeadlineCloud => Deadline Cloud",
        },
      ],
    },
  ],
});

tester.run("AWS Nova", report, {
  valid: ["Amazon Nova"],
  invalid: [
    {
      text: "AWS Nova",
      errors: [
        {
          message: "AWS Nova => Amazon Nova",
        },
      ],
    },
  ],
});
