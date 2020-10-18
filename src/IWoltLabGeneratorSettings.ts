import { IGeneratorSettings } from "extended-yo-generator";
import { WSCPackageSetting } from "./generators/app/WSCPackageSetting";
import { WoltLabGeneratorSetting } from "./GeneratorSetting";

/**
 * Represents settings of a generator.
 */
export interface IWoltLabGeneratorSettings extends IGeneratorSettings
{
    /**
     * Gets or sets the destination to save the package to.
     */
    [WSCPackageSetting.Destination]: string;

    /**
     * Gets or sets the paths to save the components to.
     */
    [WoltLabGeneratorSetting.ComponentPaths]: { [key: string]: string };
}
