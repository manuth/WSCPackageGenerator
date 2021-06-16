import { IWoltLabComponentOptions } from "./IWoltLabComponentOptions";

/**
 * Represents options of a component which is stored locally.
 */
export interface ILocalComponentOptions extends IWoltLabComponentOptions
{
    /**
     * The path to load the component from.
     */
    Source: string;
}
