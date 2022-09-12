// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ACPTemplateComponent } from "../Components/ACPTemplateComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BBCodeComponent } from "../Components/BBCodeComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CronJobComponent } from "../Components/CronJobComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EmojiComponent } from "../Components/EmojiComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ErrorMessageComponent } from "../Components/ErrorMessageComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EventListenerComponent } from "../Components/EventListenerComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FileUploadComponent } from "../Components/FileUploadComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GroupOptionComponent } from "../Components/GroupOptionComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OptionComponent } from "../Components/OptionComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PHPScriptComponent } from "../Components/PHPScriptComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SQLScriptComponent } from "../Components/SQLScriptComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TemplateComponent } from "../Components/TemplateComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TemplateListenerComponent } from "../Components/TemplateListenerComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ThemeInstructionComponent } from "../Components/ThemeInstructionComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TranslationComponent } from "../Components/TranslationComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserOptionComponent } from "../Components/UserOptionComponent.js";

/**
 * Represents a type of a WoltLab-package component.
 */
export enum PackageComponentType
{
    /**
     * Indicates the {@link FileUploadComponent `FileUploadComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    FileUpload = "wscFiles",

    /**
     * Indicates the {@link PHPScriptComponent `PHPScriptComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    PHPScript = "wscPHP",

    /**
     * Indicates the {@link SQLScriptComponent `SQLScriptComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    SQLScript = "wscSQL",

    /**
     * Indicates the {@link CronJobComponent `CronJobComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    CronJob = "wscCron",

    /**
     * Indicates the {@link TranslationComponent `TranslationComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    Translation = "wscTranslation",

    /**
     * Indicates the {@link TranslationComponent `TranslationComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    ErrorMessage = "wscErrors",

    /**
     * Indicates the {@link OptionComponent `OptionComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    Option = "wscOptions",

    /**
     * Indicates the {@link UserOptionComponent `UserOptionComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    UserOption = "wscUserOptions",

    /**
     * Indicates the {@link GroupOptionComponent `GroupOptionComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    GroupOption = "wscGroupOptions",

    /**
     * Indicates the {@link EmojiComponent `EmojiComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    Emoji = "wscEmojis",

    /**
     * Indicates the {@link BBCodeComponent `BBCodeComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    BBCode = "wscBBCodes",

    /**
     * Indicates the {@link TemplateComponent `TemplateComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    Template = "wscTemplates",

    /**
     * Indicates the {@link ACPTemplateComponent `ACPTemplateComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    ACPTemplate = "wscACPTemplates",

    /**
     * Indicates the {@link EventListenerComponent `EventListenerComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    EventListener = "wscEventListeners",

    /**
     * Indicates the {@link TemplateListenerComponent `TemplateListenerComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    TemplateListener = "wscTemplateListeners",

    /**
     * Indicates the {@link ThemeComponent `ThemeComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    Theme = "wscTheme"
}
