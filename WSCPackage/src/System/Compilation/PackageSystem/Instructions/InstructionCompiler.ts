import * as Path from "path";
import { DOMParser } from "xmldom";
import { IInstruction } from "../../../PackageSystem/Instructions/IInstruction";
import { Compiler } from "../../Compiler";

/**
 * Provides the functionality to compile an instruction.
 */
export class InstructionCompiler<T extends IInstruction> extends Compiler<T>
{
    /**
     * Initializes a new instance of the `InstructionCompiler<T>` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: T)
    {
        super(item);
    }

    /**
     * Gets the name of the file to write the compiled item to.
     */
    public get DestinationFileName()
    {
        return this.MakePackagePath(this.Item.FullName);
    }

    /**
     * Returns an XML `Document` which represents the compiled instruction.
     */
    public Serialize()
    {
        let document = new DOMParser().parseFromString("<instruction />");
        document.documentElement.textContent = this.Item.FullName;
        document.documentElement.setAttribute("type", this.Item.Type);

        if (this.Item.Standalone)
        {
            document.documentElement.setAttribute("run", "standalone");
        }

        return document;
    }

    protected async Compile(): Promise<void>
    {
    }

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
    protected async CopyTemplate(source: string, destination: string, context?: { [key: string]: any })
    {
        context = context || {};

        Object.assign(
            context,
            {
                $: (id: string): any => this.Item.Collection.Package.GetObjectByID(id),
                Item: this.Item
            });

        await super.CopyTemplate(source, destination, context);
    }

    /**
     * Joins the paths and returns the path contained by the package-folder.
     *
     * @param path
     * The path that is to be joined.
     */
    protected MakePackagePath(...path: string[])
    {
        return super.MakeDestinationPath(...path);
    }

    /**
     * Joins the paths and returns the path contained by the destination-folder.
     *
     * @param path
     * The path that is to be joined.
     */
    protected MakeDestinationPath(...path: string[])
    {
        return Path.join(this.DestinationFileName, ...path);
    }
}