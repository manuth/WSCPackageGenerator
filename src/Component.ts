import { IComponent as IComponentBase, IFileMapping, Question } from "extended-yo-generator";
import { AsyncDynamicQuestionProperty, InputQuestion } from "inquirer";
import { isNullOrUndefined } from "util";
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
    public get ID()
    {
        return this.id;
    }

    /**
     * @inheritdoc
     */
    public set ID(value)
    {
        this.id = value;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName()
    {
        return this.displayName;
    }

    /**
     * @inheritdoc
     */
    public set DisplayName(value)
    {
        this.displayName = value;
    }

    /**
     * @inheritdoc
     */
    public get Default()
    {
        return this.default;
    }

    /**
     * @inheritdoc
     */
    public set Default(value)
    {
        this.default = value;
    }

    /**
     * @inheritdoc
     */
    public get FileMapping()
    {
        return this.fileMapping;
    }

    /**
     * @inheritdoc
     */
    public set FileMapping(value)
    {
        this.fileMapping = value;
    }

    /**
     * @inheritdoc
     */
    public get Question()
    {
        return this.question;
    }

    /**
     * @inheritdoc
     */
    public set Question(value)
    {
        this.question = value;
        this.Question.name = `${WoltLabGeneratorSetting.ComponentPaths}[${this.ID}]`;
    }

    /**
     * @inheritdoc
     */
    public get AdditionalFiles()
    {
        return this.additionalFiles;
    }

    /**
     * @inheritdoc
     */
    public set AdditionalFiles(value)
    {
        this.additionalFiles = value;
    }

    /**
     * @inheritdoc
     */
    public get AdditionalQuestions()
    {
        return this.additionalQuestions;
    }

    /**
     * @inheritdoc
     */
    public set AdditionalQuestions(value)
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

            if (isNullOrUndefined(fileMapping.Source))
            {
                fileMapping.Source = null;
            }

            fileMapping.Destination = (settings) => settings[WoltLabGeneratorSetting.ComponentPaths][this.ID];
            result.push(fileMapping as IFileMapping<T>);

            if (!isNullOrUndefined(additionalFiles))
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

        if (!isNullOrUndefined(this.AdditionalQuestions))
        {
            questions.push(...this.AdditionalQuestions);
        }

        return questions;
    }
}