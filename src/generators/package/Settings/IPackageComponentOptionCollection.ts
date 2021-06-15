import { IWoltLabComponentOptionCollection } from "../../../Settings/IWoltLabComponentOptionCollection";
import { ITemplateComponentOptions } from "../Components/ITemplateComponentOptions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TemplateComponent } from "../Components/TemplateComponent";
import { PackageComponentType } from "./PackageComponentType";

/**
 * Provides component-options for a WoltLab-package.
 */
export interface IPackageComponentOptionCollection extends IWoltLabComponentOptionCollection
{
    /**
     * Provides options for the {@link TemplateComponent `TemplateComponent`}.
     */
    [PackageComponentType.Template]: ITemplateComponentOptions;
}
