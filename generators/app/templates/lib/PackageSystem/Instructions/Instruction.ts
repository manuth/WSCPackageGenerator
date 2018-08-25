import { ICompilable } from "../../Core/Compilation/ICompilable";
import { IInstructionOptions } from "./IInstructionOptions";
import { InstructionCompiler } from "./InstructionCompiler";
import { InstructionSet } from "./InstructionSet";
import { isNullOrUndefined } from "util";

/**
 * Represents a step of a package-installation.
 */
export abstract class Instruction implements ICompilable
{
    /**
     * The package this instruction belongs to.
     */
    private collection: InstructionSet = null;

    /**
     * The name of the file to save the compiled instruction to.
     */
    private fileName: string = null;

    /**
     * Initializes a new instance of the `Instruction` class.
     */
    public constructor(options: IInstructionOptions)
    {
        if (!isNullOrUndefined(options.FileName))
        {
            this.FileName = options.FileName;
        }
    }

    public get DestinationPath()
    {
        return this.Collection.MakeComponentPath(this.FileName);
    }

    /**
     * Gets or sets the package this instruction belongs to.
     */
    public get Collection()
    {
        return this.collection;
    }

    public set Collection(value)
    {
        this.collection = value;
    }

    /**
     * Gets or sets the name of the file to save the compiled instruction to.
     */
    public get FileName()
    {
        return this.fileName;
    }

    public set FileName(value)
    {
        this.fileName = value;
    }

    /**
     * Gets the compiler for compiling the instruction.
     */
    public get Compiler()
    {
        return new InstructionCompiler(this);
    }

    /**
     * Gets the path of the template to copy to the package.
     */
    public abstract get TemplatePath();
}