// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ACPTemplateComponent } from "../Components/ACPTemplateComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TemplateComponent } from "../Components/TemplateComponent";

/**
 * Represents a type of a WoltLab-package component.
 */
export enum PackageComponentType
{
    /**
     * Indicates the {@link TemplateComponent `TemplateComponent`}.
     */
    Template = "woltlabPackageTemplate",

    /**
     * Indicates the {@link ACPTemplateComponent}
     */
    ACPTemplate = "woltLabPackageACPTemplate"
}
