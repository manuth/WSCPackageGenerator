/**
 * Specifies a permission-requirement for editing an option.
 */
export enum EditPermission
{
    /**
     * Indicates owners of the user the option is assigned to.
     */
    Owner = 1,

    /**
     * Indicates users with administrator-privileges.
     */
    Admin = 2,

    /**
     * Indicates owners during their registration.
     */
    OwnerOnRegistration = 4
}