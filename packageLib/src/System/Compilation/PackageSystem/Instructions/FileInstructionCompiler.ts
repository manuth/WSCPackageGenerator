import { isNullOrUndefined } from "util";
import { TempDirectory } from "../../../FileSystem/TempDirectory";
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

    protected async Compile(): Promise<void>
    {
        let tempDir: TempDirectory = new TempDirectory();
        await this.CopyTemplate(this.Item.Source, tempDir.FileName);
        await this.Compress(tempDir.FileName, this.DestinationFileName);
        tempDir.Dispose();
    }

    public Serialize(): Element
    {
        let editor: XMLEditor = new XMLEditor(super.Serialize());

        if (!isNullOrUndefined(this.Item.Application))
        {
            editor.SetAttribute("application", this.Item.Application);
        }

        return editor.Element;
    }
}