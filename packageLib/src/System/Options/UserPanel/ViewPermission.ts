/**
 * Specifies a permission-requirement for viewing an option.
 */
export enum ViewPermission
{
    /**
     * Indicates the owner of the user the option is assigned to.
     */
    Owner = 1,

    /**
     * Indicates users with administrator-privileges.
     */
    Admin = 2,

    /**
     * Indicates registeres users.
     */
    RegisteredUser = 4,

    /**
     * Indicates visitors which are not registered.
     */
    Guest = 8
}