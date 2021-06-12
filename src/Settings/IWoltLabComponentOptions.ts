import { WoltLabComponentKey } from "./WoltLabComponentKey";

/**
 * Represents options of a component.
 */
export interface IWoltLabComponentOptions
{
    /**
     * The path to save the component to.
     */
    [WoltLabComponentKey.Path]: string;
}
