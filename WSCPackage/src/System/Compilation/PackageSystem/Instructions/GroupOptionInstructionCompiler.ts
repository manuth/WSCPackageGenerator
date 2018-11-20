import { GroupCategory } from "../../../Options/Groups/GroupCategory";
import { GroupOption } from "../../../Options/Groups/GroupOption";
import { GroupOptionInstruction } from "../../../PackageSystem/Instructions/Options/GroupOptionInstruction";
import { GroupOptionFileCompiler } from "../../Options/GroupOptionFileCompiler";
import { OptionInstructionCompiler } from "./OptionInstructionCompiler";

/**
 * Provides the functionality to compile `GroupOptionInstruction`s.
 */
export class GroupOptionInstructionCompiler extends OptionInstructionCompiler<GroupOptionInstruction, GroupCategory, GroupOption>
{
    /**
     * Initializes a new instance of the `GroupOptionInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: GroupOptionInstruction)
    {
        super(item);
    }

    protected get OptionFileCompiler(): GroupOptionFileCompiler
    {
        return new GroupOptionFileCompiler(this.Item);
    }
}