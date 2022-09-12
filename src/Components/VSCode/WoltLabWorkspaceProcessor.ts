import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { CodeWorkspaceComponent, IExtensionSettings, ILaunchSettings, ITaskSettings, ITSProjectSettings, JSONProcessor, TSProjectWorkspaceProcessor } from "@manuth/generator-ts-project";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WoltLabGenerator } from "../../WoltLabGenerator.js";
import { WoltLabExtensionsProcessor } from "./WoltLabExtensionsProcessor.js";
import { WoltLabLaunchSettingsProcessor } from "./WoltLabLaunchSettingsProcessor.js";
import { WoltLabSettingsProcessor } from "./WoltLabSettingsProcessor.js";
import { WoltLabTasksProcessor } from "./WoltLabTasksProcessor.js";

/**
 * Provides the functionality to process code-workspaces for {@link WoltLabGenerator `WoltLabGenerator<TSettings, TOptions>`}s.
 *
 * @template TSettings
 * The type of the settings of the generator.
 *
 * @template TOptions
 * The type of the options of the generator.
 */
export class WoltLabWorkspaceProcessor<TSettings extends ITSProjectSettings, TOptions extends GeneratorOptions> extends TSProjectWorkspaceProcessor<TSettings, TOptions>
{
    /**
     * Initializes a new instance of the {@link WoltLabWorkspaceProcessor `WoltLabWorkspaceProcessor<TSettings, TOptions>`} class.
     *
     * @param component
     * The component of the processor.
     */
    public constructor(component: CodeWorkspaceComponent<TSettings, TOptions>)
    {
        super(component);
    }

    /**
     * @inheritdoc
     */
    protected override get ExtensionsProcessor(): JSONProcessor<TSettings, TOptions, IExtensionSettings>
    {
        return new WoltLabExtensionsProcessor(this.Component);
    }

    /**
     * @inheritdoc
     */
    protected override get LaunchSettingsProcessor(): JSONProcessor<TSettings, TOptions, ILaunchSettings>
    {
        return new WoltLabLaunchSettingsProcessor(this.Component);
    }

    /**
     * @inheritdoc
     */
    protected override get SettingsProcessor(): JSONProcessor<TSettings, TOptions, Record<string, unknown>>
    {
        return new WoltLabSettingsProcessor(this.Component);
    }

    /**
     * @inheritdoc
     */
    protected override get TasksProcessor(): JSONProcessor<TSettings, TOptions, ITaskSettings>
    {
        return new WoltLabTasksProcessor(this.Component);
    }
}
