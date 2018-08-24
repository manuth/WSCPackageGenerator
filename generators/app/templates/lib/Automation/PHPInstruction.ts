import { FileInstruction } from "./FileInstruction";
import { IPHPInstruction } from "./IPHPInstruction";
import { IPHPInstructionOptions } from "./IPHPInstructionOptions";
import { isNullOrUndefined } from "util";

/**
 * Represents an instruction which provides a php-script execute when invoking the instruction.
 * 
 * Please keep in mind to provide the file using a `FilesInstruction`.
 */
export class PHPInstruction extends FileInstruction implements IPHPInstruction
{
    /**
     * The application attribute must have the same value as the application attribute
     * of the file package installation plugin instruction so that
     * the correct file in the intended application directory is executed.
     */
    public application: string; 

    /**
     * Initializes a new instance of the `PHPInstruction` class.
     */
    public constructor(options: IPHPInstructionOptions)
    {
        super(options);

        if (!isNullOrUndefined(options.Application))
        {
            this.application = options.Application;
        }
    }

    public get Application(): string
    {
        return this.application;
    }

    public set Application(value: string)
    {
        this.application = value;
    }
}