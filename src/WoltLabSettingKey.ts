/**
 * Represents a generator-setting.
 */
export enum WoltLabSettingKey
{
    /**
     * Indicates the `Identifier`-setting.
     */
    Identifier = "woltLabPackageIdentifier",

    /**
     * Indicates the `Author`-setting.
     */
    Author = "authorName",

    /**
     * Indicates the `HomePage`-setting.
     */
    HomePage = "authorUrl",

    /**
     * Indicates the `ComponentPaths`-setting.
     */
    UnitPaths = "woltLabUnitPaths",

    /**
     * Indicates the `FilesApp` setting.
     */
    FilesApp = "filesApp",

    /**
     * Indicates the `FilesDirectory` setting.
     */
    FilesDirectory = "filesDir",

    /**
     * Indicates the `SelfContainedPHP` setting.
     */
    SelfContainedPHP = "selfContainedPHP",

    /**
     * Indicates the `PHPScriptApp` setting.
     */
    PHPScriptApp = "phpScriptApp",

    /**
     * Indicates the `PHPScriptSource` setting.
     */
    PHPScriptSource = "phpScriptSource",

    /**
     * Indicates the `PHPScriptFile` setting.
     */
    PHPScriptFile = "phpScriptFile",

    /**
     * Indicates the `SQLFile` setting.
     */
    SQLFile = "sqlScriptFile",

    /**
     * Indicates the `TemplateApp` setting.
     */
    TemplateApp = "templateApp",

    /**
     * Indicates the `TemplateRoot` setting.
     */
    TemplateRoot = "templateRoot",

    /**
     * Indicates the `ACPTemplateApp` setting.
     */
    ACPTemplateApp = "acpTemplateApp",

    /**
     * Indicates the `ACPTemplateROot` setting.
     */
    ACPTemplateRoot = "acpTemplateRoot"
}
