import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TemplateComponent } from "./TemplateComponent";

/**
 * Provides options for the {@link TemplateComponent `TemplateComponent<TSettings, TOptions, TComponentOptions>`}
 */
export interface ITemplateComponentOptions extends IWoltLabComponentOptions
{
    /**
     * The application to upload the templates to.
     */
    Application: string;

    /**
     * The path to load the templates from.
     */
    Source: string;
}
