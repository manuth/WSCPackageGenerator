// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationPrompt } from "./ApplicationPrompt";

/**
 * The internal answer-hash of the {@link ApplicationPrompt `ApplicationPrompt<T>`}.
 */
export interface IApplicationAnswerHash
{
    /**
     * The name of the suggested application that has been chosen.
     */
    application: string;

    /**
     * The name of the custom application chosen by the user.
     */
    customApplication: string;
}
