import { isNullOrUndefined } from "util";
import { INamedObject } from "../../INamedObject";
import { IDeleteInstructionOptions } from "./IDeleteInstructionOptions";
import { INamedDeleteInstruction } from "./INamedDeleteInstruction";
import { Instruction } from "./Instruction";

/**
 * Represents an instruction which provides the functionality to delete named objects.
 */
export abstract class NamedDeleteInstruction extends Instruction implements INamedDeleteInstruction
{
    /**
     * The objects to delete.
     */
    private objectsToDelete: INamedObject[] = [];

    /**
     * Initializes a new instance of the `NamedDeleteInstruction` class.
     */
    public constructor(options: IDeleteInstructionOptions<INamedObject>)
    {
        super(options);

        if (!isNullOrUndefined(options.ObjectsToDelete))
        {
            this.ObjectsToDelete.push(...options.ObjectsToDelete);
        }
    }

    public get ObjectsToDelete(): INamedObject[]
    {
        return this.objectsToDelete;
    }
}