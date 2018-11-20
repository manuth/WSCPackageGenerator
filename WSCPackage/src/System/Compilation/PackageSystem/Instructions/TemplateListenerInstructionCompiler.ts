import { TemplateListenerInstruction } from "../../../PackageSystem/Instructions/Events/TemplateListenerInstruction";
import { Compiler } from "../../Compiler";
import { TemplateListenerFileCompiler } from "../../Events/TemplateListenerFileCompiler";
import { TemplateInstructionCompiler } from "./TemplateInstructionCompiler";

/**
 * Provides the functionality to compile event-listener instructions.
 */
export class TemplateListenerInstructionCompiler extends TemplateInstructionCompiler<TemplateListenerInstruction>
{
    /**
     * Initializes a new instance of the `TemplateListenerInstructionCompiler<T>` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: TemplateListenerInstruction)
    {
        super(item);
    }

    protected get FileCompiler(): Compiler<TemplateListenerInstruction>
    {
        return new TemplateListenerFileCompiler(this.Item);
    }
}