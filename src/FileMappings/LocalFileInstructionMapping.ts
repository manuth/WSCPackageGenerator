import { GeneratorOptions } from "@manuth/extended-yo-generator";
// eslint-disable-next-line node/no-unpublished-import
import type { IFileSystemInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, SourceFile } from "ts-morph";
import { LocalInstructionComponent } from "../Components/LocalInstructionComponent.js";
import { ILocalComponentOptions } from "../Settings/ILocalComponentOptions.js";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings.js";
import { InstructionFileMapping } from "./InstructionFileMapping.js";

/**
 * Provides the functionality to generate instruction-files for local instructions.
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
export class LocalFileInstructionMapping<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends ILocalComponentOptions> extends InstructionFileMapping<TSettings, TOptions, TComponentOptions>
{
    /**
     * The component to create an instruction-file for.
     */
    private localInstructionComponent: LocalInstructionComponent<TSettings, TOptions, TComponentOptions>;

    /**
     * Initializes a new instance of the {@link LocalFileInstructionMapping `LocalFileInstructionMapping<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param component
     * The component to create an instruction-file for.
     */
    public constructor(component: LocalInstructionComponent<TSettings, TOptions, TComponentOptions>)
    {
        super(component);
        this.localInstructionComponent = component;
    }

    /**
     * @inheritdoc
     */
    protected override get Component(): LocalInstructionComponent<TSettings, TOptions, TComponentOptions>
    {
        return this.localInstructionComponent;
    }

    /**
     * @inheritdoc
     */
    protected override get InstructionOptions(): ObjectLiteralExpression
    {
        let options = super.InstructionOptions;

        options.addPropertyAssignment(
            {
                name: nameof<IFileSystemInstructionOptions>((instruction) => instruction.Source),
                initializer: this.GetPathJoin(this.Component.ComponentOptions.Source).getFullText()
            });

        return options;
    }

    /**
     * @inheritdoc
     *
     * @param file
     * The {@link SourceFile `SourceFile`} to transform.
     *
     * @returns
     * The transformed file.
     */
    protected override async Transform(file: SourceFile): Promise<SourceFile>
    {
        this.ApplyPathJoin(file);
        return super.Transform(file);
    }
}
