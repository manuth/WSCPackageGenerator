import Path = require("path");
import { SelfContainedPHPInstructionCompiler } from "../../Compilation/PackageSystem/Instructions/SelfContainedPHPInstructionCompiler";
import { ApplicationFileSystemInstruction } from "./FileSystem/ApplicationFileSystemInstruction";
import { InstructionSet } from "./InstructionSet";
import { ISelfContainedPHPInstructionOptions } from "./ISelfContainedPHPInstructionOptions";
import { PHPInstruction } from "./PHPInstruction";

/**
 * Represents an instruction which uploads and executes `php`-code.
 */
export class SelfContainedPHPInstruction extends ApplicationFileSystemInstruction
{
    /**
     * The path to save the `php`-file to.
     */
    private destination: string;

    /**
     * Initializes a new instance of the `PHPInstruction` class.
     */
    public constructor(options: ISelfContainedPHPInstructionOptions)
    {
        super(options);
        this.Destination = options.Destination;
    }

    public get Compiler()
    {
        return new SelfContainedPHPInstructionCompiler(this);
    }

    /**
     * Gets or sets the path to load the `php`-file from.
     */
    public get Source()
    {
        return super.Source;
    }

    public set Source(value)
    {
        super.Source = value;
    }

    public get FileName()
    {
        return super.FileName;
    }

    public set FileName(value)
    {
        super.FileName = value;
    }

    /**
     * Gets or sets the path to save the `php`-file to.
     */
    public get Destination()
    {
        return this.destination;
    }

    public set Destination(value)
    {
        this.destination = value;
    }

    /**
     * Gets the file-instruction contained by this instruction.
     */
    public get FileInstruction()
    {
        let collection = new InstructionSet(this.Collection.Package);
        collection.Directory = this.Collection.Directory;
        let result = new ApplicationFileSystemInstruction(
            {
                Application: this.Application,
                Source: null,
                FileName: this.FileName
            });
        collection.push(result);
        return result;
    }

    /**
     * Gets the php-instruction contained by this instruction.
     */
    public get PHPInstruction()
    {
        let collection = new InstructionSet(this.Collection.Package);
        collection.Directory = this.Collection.Directory;
        let result = new PHPInstruction(
            {
                Application: this.Application,
                FileName: this.Destination,
                Standalone: this.Standalone
            });
        collection.push(result);
        return result;
    }

    protected MakeDefaultFileName(source: string)
    {
        return Path.join("scripts", "php", this.Application, super.MakeDefaultFileName(source));
    }
}