import { ILocalComponentOptions } from "./ILocalComponentOptions";

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
