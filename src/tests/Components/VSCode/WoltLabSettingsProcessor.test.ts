import { ok } from "node:assert";
import { GeneratorOptions, Predicate } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { ITSProjectSettings } from "@manuth/generator-ts-project";
import { WoltLabSettingsProcessor } from "../../../Components/VSCode/WoltLabSettingsProcessor.js";
import { WoltLabPackageGenerator } from "../../../generators/package/WoltLabPackageGenerator.js";
import { ICodeWorkspaceProvider } from "./ICodeWorkspaceProvider.js";

/**
 * Registers tests for the {@link WoltLabSettingsProcessor `WoltLabSettingsProcessor<TSettings, TOptions>`} class.
 *
 * @param context
 * The test-context.
 *
 * @param workspaceProvider
 * A code-workspace component.
 */
export function WoltLabSettingsProcessorTests(context: TestContext<WoltLabPackageGenerator>, workspaceProvider: ICodeWorkspaceProvider<ITSProjectSettings, GeneratorOptions>): void
{
    suite(
        nameof(WoltLabSettingsProcessor),
        () =>
        {
            /**
             * Provides an implementation of the {@link WoltLabSettingsProcessor `WoltLabSettingsProcessor<TSettings, TOptions>`} class for testing.
             */
            class TestWoltLabSettingsProcessor extends WoltLabSettingsProcessor<ITSProjectSettings, GeneratorOptions>
            {
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
                public override async FilterSetting(key: string, value: any): Promise<boolean>
                {
                    return super.FilterSetting(key, value);
                }
            }

            let processor: TestWoltLabSettingsProcessor;

            suiteSetup(
                () =>
                {
                    processor = new TestWoltLabSettingsProcessor(workspaceProvider.WorkspaceComponent);
                });

            suite(
                nameof<TestWoltLabSettingsProcessor>((processor) => processor.FilterSetting),
                () =>
                {
                    test(
                        "Checking whether settings for the mocha test-explorer are excluded…",
                        async () =>
                        {
                            let predicate: Predicate<string> = (setting) =>
                            {
                                return setting.startsWith("mochaExplorer.");
                            };

                            for (let entry of Object.entries(await processor.Component.GetSettingsMetadata()))
                            {
                                if (predicate(entry[0]))
                                {
                                    ok(!await processor.FilterSetting(entry[0], entry[1]));
                                }
                            }
                        });
                });
        });
}
