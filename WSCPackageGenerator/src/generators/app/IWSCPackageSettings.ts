import { IGeneratorSettings } from "../../IGeneratorSettings";
import { WSCPackageSetting } from "./WSCPackageSetting";

/**
 * Represents settings for the `WSCPackageGenerator`.
 */
export interface IWSCPackageSettings extends IGeneratorSettings
{
    /**
     * Gets or sets the destination.
     */
    [WSCPackageSetting.Destination]: string;

    /**
     * Gets or sets the human-readable name.
     */
    [WSCPackageSetting.DisplayName]: string;

    /**
     * Gets or sets the name.
     */
    [WSCPackageSetting.Name]: string;

    /**
     * Gets or sets the description.
     */
    [WSCPackageSetting.Description]: string;

    /**
     * Gets or sets the author.
     */
    [WSCPackageSetting.Author]: string;

    /**
     * Gets or sets the homepage.
     */
    [WSCPackageSetting.HomePage]: string;

    /**
     * Gets or sets the component-path.
     */
    [WSCPackageSetting.ComponentPath]: string;
}