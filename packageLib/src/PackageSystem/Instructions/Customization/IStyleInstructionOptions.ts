import { IStyleOptions } from "../../../Customization/Styles/IStyleOptions";
import { IFileSystemInstructionOptions } from "../FileSystem/IFileSystemInstructionOptions";

/**
 * Provides options for the `StyleInstruction` class.
 */
export interface IStyleInstructionOptions extends IFileSystemInstructionOptions
{
    /**
     * The theme provided by the instruction.
     */
    Style: IStyleOptions;
}