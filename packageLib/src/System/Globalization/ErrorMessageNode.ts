import { ILocalizationNodeOptions } from "./ILocalizationNodeOptions";
import { LocalizationNode } from "./LocalizationNode";

/**
 * Represents a node which provides error-messages.
 */
export class ErrorMessageNode extends LocalizationNode
{
    /**
     * Initializes a new instance of the `ErrorMessageNode`.
     */
    public constructor(options: ILocalizationNodeOptions)
    {
        super(options, (opts: ILocalizationNodeOptions) => new ErrorMessageNode(opts));
    }

    public get FullName(): string
    {
        return `wcf.acp.option.error.${super.FullName}`;
    }

    /**
     * Gets the name of the error-message.
     */
    public get ErrorName(): string
    {
        return super.FullName;
    }

    public toString(): string
    {
        return this.ErrorName;
    }
}