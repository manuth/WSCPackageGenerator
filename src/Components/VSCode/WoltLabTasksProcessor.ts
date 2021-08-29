import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { CodeWorkspaceComponent, ITSProjectSettings, TSProjectTasksProcessor } from "@manuth/generator-ts-project";
import { TaskDefinition } from "vscode";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WoltLabGenerator } from "../../WoltLabGenerator";

/**
 * Provides the functionality to process tasks for {@link WoltLabGenerator `WoltLabGenerator<TSettings, TOptions>`}s.
 */
export class WoltLabTasksProcessor<TSettings extends ITSProjectSettings, TOptions extends GeneratorOptions> extends TSProjectTasksProcessor<TSettings, TOptions>
{
    /**
     * Initializes a new instance of the {@link TSProjectTasksProcessor `TSProjectTasksProcessor<TSettings, TOptions>`} class.
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
     * @param task
     * The task to filter.
     *
     * @returns
     * A value indicating whether the task should be included.
     */
    protected override async FilterTask(task: TaskDefinition): Promise<boolean>
    {
        return typeof task.label === "string" &&
            task.label === "Build";
    }

    /**
     * Processes a task-configuration.
     *
     * @param task
     * The task to process.
     *
     * @returns
     * The processed task.
     */
    protected override async ProcessTask(task: TaskDefinition): Promise<TaskDefinition>
    {
        task = await super.ProcessTask(task);

        if (
            typeof task.label === "string" &&
            task.label === "Build")
        {
            task.script = "package";
            task.problemMatcher = [];
            delete task.isBackground;
        }

        return task;
    }
}
