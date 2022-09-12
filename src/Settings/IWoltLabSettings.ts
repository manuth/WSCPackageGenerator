import { ITSProjectSettings } from "@manuth/generator-ts-project";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WoltLabGenerator } from "../WoltLabGenerator.js";
import { IWoltLabComponentOptionCollection } from "./IWoltLabComponentOptionCollection.js";
import { WoltLabSettingKey } from "./WoltLabSettingKey.js";

/**
 * Provides options for the {@link WoltLabGenerator `WoltLabGenerator`}
 */
export interface IWoltLabSettings extends ITSProjectSettings
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
     * Provides options for the components.
     */
    [WoltLabSettingKey.ComponentOptions]: IWoltLabComponentOptionCollection;
}
