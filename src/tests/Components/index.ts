import { basename } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator";
import { InquiryTests } from "./Inquiry";
import { VSCodeTests } from "./VSCode";

/**
 * Registers tests for components.
 *
 * @param context
 * The test-context.
 */
export function ComponentTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        basename(__dirname),
        () =>
        {
            VSCodeTests(context);
            InquiryTests(context);
        });
}
