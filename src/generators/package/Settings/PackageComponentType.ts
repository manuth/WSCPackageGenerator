// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ACPTemplateComponent } from "../Components/ACPTemplateComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BBCodeComponent } from "../Components/BBCodeComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CronJobComponent } from "../Components/CronJobComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EmojiComponent } from "../Components/EmojiComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ErrorMessageComponent } from "../Components/ErrorMessageComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EventListenerComponent } from "../Components/EventListenerComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FileUploadComponent } from "../Components/FileUploadComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GroupOptionComponent } from "../Components/GroupOptionComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OptionComponent } from "../Components/OptionComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PHPScriptComponent } from "../Components/PHPScriptComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SQLScriptComponent } from "../Components/SQLScriptComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TemplateComponent } from "../Components/TemplateComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TemplateListenerComponent } from "../Components/TemplateListenerComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TranslationComponent } from "../Components/TranslationComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserOptionComponent } from "../Components/UserOptionComponent";

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
    TemplateListener = "wscTemplateListeners"
}
