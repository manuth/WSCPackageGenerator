import { normalize as legacyNormalize, parse as legacyParse, sep } from "path";
import { ReadLine } from "readline";
import { Answers } from "inquirer";
import InputPrompt = require("inquirer/lib/prompts/input");
import { isAbsolute, join, normalize, parse, relative } from "upath";
import { IPathQuestion } from "./IPathQuestion";
import { IPathQuestionOptions } from "./IPathQuestionOptions";
import { PathPromptRootDescriptor } from "./PathPromptRootDescriptor";

declare module "inquirer"
{
    /**
     * @inheritdoc
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface QuestionMap<T>
    {
        /**
         * Represents the path-prompt.
         */
        [PathPrompt.TypeName]: IPathQuestion<T>;
    }
}

/**
 * Provides the functionality to ask for a path.
 */
export class PathPrompt<T extends IPathQuestionOptions = IPathQuestionOptions> extends InputPrompt<T>
{
    /**
     * The name of this prompt-type.
     */
    public static readonly TypeName = "wcf-path";

    /**
     * A value indicating whether the user-input has started.
     */
    private userInputStarted = false;

    /**
     * A value indicating whether the initial user-input is being performed.
     */
    private initialInput = true;

    /**
     * The directory used to resolve relative paths for the {@link IPathQuestionOptions.default `default`} value and the answer.
     */
    private rootDir: string = null;

    /**
     * A value indicating whether paths outside the {@link PathPrompt.rootDir `rootDir`} are allowed.
     */
    private allowOutside = true;

    /**
     * Initializes a new instance of the {@link PathPrompt `PathPrompt<TAnswers, TQuestion>`}-class.
     *
     * @param question
     * The question to prompt the user to answer.
     *
     * @param readLine
     * An object for performing read from and write to the console.
     *
     * @param answers
     * The answer-object.
     */
    public constructor(question: T, readLine: ReadLine, answers: Answers)
    {
        super(question, readLine, answers);
    }

    /**
     * Gets a value indicating whether the user-input has started.
     */
    protected get UserInputStarted(): boolean
    {
        return this.userInputStarted;
    }

    /**
     * Gets a value indicating whether the initial user-input is being performed.
     */
    protected get InitialInput(): boolean
    {
        return this.initialInput;
    }

    /**
     * @inheritdoc
     *
     * @returns
     * The result of the prompt.
     */
    public override async run(): Promise<any>
    {
        let rootDir: PathPromptRootDescriptor;

        if (typeof this.opt.rootDir === "function")
        {
            rootDir = await this.opt.rootDir(this.answers);
        }
        else
        {
            rootDir = await this.opt.rootDir;
        }

        if (rootDir)
        {
            if (typeof rootDir === "string")
            {
                this.rootDir = rootDir;
            }
            else
            {
                this.rootDir = rootDir.path;
                this.allowOutside = rootDir.allowOutside ?? true;
            }

            this.rootDir = normalize(this.rootDir);
        }

        return super.run();
    }

    /**
     * Clears the content of the current line.
     */
    protected ClearLine(): void
    {
        this.rl.write(
            "",
            {
                ctrl: true,
                shift: true,
                name: "backspace"
            });

        this.rl.write(
            "",
            {
                ctrl: true,
                shift: true,
                name: "delete"
            });
    }

    /**
     * Renders the prompt before any user-input has been performed.
     *
     * @param error
     * The error to display.
     */
    protected RenderPreInput(error: any): void
    {
        super.render();
    }

    /**
     * Renders the prompt on the very first user-input.
     *
     * @param error
     * The error to display.
     */
    protected RenderInitialInput(error: any): void
    {
        super.render(error);
        this.Render(error);
        this.initialInput = false;
    }

    /**
     * Renders the prompt.
     *
     * @param error
     * The error to display.
     */
    protected Render(error: any): void
    {
        let result: string;
        let answer = this.rl.line;
        let parsedPath = parse(answer);
        let pathTree: string[] = [];

        if (
            this.InitialInput &&
            this.rootDir)
        {
            pathTree.push(legacyNormalize(this.rootDir));
        }

        if (/[/\\]$/.test(answer))
        {
            parsedPath = parse(answer + ".");
            parsedPath.base = "";
            parsedPath.name = "";
        }

        if (legacyNormalize(parsedPath.dir) !== ".")
        {
            pathTree.push(legacyNormalize(parsedPath.dir));
        }

        if (
            parsedPath.root.length > 0 &&
            (
                parsedPath.root === parsedPath.dir ||
                parsedPath.root === normalize(parsedPath.dir)))
        {
            if (parsedPath.base.length === 0)
            {
                result = legacyParse(legacyNormalize(parsedPath.root)).root;
            }
            else
            {
                result = [legacyNormalize(parsedPath.root), parsedPath.base].join("");
            }
        }
        else
        {
            result = [...pathTree, parsedPath.base].join(sep);
        }

        if (answer !== result)
        {
            this.ClearLine();
            this.rl.write(result);
        }

        let validationResult = this.ValidatePath(result);

        if (validationResult !== true)
        {
            error = validationResult;
        }

        super.render(error);
    }

    /**
     * Validates the specified {@link path `path`}.
     *
     * @param path
     * The path to validate.
     *
     * @returns
     * Either a {@link Boolean `boolean`} indicating whether an error occured or a {@link String `string`} describing an error.
     */
    protected ValidatePath(path: string): boolean | string
    {
        if (this.allowOutside)
        {
            return true;
        }
        else
        {
            path = normalize(path);
            let relativePath = relative(this.rootDir, path);

            return (
                (
                    isAbsolute(path) ?
                    path.startsWith(join(this.rootDir, "./")) :
                    !relativePath.startsWith("../") && relativePath !== "..")) ?
                true :
                `Paths outside of \`${legacyNormalize(this.rootDir)}\` are not allowed!`;
        }
    }

    /**
     * Renders the prompt.
     *
     * @param error
     * The last error that occured.
     */
    protected override render(error: any): void
    {
        if (this.UserInputStarted)
        {
            if (this.InitialInput)
            {
                this.RenderInitialInput(error);
            }
            else
            {
                this.Render(error);
            }
        }
        else
        {
            this.RenderPreInput(error);
        }
    }

    /**
     * Handles the `keypress`-event.
     */
    protected onKeypress(): void
    {
        this.userInputStarted = true;
        (super["onKeypress" as keyof InputPrompt<T>] as any)();
    }
}
