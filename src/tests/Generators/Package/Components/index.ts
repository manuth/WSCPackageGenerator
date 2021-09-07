import { basename } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator";
import { PHPScriptComponentTests } from "./PHPScriptComponent.test";
import { ThemeInstructionComponentTests } from "./ThemeInstructionComponent.test";

/**
 * Registers tests for the package-generator components.
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
            PHPScriptComponentTests(context);
            ThemeInstructionComponentTests(context);
        });
}
