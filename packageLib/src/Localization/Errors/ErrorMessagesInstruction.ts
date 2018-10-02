import { isNullOrUndefined } from "util";
import { TranslationsInstruction } from "../TranslationsInstruction";
import { ErrorMessageNode } from "./ErrorMessageNode";
import { IErrorMessagesInstruction } from "./IErrorMessagesInstruction";
import { IErrorMessagesInstructionOptions } from "./IErrorMessagesInstructionOptions";

/**
 * Represents an instruction which provides error-messages.
 */
export class ErrorMessagesInstruction extends TranslationsInstruction implements IErrorMessagesInstruction
{
    /**
     * The error-messages provided by this instruction.
     */
    private errorMessageNodes: ErrorMessageNode[] = [];

    /**
     * Initializes a new instance of the `ErrorMessagesInstruction` class.
     */
    public constructor(options: IErrorMessagesInstructionOptions)
    {
        super(options);

        if (isNullOrUndefined(options.FileName))
        {
            this.FileName = "errors";
        }

        if (options.TranslationNodes)
        {
            this.errorMessageNodes.push(...options.TranslationNodes);
        }
    }

    public get TranslationNodes(): ErrorMessageNode[]
    {
        return this.errorMessageNodes;
    }

    /**
     * Gets all errors provided by this instruction.
     */
    public get Errors(): { [id: string]: ErrorMessageNode }
    {
        return this.Translations as { [id: string]: ErrorMessageNode };
    }
}