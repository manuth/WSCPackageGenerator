import * as Path from "path";
import { DOMParser, XMLSerializer } from "xmldom";
import { IInstructionOptions } from "./IInstructionOptions";
import { InstructionSet } from "./InstructionSet";

/**
 * Represents a step of a package-installation.
 */
export abstract class Instruction
{
    /**
     * The package this instruction belongs to.
     */
    private collection: InstructionSet = null;

    /**
     * The name of the file to save the compiled instruction to.
     */
    private fileName: string = null;

    /**
     * Initializes a new instance of the `Instruction` class.
     */
    public constructor(options: IInstructionOptions)
    {
        this.FileName = options.FileName;
    }

    /**
     * Gets the name of the type of the instruction.
     */
    public abstract get Type(): string;

    /**
     * Gets or sets the package this instruction belongs to.
     */
    public get Collection(): InstructionSet
    {
        return this.collection;
    }

    public set Collection(value: InstructionSet)
    {
        this.collection = value;
    }

    /**
     * Gets the directory to save the instruction to.
     */
    public get DestinationRoot(): string
    {
        return Path.join(this.Collection.Directory);
    }

    /**
     * Gets or sets the name of the file to save the compiled instruction to.
     */
    public get FileName(): string
    {
        return this.fileName;
    }

    public set FileName(value: string)
    {
        this.fileName = value;
    }

    /**
     * Gets the full name of the file.
     */
    public get FullName(): string
    {
        return Path.join(this.DestinationRoot, this.FileName).replace(Path.sep, "/");
    }

    /**
     * Gets all identifiable objects.
     */
    public get ObjectsByID(): { [id: string]: any }
    {
        return {};
    }

    /**
     * Gets an xml-element which represents the instruction.
     */
    protected get XMLDocument(): Document
    {
        let document: Document = new DOMParser().parseFromString("<instruction />");
        document.documentElement.textContent = this.FullName;
        document.documentElement.setAttribute("type", this.Type);
        return document;
    }

    /**
     * Gets an xml-code which represents the instruction.
     */
    public get XML(): string
    {
        return new XMLSerializer().serializeToString(this.XMLDocument);
    }
}