import { WoltLabComponentSettingKey } from "./WoltLabComponentSettingKey";

/**
 * Represents options of a component.
 */
export interface IWoltLabComponentOptions
{
    /**
     * The path to save the component to.
     */
    [WoltLabComponentSettingKey.Path]: string;
}
