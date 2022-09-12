// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ACPTemplateComponent } from "../Components/ACPTemplateComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { BBCodeComponent } from "../Components/BBCodeComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { CronJobComponent } from "../Components/CronJobComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { EmojiComponent } from "../Components/EmojiComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ErrorMessageComponent } from "../Components/ErrorMessageComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { EventListenerComponent } from "../Components/EventListenerComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { FileUploadComponent } from "../Components/FileUploadComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { GroupOptionComponent } from "../Components/GroupOptionComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OptionComponent } from "../Components/OptionComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { PHPScriptComponent } from "../Components/PHPScriptComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { SQLScriptComponent } from "../Components/SQLScriptComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { TemplateComponent } from "../Components/TemplateComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { TemplateListenerComponent } from "../Components/TemplateListenerComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ThemeInstructionComponent } from "../Components/ThemeInstructionComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { TranslationComponent } from "../Components/TranslationComponent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { UserOptionComponent } from "../Components/UserOptionComponent.js";

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
