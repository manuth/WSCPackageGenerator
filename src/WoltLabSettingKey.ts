/**
 * Represents a generator-setting.
 */
export enum WoltLabSettingKey
{
    /**
     * Indicates the {@link Identifier `Identifier`}-setting.
     */
    Identifier = "woltLabPackageIdentifier",

    /**
     * Indicates the {@link Author `Author`}-setting.
     */
    Author = "authorName",

    /**
     * Indicates the {@link HomePage `HomePage`}-setting.
     */
    HomePage = "authorUrl",

    /**
     * Indicates the {@link UnitPaths `ComponentPaths`}-setting.
     */
    UnitPaths = "woltLabUnitPaths",

    /**
     * Indicates the {@link FilesApp `FilesApp`} setting.
     */
    FilesApp = "filesApp",

    /**
     * Indicates the {@link FilesDirectory `FilesDirectory`} setting.
     */
    FilesDirectory = "filesDir",

    /**
     * Indicates the {@link SelfContainedPHP `SelfContainedPHP`} setting.
     */
    SelfContainedPHP = "selfContainedPHP",

    /**
     * Indicates the {@link PHPScriptApp `PHPScriptApp`} setting.
     */
    PHPScriptApp = "phpScriptApp",

    /**
     * Indicates the {@link PHPScriptSource `PHPScriptSource`} setting.
     */
    PHPScriptSource = "phpScriptSource",

    /**
     * Indicates the {@link PHPScriptSource `PHPScriptFile`} setting.
     */
    PHPScriptFile = "phpScriptFile",

    /**
     * Indicates the {@link SQLFile `SQLFile`} setting.
     */
    SQLFile = "sqlScriptFile",

    /**
     * Indicates the {@link TemplateApp `TemplateApp`} setting.
     */
    TemplateApp = "templateApp",

    /**
     * Indicates the {@link TemplateRoot `TemplateRoot`} setting.
     */
    TemplateRoot = "templateRoot",

    /**
     * Indicates the {@link ACPTemplateApp `ACPTemplateApp`} setting.
     */
    ACPTemplateApp = "acpTemplateApp",

    /**
     * Indicates the {@link ACPTemplateROot `ACPTemplateROot`} setting.
     */
    ACPTemplateRoot = "acpTemplateRoot"
}
