import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
import { CronJobInstruction } from "@manuth/woltlab-compiler";
import { InstructionComponent } from "../../../Components/InstructionComponent";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { CronJobInstructionFileMapping } from "../FileMappings/CronJobInstructionFileMapping";
import { PackageComponentType } from "../Settings/PackageComponentType";

/**
 * Provides a component for generating cron-jobs.
 */
export class CronJobComponent<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends InstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link CronJobComponent `CronJobComponent<TSettings, TOptions, TComponentOptions>`} class.
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
        return nameof<CronJobInstruction>();
    }

    /**
     * @inheritdoc
     */
    public get ID(): string
    {
        return PackageComponentType.CronJob;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "Cron-Jobs";
    }

    /**
     * @inheritdoc
     */
    public get VariableName(): string
    {
        return `My${nameof<CronJobInstruction>()}`;
    }

    /**
     * @inheritdoc
     */
    protected get InstructionFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return new CronJobInstructionFileMapping(this);
    }
}