import Component from "./Component";
import ComponentCollection from "./Automation/ComponentCollection";
import UpdateComponentCollection from "./Automation/UpdateComponentCollection";
import ComponentsCollection from "./Automation/ComponentsCollection";
import Option from "./ControlPanel/Option";
import SettingsNode from "./ControlPanel/SettingsNode";
import TranslationNode from "./Globalization/TranslationNode";
import { isNullOrUndefined } from "util";

/**
 * Represents a package for WoltLab Suite Core.
 */
export default class Package extends Component
{
    /**
     * The identifier of the package.
     */
    private identifier: string = '';

    /**
     * The instruction that is used for installing the packge.
     */
    private installInstruction = new ComponentCollection({ Package: this });

    /**
     * A set of instructions for updating the package.
     */
    private updateInstructions: UpdateComponentCollection[] = new ComponentsCollection(this);

    /**
     * Initializes a new instance of the `Package` class.
     */
    public constructor(options: Partial<Package> = { })
    {
        super(options);

        if (!isNullOrUndefined(options.Identifier))
        {
            this.identifier = options.Identifier;
        }

        if (!isNullOrUndefined(options.InstallInstruction))
        {
            this.installInstruction = options.InstallInstruction;
        }

        if (!isNullOrUndefined(options.UpdateInstructions))
        {
            this.updateInstructions.push(...options.UpdateInstructions);
        }
    }

    /**
     * Gets or sets the identifier of the package.
     */
    public get Identifier(): string
    {
        return this.identifier;
    }

    public set Identifier(value: string)
    {
        this.identifier = value;
    }

    /**
     * Gets or sets the instruction that is used for installing the packge.
     */
    public get InstallInstruction(): ComponentCollection
    {
        return this.installInstruction;
    }

    public set InstallInstruction(value: ComponentCollection)
    {
        this.installInstruction = value;
    }

    /**
     * Gets a set of instructions for updating the package.
     */
    public get UpdateInstructions(): UpdateComponentCollection[]
    {
        return this.updateInstructions;
    }

    /**
     * Gets the options provided by this package.
     */
    public get Options(): { [id: string]: Option }
    {
        return this.installInstruction.Options;
    }

    /**
     * Gets the categories provided by this package.
     */
    public get Categories(): SettingsNode[]
    {
        return this.installInstruction.Categories;
    }

    /**
     * Gets the translations provided by this package.
     */
    public get Translations(): TranslationNode[]
    {
        return this.InstallInstruction.Translations;
    }
}