import ACPTemplatesInstruction from "../Customization/Presentation/ACPTemplatesInstruction";
import Emoji from "../Customization/Emojis/Emoji";
import EmojisInstruction from "../Customization/Emojis/EmojisInstruction";
import ErrorMessageNode from "../Globalization/Errors/ErrorMessageNode";
import ErrorMessagesInstruction from "../Globalization/Errors/ErrorMessagesInstruction";
import EventListener from "../Events/EventListener";
import EventListenersInstruction from "../Events/EventListenersInstruction";
import FileInstruction from "./FileInstruction";
import FilesInstruction from "../FilesInstruction";
import IInstructionCollection from "./IInstructionCollection";
import Instruction from "./Instruction";
import Option from "../Options/ControlPanel/Option";
import OptionsInstruction from "../Options/ControlPanel/OptionsInstruction";
import Package from "../PackageSystem/Package";
import SettingsNode from "../Options/ControlPanel/SettingsNode";
import Style from "../Customization/Styles/Style";
import StyleInstruction from "../Customization/Styles/StyleInstruction";
import TemplateListener from "../Customization/Presentation/TemplateListener";
import TemplateListenersInstruction from "../Customization/Presentation/TemplateListenersInstruction";
import TemplatesInstruction from "../Customization/Presentation/TemplatesInstruction";
import TranslationNode from "../Globalization/TranslationNode";
import TranslationsInstruction from "../Globalization/TranslationsInstruction";
import { isNullOrUndefined } from "util";

/**
 * Rerpesents a set of instructions.
 */
export default class InstructionCollection<T extends Instruction> extends Array<T> implements IInstructionCollection<T>
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

    public get Destination(): string
    {
        return this.destination;
    }

    public set Destination(value: string)
    {
        this.destination = value;
    }

    public get Instructions(): T[]
    {
        return this;
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
     * Gets the translations provided by this collection.
     */
    public get Translations(): { [id: string]: TranslationNode }
    {
        let result: { [id: string]: TranslationNode } = { };

        for (let instruction of this)
        {
            if (instruction instanceof TranslationsInstruction && !(instruction instanceof ErrorMessagesInstruction))
            {
                Object.assign(result, instruction.Translations);
            }
        }

        return result;
    }

    /**
     * Gets all error-messages provided by this collection.
     */
    public get ErrorMessages(): { [id: string]: ErrorMessageNode }
    {
        let result: { [id: string]: ErrorMessageNode } = { };

        for (const instruction of this)
        {
            if (instruction instanceof ErrorMessagesInstruction)
            {
                Object.assign(result, instruction.Errors);
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

        for (const instruction of this)
        {
            if (instruction instanceof TemplateListenersInstruction)
            {
                result.push(...instruction.TemplateListeners);
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

        for (const instruction of this)
        {
            if (instruction instanceof EmojisInstruction)
            {
                result.push(...instruction.Emojis);
            }
        }

        return result;
    }

    public push(...items: T[]): number
    {
        for (const item of items)
        {
            if (!isNullOrUndefined(item))
            {
                item.Package = this.Package;
            }
        }

        return super.push(...items);
    }
}