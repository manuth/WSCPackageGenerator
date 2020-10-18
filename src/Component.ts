import { IComponent as IComponentBase, IFileMapping, Question } from "extended-yo-generator";
import { AsyncDynamicQuestionProperty, InputQuestion } from "inquirer";
import { WoltLabGeneratorSetting } from "./GeneratorSetting";
import { IComponent } from "./IComponent";
import { IWoltLabGeneratorSettings } from "./IWoltLabGeneratorSettings";

/**
 * Represents a component of WoltLab.
 */
export class Component<T extends IWoltLabGeneratorSettings> implements IComponentBase<T>, IComponent<T>
{
    /**
     * The id of the component.
     */
    private id: string;

    /**
     * The human-readable name of the component.
     */
    private displayName: string;

    /**
     * A value indicating whether the component is enabled by default.
     */
    private default: boolean;

    /**
     * The file-mapping of the primary file.
     */
    private fileMapping: Partial<IFileMapping<T>> | Promise<Partial<IFileMapping<T>>> | ((settings: T) => Partial<IFileMapping<T>> | Promise<Partial<IFileMapping<T>>>);

    /**
     * The question for the primary file-mapping.
     */
    private question: InputQuestion<T>;

    /**
     * The file-mapping for the additional files.
     */
    private additionalFiles: AsyncDynamicQuestionProperty<Array<IFileMapping<T>>>;

    /**
     * A set of additional questions.
     */
    private additionalQuestions: Array<Question<T>>;

    /**
     * Initializes a new instance of the `Component<T>` class.
     *
     * @param options
     * The options for the initialization.
     */
    public constructor(options: IComponent<T>)
    {
        this.ID = options.ID;
        this.DisplayName = options.DisplayName;
        this.Default = options.Default;
        this.FileMapping = options.FileMapping;
        this.Question = options.Question;
        this.AdditionalFiles = options.AdditionalFiles;
        this.AdditionalQuestions = options.AdditionalQuestions;
    }

    /**
     * @inheritdoc
     */
    public get ID(): string
    {
        return this.id;
    }

    /**
     * @inheritdoc
     */
    public set ID(value: string)
    {
        this.id = value;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return this.displayName;
    }

    /**
     * @inheritdoc
     */
    public set DisplayName(value: string)
    {
        this.displayName = value;
    }

    /**
     * @inheritdoc
     */
    public get Default(): boolean
    {
        return this.default;
    }

    /**
     * @inheritdoc
     */
    public set Default(value: boolean)
    {
        this.default = value;
    }

    /**
     * @inheritdoc
     */
    public get FileMapping(): Partial<IFileMapping<T>> | Promise<Partial<IFileMapping<T>>> | ((settings: T) => Partial<IFileMapping<T>> | Promise<Partial<IFileMapping<T>>>)
    {
        return this.fileMapping;
    }

    /**
     * @inheritdoc
     */
    public set FileMapping(value: Partial<IFileMapping<T>> | Promise<Partial<IFileMapping<T>>> | ((settings: T) => Partial<IFileMapping<T>> | Promise<Partial<IFileMapping<T>>>))
    {
        this.fileMapping = value;
    }

    /**
     * @inheritdoc
     */
    public get Question(): InputQuestion<T>
    {
        return this.question;
    }

    /**
     * @inheritdoc
     */
    public set Question(value: InputQuestion<T>)
    {
        this.question = value;
        this.Question.name = `${WoltLabGeneratorSetting.ComponentPaths}[${this.ID}]`;
    }

    /**
     * @inheritdoc
     */
    public get AdditionalFiles(): AsyncDynamicQuestionProperty<Array<IFileMapping<T>>>
    {
        return this.additionalFiles;
    }

    /**
     * @inheritdoc
     */
    public set AdditionalFiles(value: AsyncDynamicQuestionProperty<Array<IFileMapping<T>>>)
    {
        this.additionalFiles = value;
    }

    /**
     * @inheritdoc
     */
    public get AdditionalQuestions(): Array<Question<T>>
    {
        return this.additionalQuestions;
    }

    /**
     * @inheritdoc
     */
    public set AdditionalQuestions(value: Array<Question<T>>)
    {
        this.additionalQuestions = value;
    }

    /**
     * @inheritdoc
     */
    public get FileMappings(): AsyncDynamicQuestionProperty<Array<IFileMapping<T>>>
    {
        return async (settings: T) =>
        {
            let fileMapping: Partial<IFileMapping<T>>;
            let result: Array<IFileMapping<T>> = [];
            let primaryMapping = this.FileMapping;
            let additionalFiles = this.AdditionalFiles;

            if (typeof primaryMapping === "function")
            {
                primaryMapping = primaryMapping(settings);
            }

            if (primaryMapping instanceof Promise)
            {
                fileMapping = await primaryMapping;
            }
            else
            {
                fileMapping = primaryMapping;
            }

            if (!fileMapping.Source)
            {
                fileMapping.Source = null;
            }

            fileMapping.Destination = (settings) => settings[WoltLabGeneratorSetting.ComponentPaths][this.ID];
            result.push(fileMapping as IFileMapping<T>);

            if (additionalFiles)
            {
                if (typeof additionalFiles === "function")
                {
                    additionalFiles = additionalFiles(settings);
                }

                if (additionalFiles instanceof Promise)
                {
                    result.push(...await additionalFiles);
                }
                else
                {
                    result.push(...additionalFiles);
                }
            }

            return result;
        };
    }

    /**
     * @inheritdoc
     */
    public get Questions(): Array<Question<T>>
    {
        let questions: Array<Question<T>> = [this.Question];

        if (this.AdditionalQuestions)
        {
            questions.push(...this.AdditionalQuestions);
        }

        return questions;
    }
}
