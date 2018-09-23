import { Instruction } from "../PackageSystem/Instructions/Instruction";
import { Compiler } from "./Compiler";

/**
 * Provides the functionality to compile an instruction.
 */
export abstract class InstructionCompiler<T extends Instruction> extends Compiler<T>
{
    /**
     * Copies files using `EJS`.
     *
     * @param source
     * The source to copy the files from.
     *
     * @param destination
     * The destination to copy the files to.
     *
     * @param context
     * The context to use.
     */
    protected async CopyTemplate(source: string, destination: string, context?: { [key: string]: any }): Promise<void>
    {
        context = context || {};

        Object.assign(
            context,
            {
                $: (id: string): any => this.Item.Collection.Package.GetObjectByID(id),
                Item: this.Item
            });

        super.CopyTemplate(source, destination, context);
    }
}