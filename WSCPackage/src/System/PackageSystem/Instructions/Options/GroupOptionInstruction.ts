import { GroupOptionInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/GroupOptionInstructionCompiler";
import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { Node } from "../../../NodeSystem/Node";
import { GroupCategory } from "../../../Options/Groups/GroupCategory";
import { GroupOption } from "../../../Options/Groups/GroupOption";
import { IGroupOptionOptions } from "../../../Options/Groups/IGroupOptionOptions";
import { ICategoryOptions } from "../../../Options/ICategoryOptions";
import { IOptionInstructionOptions } from "./IOptionInstructionOptions";
import { OptionInstruction } from "./OptionInstruction";

/**
 * Represents an instruction which provides options for groups.
 */
export class GroupOptionInstruction extends OptionInstruction<GroupCategory, ICategoryOptions<IGroupOptionOptions>, GroupOption, IGroupOptionOptions>
{
    /**
     * Initializes a new instance of the `GroupOptionInstruction` class.
     */
    public constructor(options: IOptionInstructionOptions<ICategoryOptions<IGroupOptionOptions>>)
    {
        super(
            options,
            (node: Node<GroupCategory, ICategoryOptions<IGroupOptionOptions>>, opts: ICategoryOptions<IGroupOptionOptions>) =>
            {
                return new GroupCategory(node, opts);
            });
    }

    public get Type(): string
    {
        return "userGroupOption";
    }

    public get RootCategory(): string
    {
        return "wcf.acp.group";
    }

    public get OptionCategory(): string
    {
        return "option";
    }

    public get Compiler(): InstructionCompiler<GroupOptionInstruction>
    {
        return new GroupOptionInstructionCompiler(this);
    }
}