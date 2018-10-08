import { BidirectionalCollection } from "../../Collections/BidirectionalCollection";
import { XML } from "../../Serialization/XML";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { Package } from "../Package";
import { Instruction } from "./Instruction";

/**
 * Represents a collection of instructions.
 */
export class InstructionSet extends BidirectionalCollection<InstructionSet, Instruction>
{
    /**
     * The package the collection belongs to.
     */
    private package: Package;

    /**
     * The directory to save the set to.
     */
    private directory: string = "components";

    /**
     * Initializes a new instance of the `InstructionSet` class.
     */
    public constructor($package: Package)
    {
        super(null);
        this.Package = $package;
    }

    public get Owner(): InstructionSet
    {
        return this;
    }

    /**
     * Gets or sets the package the collection belongs to.
     */
    public get Package(): Package
    {
        return this.package;
    }

    public set Package(value: Package)
    {
        this.package = value;
    }

    /**
     * Gets or sets the directory to save the components of this set.
     */
    public get Directory(): string
    {
        return this.directory;
    }

    public set Directory(value: string)
    {
        this.directory = value;
    }

    protected GetParent(child: Instruction): InstructionSet
    {
        return child.Collection;
    }

    protected SetParent(child: Instruction, parent: InstructionSet): void
    {
        child.Collection = parent;
    }

    /**
     * Serializes the instruction-set to an xml dom-element.
     */
    public Serialize(): Element
    {
        let document: Document = XML.CreateDocument("instructions");
        let editor: XMLEditor = new XMLEditor(document.documentElement);
        editor.SetAttribute("type", "install");

        for (let instruction of this)
        {
            let childNodes: NodeList = instruction.Compiler.Serialize().childNodes;

            for (let i: number = 0; i < childNodes.length; i++)
            {
                let node: Node = childNodes.item(i);
                editor.Add(node);
            }
        }

        return editor.Element;
    }
}