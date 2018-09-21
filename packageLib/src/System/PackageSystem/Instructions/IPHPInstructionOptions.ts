import { IInstructionOptions } from "./IInstructionOptions";

 /**
  * Provides options for the `PHPInstruction` class.
  */
export interface IPHPInstructionOptions extends IInstructionOptions
{
    /**
     * The applicatino to load the php-file from.
     */
    Application: string;
}