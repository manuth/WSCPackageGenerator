import { basename } from "node:path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { PackageTests } from "./Package/index.test.js";

/**
 * Registers tests for generators.
 *
 * @param context
 * The test-context.
 */
export function GeneratorTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            PackageTests(context);
        });
}
