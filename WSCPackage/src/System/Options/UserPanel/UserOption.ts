import { isNullOrUndefined } from "util";
import { ICategory } from "../ICategory";
import { Option } from "../Option";
import { EditPermission } from "./EditPermission";
import { IUserOptionOptions } from "./IUserOptionOptions";
import { ViewPermission } from "./ViewPermission";

/**
 * Represents an option for users.
 */
export class UserOption extends Option
{
    /**
     * A value indicating whether the option is required.
     */
    private required = false;

    /**
     * A value indicating whether users are ask for setting the option during registration.
     */
    private askOnRegistration = false;

    /**
     * The permissions which are required for editing the option.
     */
    private editPermissions: EditPermission;

    /**
     * The permissions which are required for viewing the option.
     */
    private viewPermissions: ViewPermission;

    /**
     * A value indicating whether users can be searched by the value of the option.
     */
    private searchable = false;

    /**
     * The php-class which formats the output of the option.
     *
     * The class must implement the `wcf\system\option\user\IUserOptionOutput` interface.
     */
    private outputClass: string = null;

    /**
     * Initializes a new instance of the `UserOption` class.
     */
    public constructor(category: ICategory, options: IUserOptionOptions)
    {
        super(category, options);

        if (!isNullOrUndefined(options.Required))
        {
            this.Required = options.Required;
        }

        if (!isNullOrUndefined(options.AskOnRegistration))
        {
            this.AskOnRegistration = options.AskOnRegistration;
        }

        this.EditPermissions = options.EditPermissions;
        this.ViewPermissions = options.ViewPermissions;

        if (!isNullOrUndefined(options.Searchable))
        {
            this.Searchable = options.Searchable;
        }

        if (!isNullOrUndefined(options.OutputClass))
        {
            this.OutputClass = options.OutputClass;
        }
    }

    /**
     * Gets or sets a value indicating whether the option is required.
     */
    public get Required()
    {
        return this.required;
    }

    public set Required(value)
    {
        this.required = value;
    }

    /**
     * Gets or sets a value indicating whether users are ask for setting the option during registration.
     */
    public get AskOnRegistration()
    {
        return this.askOnRegistration;
    }

    public set AskOnRegistration(value)
    {
        this.askOnRegistration = value;
    }

    /**
     * Gets or sets the permissions which are required for editing the option.
     */
    public get EditPermissions()
    {
        return this.editPermissions;
    }

    public set EditPermissions(value)
    {
        this.editPermissions = value;
    }

    /**
     * Gets or sets the permissions which are required for viewing the option.
     */
    public get ViewPermissions()
    {
        return this.viewPermissions;
    }

    public set ViewPermissions(value)
    {
        this.viewPermissions = value;
    }

    /**
     * Gets or sets a value indicating whether users can be searched by the value of the option.
     */
    public get Searchable()
    {
        return this.searchable;
    }

    public set Searchable(value)
    {
        this.searchable = value;
    }

    /**
     * Gets or sets the php-class which formats the output of the option.
     *
     * The class must implement the `wcf\system\option\user\IUserOptionOutput` interface.
     */
    public get OutputClass()
    {
        return this.outputClass;
    }

    public set OutputClass(value)
    {
        this.outputClass = value;
    }
}