/**
 * Specifies an environment to install listeners to.
 */
export enum ListenerEnvironment
{
    /**
     * Indicates no environment.
     */
    None = 0,

    /**
     * Indicates the front-end which is the default environment.
     */
    FrontEnd = 1 << 0,

    /**
     * Indicates the back-end, like, for example, the control panel.
     */
    BackEnd = 1 << 2,

    /**
     * Indicates all possible environments.
     */
    All = (1 << 0) + (1 << 2)
}