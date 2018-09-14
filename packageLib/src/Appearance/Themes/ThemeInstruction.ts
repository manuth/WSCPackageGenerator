import { isNullOrUndefined } from "util";
import { FileSystemInstruction } from "../../Automation/FileSystemInstruction";
import { Package } from "../../Packaging/Package";
import { IThemeInstruction } from "./IThemeInstruction";
import { IThemeInstructionOptions } from "./IThemeInstructionOptions";
import { Theme } from "./Theme";

/**
 * Represents an instruction that provides a theme.
 */
export class ThemeInstruction extends FileSystemInstruction implements IThemeInstruction
{
    /**
     * The theme provided by the instruction.
     */
    private theme: Theme;

    /**
     * Initializes a new instance of the `ThemeInstruction` class.
     */
    public constructor(options: IThemeInstructionOptions)
    {
        super(options);
        this.theme = options.Theme;

        if (isNullOrUndefined(options.FileName))
        {
            this.FileName = this.theme.Name + ".tar";
        }
    }

    public get Theme(): Theme
    {
        return this.theme;
    }

    public set Theme(value: Theme)
    {
        this.theme = value;
    }

    public get Package(): Package
    {
        return super.Package;
    }

    public set Package(value: Package)
    {
        super.Package = value;

        if (!isNullOrUndefined(this.theme))
        {
            if (isNullOrUndefined(this.theme.Date))
            {
                this.theme.Date = value.Date;
            }

            if (isNullOrUndefined(this.theme.Version))
            {
                this.theme.Version = value.Version;
            }

            if (isNullOrUndefined(this.theme.Author.Name))
            {
                this.theme.Author.Name = value.Author.Name;
            }

            if (isNullOrUndefined(this.theme.Author.URL))
            {
                this.theme.Author.URL = value.Author.URL;
            }

            if (isNullOrUndefined(this.theme.License))
            {
                this.theme.License = value.License;
            }
        }
    }
}