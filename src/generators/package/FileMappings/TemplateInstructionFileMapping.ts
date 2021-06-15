import { join } from "path";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { ObjectLiteralExpression, printNode, SourceFile, ts } from "ts-morph";
import { InstructionComponent } from "../../../Components/InstructionComponent";
import { InstructionFileMapping } from "../../../FileMappings/InstructionFileMapping";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";
import { ITemplateComponentOptions } from "../Components/ITemplateComponentOptions";

/**
 * Provides the functionality to generate template instruction files.
 */
export class TemplateInstructionFileMapping<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends ITemplateComponentOptions> extends InstructionFileMapping<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link TemplateInstructionFileMapping `TemplateInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param component
     * The component to create an instruction-file for.
     */
    public constructor(component: InstructionComponent<TSettings, TOptions, TComponentOptions>)
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
                    name: nameof(this.Component.ComponentOptions.Application),
                    initializer: printNode(ts.factory.createStringLiteral(this.Component.ComponentOptions.Application))
                },
                {
                    name: nameof(this.Component.ComponentOptions.Source),
                    initializer: this.GetPathJoin(this.Component.ComponentOptions.Source)
                }
            ]);

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
        file.addImportDeclaration(
            {
                moduleSpecifier: "path",
                namedImports: [
                    {
                        name: nameof(join)
                    }
                ]
            });

        return super.Transform(file);
    }
}
