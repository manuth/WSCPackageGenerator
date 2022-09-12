import { GeneratorOptions } from "@manuth/extended-yo-generator";
// eslint-disable-next-line node/no-unpublished-import
import { INodeSystemInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, printNode, ts } from "ts-morph";
import { FileInstructionComponent } from "../Components/FileInstructionComponent.js";
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions.js";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings.js";
import { FileInstructionMapping } from "./FileInstructionMapping.js";

/**
 * Provides the functionality to generate instruction-files containing nodes.
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
export class NodeInstructionFileMapping<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends FileInstructionMapping<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link NodeInstructionFileMapping `NodeInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
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

        options.addPropertyAssignments(
            [
                {
                    name: nameof<INodeSystemInstructionOptions<any>>((instruction) => instruction.Nodes),
                    initializer: printNode(ts.factory.createArrayLiteralExpression())
                }
            ]);

        return options;
    }
}
