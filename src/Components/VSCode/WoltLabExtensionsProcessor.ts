import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { CodeWorkspaceComponent, ITSProjectSettings, TSProjectExtensionsProcessor } from "@manuth/generator-ts-project";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WoltLabGenerator } from "../../WoltLabGenerator.js";

/**
 * Provides the functionality to process extensions for {@link WoltLabGenerator `WoltLabGenerator<TSettings, TOptions>`}s.
 *
 * @template TSettings
 * The type of the settings of the generator.
 *
 * @template TOptions
 * The type of the options of the generator.
 */
export class WoltLabExtensionsProcessor<TSettings extends ITSProjectSettings, TOptions extends GeneratorOptions> extends TSProjectExtensionsProcessor<TSettings, TOptions>
{
    /**
     * Initializes a new instance of the {@link WoltLabExtensionsProcessor `WoltLabExtensionsProcessor<TSettings, TOptions>`} class.
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
     * @param recommendations
     * The recommendations to filter.
     *
     * @returns
     * All necessary recommendations.
     */
    protected override async FilterRecommendations(recommendations: string[]): Promise<string[]>
    {
        return (await super.FilterRecommendations(recommendations)).filter(
            (extension) =>
            {
                return !(
                    extension.includes("test-explorer") ||
                    extension.includes("test-adapter"));
            });
    }
}
