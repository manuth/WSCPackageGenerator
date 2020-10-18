import { IWoltLabGeneratorSettings } from "../../IWoltLabGeneratorSettings";
import { WSCThemeSetting } from "./WSCThemeSetting";

/**
 * Represents settings for the `WSCThemeGenerator`.
 */
export interface IWSCThemeSettings extends IWoltLabGeneratorSettings
{
    /**
     * Gets or sets the destination.
     */
    [WSCThemeSetting.Destination]: string;

    /**
     * Gets or sets the name.
     */
    [WSCThemeSetting.Name]: string;

    /**
     * Gets or sets the human-readable name.
     */
    [WSCThemeSetting.DisplayName]: string;

    /**
     * Gets or sets the description.
     */
    [WSCThemeSetting.Description]: string;
}
