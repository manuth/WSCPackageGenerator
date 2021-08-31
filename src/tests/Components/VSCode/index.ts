import { basename } from "path";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { ITSProjectSettings, TSProjectCodeWorkspaceFolder, TSProjectGenerator } from "@manuth/generator-ts-project";
import { WoltLabPackageGenerator } from "../../../generators/package/WoltLabPackageGenerator";
import { ICodeWorkspaceProvider } from "./ICodeWorkspaceProvider";
import { WoltLabExtensionsProcessorTests } from "./WoltLabExtensionsProcessor.test";
import { WoltLabLaunchSettingsProcessorTests } from "./WoltLabLaunchSettingsProcessor.test";
import { WoltLabSettingsProcessorTests } from "./WoltLabSettingsProcessor.test";
import { WoltLabTasksProcessorTests } from "./WoltLabTasksProcessor.test";

/**
 * Registers tests for vscode-components.
 *
 * @param context
 * The test-context.
 */
export function VSCodeTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        basename(__dirname),
        () =>
        {
            let workspaceProvider: ICodeWorkspaceProvider<ITSProjectSettings, GeneratorOptions> = {} as any;

            suiteSetup(
                () =>
                {
                    workspaceProvider.WorkspaceComponent = new TSProjectCodeWorkspaceFolder(
                        context.CreateGenerator(
                            TSProjectGenerator,
                            [],
                            {
                                resolved: require.resolve("@manuth/generator-ts-project")
                            }));
                });

            WoltLabExtensionsProcessorTests(context, workspaceProvider);
            WoltLabLaunchSettingsProcessorTests(context, workspaceProvider);
            WoltLabSettingsProcessorTests(context, workspaceProvider);
            WoltLabTasksProcessorTests(context, workspaceProvider);
        });
}
