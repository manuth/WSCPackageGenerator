import { basename } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator.js";
import { BBCodeInstructionFileMappingTests } from "./BBCodeInstructionFileMapping.test.js";
import { CronJobInstructionFileMappingTests } from "./CronJobInstructionFileMapping.test.js";
import { EmojiInstructionFileMappingTests } from "./EmojiInstructionFileMapping.test.js";
import { EntryPointFileMappingTests } from "./EntryPointFileMapping.test.js";
import { PHPInstructionFileMappingTests } from "./PHPInstructionFileMapping.test.js";
import { SelfContainedPHPFileMappingTests } from "./SelfContainedPHPFileMapping.test.js";
import { ThemeInstructionFileMappingTests } from "./ThemeInstructionFileMapping.test.js";
import { WoltLabDependencyCollectionTests } from "./WoltLabDependencyCollection.test.js";
import { WoltLabNodePackageFileMappingTests } from "./WoltLabNodePackageFileMapping.test.js";
import { WoltLabPackageFileMappingTests } from "./WoltLabPackageFileMapping.test.js";

/**
 * Registers tests for the package-generator's file-mappings.
 *
 * @param context
 * The test-context.
 */
export function FileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            BBCodeInstructionFileMappingTests(context);
            CronJobInstructionFileMappingTests(context);
            EmojiInstructionFileMappingTests(context);
            PHPInstructionFileMappingTests(context);
            SelfContainedPHPFileMappingTests(context);
            ThemeInstructionFileMappingTests(context);
            EntryPointFileMappingTests(context);
            WoltLabDependencyCollectionTests();
            WoltLabNodePackageFileMappingTests(context);
            WoltLabPackageFileMappingTests(context);
        });
}
