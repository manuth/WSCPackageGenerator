import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { IApplicationFileSystemInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, printNode, ts } from "ts-morph";
import { LocalInstructionComponent } from "../Components/LocalInstructionComponent";
import { IFileUploadComponentOptions } from "../Settings/IFileUploadComponentOptions";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings";
import { LocalFileInstructionMapping } from "./LocalFileInstructionMapping";

/**
 * Provides the functionality to generate instruction-files for file-upload instructions.
 *
 * @template TSettings
 * The type of the generator-settings.
 *
 * @template TOptions
 * The type of the generator-options.
 *
 * @template TComponentOptions
 * The type of the component-options.
 */
export class FileUploadMapping<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IFileUploadComponentOptions> extends LocalFileInstructionMapping<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link FileUploadMapping `FileUploadMapping<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param component
     * The component to create an instruction-file for.
     */
    public constructor(component: LocalInstructionComponent<TSettings, TOptions, TComponentOptions>)
    {
        super(component);
    }

    /**
     * Gets the options to pass to the instruction-constructor.
     */
    protected override get InstructionOptions(): ObjectLiteralExpression
    {
        let options = super.InstructionOptions;

        options.insertPropertyAssignment(
            options.getProperty(nameof(this.Component.ComponentOptions.Source)).getChildIndex(),
            {
                name: nameof<IApplicationFileSystemInstructionOptions>((instruction) => instruction.Application),
                initializer: printNode(ts.factory.createStringLiteral(this.Component.ComponentOptions.Application))
            });

        return options;
    }
}
