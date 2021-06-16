import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { ICronJobInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, printNode, ts } from "ts-morph";
import { FileInstructionComponent } from "../../../Components/FileInstructionComponent";
import { FileInstructionMapping } from "../../../FileMappings/FileInstructionMapping";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings";

/**
 * Provides the functionality to generate cron-job instruction files.
 */
export class CronJobInstructionFileMapping<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends FileInstructionMapping<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link CronJobInstructionFileMapping `CronJobInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param component
     * The component to create an instruction-file for.
     */
    public constructor(component: FileInstructionComponent<TSettings, TOptions, TComponentOptions>)
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
}
