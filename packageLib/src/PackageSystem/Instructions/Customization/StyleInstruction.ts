import { Style } from "../../../Customization/Styles/Style";
import { FileSystemInstruction } from "../FileSystem/FileSystemInstruction";
import { IStyleInstructionOptions } from "./IStyleInstructionOptions";

/**
 * Represents an instruction which provides a theme.
 */
export class StyleInstruction extends FileSystemInstruction
{
    /**
     * The theme provided by the instruction.
     */
    private style: Style;

    public constructor(options: IStyleInstructionOptions)
    {
        super({
            Source: options.Source,
            FileName: options.FileName || `${options.Style.Name}.tar`,
        });

        this.style = new Style(this, options.Style);
    }

    public get Type(): string
    {
        return "style";
    }

    /**
     * Gets the theme provided by the instruction.
     */
    public get Style(): Style
    {
        return this.style;
    }
}