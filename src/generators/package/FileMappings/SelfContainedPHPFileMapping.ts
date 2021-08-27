import { GeneratorOptions } from "@manuth/extended-yo-generator";
// eslint-disable-next-line node/no-unpublished-import
import { ISelfContainedPHPInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, printNode, ts } from "ts-morph";
import { LocalInstructionComponent } from "../../../Components/LocalInstructionComponent";
import { FileUploadMapping } from "../../../FileMappings/FileUploadMapping";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings";
import { IPHPScriptComponentOptions } from "../Settings/IPHPScriptComponentOptions";

/**
 * Provides the functionality to generate self-contained php script instructions.
 */
export class SelfContainedPHPFileMapping<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IPHPScriptComponentOptions> extends FileUploadMapping<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link SelfContainedPHPFileMapping `SelfContainedPHPFileMapping<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param component
     * The component to create an instruction-file for.
     */
    public constructor(component: LocalInstructionComponent<TSettings, TOptions, TComponentOptions>)
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
                name: nameof<ISelfContainedPHPInstructionOptions>((instruction) => instruction.Destination),
                initializer: printNode(ts.factory.createStringLiteral(this.Component.ComponentOptions.FileName))
            });

        return options;
    }
}
