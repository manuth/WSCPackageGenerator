import { Answers } from "inquirer";
import { IComponentDestination } from "./IComponentDestination";
import { IFileMapping } from "./IFileMapping";

/**
 * Represents an interactive file-mapping.
 */
export interface IInteractiveFileMapping<T extends Answers> extends IFileMapping<T>
{
    Destination: IComponentDestination<T>;
}