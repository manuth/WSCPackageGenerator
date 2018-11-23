import { TempDirectory } from "temp-filesystem";
import { isNullOrUndefined } from "util";
import { ApplicationFileSystemInstruction } from "../../../PackageSystem/Instructions/FileSystem/ApplicationFileSystemInstruction";
import { XMLEditor } from "../../../Serialization/XMLEditor";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile a file-instruction.
 */
export class FileInstructionCompiler extends InstructionCompiler<ApplicationFileSystemInstruction>
{
    /**
     * Initializes a new instance of the `FileInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: ApplicationFileSystemInstruction)
    {
        super(item);
    }

    public Serialize()
    {
        let document = super.Serialize();
        let editor = new XMLEditor(document.documentElement);

        if (!isNullOrUndefined(this.Item.Application))
        {
            editor.SetAttribute("application", this.Item.Application);
        }

        return document;
    }

    protected async Compile()
    {
        let tempDir = new TempDirectory();
        await this.CopyTemplate(this.Item.Source, tempDir.FullName);
        await this.Compress(tempDir.FullName, this.DestinationFileName);
        tempDir.Dispose();
    }
}