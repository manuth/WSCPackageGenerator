import { basename } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator";
import { FileInstructionMappingTests } from "./FileInstructionMapping.test";
import { FileUploadMappingTests } from "./FileUploadMapping.test";
import { InstructionFileMappingTests } from "./InstructionFileMapping.test";
import { ListenerInstructionFileMappingTests } from "./ListenerInstructionFileMapping.test";
import { LocalFileInstructionMappingTests } from "./LocalFileInstructionMapping.test";
import { NodeInstructionFileMappingTests } from "./NodeInstructionFileMapping.test";
import { PackageInstructionTransformerTests } from "./PackageInstructionTransformer.test";

/**
 * Registers tests for file-mappings.
 *
 * @param context
 * The text-context.
 */
export function FileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        basename(__dirname),
        () =>
        {
            InstructionFileMappingTests(context);
            FileInstructionMappingTests(context);
            NodeInstructionFileMappingTests(context);
            ListenerInstructionFileMappingTests(context);
            LocalFileInstructionMappingTests(context);
            FileUploadMappingTests(context);
            PackageInstructionTransformerTests(context);
        });
}
