import Path = require("path");
import { ApplicationFileSystemInstruction } from "../../FileSystem/ApplicationFileSystemInstruction";
import { IApplicationFileSystemInstructionOptions } from "../../FileSystem/IApplicationFileSystemInstructionOptions";

/**
 * Represents an instruction which provides templates for the control panel.
 */
export class ACPTemplateInstruction extends ApplicationFileSystemInstruction
{
    /**
     * Initializes a new instance of the `ACPTemplateInstruction` class.
     */
    public constructor(options: IApplicationFileSystemInstructionOptions)
    {
        super(options);
    }

    public get Type(): string
    {
        return "acpTemplate";
    }

    public MakeDefaultFileName(source: string)
    {
        return Path.join("acpTemplates", super.MakeDefaultFileName(source));
    }
}