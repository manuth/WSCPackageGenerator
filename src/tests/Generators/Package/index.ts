import { basename } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../../generators/package/WoltLabPackageGenerator.js";
import { ComponentTests } from "./Components/index.js";
import { FileMappingTests } from "./FileMappings/index.js";
import { WoltLabPackageGeneratorTests } from "./WoltLabPackageGenerator.test.js";

/**
 * Registers tests for the package-generator.
 *
 * @param context
 * The test-context.
 */
export function PackageTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            ComponentTests(context);
            FileMappingTests(context);
            WoltLabPackageGeneratorTests(context);
        });
}
