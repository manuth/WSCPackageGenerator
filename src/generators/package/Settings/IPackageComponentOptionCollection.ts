import { IFileUploadComponentOptions } from "../../../Settings/IFileUploadComponentOptions";
import { IWoltLabComponentOptionCollection } from "../../../Settings/IWoltLabComponentOptionCollection";
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
    [PackageComponentType.Template]: IFileUploadComponentOptions;
}
