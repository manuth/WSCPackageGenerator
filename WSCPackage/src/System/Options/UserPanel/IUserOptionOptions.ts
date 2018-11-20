import { IOptionOptions } from "../IOptionOptions";
import { EditPermission } from "./EditPermission";
import { ViewPermission } from "./ViewPermission";

/**
 * Provides options for the `UserOption` class.
 */
export interface IUserOptionOptions extends IOptionOptions
{
    /**
     * A value indicating whether the option is required.
     */
    Required?: boolean;

    /**
     * A value indicating whether users are ask for setting the option during registration.
     */
    AskOnRegistration?: boolean;

    /**
     * The permissions which are required for editing the option.
     */
    EditPermissions: EditPermission;

    /**
     * The permissions which are required for viewing the option.
     */
    ViewPermissions: ViewPermission;

    /**
     * A value indicating whether users can be searched by the value of the option.
     */
    Searchable?: boolean;

    /**
     * The php-class which formats the output of the option.
     *
     * The class must implement the `wcf\system\option\user\IUserOptionOutput` interface.
     */
    OutputClass?: string;
}