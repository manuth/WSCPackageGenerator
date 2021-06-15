import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
import type { BBCodeInstruction } from "@manuth/woltlab-compiler";
import { InstructionComponent } from "../../../Components/InstructionComponent";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { BBCodeInstructionFileMapping } from "../FileMappings/BBCodeInstructionFileMapping";
import { PackageComponentType } from "../Settings/PackageComponentType";

/**
 * Provides a component for generating bb-codes.
 */
export class BBCodeComponent<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends InstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link BBCodeComponent `BBCodeComponent<TSettings, TOptions, TComponentOptions>`} class.
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
    public get ClassName(): string
    {
        return nameof<BBCodeInstruction>();
    }

    /**
     * @inheritdoc
     */
    public get ID(): string
    {
        return PackageComponentType.BBCode;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "BB-Codes";
    }

    /**
     * @inheritdoc
     */
    public get VariableName(): string
    {
        return `My${nameof<BBCodeInstruction>()}`;
    }

    /**
     * @inheritdoc
     */
    protected get InstructionFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return new BBCodeInstructionFileMapping(this);
    }
}
