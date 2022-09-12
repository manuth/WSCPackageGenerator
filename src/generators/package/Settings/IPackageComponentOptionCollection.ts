import { IFileUploadComponentOptions } from "../../../Settings/IFileUploadComponentOptions.js";
import { IWoltLabComponentOptionCollection } from "../../../Settings/IWoltLabComponentOptionCollection.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TemplateComponent } from "../Components/TemplateComponent.js";
import { PackageComponentType } from "./PackageComponentType.js";

/**
 * Provides component-options for a WoltLab-package.
 */
export interface IPackageComponentOptionCollection extends IWoltLabComponentOptionCollection
{
    /**
     * Provides options for the {@link TemplateComponent `TemplateComponent`}.
     */
    [PackageComponentType.Template]: IFileUploadComponentOptions;
}
