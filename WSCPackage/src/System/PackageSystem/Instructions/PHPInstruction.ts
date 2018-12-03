import { PHPInstructionCompiler } from "../../Compilation/PackageSystem/Instructions/PHPInstructionCompiler";
import { Instruction } from "./Instruction";
import { IPHPInstructionOptions } from "./IPHPInstructionOptions";

/**
 * Represents an instruction which executes an already existing `php`-file on the server.
 */
export class PHPInstruction extends Instruction
{
    /**
     * The application to load the php-file from.
     */
    private application: string;

    /**
     * Initializes a new instance of the `PHPInstruction` class.
     */
    public constructor(options: IPHPInstructionOptions)
    {
        super(options);
        this.Application = options.Application;
    }

    public get Type(): string
    {
        return "script";
    }

    public get Compiler()
    {
        return new PHPInstructionCompiler(this);
    }

    /**
     * Gets or sets the application to load the php-file from.
     */
    public get Application(): string
    {
        return this.application;
    }

    public set Application(value: string)
    {
        this.application = value;
    }

    /**
     * Gets or sets the name of the file to load the php-script from.
     */
    public get FileName()
    {
        return super.FileName;
    }

    public set FileName(value)
    {
        super.FileName = value;
    }

    public get FullName()
    {
        return this.FileName;
    }
}