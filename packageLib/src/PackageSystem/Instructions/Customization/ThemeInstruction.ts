import { Theme } from "../../../Customization/Presentation/Themes/Theme";
import { Instruction } from "../Instruction";
import { IThemeInstructionOptions } from "./IThemeInstructionOptions";

/**
 * Represents an instruction which provides a theme.
 */
export class ThemeInstruction extends Instruction
{
    /**
     * The theme provided by the instruction.
     */
    private theme: Theme;

    public constructor(options: IThemeInstructionOptions)
    {
        super({
            FileName: options.FileName || `${options.Theme.Name}.tar`,
        });

        this.theme = new Theme(this, options.Theme);
    }

    public get Type(): string
    {
        return "";
    }

    /**
     * Gets the theme provided by the instruction.
     */
    public get Theme(): Theme
    {
        return this.theme;
    }
}