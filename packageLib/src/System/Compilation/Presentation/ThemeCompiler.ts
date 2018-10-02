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
    private variableFileName: string = "variables.xml";

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
    public get VariableFileName(): string
    {
        return this.variableFileName;
    }

    public set VariableFileName(value: string)
    {
        this.variableFileName = value;
    }

    protected async Compile(): Promise<void>
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

        let themeFileCompiler: ThemeFileCompiler = new ThemeFileCompiler(this.Item, this.VariableFileName);
        themeFileCompiler.DestinationPath = this.MakeDestinationPath("style.xml");
        await themeFileCompiler.Execute();

        if (Object.keys(variables).length > 0)
        {
            let variableCompiler: ThemeVariableCompiler = new ThemeVariableCompiler(variables);
            variableCompiler.DestinationPath = this.MakeDestinationPath(this.VariableFileName);
            await variableCompiler.Execute();
        }
    }
}