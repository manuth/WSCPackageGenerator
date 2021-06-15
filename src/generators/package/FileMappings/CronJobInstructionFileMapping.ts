import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { ICronJobInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, printNode, ts } from "ts-morph";
import { InstructionComponent } from "../../../Components/InstructionComponent";
import { XMLInstructionFileMapping } from "../../../FileMappings/XMLInstructionFileMapping";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";

/**
 * Provides the functionality to generate cron-job instruction files.
 */
export class CronJobInstructionFileMapping<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends XMLInstructionFileMapping<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link CronJobInstructionFileMapping `CronJobInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param component
     * The component to create an instruction-file for.
     */
    public constructor(component: InstructionComponent<TSettings, TOptions, TComponentOptions>)
    {
        super(component);
    }

    /**
     * @inheritdoc
     */
    protected override get InstructionOptions(): ObjectLiteralExpression
    {
        let options = super.InstructionOptions;

        options.addPropertyAssignment(
            {
                name: nameof<ICronJobInstructionOptions>((instruction) => instruction.CronJobs),
                initializer: printNode(ts.factory.createArrayLiteralExpression())
            });

        return options;
    }

    /**
     * @inheritdoc
     */
    protected override get XMLFileName(): string
    {
        return "cronJobs.xml";
    }
}