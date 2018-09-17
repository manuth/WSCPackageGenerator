import { IThemeOptions } from "../../../../Customization/Presentation/Themes/IThemeOptions";
import { IInstructionOptions } from "../../IInstructionOptions";

/**
 * Provides options for the `ThemeInstruction` class.
 */
export interface IThemeInstructionOptions extends Partial<IInstructionOptions>
{
    /**
     * The theme provided by the instruction.
     */
    Theme: IThemeOptions;
}