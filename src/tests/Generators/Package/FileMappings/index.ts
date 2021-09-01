import { basename } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator";
import { BBCodeInstructionFileMappingTests } from "./BBCodeInstructionFileMapping.test";
import { CronJobInstructionFileMappingTests } from "./CronJobInstructionFileMapping.test";
import { EmojiInstructionFileMappingTests } from "./EmojiInstructionFileMapping.test";
import { EntryPointFileMappingTests } from "./EntryPointFileMapping.test";
import { PHPInstructionFileMappingTests } from "./PHPInstructionFileMapping.test";
import { SelfContainedPHPFileMappingTests } from "./SelfContainedPHPFileMapping.test";
import { ThemeInstructionFileMappingTests } from "./ThemeInstructionFileMapping.test";
import { WoltLabNodePackageFileMappingTests } from "./WoltLabNodePackageFileMapping.test";
import { WoltLabPackageFileMappingTests } from "./WoltLabPackageFileMapping.test";

/**
 * Registers tests for the package-generator's file-mappings.
 *
 * @param context
 * The test-context.
 */
export function FileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        basename(__dirname),
        () =>
        {
            BBCodeInstructionFileMappingTests(context);
            CronJobInstructionFileMappingTests(context);
            EmojiInstructionFileMappingTests(context);
            PHPInstructionFileMappingTests(context);
            SelfContainedPHPFileMappingTests(context);
            ThemeInstructionFileMappingTests(context);
            EntryPointFileMappingTests(context);
            WoltLabNodePackageFileMappingTests(context);
            WoltLabPackageFileMappingTests(context);
        });
}
