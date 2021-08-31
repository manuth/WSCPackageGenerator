import { basename } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator";
import { FileUploadComponentBaseTests } from "./FileUploadComponentBase.test";
import { InquiryTests } from "./Inquiry";
import { InstructionComponentTests } from "./InstructionComponent.test";
import { VSCodeTests } from "./VSCode";
import { WoltLabComponentTests } from "./WoltLabComponent.test";

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
            InquiryTests(context);
            WoltLabComponentTests(context);
            FileUploadComponentBaseTests(context);
            InstructionComponentTests(context);
            VSCodeTests(context);
        });
}
