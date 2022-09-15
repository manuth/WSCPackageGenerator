import { basename } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { FileUploadComponentBaseTests } from "./FileUploadComponentBase.test.js";
import { InquiryTests } from "./Inquiry/index.test.js";
import { InstructionComponentTests } from "./InstructionComponent.test.js";
import { VSCodeTests } from "./VSCode/index.test.js";
import { WoltLabComponentTests } from "./WoltLabComponent.test.js";

/**
 * Registers tests for components.
 *
 * @param context
 * The test-context.
 */
export function ComponentTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            InquiryTests(context);
            WoltLabComponentTests(context);
            FileUploadComponentBaseTests(context);
            InstructionComponentTests(context);
            VSCodeTests(context);
        });
}
