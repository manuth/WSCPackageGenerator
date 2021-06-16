import { IFileUploadComponentOptions } from "../../../Settings/IFileUploadComponentOptions";

/**
 * Represents options for php-script instructions.
 */
export interface IPHPScriptComponentOptions extends IFileUploadComponentOptions
{
    /**
     * A value indicating whether the file should be uploaded to the server.
     */
    SelfContained: boolean;

    /**
     * The name of the php-script file to execute or upload.
     */
    FileName: string;
}
