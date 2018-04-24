import IOption from "./IOption";
import Localizable from "../../GLobalization/Localizable";
import Node from "../../Nodes/Node";
import OptionItem from "./OptionItem";
import OptionItemCollection from "./OptionItemCollection";
import OptionType from "./OptionType";
import SettingsNode from "./SettingsNode";
import TranslationNode from "../../Globalization/TranslationNode";
import { isNullOrUndefined } from "util";

/**
 * Represents an option that can be shown in the ACP.
 */
export default class Option extends Node implements IOption
{
    /**
     * The id of the option.
     */
    private id: string = null;

    /**
     * The displayname of the option.
     */
    private displayName: Localizable = new Localizable();

    /**
     * The description of the option.
     */
    private description: Localizable = new Localizable();

    /**
     * The default value of the option.
     */
    private default: any = null;

    /**
     * The type of the option.
     */
    private type: OptionType = OptionType.TextBox;

    /**
     * A value indicating whether localization is supported.
     */
    private supportsLocalization: boolean = false;

    /**
     * A value indicating whether this option is localized.
     */
    private requiresLocalization: boolean = false;

    /**
     * The items of the option.
     */
    private items: OptionItem[] = new OptionItemCollection(this);

    /**
     * A comma-separated list of options which should be visually enabled when this option is enabled.  
     * A leading exclamation mark (`!`, U+0021) will disable the specified option when this option is enabled.  
     * For `ComboBox` and `RadioButton` types the list should be prefixed by the selectoptions name followed by a colon (:, U+003A).
     *
     * This setting is a visual helper for the administrator only.  
     * It does not have an effect on the server side processing of the option.
     */
    private enableOptions: string[] = [];

    /**
     * Initializes a new instance of the `Option` class.
     */
    public constructor(options: IOption)
    {
        super(options);
        this.id = options.ID;

        if (!isNullOrUndefined(options.DisplayName))
        {
            Object.assign(this.displayName, options.DisplayName);
        }

        if (!isNullOrUndefined(options.Description))
        {
            Object.assign(this.description, options.Description);
        }

        if (!isNullOrUndefined(options.Default))
        {
            this.default = options.Default;
        }

        if (!isNullOrUndefined(options.Type))
        {
            this.type = options.Type;
        }

        if (!isNullOrUndefined(options.SupportsLocalization))
        {
            this.supportsLocalization = options.SupportsLocalization;
        }

        if (!isNullOrUndefined(options.RequiresLocalization))
        {
            this.requiresLocalization = options.RequiresLocalization;
        }

        if (!isNullOrUndefined(options.Items))
        {
            this.items.push(...options.Items);
        }

        if (!isNullOrUndefined(options.EnableOptions))
        {
            this.enableOptions.push(...options.EnableOptions);
        }
    }

    public get ID(): string
    {
        return this.id;
    }

    public set ID(value: string)
    {
        this.id = value;
    }

    public get DisplayName(): Localizable
    {
        return this.displayName;
    }

    public get FullName(): string
    {
        return "wcf.acp.option." + this.Name;
    }

    public get Description(): Localizable
    {
        return this.description;
    }

    public get Default(): any
    {
        return this.default;
    }

    public get Type(): OptionType
    {
        return this.type;
    }

    public set Type(value: OptionType)
    {
        this.type = value;
    }

    public get SupportsLocalization(): boolean
    {
        return this.supportsLocalization;
    }

    public set SupportsLocalization(value: boolean)
    {
        this.supportsLocalization = value;
    }

    public get RequiresLocalization(): boolean
    {
        return this.requiresLocalization;
    }

    public set RequiresLocalization(value: boolean)
    {
        this.requiresLocalization = value;
    }

    public get Items(): OptionItem[]
    {
        return this.items;
    }

    public get EnableOptions(): string[]
    {
        return this.enableOptions;
    }

    /**
     * Gets the translation-nodes of the option.
     */
    public get TranslationNodes(): TranslationNode[]
    {
        let translationNode = new TranslationNode({ Name: "wcf.acp.option" });
        let rootNodes: TranslationNode[] = [];

        if (Object.keys(this.DisplayName))
        {
            translationNode.Nodes.push(
                new TranslationNode({
                    Name: this.Name,
                    Translations: this.DisplayName
                }));
        }

        if (Object.keys(this.Description))
        {
            translationNode.Nodes.push(
                new TranslationNode({
                    Name: this.Name,
                    Nodes: [
                        new TranslationNode(
                            {
                                Name: "description",
                                Translations: this.Description
                            }
                        )
                    ]
                }));
        }

        for (let item of this.Items)
        {
            for (let childNode of item.TranslationNodes)
            {
                if (translationNode.Name === childNode.Name)
                {
                    translationNode.Nodes.push(...childNode.Nodes);
                }
            }
        }

        if (translationNode.GetTranslations().length > 0)
        {
            rootNodes.splice(0, 0, translationNode);
        }

        return rootNodes;
    }
}