import { GeneratorOptions } from "@manuth/extended-yo-generator";
// eslint-disable-next-line node/no-unpublished-import
import { INodeSystemInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, printNode, ts } from "ts-morph";
import { FileInstructionComponent } from "../Components/FileInstructionComponent";
import { IWoltLabComponentOptions } from "../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings";
import { FileInstructionMapping } from "./FileInstructionMapping";

/**
 * Provides the functionality to generate instruction-files containing nodes.
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
     * Gets the options to pass to the instruction-constructor.
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
