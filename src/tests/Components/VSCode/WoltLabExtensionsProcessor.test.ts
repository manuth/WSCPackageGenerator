import { ok } from "node:assert";
import { GeneratorOptions, Predicate } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { ITSProjectSettings } from "@manuth/generator-ts-project";
import { WoltLabExtensionsProcessor } from "../../../Components/VSCode/WoltLabExtensionsProcessor.js";
import { WoltLabPackageGenerator } from "../../../generators/package/WoltLabPackageGenerator.js";
import { ICodeWorkspaceProvider } from "./ICodeWorkspaceProvider.js";

/**
 * Registers tests for the {@link WoltLabExtensionsProcessor `WoltLabExtensionsProcessor<TSettings, TOptions>`} class.
 *
 * @param context
 * The test-context.
 *
 * @param workspaceProvider
 * A code-workspace component.
 */
export function WoltLabExtensionsProcessorTests(context: TestContext<WoltLabPackageGenerator>, workspaceProvider: ICodeWorkspaceProvider<ITSProjectSettings, GeneratorOptions>): void
{
    suite(
        nameof(WoltLabExtensionsProcessor),
        () =>
        {
            /**
             * Provides an implementation of the {@link WoltLabExtensionsProcessor `WoltLabExtensionsProcessor<TSettings, TOptions>`} class for testing.
             */
            class TestWoltLabExtensionsProcessor extends WoltLabExtensionsProcessor<ITSProjectSettings, GeneratorOptions>
            {
                /**
                 * @inheritdoc
                 *
                 * @param recommendations
                 * The recommendations to filter.
                 *
                 * @returns
                 * All necessary recommendations.
                 */
                public override async FilterRecommendations(recommendations: string[]): Promise<string[]>
                {
                    return super.FilterRecommendations(recommendations);
                }
            }

            let processor: TestWoltLabExtensionsProcessor;

            suiteSetup(
                () =>
                {
                    processor = new TestWoltLabExtensionsProcessor(workspaceProvider.WorkspaceComponent);
                });

            suite(
                nameof<TestWoltLabExtensionsProcessor>((processor) => processor.FilterRecommendations),
                () =>
                {
                    test(
                        "Checking whether recommendations related to the test-explorer are excluded…",
                        async () =>
                        {
                            let recommendations = (await processor.Component.GetExtensionsMetadata()).recommendations;

                            for (
                                let keyword of [
                                    "test-explorer",
                                    "test-adapter"
                                ])
                            {
                                let predicate: Predicate<string> = (recommendation) =>
                                {
                                    return recommendation.includes(keyword);
                                };

                                ok(recommendations.some(predicate));
                                ok(!(await processor.FilterRecommendations(recommendations)).some(predicate));
                            }
                        });
                });
        });
}
