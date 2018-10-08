/**
 * Provides options for the `Instruction` class.
 */
export interface IInstructionOptions
{
    /**
     * The name of the file to save the compiled instruction to.
     */
    FileName: string;

    /**
     * A value indicating whether the instruction should be executed in standalone-mode.
     */
    Standalone?: boolean;
}