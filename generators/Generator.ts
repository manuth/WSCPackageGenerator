import * as Path from "path";
import * as YoGenerator from "yeoman-generator";
import IValidator from "./IValidator";

/**
 * Represents a generator.
 */
export default class Generator extends YoGenerator
{
    /**
     * Initializes a new instance of the `WSCPackageGenerator` class.
     * 
     * @param args
     * A set of arguments.
     * 
     * @param opts
     * A set of options.
     */
    public constructor(args, opts)
    {
        super(args, opts);
    }

    /**
     * Validates whether the a value is provided.
     */
    protected ForceInput: IValidator = (value, answers?) =>
    {
        if (value.length > 0)
        {
            return true;
        }
        else
        {
            return "Please enter a valid input!";
        }
    }

    /**
     * Validates whetther the specified path is separated from the destination.
     */
    protected ForceSeparateFolder: IValidator = (value, answers?) =>
    {
        if (this.destinationPath() !== Path.resolve(process.cwd(), this.destinationPath(), value))
        {
            return true;
        }
        else
        {
            return "Files must be stored in a separate folder!";
        }
    }
}