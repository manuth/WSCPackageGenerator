import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { TemplateListenerInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/TemplateListenerInstructionCompiler";
import { ITemplateListenerOptions } from "../../../Customization/Presentation/ITemplateListenerOptions";
import { TemplateListener } from "../../../Customization/Presentation/TemplateListener";
import { IListenerInstructionOptions } from "./IListenerInstructionOptions";
import { ListenerInstruction } from "./ListenerInstruction";

/**
 * Represents an instruction which provides template-listeners.
 */
export class TemplateListenerInstruction extends ListenerInstruction<TemplateListener, ITemplateListenerOptions>
{
    /**
     * Initializes a new instance of the `TemplateListenerInstruction` class.
     */
    public constructor(options: IListenerInstructionOptions<ITemplateListenerOptions>)
    {
        super(
            options,
            (opts: ITemplateListenerOptions) =>
            {
                return new TemplateListener(opts);
            });
    }

    public get Type(): string
    {
        return "templateListener";
    }

    public get Compiler(): InstructionCompiler<TemplateListenerInstruction>
    {
        return new TemplateListenerInstructionCompiler(this);
    }
}