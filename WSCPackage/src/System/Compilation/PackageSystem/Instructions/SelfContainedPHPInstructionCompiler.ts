import FileSystem = require("fs-extra");
import { TempDirectory } from "temp-filesystem";
import { SelfContainedPHPInstruction } from "../../../PackageSystem/Instructions/SelfContainedPHPInstruction";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile self-contained php-instructions.
 */
export class SelfContainedPHPInstructionCompiler extends InstructionCompiler<SelfContainedPHPInstruction>
{
    /**
     * Initializes a new instance of the `SelfContainedPHPInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: SelfContainedPHPInstruction)
    {
        super(item);
    }

    public Serialize()
    {
        let document = this.Item.FileInstruction.Compiler.Serialize();
        let childNodes = this.Item.PHPInstruction.Compiler.Serialize().childNodes;

        for (let i = 0; i < childNodes.length; i++)
        {
            document.appendChild(childNodes.item(i));
        }

        return document;
    }

    protected async Compile(): Promise<void>
    {
        let fileInstruction = this.Item.FileInstruction;
        let tempDir = new TempDirectory();
        await FileSystem.copy(this.Item.Source, tempDir.MakePath(this.Item.Destination));
        fileInstruction.Source = tempDir.FullName;
        let compiler = fileInstruction.Compiler;
        compiler.DestinationPath = this.DestinationPath;
        await compiler.Execute();
    }
}