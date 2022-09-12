import { ILocalComponentOptions } from "./ILocalComponentOptions.js";

/**
 * Represents options for a component which is uploaded.
 */
export interface IFileUploadComponentOptions extends ILocalComponentOptions
{
    /**
     * The application to upload the files to.
     */
    Application: string;
}
