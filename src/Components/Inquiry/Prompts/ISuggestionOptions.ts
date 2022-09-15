import { IWoltLabApplication } from "./IWoltLabApplication.js";

/**
 * Provides options for application-suggestions.
 */
export interface ISuggestionOptions
{
    /**
     * A value indicating whether the built-in suggestions should be displayed.
     */
    showBuiltinSuggestions?: boolean;

    /**
     * The suggested applications to display.
     */
    apps?: IWoltLabApplication[];
}
