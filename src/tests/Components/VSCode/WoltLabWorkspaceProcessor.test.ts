import { ok } from "assert";
import { Constructor, GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { IExtensionSettings, ILaunchSettings, ITaskSettings, ITSProjectSettings, JSONProcessor } from "@manuth/generator-ts-project";
import { WoltLabExtensionsProcessor } from "../../../Components/VSCode/WoltLabExtensionsProcessor.js";
import { WoltLabLaunchSettingsProcessor } from "../../../Components/VSCode/WoltLabLaunchSettingsProcessor.js";
import { WoltLabSettingsProcessor } from "../../../Components/VSCode/WoltLabSettingsProcessor.js";
import { WoltLabTasksProcessor } from "../../../Components/VSCode/WoltLabTasksProcessor.js";
import { WoltLabWorkspaceProcessor } from "../../../Components/VSCode/WoltLabWorkspaceProcessor.js";
import { WoltLabPackageGenerator } from "../../../generators/package/WoltLabPackageGenerator.js";
import { ICodeWorkspaceProvider } from "./ICodeWorkspaceProvider.js";

/**
 * Registers tests for the {@link WoltLabWorkspaceProcessor `WoltLabWorkspaceProcessor<TSettings, TOptions>`} class.
 *
 * @param context
 * The test-context.
 *
 * @param workspaceProvider
 * A code-workspace component.
 */
export function WoltLabWorkspaceProcessorTests(context: TestContext<WoltLabPackageGenerator>, workspaceProvider: ICodeWorkspaceProvider<ITSProjectSettings, GeneratorOptions>): void
{
    suite(
        nameof(WoltLabWorkspaceProcessor),
        () =>
        {
            /**
             * Provides an implementation of the {@link WoltLabWorkspaceProcessor `WoltLabWorkspaceProcessor<TSettings, TOptions>`} class for testing.
             */
            class TestWoltLabWorkspaceProcessor extends WoltLabWorkspaceProcessor<ITSProjectSettings, GeneratorOptions>
            {
                /**
                 * @inheritdoc
                 */
                public override get ExtensionsProcessor(): JSONProcessor<ITSProjectSettings, GeneratorOptions, IExtensionSettings>
                {
                    return super.ExtensionsProcessor;
                }

                /**
                 * @inheritdoc
                 */
                public override get LaunchSettingsProcessor(): JSONProcessor<ITSProjectSettings, GeneratorOptions, ILaunchSettings>
                {
                    return super.LaunchSettingsProcessor;
                }

                /**
                 * @inheritdoc
                 */
                public override get SettingsProcessor(): JSONProcessor<ITSProjectSettings, GeneratorOptions, Record<string, unknown>>
                {
                    return super.SettingsProcessor;
                }

                /**
                 * @inheritdoc
                 */
                public override get TasksProcessor(): JSONProcessor<ITSProjectSettings, GeneratorOptions, ITaskSettings>
                {
                    return super.TasksProcessor;
                }
            }

            let processor: TestWoltLabWorkspaceProcessor;

            suiteSetup(
                () =>
                {
                    processor = new TestWoltLabWorkspaceProcessor(workspaceProvider.WorkspaceComponent);
                });

            let predicates = [
                [
                    nameof<TestWoltLabWorkspaceProcessor>((processor) => processor.ExtensionsProcessor),
                    WoltLabExtensionsProcessor
                ],
                [
                    nameof<TestWoltLabWorkspaceProcessor>((processor) => processor.LaunchSettingsProcessor),
                    WoltLabLaunchSettingsProcessor
                ],
                [
                    nameof<TestWoltLabWorkspaceProcessor>((processor) => processor.SettingsProcessor),
                    WoltLabSettingsProcessor
                ],
                [
                    nameof<TestWoltLabWorkspaceProcessor>((processor) => processor.TasksProcessor),
                    WoltLabTasksProcessor
                ]
            ] as Array<[keyof TestWoltLabWorkspaceProcessor, Constructor<any>]>;

            for (let predicate of predicates)
            {
                suite(
                    predicate[0],
                    () =>
                    {
                        test(
                            `Checking whether the \`${predicate[0]}\` has the correct type…`,
                            () =>
                            {
                                ok(processor[predicate[0]] instanceof predicate[1]);
                            });
                    });
            }
        });
}
