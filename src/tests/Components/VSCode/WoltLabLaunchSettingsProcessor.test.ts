import { ok } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { ITSProjectSettings } from "@manuth/generator-ts-project";
import { DebugConfiguration } from "vscode";
import { WoltLabLaunchSettingsProcessor } from "../../../Components/VSCode/WoltLabLaunchSettingsProcessor.js";
import { WoltLabPackageGenerator } from "../../../generators/package/WoltLabPackageGenerator.js";
import { ICodeWorkspaceProvider } from "./ICodeWorkspaceProvider.js";

/**
 * Registers tests for the {@link WoltLabLaunchSettingsProcessor `WoltLabLaunchSettingsProcessor<TSettings, TOptions>`} class.
 *
 * @param context
 * The test-context.
 *
 * @param workspaceProvider
 * A code-workspace component.
 */
export function WoltLabLaunchSettingsProcessorTests(context: TestContext<WoltLabPackageGenerator>, workspaceProvider: ICodeWorkspaceProvider<ITSProjectSettings, GeneratorOptions>): void
{
    suite(
        nameof(WoltLabLaunchSettingsProcessor),
        () =>
        {
            /**
             * Provides an implementation of the {@link WoltLabLaunchSettingsProcessor `WoltLabLaunchSettingsProcessor<TSettings, TOptions>`} class for testing.
             */
            class TestWoltLabLaunchSettingsProcessor extends WoltLabLaunchSettingsProcessor<ITSProjectSettings, GeneratorOptions>
            {
                /**
                 * @inheritdoc
                 *
                 * @param debugConfig
                 * The debug-configuration to filter.
                 *
                 * @returns
                 * A value indicating whether the debug-configuration should be included.
                 */
                public override async FilterDebugConfig(debugConfig: DebugConfiguration): Promise<boolean>
                {
                    return super.FilterDebugConfig(debugConfig);
                }
            }

            let processor: TestWoltLabLaunchSettingsProcessor;

            suiteSetup(
                () =>
                {
                    processor = new TestWoltLabLaunchSettingsProcessor(workspaceProvider.WorkspaceComponent);
                });

            suite(
                nameof<TestWoltLabLaunchSettingsProcessor>((processor) => processor.FilterDebugConfig),
                () =>
                {
                    test(
                        "Checking whether all debug-configurations are excluded…",
                        async () =>
                        {
                            for (let debugConfig of (await processor.Component.GetLaunchMetadata()).configurations)
                            {
                                ok(!await processor.FilterDebugConfig(debugConfig));
                            }
                        });
                });
        });
}
