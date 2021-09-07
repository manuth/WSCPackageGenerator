import { basename } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator";
import { PackageTests } from "./Package";

/**
 * Registers tests for generators.
 *
 * @param context
 * The test-context.
 */
export function GeneratorTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        basename(__dirname),
        () =>
        {
            PackageTests(context);
        });
}
