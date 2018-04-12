import TranslationNode from "./TranslationNode";

/**
 * Represents a node that contains localized error-messages.
 */
export default class ErrorMessageNode extends TranslationNode
{
    /**
     * Initializes a new instance of the `ErrorMessageNode` class.
     */
    public constructor(options?: Partial<ErrorMessageNode>)
    {
        super(options);
    }

    /**
     * Gets the full name of the node.
     */
    public get FullName(): string
    {
        return 'wcf.acp.option.error.' + super.FullName;
    }
}