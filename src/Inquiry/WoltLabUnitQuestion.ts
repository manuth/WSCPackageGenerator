import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { IWoltLabGeneratorSettings } from "../IWoltLabGeneratorSettings";
import { WoltLabSettingKey } from "../WoltLabSettingKey";
import { WoltLabUnit } from "../WoltLabUnit";
import { PathQuestionBase } from "./PathQuestionBase";

/**
 * Represents a question for asking for a path of a unit.
 */
export class WoltLabUnitQuestion<TSettings extends IWoltLabGeneratorSettings, TOptions extends GeneratorOptions> extends PathQuestionBase<TSettings, TOptions>
{
    /**
     * @inheritdoc
     */
    public type = "input" as const;

    /**
     * The unit of the question.
     */
    private unit: WoltLabUnit<TSettings, TOptions>;

    /**
     * Initializes a new instance of the `WoltLabUnitQuestion` class.
     *
     * @param unit
     * The unit of the question.
     */
    public constructor(unit: WoltLabUnit<TSettings, TOptions>)
    {
        super(unit.Generator);
        this.unit = unit;
    }

    /**
     * Gets the unit of the question.
     */
    protected get Unit(): WoltLabUnit<TSettings, TOptions>
    {
        return this.unit;
    }

    /**
     * @inheritdoc
     */
    protected get Name(): string
    {
        return `${WoltLabSettingKey.UnitPaths}[${this.Unit.ID}]`;
    }

    /**
     * Gets a value indicating whether paths outside the `RootDir` are allowed.
     */
    public get AllowOutside(): boolean
    {
        return this.Unit.AllowOutside;
    }

    /**
     * @inheritdoc
     *
     * @param answers
     * The answers provided by the user.
     *
     * @returns
     * The message to show to the user.
     */
    protected async Message(answers: TSettings): Promise<string>
    {
        return this.Unit.Message(answers);
    }

    /**
     * @inheritdoc
     *
     * @param answers
     * The answers provided by the users.
     *
     * @returns
     * The directory the path should be relative to.
     */
    protected RootDir(answers: TSettings): string
    {
        return this.Unit.RootDir(answers);
    }

    /**
     * @inheritdoc
     *
     * @param answers
     * The answers provided by the users.
     *
     * @returns
     * The directory the path should be relative to.
     */
    protected DefaultBaseName(answers: TSettings): string
    {
        return this.Unit.DefaultBaseName(answers);
    }
}
