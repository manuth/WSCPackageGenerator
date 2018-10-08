import { InstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/InstructionCompiler";
import { UserOptionInstructionCompiler } from "../../../Compilation/PackageSystem/Instructions/UserOptionInstructionCompiler";
import { Node } from "../../../NodeSystem/Node";
import { ICategoryOptions } from "../../../Options/ICategoryOptions";
import { IUserOptionOptions } from "../../../Options/UserPanel/IUserOptionOptions";
import { UserCategory } from "../../../Options/UserPanel/UserCategory";
import { UserOption } from "../../../Options/UserPanel/UserOption";
import { IOptionInstructionOptions } from "./IOptionInstructionOptions";
import { OptionInstruction } from "./OptionInstruction";

/**
 * Represents an instruction which provides options for users.
 */
export class UserOptionInstruction extends OptionInstruction<UserCategory, ICategoryOptions<IUserOptionOptions>, UserOption, IUserOptionOptions>
{
    /**
     * Initializes a new instance of the `UserOptionInstruction` class.
     */
    public constructor(options: IOptionInstructionOptions<ICategoryOptions<IUserOptionOptions>>)
    {
        super(
            options,
            (node: Node<UserCategory, ICategoryOptions<IUserOptionOptions>>, opts: ICategoryOptions<IUserOptionOptions>) =>
            {
                return new UserCategory(node, opts);
            });
    }

    public get Type(): string
    {
        return "userOption";
    }

    public get RootCategory(): string
    {
        return "wcf.user.option";
    }

    public get Compiler(): InstructionCompiler<UserOptionInstruction>
    {
        return new UserOptionInstructionCompiler(this);
    }
}