import { Interface } from "readline";
import { ReadStream } from "tty";
import { PromptCallback } from "@manuth/generator-ts-project";
import { Answers, Question } from "inquirer";
import Prompt = require("inquirer/lib/prompts/base");

/**
 * Provides the functionality to display nested prompts.
 */
export abstract class NestedPrompt<T extends Question> extends Prompt<T>
{
    /**
     * Initializes a new instance of the {@link NestedPrompt `NestedPrompt<T>`} class.
     *
     * @param question
     * The question to prompt the user to answer.
     *
     * @param readLine
     * An object for reading from and writing to the console.
     *
     * @param answers
     * The answer-hash.
     */
    public constructor(question: T, readLine: Interface, answers: Answers)
    {
        super(question, readLine, answers);
    }

    /**
     * @inheritdoc
     *
     * @param resolve
     * The callback for resolving the result.
     */
    protected override _run(resolve: PromptCallback): void
    {
        (
            async () =>
            {
                this.rl.pause();
                this.screen.render("", undefined);
                let result = await this.Prompt();
                this.rl.resume();
                ((this.rl as any).input as ReadStream)?.setRawMode?.(true);
                resolve(result);
            })();
    }

    /**
     * Prompts the inner questions.
     *
     * @returns
     * The value to save to the answer-hash.
     */
    protected abstract Prompt(): Promise<unknown>;
}
