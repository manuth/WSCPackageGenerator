import { IWoltLabGeneratorSettings } from "../../IWoltLabGeneratorSettings";
import { WSCPackageSetting } from "./WSCPackageSetting";

/**
 * Represents settings for the `WSCPackageGenerator`.
 */
export interface IWSCPackageSettings extends IWoltLabGeneratorSettings
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
     * Gets or sets the directory which contains files.
     */
    [WSCPackageSetting.FilesDirectory]: string;

    /**
     * Gets or sets the application to upload the files to.
     */
    [WSCPackageSetting.FilesApp]: string;

    /**
     * Gets or sets a value indicating whether the `PHPScript` is self-contained.
     */
    [WSCPackageSetting.SelfContainedPHP]: boolean;

    /**
     * Gets or sets the application to load the `PHPScript` from.
     */
    [WSCPackageSetting.PHPScriptApp]: string;

    /**
     * Gets or sets the path to store the self-contained `PHPScript`-file.
     */
    [WSCPackageSetting.PHPScriptSource]: string;

    /**
     * Gets or sets the path to load the `PHPScript` from.
     */
    [WSCPackageSetting.PHPScriptFile]: string;

    /**
     * Gets or sets the path to save the `SQLScript` to.
     */
    [WSCPackageSetting.SQLFile]: string;

    /**
     * Gets or sets the path to save templates to.
     */
    [WSCPackageSetting.TemplateRoot]: string;

    /**
     * Gets or sets the application the templates are made for.
     */
    [WSCPackageSetting.TemplateApp]: string;

    /**
     * Gets or sets the path to save the acp-templates to.
     */
    [WSCPackageSetting.ACPTemplateRoot]: string;

    /**
     * Gets or sets the application the acp-templates are made for.
     */
    [WSCPackageSetting.ACPTemplateApp]: string;
}