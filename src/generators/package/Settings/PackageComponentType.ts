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
import { TemplateComponent } from "../Components/TemplateComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TranslationComponent } from "../Components/TranslationComponent";

/**
 * Represents a type of a WoltLab-package component.
 */
export enum PackageComponentType
{
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
    EventListener = "woltlabPackageEventListener"
}
