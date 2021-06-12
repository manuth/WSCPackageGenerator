import { IGeneratorSettings } from "@manuth/extended-yo-generator";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WoltLabGenerator } from "../WoltLabGenerator";
import { IWoltLabComponentOptionCollection } from "./IWoltLabComponentOptionCollection";
import { WoltLabGeneratorSettingKey } from "./WoltLabGeneratorSettingKey";

/**
 * Provides options for the {@link WoltLabGenerator `WoltLabGenerator`}
 */
export interface IWoltLabGeneratorSettings extends IGeneratorSettings
{
    /**
     * Provides options for the components.
     */
    [WoltLabGeneratorSettingKey.ComponentOptions]: IWoltLabComponentOptionCollection;
}
