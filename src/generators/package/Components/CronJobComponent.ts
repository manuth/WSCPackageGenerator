import { GeneratorOptions, IFileMapping } from "@manuth/extended-yo-generator";
// eslint-disable-next-line node/no-unpublished-import
import type { CronJobInstruction } from "@manuth/woltlab-compiler";
import { FileInstructionComponent } from "../../../Components/FileInstructionComponent.js";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings.js";
import { WoltLabGenerator } from "../../../WoltLabGenerator.js";
import { CronJobInstructionFileMapping } from "../FileMappings/CronJobInstructionFileMapping.js";
import { PackageComponentType } from "../Settings/PackageComponentType.js";

/**
 * Provides a component for generating cron-jobs.
 *
 * @template TSettings
 * The type of the settings of the generator.
 *
 * @template TOptions
 * The type of the options of the generator.
 *
 * @template TComponentOptions
 * The type of the options of the component.
 */
export class CronJobComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends FileInstructionComponent<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link CronJobComponent `CronJobComponent<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>)
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
    public get OutputFileName(): string
    {
        return "cronJobs.xml";
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
    protected get InstructionFileMapping(): IFileMapping<TSettings, TOptions>
    {
        return new CronJobInstructionFileMapping(this);
    }
}
