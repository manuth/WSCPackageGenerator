import { GeneratorOptions, IGeneratorSettings } from "@manuth/extended-yo-generator";
import { CodeWorkspaceComponent } from "@manuth/generator-ts-project";

/**
 * Provides a code-workspace.
 *
 * @template TSettings
 * The type of the settings of the generator.
 *
 * @template TOptions
 * The type of the options of the generator.
 */
export interface ICodeWorkspaceProvider<TSettings extends IGeneratorSettings, TOptions extends GeneratorOptions>
{
    /**
     * A code-workspace component.
     */
    WorkspaceComponent: CodeWorkspaceComponent<TSettings, TOptions>;
}
