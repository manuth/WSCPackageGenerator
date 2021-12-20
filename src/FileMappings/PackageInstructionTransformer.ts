import { EOL } from "os";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
// eslint-disable-next-line node/no-unpublished-import
import { IPackageOptions } from "@manuth/woltlab-compiler";
import { ArrayLiteralExpression, ObjectLiteralExpression, printNode, SourceFile, SyntaxKind, ts } from "ts-morph";
import { InstructionComponent } from "../Components/InstructionComponent";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings";
import { WoltLabComponentSettingKey } from "../Settings/WoltLabComponentSettingKey";

/**
 * Provides the functionality to add an instruction to the package-file.
 *
 * @template TSettings
 * The type of the settings of the generator.
 *
 * @template TOptions
 * The type of the options of the generator.
 */
export class PackageInstructionTransformer<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions>
{
    /**
     * The component to add an instruction for.
     */
    private component: InstructionComponent<TSettings, TOptions, any>;

    /**
     * Initializes a new instance of the {@link PackageInstructionTransformer `PackageInstructionTransformer<TSettings, TOptions>`} class.
     *
     * @param component
     * The component to add an instruction for.
     */
    public constructor(component: InstructionComponent<TSettings, TOptions, any>)
    {
        this.component = component;
    }

    /**
     * Gets the component to add an instruction for.
     */
    protected get Component(): InstructionComponent<TSettings, TOptions>
    {
        return this.component;
    }

    /**
     * Transforms the specified {@link file `file`}.
     *
     * @param file
     * The source-file to transform.
     *
     * @returns
     * The transformed file.
     */
    public Transform(file: SourceFile): void
    {
        let packageOptions: ObjectLiteralExpression;
        let installSet: ObjectLiteralExpression;
        let installInstructions: ArrayLiteralExpression;
        let installSetKey = nameof<IPackageOptions>((options) => options.InstallSet);
        let installInstructionKey = nameof<IPackageOptions>((options) => options.InstallSet.Instructions);

        let moduleFileName = file.getRelativePathAsModuleSpecifierTo(
            this.Component.Generator.destinationPath(this.Component.ComponentOptions[WoltLabComponentSettingKey.Path]));

        file.addImportDeclaration(
            {
                moduleSpecifier: moduleFileName,
                namedImports: [
                    {
                        name: this.Component.VariableName
                    }
                ]
            });

        packageOptions = file.getVariableDeclaration(
            this.Component.Generator.PackageVariableName
        ).getInitializerIfKindOrThrow(
            SyntaxKind.NewExpression
        ).getArguments()[0].asKindOrThrow(SyntaxKind.ObjectLiteralExpression);

        try
        {
            installSet = packageOptions.getProperty(installSetKey).asKindOrThrow(SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
        }
        catch
        {
            packageOptions.getProperty(installSetKey)?.remove();

            installSet = packageOptions.addPropertyAssignment(
                {
                    name: installSetKey,
                    initializer: printNode(ts.factory.createObjectLiteralExpression())
                }).getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
        }

        try
        {
            installInstructions = installSet.getProperty(installInstructionKey).asKindOrThrow(SyntaxKind.PropertyAssignment).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
        }
        catch
        {
            installSet.getProperty(installInstructionKey)?.remove();

            installInstructions = installSet.addPropertyAssignment(
                {
                    name: installInstructionKey,
                    initializer: printNode(ts.factory.createArrayLiteralExpression())
                }).getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
        }

        let prefix = installInstructions.getElements().length === 0 ? EOL : "";
        installInstructions.addElement(prefix + printNode(ts.factory.createIdentifier(this.Component.VariableName)) + EOL);
    }
}
