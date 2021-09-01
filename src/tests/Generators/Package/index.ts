import { basename } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../../generators/package/WoltLabPackageGenerator";
import { WoltLabPackageGeneratorTests } from "./WoltLabPackageGenerator.test";

/**
 * Registers tests for the package-generator.
 *
 * @param context
 * The test-context.
 */
export function PackageTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        basename(__dirname),
        () =>
        {
            WoltLabPackageGeneratorTests(context);
        });
}
