import * as Path from "path";
import { isNullOrUndefined } from "util";
import { DOMParser, XMLSerializer } from "xmldom";
import { IInstruction } from "./IInstruction";
import { IInstructionOptions } from "./IInstructionOptions";
import { InstructionSet } from "./InstructionSet";

/**
 * Represents a step of a package-installation.
 */
export abstract class Instruction implements IInstruction
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
     * Gets the name of the type of the instruction.
     */
    public abstract get Type(): string;

    public get Collection(): InstructionSet
    {
        return this.collection;
    }

    public set Collection(value: InstructionSet)
    {
        if (this.Collection !== value)
        {
            if (
                !isNullOrUndefined(this.Collection) &&
                this.Collection.includes(this))
            {
                this.Collection.splice(this.Collection.indexOf(this), 1);
            }

            if (
                isNullOrUndefined(value) ||
                value.includes(this))
            {
                this.collection = value;
            }
            else
            {
                value.push(this);
            }
        }
    }

    public get DestinationRoot(): string
    {
        return Path.join(this.Collection.Directory);
    }

    public get FileName(): string
    {
        return this.fileName;
    }

    public set FileName(value: string)
    {
        this.fileName = value;
    }

    public get FullName(): string
    {
        return Path.join(this.DestinationRoot, this.FileName).replace(Path.sep, "/");
    }

    public get ObjectsByID(): { [id: string]: any }
    {
        return {};
    }

    public get XML(): string
    {
        return new XMLSerializer().serializeToString(this.XMLDocument);
    }
}