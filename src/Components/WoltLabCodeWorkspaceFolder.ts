import { GeneratorOptions, ObjectExtensionFactory } from "@manuth/extended-yo-generator";
import { CodeWorkspaceProvider, IWorkspaceMetadata, JSONProcessor, TSProjectCodeWorkspaceFolder } from "@manuth/generator-ts-project";
import { IWoltLabSettings } from "../Settings/IWoltLabSettings";
import { WoltLabGenerator } from "../WoltLabGenerator";
import { WoltLabWorkspaceProcessor } from "./VSCode/WoltLabWorkspaceProcessor";

/**
 * Provides a component for creating a code-workspace for {@link WoltLabGenerator `WoltLabGenerator<TSettings, TOptions>`}s.
 */
export class WoltLabCodeWorkspaceFolder<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions> extends ObjectExtensionFactory.Create(TSProjectCodeWorkspaceFolder)<TSettings, TOptions>
{
    /**
     * The base code-workspace folder.
     */
    private codeWorkspaceFolder: TSProjectCodeWorkspaceFolder<TSettings, TOptions>;

    /**
     * Initializes a new instance of the {@link WoltLabCodeWorkspaceFolder `WoltLabCodeWorkspaceFolder<TSettings, TOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     *
     * @param codeWorkspaceFolder
     * The base code-workspace folder.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>, codeWorkspaceFolder: TSProjectCodeWorkspaceFolder<TSettings, TOptions>)
    {
        super(generator);
        this.codeWorkspaceFolder = codeWorkspaceFolder;
    }

    /**
     * @inheritdoc
     */
    public override get Source(): CodeWorkspaceProvider<TSettings, TOptions>
    {
        return this.Base.Source;
    }

    /**
     * @inheritdoc
     */
    protected override get Base(): TSProjectCodeWorkspaceFolder<TSettings, TOptions>
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
    protected override InitializeBase(generator: WoltLabGenerator<TSettings, TOptions>): TSProjectCodeWorkspaceFolder<TSettings, TOptions>
    {
        return null;
    }
}
