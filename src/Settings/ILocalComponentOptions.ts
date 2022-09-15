import { IWoltLabComponentOptions } from "./IWoltLabComponentOptions.js";

/**
 * Represents options for a component which is stored locally.
 */
export interface ILocalComponentOptions extends IWoltLabComponentOptions
{
    /**
     * The path to load the component from.
     */
    Source: string;
}
