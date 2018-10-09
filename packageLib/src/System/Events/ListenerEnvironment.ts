/**
 * Specifies an environment to install listeners to.
 */
export enum ListenerEnvironment
{
    /**
     * Indicates the front-end which is the default environment.
     */
    FrontEnd = "user",

    /**
     * Indicates the back-end, like, for example, the control panel.
     */
    BackEnd = "admin"
}