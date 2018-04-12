/**
 * Specifies an environment of WoltLab Suite Core.
 */
enum WSCEnvironment
{
    /**
     * Indicates the default environment.
     */
    Default = 1,

    /**
     * Indicates the ACP environment.
     */
    Admin = 2,

    /**
     * Indicates both the default and the admin-environemnt.
     */
    Both = 3
}

export default WSCEnvironment;