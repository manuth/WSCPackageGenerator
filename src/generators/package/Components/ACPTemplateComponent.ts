import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { ACPTemplateInstruction } from "@manuth/woltlab-compiler";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { PackageComponentType } from "../Settings/PackageComponentType";
import { ITemplateComponentOptions } from "./ITemplateComponentOptions";
import { TemplateComponent } from "./TemplateComponent";

/**
 * Provides a component for generating acp-templates.
 */
export class ACPTemplateComponent<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends ITemplateComponentOptions> extends TemplateComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link TemplateComponent `TemplaceComponent<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     */
    // ToDo: Replace `any` w/ `TSettings`
    public constructor(generator: WoltLabGenerator<any, TOptions>)
    {
        super(generator);
    }

    /**
     * @inheritdoc
     */
    public override get ClassName(): string
    {
        return nameof<ACPTemplateInstruction>();
    }

    /**
     * @inheritdoc
     */
    public override get ID(): string
    {
        return PackageComponentType.ACPTemplate;
    }

    /**
     * @inheritdoc
     */
    public override get DisplayName(): string
    {
        return "ACP-Templates";
    }

    /**
     * @inheritdoc
     */
    public override get VariableName(): string
    {
        return `My${nameof<ACPTemplateInstruction>()}`;
    }

    /**
     * @inheritdoc
     */
    protected override get DefaultSourceFolderName(): string
    {
        return "acpTemplates";
    }
}
