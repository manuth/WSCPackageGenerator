import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { CodeWorkspaceComponent, ITSProjectSettings, TSProjectLaunchSettingsProcessor } from "@manuth/generator-ts-project";
import { DebugConfiguration } from "vscode";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WoltLabGenerator } from "../../WoltLabGenerator";

/**
 * Provides the functionality to process debug-configurations for {@link WoltLabGenerator `WoltLabGenerator<TSettings, TOptions>`}s.
 */
export class WoltLabLaunchSettingsProcessor<TSettings extends ITSProjectSettings, TOptions extends GeneratorOptions> extends TSProjectLaunchSettingsProcessor<TSettings, TOptions>
{
    /**
     * Initializes a new instance of the {@link WoltLabLaunchSettingsProcessor `WoltLabLaunchSettingsProcessor<TSettings, TOptions>`} class.
     *
     * @param component
     * The component of the processor.
     */
    public constructor(component: CodeWorkspaceComponent<TSettings, TOptions>)
    {
        super(component);
    }

    /**
     * Determines whether a debug-configuration should be included.
     *
     * @param debugConfig
     * The debug-configuration to filter.
     *
     * @returns
     * A value indicating whether the debug-configuration should be included.
     */
    protected override async FilterDebugConfig(debugConfig: DebugConfiguration): Promise<boolean>
    {
        return false;
    }
}
