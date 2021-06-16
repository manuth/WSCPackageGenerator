import { join } from "path";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { IApplicationFileSystemInstructionOptions } from "@manuth/woltlab-compiler";
import { ObjectLiteralExpression, printNode, SourceFile, ts } from "ts-morph";
import { LocalInstructionComponent } from "../../../Components/LocalInstructionComponent";
import { LocalFileInstructionMapping } from "../../../FileMappings/LocalFileInstructionMapping";
import { IFileUploadComponentOptions } from "../../../Settings/IFileUploadComponentOptions";
import { IWoltLabGeneratorSettings } from "../../../Settings/IWoltLabGeneratorSettings";

/**
 * Provides the functionality to generate template instruction files.
 */
export class TemplateInstructionFileMapping<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions, TComponentOptions extends IFileUploadComponentOptions> extends LocalFileInstructionMapping<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link TemplateInstructionFileMapping `TemplateInstructionFileMapping<TSettings, TOptions, TComponentOptions>`} class.
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
