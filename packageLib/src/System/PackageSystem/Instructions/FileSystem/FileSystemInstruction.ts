import { FileSystemInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/FileSystemInstructionCompiler";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { Instruction } from "../Instruction";
import { IFileSystemInstructionOptions } from "./IFileSystemInstructionOptions";

/**
 * Represents an instruction which is bound to a file-system entry.
 */
export abstract class FileSystemInstruction extends Instruction
{
    /**
     * The path to the file-system entry the instruction is bound to.
     */
    private source: string;

    /**
     * Initializes a new instance of the `FileSystemInstruction` class.
     */
    public constructor(options: IFileSystemInstructionOptions)
    {
        super({
            FileName: options.FileName || options.Source
        });

        this.Source = options.Source;
    }

    /**
     * Gets or sets the path to the file-system entry the instruction is bound to.
     */
    public get Source(): string
    {
        return this.source;
    }

    public set Source(value: string)
    {
        this.source = value;
    }

    public get Compiler(): InstructionCompiler<FileSystemInstruction>
    {
        return new FileSystemInstructionCompiler(this);
    }
}