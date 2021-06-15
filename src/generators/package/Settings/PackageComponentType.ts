// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ACPTemplateComponent } from "../Components/ACPTemplateComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BBCodeComponent } from "../Components/BBCodeComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TemplateComponent } from "../Components/TemplateComponent";

/**
 * Represents a type of a WoltLab-package component.
 */
export enum PackageComponentType
{
    /**
     * Indicates the {@link BBCodeComponent `BBCodeComponent<TSettings, TOptions, TComponentOptions>`}
     */
    BBCode = "woltlabPackageBBCode",

    /**
     * Indicates the {@link TemplateComponent `TemplateComponent<TSettings, TOptions, TComponentOptions>`}.
     */
    Template = "woltlabPackageTemplate",

    /**
     * Indicates the {@link ACPTemplateComponent `ACPTemplateComponent<TSettings, TOptions, TComponentOptions>`}
     */
    ACPTemplate = "woltLabPackageACPTemplate"
}
