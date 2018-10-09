import { EmojiInstruction } from "../../../PackageSystem/Instructions/Customization/EmojiInstruction";
import { Compiler } from "../../Compiler";
import { EmojiFileCompiler } from "../../Presentation/EmojiFileCompiler";
import { TemplateInstructionCompiler } from "./TemplateInstructionCompiler";

/**
 * Provides the functionality to compile emoji-instructions.
 */
export class EmojiInstructionCompiler extends TemplateInstructionCompiler<EmojiInstruction>
{
    /**
     * Initializes a new instance of the `EmojiInstructionCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: EmojiInstruction)
    {
        super(item);
    }

    protected get FileCompiler(): Compiler<EmojiInstruction>
    {
        return new EmojiFileCompiler(this.Item);
    }
}