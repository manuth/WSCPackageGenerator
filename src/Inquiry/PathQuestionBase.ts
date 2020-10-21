import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { QuestionBase, TSProjectSettingKey } from "@manuth/generator-ts-project";
import chalk = require("chalk");
import { InputQuestionOptions, KeyUnion } from "inquirer";
import { resolve, sep } from "upath";
import { IWoltLabGeneratorSettings } from "../IWoltLabGeneratorSettings";
import { WoltLabGenerator } from "../WoltLabGenerator";
import { ITransformationFlags } from "./ITransformationFlags";

/**
 * Represents a question for asking for a path.
 */
export abstract class PathQuestionBase<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends QuestionBase<TSettings, TOptions> implements InputQuestionOptions<TSettings>
{
    /**
     * Initializes a new instance of the `PathQuestionBase` class.
     *
     * @param generator
     * The generator of the question.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>)
    {
        super(generator);
    }

    /**
     * @inheritdoc
     */
    public get name(): KeyUnion<TSettings>
    {
        return this.Name;
    }

    /**
     * @inheritdoc
     */
    public get Generator(): WoltLabGenerator<TSettings, TOptions>
    {
        return super.Generator as WoltLabGenerator<TSettings, TOptions>;
    }

    /**
     * Gets the key to save the answer to the answers-hash.
     */
    protected abstract get Name(): KeyUnion<TSettings>;

    /**
     * Gets a value indicating whether paths outside the `RootDir` are allowed.
     */
    protected get AllowOutside(): boolean
    {
        return true;
    }

    /**
     * @inheritdoc
     *
     * @param input
     * The input provided by the user.
     *
     * @param answers
     * The answers provided by the users.
     *
     * @param flags
     * Additional information about the value.
     *
     * @returns
     * The value to display to the user.
     */
    public transformer = (input: any, answers: TSettings, flags?: ITransformationFlags): string =>
    {
        return this.Transform(input, answers, flags);
    };

    /**
     * @inheritdoc
     *
     * @param answers
     * The answers provided by the user.
     *
     * @returns
     * The message to show to the user.
     */
    protected abstract async Message(answers: TSettings): Promise<string>;

    /**
     * @inheritdoc
     *
     * @param answers
     * The answers provided by the user.
     *
     * @returns
     * The default value.
     */
    protected async Default(answers: TSettings): Promise<string>
    {
        return this.DefaultBaseName(answers);
    }

    /**
     * @inheritdoc
     *
     * @param input
     * The input provided by the user.
     *
     * @param answers
     * The answers provided by the user.
     *
     * @returns
     * The filtered value.
     */
    protected async Filter(input: any, answers: TSettings): Promise<string>
    {
        return resolve(answers[TSProjectSettingKey.Destination], this.Transform(input, answers, null));
    }

    /**
     * Transforms the value to display to the user.
     *
     * @param input
     * The input provided by the user.
     *
     * @param answers
     * The answers provided by the users.
     *
     * @param flags
     * Additional information about the value.
     *
     * @returns
     * The value to display to the user.
     */
    protected Transform(input: any, answers: TSettings, flags?: ITransformationFlags): string
    {
        return flags?.isFinal ? chalk.cyan(input) : this.MakeRootPath(answers, input);
    }

    /**
     * Gets the directory the path should be relative to.
     *
     * @param answers
     * The answers provided by the users.
     *
     * @returns
     * The directory the path should be relative to.
     */
    protected abstract RootDir(answers: TSettings): string;

    /**
     * Gets the default base-name of the path.
     *
     * @param answers
     * The answers provided by the users.
     *
     * @returns
     * The directory the path should be relative to.
     */
    protected abstract DefaultBaseName(answers: TSettings): string;

    /**
     * Joins the arguments together and returns the resulting path relative to the root of the component.
     *
     * @param answers
     * The answers provided by the user.
     *
     * @param path
     * The path that is to be joined.
     *
     * @returns
     * The joined path.
     */
    protected MakeRootPath(answers: TSettings, ...path: string[]): string
    {
        return [this.RootDir(answers), ...path].join(sep);
    }
}
