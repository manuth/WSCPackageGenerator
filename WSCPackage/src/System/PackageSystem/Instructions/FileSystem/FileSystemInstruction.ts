import Path = require("path");
import UPath = require("upath");
import { isNullOrUndefined } from "util";
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
            FileName: options.FileName
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

    public get FileName()
    {
        if (isNullOrUndefined(super.FileName))
        {
            return this.MakeDefaultFileName(this.Source);
        }
        else
        {
            return super.FileName;
        }
    }

    public set FileName(value)
    {
        super.FileName = value;
    }

    public get Compiler(): InstructionCompiler<FileSystemInstruction>
    {
        return new FileSystemInstructionCompiler(this);
    }

    /**
     * Creates a default file-name based on the source of the instruction.
     *
     * @param source
     * The source of the instruction.
     */
    protected MakeDefaultFileName(source: string)
    {
        if (
            Path.isAbsolute(source) ||
            (UPath.normalize(source).split(UPath.sep)[0] === ".."))
        {
            return Path.basename(source);
        }
        else
        {
            return source;
        }
    }
}