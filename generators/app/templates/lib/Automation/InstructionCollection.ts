import Instruction from "./Instruction";
import Package from "../Package";
import FileMapping from "../FileMapping";
import FilesInstruction from "../FilesInstruction";
import Option from "../ControlPanel/Option";
import OptionsInstruction from "../ControlPanel/OptionsInstruction";
import SettingsNode from "../ControlPanel/SettingsNode";
import TranslationNode from "../Globalization/TranslationNode";
import EventListener from "../EventListener";
import EventListenersInstruction from "../EventListenersInstruction";
import TranslationsInstruction from "../Globalization/TranslationsInstruction";
import Style from "../Customization/Style";
import StyleInstruction from "../Customization/StyleInstruction";
import TemplatesInstruction from "../Customization/TemplatesInstruction";
import ACPTemplatesInstruction from "../Customization/ACPTemplatesInstruction";
import TemplateListener from "../Customization/TemplateListener";
import TemplateListenersInstruction from "../Customization/TemplateListenersInstruction";
import Emoji from "../Customization/Emoji";
import EmojisInstruction from "../Customization/EmojisInstruction";
import FileInstruction from "./FileInstruction";

/**
 * Rerpesents a set of instructions.
 */
export default class InstructionCollection extends Array<Instruction>
{
    /**
     * The package this collection belongs to.
     */
    private package: Package;

    /**
     * The directory inside the package to save the instruction-output to.
     */
    private destination: string;

    /**
     * Initializes a new instance of the `InstructionCollection` class.
     * 
     * @param pkg
     * The package this collection belongs to.
     */
    public constructor(pkg: Package, destination = "")
    {
        super();
        this.package = pkg;
        this.destination = destination;
    }

    /**
     * Gets or sets the package this collection belongs to.
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
     * Gets the mappings of the files provided by this collection.
     */
    public get FileMappings(): FileInstruction[]
    {
        let result: FileInstruction[] = [];

        for (let instruction of this)
        {
            if ((instruction instanceof FilesInstruction) &&
                (instruction.constructor === FilesInstruction))
            {
                result.push(instruction);
            }
        }

        return result;
    }

    /**
     * Gets the options provided by this collection.
     */
    public get Options(): { [id: string]: Option }
    {
        let result: { [id: string]: Option } = { };

        for (let instruction of this)
        {
            if (instruction instanceof OptionsInstruction)
            {
                Object.assign(result, instruction.Options);
            }
        }

        return result;
    }

    /**
     * Gets the names of the options to delete provided by this collection.
     */
    public get OptionsToDelete(): string[]
    {
        let result: string[] = [];

        for (let instruction of this)
        {
            if (instruction instanceof OptionsInstruction)
            {
                result.push(...instruction.Names);
            }
        }

        return result;
    }

    /**
     * Gets the categories provided by this collection.
     */
    public get Categories(): SettingsNode[]
    {
        let result: SettingsNode[] = [];

        for (let instruction of this)
        {
            if (instruction instanceof OptionsInstruction)
            {
                result.push(...instruction.Categories);
            }
        }

        return result;
    }

    /**
     * Gets the event-listeners provided by this collection.
     */
    public get EventListeners(): EventListener[]
    {
        let result: EventListener[] = [];

        for (let instruction of this)
        {
            if (instruction instanceof EventListenersInstruction)
            {
                result.push(...instruction.EventListeners);
            }
        }

        return result;
    }

    /**
     * Gets the names of the event-listeners to delete provided by this collection.
     */
    public get EventListenersToDelete(): string[]
    {
        let result: string[] = [];

        for (let instruction of this)
        {
            if (instruction instanceof EventListenersInstruction)
            {
                result.push(...instruction.Names);
            }
        }

        return result;
    }

    /**
     * Gets the translations provided by this collection.
     */
    public get Translations(): TranslationNode[]
    {
        let result: TranslationNode[] = [];

        for (let instruction of this)
        {
            if (instruction instanceof TranslationsInstruction)
            {
                result.push(...instruction.TranslationNodes);
            }
        }

        return result;
    }

    /**
     * Gets the styles provided by this collection.
     */
    public get Styles(): Style[]
    {
        let result: Style[] = [];

        for (let instruction of this)
        {
            if (instruction instanceof StyleInstruction)
            {
                result.push(instruction.Style);
            }
        }

        return result;
    }

    /**
     * Gets the templates provided by this collection.
     */
    public get Templates(): FileInstruction[]
    {
        let result: FileInstruction[] = [];

        for (let instruction of this)
        {
            if (instruction instanceof TemplatesInstruction)
            {
                result.push(instruction);
            }
        }
        
        return result;
    }

    /**
     * Gets the acp-templates provided by this collection.
     */
    public get ACPTemplates(): FileInstruction[]
    {
        let result: FileInstruction[] = [];

        for (let instruction of this)
        {
            if (instruction instanceof ACPTemplatesInstruction)
            {
                result.push(instruction);
            }
        }
        
        return result;
    }

    /**
     * Gets the template-listeners provided by this collection.
     */
    public get TemplateListeners(): TemplateListener[]
    {
        let result: TemplateListener[] = [];

        for (let instruction of this)
        {
            if (instruction instanceof TemplateListenersInstruction)
            {
                result.push(...instruction.TemplateListeners);
            }
        }

        return result;
    }

    /**
     * Gets the names of the template-listeners to delete provided by this collection.
     */
    public get TemplateListenersToDelete(): string[]
    {
        let result: string[] = [];

        for (let instruction of this)
        {
            if (instruction instanceof TemplateListenersInstruction)
            {
                result.push(...instruction.Names);
            }
        }

        return result;
    }

    /**
     * Gets the emojis provided by this collection.
     */
    public get Emojis(): Emoji[]
    {
        let result: Emoji[] = [];

        for (let instruction of this)
        {
            if (instruction instanceof EmojisInstruction)
            {
                result.push(...instruction.Emojis);
            }
        }

        return result;
    }

    public push(...items: Instruction[]): number
    {
        for (let item of items)
        {
            item.Package = this.Package;
        }

        return super.push(...items);
    }
}