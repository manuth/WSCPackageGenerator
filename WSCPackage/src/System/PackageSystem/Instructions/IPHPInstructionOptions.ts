import { IInstructionOptions } from "./IInstructionOptions";

 /**
  * Provides options for the `PHPInstruction` class.
  */
export interface IPHPInstructionOptions extends IInstructionOptions
{
    /**
     * The name of the file to load the php-script from.
     */
    FileName: string;

    /**
     * The application to load the php-file from.
     */
    Application: string;
}