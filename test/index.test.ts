import TextLintTester from "textlint-tester";
import * as lint from "../src/index";

const report = lint.default.fixer
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
          message: "SecurityHub => Security Hub", }, ],
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
    }
  ],
});
