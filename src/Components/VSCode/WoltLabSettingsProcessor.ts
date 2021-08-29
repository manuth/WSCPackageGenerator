import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { CodeWorkspaceComponent, ITSProjectSettings, TSProjectSettingsProcessor } from "@manuth/generator-ts-project";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WoltLabGenerator } from "../../WoltLabGenerator";

/**
 * Provides the functionality to process settings for {@link WoltLabGenerator `WoltLabGenerator<TSettings, TOptions>`}s.
 */
export class WoltLabSettingsProcessor<TSettings extends ITSProjectSettings, TOptions extends GeneratorOptions> extends TSProjectSettingsProcessor<TSettings, TOptions>
{
    /**
     * Initializes a new instance of the {@link WoltLabSettingsProcessor `WoltLabSettingsProcessor<TSettings, TOptions>`} class.
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
     *
     * @param key
     * The key of the setting.
     *
     * @param value
     * The value of the setting to filter.
     *
     * @returns
     * A value indicating whether the setting with the specified key should be included.
     */
    protected override async FilterSetting(key: string, value: any): Promise<boolean>
    {
        return (await super.FilterSetting(key, value)) &&
            !key.startsWith("mochaExplorer.");
    }
}
