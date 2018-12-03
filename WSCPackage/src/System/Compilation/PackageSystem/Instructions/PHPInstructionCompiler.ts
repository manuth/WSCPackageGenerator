import { isNullOrUndefined } from "util";
import { PHPInstruction } from "../../../PackageSystem/Instructions/PHPInstruction";
import { XMLEditor } from "../../../Serialization/XMLEditor";
import { InstructionCompiler } from "./InstructionCompiler";

/**
 * Provides the functionality to compile PHP-instructions.
 */
export class PHPInstructionCompiler extends InstructionCompiler<PHPInstruction>
{
    public Serialize()
    {
        let document = super.Serialize();
        let editor = new XMLEditor(document.documentElement);

        if (!isNullOrUndefined(this.Item.Application))
        {
            editor.SetAttribute("application", this.Item.Application);
        }

        return document;
    }
}