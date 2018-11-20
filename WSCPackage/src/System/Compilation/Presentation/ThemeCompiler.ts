import * as FileSystem from "fs-extra";
import { isNullOrUndefined } from "util";
import { Theme } from "../../Customization/Presentation/Themes/Theme";
import { Compiler } from "../Compiler";
import { ThemeFileCompiler } from "./ThemeFileCompiler";
import { ThemeVariableCompiler } from "./ThemeVariableCompiler";

/**
 * Provides the functionality to compile themes.
 */
export class ThemeCompiler extends Compiler<Theme>
{
    /**
     * The name to save the variables to.
     */
    private variableFileName = "variables.xml";

    /**
     * Initializes a new instance of the `ThemeCompiler<T>` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: Theme, variableFileName?: string)
    {
        super(item);

        if (!isNullOrUndefined(variableFileName))
        {
            this.VariableFileName = variableFileName;
        }
    }

    /**
     * Gets or sets the filename to save variables to.
     */
    public get VariableFileName()
    {
        return this.variableFileName;
    }

    public set VariableFileName(value)
    {
        this.variableFileName = value;
    }

    protected async Compile()
    {
        let variables: { [key: string]: string } = {};
        Object.assign(variables, this.Item.Variables);

        if (!isNullOrUndefined(this.Item.CustomScss))
        {
            variables.individualScss = this.Item.CustomScss;
        }

        if (!isNullOrUndefined(this.Item.ScssOverride))
        {
            variables.overrideScss = this.Item.ScssOverride;
        }

        let themeFileCompiler = new ThemeFileCompiler(this.Item, this.VariableFileName);
        themeFileCompiler.DestinationPath = this.MakeDestinationPath("style.xml");
        await themeFileCompiler.Execute();

        if (Object.keys(variables).length > 0)
        {
            let variableCompiler = new ThemeVariableCompiler(variables);
            variableCompiler.DestinationPath = this.MakeDestinationPath(this.VariableFileName);
            await variableCompiler.Execute();
        }

        if (!isNullOrUndefined(this.Item.Thumbnail))
        {
            await FileSystem.copy(this.Item.Thumbnail.Source, this.MakeDestinationPath(this.Item.Thumbnail.FileName));
        }

        if (!isNullOrUndefined(this.Item.HighResThumbnail))
        {
            await FileSystem.copy(this.Item.HighResThumbnail.Source, this.MakeDestinationPath(this.Item.HighResThumbnail.FileName));
        }

        if (!isNullOrUndefined(this.Item.CoverPhoto))
        {
            await FileSystem.copy(this.Item.CoverPhoto.Source, this.MakeDestinationPath(this.Item.CoverPhoto.FileName));
        }
    }
}