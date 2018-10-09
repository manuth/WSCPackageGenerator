import { Listener } from "../../../Events/Listener";
import { NamedDeleteInstruction } from "../NamedDeleteInstruction";
import { IListenerInstruction } from "./IListenerInstruction";
import { IListenerInstructionOptions } from "./IListenerInstructionOptions";

/**
 * Represents an instruction which provides listeners.
 */
export abstract class ListenerInstruction<T extends Listener, TOptions> extends NamedDeleteInstruction implements IListenerInstruction<T>
{
    /**
     * The listeners provided by the instruction.
     */
    private listeners: T[] = [];

    /**
     * Initializes a new instance of the `ListenerInstruction<T, TOptions>` class.
     */
    public constructor(options: IListenerInstructionOptions<TOptions>, generator: (opts: TOptions) => T)
    {
        super(options);

        for (let listener of options.Listeners)
        {
            this.Listeners.push(generator(listener));
        }
    }

    public get Listeners(): T[]
    {
        return this.listeners;
    }
}