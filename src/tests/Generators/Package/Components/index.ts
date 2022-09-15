import { basename } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator.js";
import { ACPTemplateComponentTests } from "./ACPTemplateComponent.test.js";
import { PHPScriptComponentTests } from "./PHPScriptComponent.test.js";
import { ThemeInstructionComponentTests } from "./ThemeInstructionComponent.test.js";

/**
 * Registers tests for the package-generator components.
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
            PHPScriptComponentTests(context);
            ACPTemplateComponentTests(context);
            ThemeInstructionComponentTests(context);
        });
}
