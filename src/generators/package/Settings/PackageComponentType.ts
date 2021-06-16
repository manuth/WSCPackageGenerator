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
     * Indicates the {@link FileUploadComponent `FileUploadComponent<TSettings, TOptions, TComponentOptions>`}
     */
    FileUpload = "woltlabPackageFiles",

    /**
     * Indicates the {@link PHPScriptComponent `PHPScriptComponent<TSettings, TOptions, TComponentOptions>`}
     */
    PHPScript = "woltlabPHPScript",

    /**
     * Indicates the {@link SQLScriptComponent `SQLScriptComponent<TSettings, TOptions, TComponentOptions>`}
     */
    SQLScript = "woltlabSQLScript",

    /**
     * Indicates the {@link CronJobComponent `CronJobComponent<TSettings, TOptions, TComponentOptions>`}
     */
    CronJob = "woltlabPackageCron",

    /**
     * Indicates the {@link TranslationComponent `TranslationComponent<TSettings, TOptions, TComponentOptions>`}
     */
    Translation = "woltlabPackageTranslation",

    /**
     * Indicates the {@link TranslationComponent `TranslationComponent<TSettings, TOptions, TComponentOptions>`}
     */
    ErrorMessage = "woltlabPackageErrorMessage",

    /**
     * Indicates the {@link OptionComponent `OptionComponent<TSettings, TOptions, TComponentOptions>`}
     */
    Option = "woltlabPackageOption",

    /**
     * Indicates the {@link UserOptionComponent `UserOptionComponent<TSettings, TOptions, TComponentOptions>`}
     */
    UserOption = "woltlabUserOption",

    /**
     * Indicates the {@link GroupOptionComponent `GroupOptionComponent<TSettings, TOptions, TComponentOptions>`}
     */
    GroupOption = "woltlabPackageGroupOption",

    /**
     * Indicates the {@link EmojiComponent `EmojiComponent<TSettings, TOptions, TComponentOptions>`}
     */
    Emoji = "woltlabPackageEmoji",

    /**
     * Indicates the {@link BBCodeComponent `BBCodeComponent<TSettings, TOptions, TComponentOptions>`}
     */
    BBCode = "woltlabPackageBBCode",

    /**
     * Indicates the {@link TemplateComponent `TemplateComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    Template = "woltlabPackageTemplate",

    /**
     * Indicates the {@link ACPTemplateComponent `ACPTemplateComponent<TSettings, TOptions, TComponentOptions>`}
     */
    ACPTemplate = "woltLabPackageACPTemplate",

    /**
     * Indicates the {@link EventListenerComponent `EventListenerComponent<TSettings, TOptions, TComponentOptions>`}
     */
    EventListener = "woltlabPackageEventListener",

    /**
     * Indicates the {@link TemplateListenerComponent `TemplateListenerComponent<TSettings, TOptions, TComponentOptions>`}
     */
    TemplateListener = "woltlabPackageTemplateListener"
}
