import { basename } from "path";
import { fileURLToPath } from "url";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { ITSProjectSettings, TSProjectCodeWorkspaceFolder, TSProjectGenerator } from "@manuth/generator-ts-project";
import { dependencyPath } from "dependency-package-path";
import { WoltLabPackageGenerator } from "../../../generators/package/WoltLabPackageGenerator.js";
import { ICodeWorkspaceProvider } from "./ICodeWorkspaceProvider.js";
import { WoltLabExtensionsProcessorTests } from "./WoltLabExtensionsProcessor.test.js";
import { WoltLabLaunchSettingsProcessorTests } from "./WoltLabLaunchSettingsProcessor.test.js";
import { WoltLabSettingsProcessorTests } from "./WoltLabSettingsProcessor.test.js";
import { WoltLabTasksProcessorTests } from "./WoltLabTasksProcessor.test.js";
import { WoltLabWorkspaceProcessorTests } from "./WoltLabWorkspaceProcessor.test.js";

const dirName = fileURLToPath(new URL(".", import.meta.url));

/**
 * Registers tests for vscode-components.
 *
 * @param context
 * The test-context.
 */
export function VSCodeTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        basename(dirName),
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
                                resolved: dependencyPath("@manuth/generator-ts-project", dirName)
                            }));
                });

            WoltLabExtensionsProcessorTests(context, workspaceProvider);
            WoltLabLaunchSettingsProcessorTests(context, workspaceProvider);
            WoltLabSettingsProcessorTests(context, workspaceProvider);
            WoltLabTasksProcessorTests(context, workspaceProvider);
            WoltLabWorkspaceProcessorTests(context, workspaceProvider);
        });
}
