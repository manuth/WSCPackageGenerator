import FileSystemInstruction from "../Automation/FileSystemInstruction";
import Style from "./Style";
import { isNullOrUndefined } from "util";
import Package from "../Package";

/**
 * Represents an instruction that provides a style.
 */
export default class StyleInstruction extends FileSystemInstruction
{
    /**
     * The style provided by the instruction.
     */
    private style: Style;

    /**
     * Initializes a new instance of the `StyleInstruction` class.
     */
    public constructor(options: Partial<StyleInstruction> = { })
    {
        super(options);

        if (isNullOrUndefined(this.FileName))
        {
            this.FileName = this.style.Name + ".tar";
        }
    }

    /**
     * Gets or sets the style provided by the instruction.
     */
    public get Style(): Style
    {
        return this.style;
    }

    public set Package(value: Package)
    {
        super.Package = value;

        if (isNullOrUndefined(this.style.Date))
        {
            this.style.Date = value.Date;
        }

        if (isNullOrUndefined(this.style.Version))
        {
            this.style.Version = value.Version;
        }
        
        if (isNullOrUndefined(this.style.Author.Name))
        {
            this.style.Author.Name = value.Author.Name;
        }

        if (isNullOrUndefined(this.style.Author.URL))
        {
            this.style.Author.URL = value.Author.URL;
        }

        if (isNullOrUndefined(this.style.License))
        {
            this.style.License = value.License;
        }
    }
}