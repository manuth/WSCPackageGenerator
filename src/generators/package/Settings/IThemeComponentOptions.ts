import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions.js";
import { ThemeComponent } from "./ThemeComponent.js";

/**
 * Represents options for a theme-component.
 */
export interface IThemeComponentOptions extends IWoltLabComponentOptions
{
    /**
     * The name of the theme.
     */
    Name: string;

    /**
     * The human-readable name of the theme.
     */
    DisplayName: string;

    /**
     * The description of the theme.
     */
    Description: string;

    /**
     * The components to add to the theme.
     */
    Components: ThemeComponent[];

    /**
     * The name of the file which contains custom scss-code.
     */
    CustomScssFileName: string;

    /**
     * The name of the file which contains scss variable overrides.
     */
    ScssOverridesFileName: string;

    /**
     * The name of the file which contains custom variables.
     */
    VariableFileName: string;
}
