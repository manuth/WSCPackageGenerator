import { ILocalComponentOptions } from "../../../Settings/ILocalComponentOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TemplateComponent } from "./TemplateComponent";

/**
 * Provides options for the {@link TemplateComponent `TemplateComponent<TSettings, TOptions, TComponentOptions>`}
 */
export interface ITemplateComponentOptions extends ILocalComponentOptions
{
    /**
     * The application to upload the templates to.
     */
    Application: string;
}
