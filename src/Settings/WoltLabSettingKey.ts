// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { IWoltLabSettings } from "./IWoltLabSettings.js";

/**
 * Represents a setting of the {@link IWoltLabSettings `IWoltLabSettings`}
 */
export enum WoltLabSettingKey
{
    /**
     * Indicates the {@link Identifier `Identifier`}-setting.
     */
    Identifier = "identifier",

    /**
     * Indicates the {@link Author `Author`}-setting.
     */
    Author = "authorName",

    /**
     * Indicates the {@link HomePage `HomePage`}-setting.
     */
    HomePage = "homepage",

    /**
     * Indicates the {@link ComponentOptions `ComponentOptions`}-settings.
     */
    ComponentOptions = "componentOptions"
}
