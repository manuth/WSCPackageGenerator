import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { IPHPInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, printNode, ts } from "ts-morph";
import { InstructionComponent } from "../../../Components/InstructionComponent";
import { InstructionFileMapping } from "../../../FileMappings/InstructionFileMapping";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings";
import { IPHPScriptComponentOptions } from "../Settings/IPHPScriptComponentOptions";

/**
 * Provides the functionality to generate php instruction files.
 */
export class PHPInstructionFileMapping<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IPHPScriptComponentOptions> extends InstructionFileMapping<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link PHPInstructionFileMapping `PHPInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
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

        options.addPropertyAssignments(
            [
                {
                    name: nameof<IPHPInstructionOptions>((instruction) => instruction.Application),
                    initializer: printNode(ts.factory.createStringLiteral(this.Component.ComponentOptions.Application))
                },
                {
                    name: nameof<IPHPInstructionOptions>((instruction) => instruction.FileName),
                    initializer: printNode(ts.factory.createStringLiteral(this.Component.ComponentOptions.FileName))
                }
            ]);

        return options;
    }
}
