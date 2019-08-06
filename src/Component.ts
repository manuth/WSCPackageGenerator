import { IComponent as IComponentBase, IFileMapping, Question } from "extended-yo-generator";
import { InputQuestion } from "inquirer";
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
    private additionalFiles: IFileMapping<T>[] | Promise<IFileMapping<T>[]> | ((settings: T) => IFileMapping<T>[] | Promise<IFileMapping<T>[]>);

    /**
     * A set of additional questions.
     */
    private additionalQuestions: Question<T>[];

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

    public get ID()
    {
        return this.id;
    }

    public set ID(value)
    {
        this.id = value;
    }

    public get DisplayName()
    {
        return this.displayName;
    }

    public set DisplayName(value)
    {
        this.displayName = value;
    }

    public get Default()
    {
        return this.default;
    }

    public set Default(value)
    {
        this.default = value;
    }

    public get FileMapping()
    {
        return this.fileMapping;
    }

    public set FileMapping(value)
    {
        this.fileMapping = value;
    }

    public get Question()
    {
        return this.question;
    }

    public set Question(value)
    {
        this.question = value;
        this.Question.name = `${WoltLabGeneratorSetting.ComponentPaths}[${this.ID}]`;
    }

    public get AdditionalFiles()
    {
        return this.additionalFiles;
    }

    public set AdditionalFiles(value)
    {
        this.additionalFiles = value;
    }

    public get AdditionalQuestions()
    {
        return this.additionalQuestions;
    }

    public set AdditionalQuestions(value)
    {
        this.additionalQuestions = value;
    }

    public get FileMappings(): IFileMapping<T>[] | Promise<IFileMapping<T>[]> | ((settings: T) => IFileMapping<T>[] | Promise<IFileMapping<T>[]>)
    {
        return async (settings: T) =>
        {
            let fileMapping: Partial<IFileMapping<T>>;
            let result: IFileMapping<T>[] = [];
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

    public get Questions(): Question<T>[]
    {
        let questions: Question<T>[] = [this.Question];

        if (!isNullOrUndefined(this.AdditionalQuestions))
        {
            questions.push(...this.AdditionalQuestions);
        }

        return questions;
    }
}