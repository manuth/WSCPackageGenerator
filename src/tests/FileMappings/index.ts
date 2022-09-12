import { basename } from "path";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { WoltLabPackageGenerator } from "../../generators/package/WoltLabPackageGenerator.js";
import { FileInstructionMappingTests } from "./FileInstructionMapping.test.js";
import { FileUploadMappingTests } from "./FileUploadMapping.test.js";
import { InstructionFileMappingTests } from "./InstructionFileMapping.test.js";
import { ListenerInstructionFileMappingTests } from "./ListenerInstructionFileMapping.test.js";
import { LocalFileInstructionMappingTests } from "./LocalFileInstructionMapping.test.js";
import { NodeInstructionFileMappingTests } from "./NodeInstructionFileMapping.test.js";

/**
 * Registers tests for file-mappings.
 *
 * @param context
 * The text-context.
 */
export function FileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        basename(new URL(".", import.meta.url).pathname),
        () =>
        {
            InstructionFileMappingTests(context);
            FileInstructionMappingTests(context);
            NodeInstructionFileMappingTests(context);
            ListenerInstructionFileMappingTests(context);
            LocalFileInstructionMappingTests(context);
            FileUploadMappingTests(context);
        });
}
