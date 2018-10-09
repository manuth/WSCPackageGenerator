import { INamedObject } from "../../INamedObject";
import { IDeleteInstruction } from "./IDeleteInstruction";

/**
 * Represents an instruction which provides the functionality to delete named objects.
 */
export interface INamedDeleteInstruction extends IDeleteInstruction<INamedObject>
{
}