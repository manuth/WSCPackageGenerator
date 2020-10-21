import { ITSProjectSettings } from "@manuth/generator-ts-project";
import { WoltLabSettingKey } from "./WoltLabSettingKey";
import { WoltLabUnitName } from "./WoltLabUnitName";

/**
 * Represents settings of a generator.
 */
export interface IWoltLabGeneratorSettings extends ITSProjectSettings
{
    /**
     * The identifier of the package.
     */
    [WoltLabSettingKey.Identifier]: string;

    /**
     * The name of the package-author.
     */
    [WoltLabSettingKey.Author]: string;

    /**
     * The homepage of the author of the package.
     */
    [WoltLabSettingKey.HomePage]: string;

    /**
     * The paths for the units.
     */
    [WoltLabSettingKey.UnitPaths]: Record<string, string>;

    /**
     * The application to upload files to.
     */
    [WoltLabSettingKey.FilesApp]: string;

    /**
     * The path to upload files to.
     */
    [WoltLabSettingKey.FilesDirectory]: string;

    /**
     * A value indicating whether the php-script to execute should be located in this package.
     */
    [WoltLabSettingKey.SelfContainedPHP]: boolean;

    /**
     * Gets or sets the application to load the `PHPScript` from.
     */
    [WoltLabSettingKey.PHPScriptApp]: string;

    /**
     * Gets or sets the path to load the `PHPScript` from.
     */
    [WoltLabSettingKey.PHPScriptSource]: string;

    /**
     * Gets or sets the path to store the self-contained `PHPScript`-file.
     */
    [WoltLabSettingKey.PHPScriptFile]: string;

    /**
     * Gets or sets the path to save the `SQLScript` to.
     */
    [WoltLabSettingKey.SQLFile]: string;

    /**
     * Gets or sets the path to save templates to.
     */
    [WoltLabSettingKey.TemplateRoot]: string;

    /**
     * Gets or sets the application the templates are made for.
     */
    [WoltLabSettingKey.TemplateApp]: string;

    /**
     * Gets or sets the path to save the acp-templates to.
     */
    [WoltLabSettingKey.ACPTemplateRoot]: string;

    /**
     * Gets or sets the application the acp-templates are made for.
     */
    [WoltLabSettingKey.ACPTemplateApp]: string;
}
