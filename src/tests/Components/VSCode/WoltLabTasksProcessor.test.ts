import { deepStrictEqual, ok, strictEqual } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { ITSProjectSettings } from "@manuth/generator-ts-project";
import { TaskDefinition } from "vscode";
import { WoltLabTasksProcessor } from "../../../Components/VSCode/WoltLabTasksProcessor";
import { WoltLabPackageGenerator } from "../../../generators/package/WoltLabPackageGenerator";
import { ICodeWorkspaceProvider } from "./ICodeWorkspaceProvider";

/**
 * Registers tests for the {@link WoltLabTasksProcessor `WoltLabTasksProcessor<TSettings, TOptions>`} class.
 *
 * @param context
 * The test-context.
 *
 * @param workspaceProvider
 * A code-workspace component.
 */
export function WoltLabTasksProcessorTests(context: TestContext<WoltLabPackageGenerator>, workspaceProvider: ICodeWorkspaceProvider<ITSProjectSettings, GeneratorOptions>): void
{
    suite(
        nameof(WoltLabTasksProcessor),
        () =>
        {
            /**
             * Provides an implementation of the {@link WoltLabTasksProcessor `WoltLabTasksProcessor<TSettings, TOptions>`} class for testing.
             */
            class TestWoltLabTasksProcessor extends WoltLabTasksProcessor<ITSProjectSettings, GeneratorOptions>
            {
                /**
                 * @inheritdoc
                 *
                 * @param task
                 * The task to filter.
                 *
                 * @returns
                 * A value indicating whether the task should be included.
                 */
                public override async FilterTask(task: TaskDefinition): Promise<boolean>
                {
                    return super.FilterTask(task);
                }

                /**
                 * @inheritdoc
                 *
                 * @param task
                 * The task to process.
                 *
                 * @returns
                 * The processed task.
                 */
                public override async ProcessTask(task: TaskDefinition): Promise<TaskDefinition>
                {
                    return super.ProcessTask(task);
                }
            }

            let processor: TestWoltLabTasksProcessor;
            let buildTaskName = "Build";

            /**
             * Filters the tasks using the {@link processor `processor`}.
             *
             * @returns
             * The filtered tasks.
             */
            async function FilterTasks(): Promise<TaskDefinition[]>
            {
                let result: TaskDefinition[] = [];

                for (let task of (await processor.Component.GetTasksMetadata()).tasks)
                {
                    if (await processor.FilterTask(task))
                    {
                        result.push(task);
                    }
                }

                return result;
            }

            suiteSetup(
                () =>
                {
                    processor = new TestWoltLabTasksProcessor(workspaceProvider.WorkspaceComponent);
                });

            suite(
                nameof<TestWoltLabTasksProcessor>((processor) => processor.FilterTask),
                () =>
                {
                    test(
                        `Checking whether only the \`${buildTaskName}\`-task is included…`,
                        async () =>
                        {
                            let tasks = await FilterTasks();
                            strictEqual(tasks.length, 1);
                            strictEqual(tasks[0].label, buildTaskName);
                        });
                });

            suite(
                nameof<TestWoltLabTasksProcessor>((processor) => processor.ProcessTask),
                () =>
                {
                    test(
                        `Checking whether the \`${buildTaskName}\`-task is transformed properly…`,
                        async () =>
                        {
                            let buildTask = await processor.ProcessTask((await FilterTasks())[0]);
                            strictEqual(buildTask.script, "package");
                            deepStrictEqual(buildTask.problemMatcher, []);
                            ok(!("isBackground" in buildTask));
                        });
                });
        });
}
