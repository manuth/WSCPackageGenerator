import { Answers, IFileMapping, Question } from "extended-yo-generator";
import { InputQuestion } from "inquirer";

/**
 * Provides options for the `WoltLabComponent` class.
 */
export interface IComponent<T extends Answers>
{
    /**
     * Gets or sets the id of the component.
     */
    ID: string;

    /**
     * Gets or sets the human-readable name of the component.
     */
    DisplayName: string;

    /**
     * Gets or sets a value indicating whether the component is enabled by default.
     */
    Default?: boolean;

    /**
     * Gets or sets the file-mapping of the primary file.
     */
    FileMapping: Partial<IFileMapping<T>> | Promise<Partial<IFileMapping<T>>> | ((settings: T) => Partial<IFileMapping<T>> | Promise<Partial<IFileMapping<T>>>);

    /**
     * Gets or sets the question for the primary file-mapping.
     */
    Question: InputQuestion<T>;

    /**
     * Gets or sets the file-mapping for the additional files.
     */
    AdditionalFiles?: IFileMapping<T>[] | Promise<IFileMapping<T>[]> | ((settings: T) => IFileMapping<T>[] | Promise<IFileMapping<T>[]>);

    /**
     * Gets or sets additional questions.
     */
    AdditionalQuestions?: Question<T>[];
}