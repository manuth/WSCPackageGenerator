import { isNullOrUndefined } from "util";
import { ICategory } from "../ICategory";
import { Option } from "../Option";
import { IGroupOptionOptions } from "./IGroupOptionOptions";

/**
 * Represents an option which controls the permission of a user-group.
 */
export class GroupOption extends Option
{
    /**
     * The default value for groups which apply to registered users.
     */
    private userDefaultValue: any = null;

    /**
     * The default value for groups which have access to the moderation-section.
     */
    private modDefaultValue: any = null;

    /**
     * The default value for groups with administrator permissions.
     */
    private adminDefaultValue: any = null;

    /**
     * A value indicating whether the option only applies to groups for registered users.
     */
    private registeredOnly = false;

    /**
     * Initializes a new instance of the `GroupOption` class.
     */
    public constructor(category: ICategory, options: IGroupOptionOptions)
    {
        super(category, options);

        if (!isNullOrUndefined(options.UserDefaultValue))
        {
            this.UserDefaultValue = options.UserDefaultValue;
        }

        if (!isNullOrUndefined(options.ModDefaultValue))
        {
            this.ModDefaultValue = options.ModDefaultValue;
        }

        if (!isNullOrUndefined(options.AdminDefaultValue))
        {
            this.AdminDefaultValue = options.AdminDefaultValue;
        }

        if (!isNullOrUndefined(options.RegisteredOnly))
        {
            this.RegisteredOnly = options.RegisteredOnly;
        }
    }

    /**
     * Gets or sets the default value for groups which apply to registered users.
     */
    public get UserDefaultValue()
    {
        return this.userDefaultValue;
    }

    public set UserDefaultValue(value)
    {
        this.userDefaultValue = value;
    }

    /**
     * Gets or sets the default value for groups which have access to the moderation-section.
     */
    public get ModDefaultValue()
    {
        return this.modDefaultValue;
    }

    public set ModDefaultValue(value)
    {
        this.modDefaultValue = value;
    }

    /**
     * Gets or sets the default value for groups with administrator permissions.
     */
    public get AdminDefaultValue()
    {
        return this.adminDefaultValue;
    }

    public set AdminDefaultValue(value)
    {
        this.adminDefaultValue = value;
    }

    /**
     * Gets or sets a value indicating whether the option only applies to groups for registered users.
     */
    public get RegisteredOnly()
    {
        return this.registeredOnly;
    }

    public set RegisteredOnly(value)
    {
        this.registeredOnly = value;
    }
}