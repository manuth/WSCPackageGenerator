import { basename } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../../generators/package/WoltLabPackageGenerator.js";
import { PromptTests } from "./Prompts/index.test.js";
import { WoltLabIdentifierQuestionTests } from "./WoltLabIdentifierQuestion.test.js";

/**
 * Registers tests for inquiry-components.
 *
 * @param context
 * The test-context.
 */
export function InquiryTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            PromptTests();
            WoltLabIdentifierQuestionTests(context);
        });
}
