/**
 * The internal answer-hash of the `ApplicationPrompt`.
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
