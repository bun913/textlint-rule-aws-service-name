import TextLintTester from "textlint-tester";
import { report } from "../src/index";

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("rule", report, {
    valid: [
        "EC2",
    ]
});
