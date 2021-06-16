import { ITSProjectSettings } from "@manuth/generator-ts-project";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WoltLabGenerator } from "../WoltLabGenerator";
import { IWoltLabComponentOptionCollection } from "./IWoltLabComponentOptionCollection";
import { WoltLabSettingKey } from "./WoltLabSettingKey";

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
     * Provides options for the components.
     */
    [WoltLabSettingKey.ComponentOptions]: IWoltLabComponentOptionCollection;
}
