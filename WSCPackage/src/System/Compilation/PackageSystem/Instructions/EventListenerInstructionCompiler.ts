import { EventListenerInstruction } from "../../../PackageSystem/Instructions/Events/EventListenerInstruction";
import { Compiler } from "../../Compiler";
import { EventListenerFileCompiler } from "../../Events/EventListenerFileCompiler";
import { TemplateInstructionCompiler } from "./TemplateInstructionCompiler";

/**
 * Provides the functionality to compile event-listener instructions.
 */
export class EventListenerInstructionCompiler extends TemplateInstructionCompiler<EventListenerInstruction>
{
    /**
     * Initializes a new instance of the `EventListenerInstructionCompiler<T>` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: EventListenerInstruction)
    {
        super(item);
    }

    protected get FileCompiler(): Compiler<EventListenerInstruction>
    {
        return new EventListenerFileCompiler(this.Item);
    }
}