import { Instruction } from "./Instruction";
import { IPHPInstructionOptions } from "./IPHPInstructionOptions";

/**
 * Represents an instruction which executes `php`-code.
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
}