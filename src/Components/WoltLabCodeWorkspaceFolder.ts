import { GeneratorOptions, ObjectExtensionFactory } from "@manuth/extended-yo-generator";
import { CodeWorkspaceProvider, ITSProjectSettings, IWorkspaceMetadata, JSONProcessor, TSProjectCodeWorkspaceFolder } from "@manuth/generator-ts-project";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings.js";
import { WoltLabGenerator } from "../WoltLabGenerator.js";
import { WoltLabWorkspaceProcessor } from "./VSCode/WoltLabWorkspaceProcessor.js";

/**
 * Provides a component for creating a code-workspace for {@link WoltLabGenerator `WoltLabGenerator<TSettings, TOptions>`}s.
 *
 * @template TSettings
 * The type of the settings of the generator.
 *
 * @template TOptions
 * The type of the options of the generator.
 */
export class WoltLabCodeWorkspaceFolder<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions> extends ObjectExtensionFactory.Create(TSProjectCodeWorkspaceFolder)<TSettings, TOptions>
{
    /**
     * The base code-workspace folder.
     */
    private codeWorkspaceFolder: TSProjectCodeWorkspaceFolder<ITSProjectSettings, GeneratorOptions>;

    /**
     * Initializes a new instance of the {@link WoltLabCodeWorkspaceFolder `WoltLabCodeWorkspaceFolder<TSettings, TOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     *
     * @param codeWorkspaceFolder
     * The base code-workspace folder.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>, codeWorkspaceFolder: TSProjectCodeWorkspaceFolder<ITSProjectSettings, GeneratorOptions>)
    {
        super(generator);
        this.codeWorkspaceFolder = codeWorkspaceFolder;
    }

    /**
     * @inheritdoc
     */
    public override get Source(): CodeWorkspaceProvider<TSettings, TOptions>
    {
        return this.Base.Source as CodeWorkspaceProvider<any, any> as CodeWorkspaceProvider<TSettings, TOptions>;
    }

    /**
     * @inheritdoc
     */
    protected override get Base(): TSProjectCodeWorkspaceFolder<ITSProjectSettings, GeneratorOptions>
    {
        return this.codeWorkspaceFolder;
    }

    /**
     * @inheritdoc
     */
    protected override get WorkspaceProcessor(): JSONProcessor<TSettings, TOptions, IWorkspaceMetadata>
    {
        return new WoltLabWorkspaceProcessor(this);
    }

    /**
     * @inheritdoc
     *
     * @param generator
     * The generator of the component.
     *
     * @returns
     * The newly created base.
     */
    protected override InitializeBase(generator: WoltLabGenerator<TSettings, TOptions>): TSProjectCodeWorkspaceFolder<ITSProjectSettings, GeneratorOptions>
    {
        return null;
    }
}
