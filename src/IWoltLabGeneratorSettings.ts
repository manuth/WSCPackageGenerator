import { IGeneratorSettings } from "extended-yo-generator";
import { WoltLabGeneratorSetting } from "./GeneratorSetting";

/**
 * Represents settings of a generator.
 */
export interface IWoltLabGeneratorSettings extends IGeneratorSettings
{
    /**
     * Gets or sets the paths to save the components to.
     */
    [WoltLabGeneratorSetting.ComponentPaths]: { [key: string]: string };
}