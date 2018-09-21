import { Instruction } from "./Instruction";
import { IPHPInstructionOptions } from "./IPHPInstructionOptions";

/**
 * Represents an instruction which executes `php`-code.
 */
export class PHPInstruction extends Instruction
{
    /**
     * The applicatino to load the php-file from.
     */
    private application: string;

    /**
     * Initializes a new instance of the `PHPInstruction` class.
     */
    public constructor(options: IPHPInstructionOptions)
    {
        super(options);
        this.Appliaction = options.Application;
    }

    public get Type(): string
    {
        return "script";
    }

    /**
     * Gets or sets the applicatino to load the php-file from.
     */
    public get Application(): string
    {
        return this.application;
    }

    public set Appliaction(value: string)
    {
        this.application = value;
    }
}