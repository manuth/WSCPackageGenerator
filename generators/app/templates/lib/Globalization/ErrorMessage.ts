import Translation from "./Translation";
import ErrorMessageNode from "./ErrorMessageNode";

/**
 * Represents a localizable error-message.
 */
export default class ErrorMessage extends Translation
{
    /**
     * Initializes a new instance of the `ErrorMessage` class.
     */
    public constructor(options?: Partial<ErrorMessage>)
    {
        super(options);
    }
}