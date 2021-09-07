import { IWoltLabComponentOptions } from "./IWoltLabComponentOptions";

/**
 * Provides options for the components.
 */
export interface IWoltLabComponentOptionCollection
{
    /**
     * Provides generic component-options.
     */
    [componentName: string]: IWoltLabComponentOptions;
}
