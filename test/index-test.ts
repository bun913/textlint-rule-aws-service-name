import TextLintTester from "textlint-tester";
import { report } from "../src/index";

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("EC2", report, {
    valid: [
        "EC2",
        "Amazon EC2"
    ],
    invalid: [
        {
            text: 'ec2',
            errors: [
                {
                    message: 'ec2 => EC2'
                }
            ],
            description: 'Not Allowed invalid LowerCase'
        },
        {
            text: 'Ec2',
            errors: [
                {
                    message: 'Ec2 => EC2'
                }
            ],
        },
        {
            text: 'AWS EC2',
            errors: [
                {
                    message: 'AWS EC2 => Amazon EC2'
                }
            ],
            description: 'Not Allowed wrong Prefix'
        }
    ]
});
