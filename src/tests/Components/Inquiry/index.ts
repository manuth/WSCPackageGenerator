import { basename } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../../generators/package/WoltLabPackageGenerator";
import { PromptTests } from "./Prompts";
import { WoltLabIdentifierQuestionTests } from "./WoltLabIdentifierQuestion.test";

/**
 * Registers tests for inquiry-components.
 *
 * @param context
 * The test-context.
 */
export function InquiryTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        basename(__dirname),
        () =>
        {
            PromptTests();
            WoltLabIdentifierQuestionTests(context);
        });
}
