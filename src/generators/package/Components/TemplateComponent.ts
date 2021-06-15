import { GeneratorOptions, IFileMapping, Question } from "@manuth/extended-yo-generator";
import type { TemplateInstruction } from "@manuth/woltlab-compiler";
import { ApplicationPrompt } from "../../../Components/Inquiry/Prompts/ApplicationPrompt";
import { PathPrompt } from "../../../Components/Inquiry/Prompts/PathPrompt";
import { InstructionComponent } from "../../../Components/InstructionComponent";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { TemplateInstructionFileMapping } from "../FileMappings/TemplateInstructionFileMapping";
import { PackageComponentType } from "../Settings/PackageComponentType";
import { ITemplateComponentOptions } from "./ITemplateComponentOptions";

/**
 * Provides a component for generating templates.
 */
export class TemplateComponent<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends ITemplateComponentOptions> extends InstructionComponent<TSettings, TOptions, TComponentOptions>
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
    protected override get ComponentOptionQuestionCollection(): Array<Question<TComponentOptions>>
    {
        return [
            ...super.ComponentOptionQuestionCollection,
            {
                type: ApplicationPrompt.TypeName,
                name: "Application",
                message: "What application do you want to upload the templates to?"
            },
            {
                type: PathPrompt.TypeName,
                name: "Source",
                message: "Where do you want to store the templates?"
            }
        ] as Array<Question<ITemplateComponentOptions>>;
    }

    /**
     * @inheritdoc
     */
    public get InstructionFileName(): string
    {
        return this.WoltLabGenerator.componentPath("Templates.ts");
    }

    /**
     * @inheritdoc
     */
    public get ClassName(): string
    {
        return nameof<TemplateInstruction>();
    }

    /**
     * @inheritdoc
     */
    public get ID(): string
    {
        return PackageComponentType.Template;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "Templates";
    }

    /**
     * @inheritdoc
     */
    public get VariableName(): string
    {
        return `My${nameof<TemplateInstruction>()}`;
    }

    /**
     * @inheritdoc
     */
    public override get FileMappings(): Array<IFileMapping<TSettings, TOptions>>
    {
        return [
            ...super.FileMappings,
            new TemplateInstructionFileMapping(this)
        ];
    }
}
