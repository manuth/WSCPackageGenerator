import Option from "./Option";
import Localizable from "../Globalization/Localizable";
import Node from "../Nodes/Node";
import { isNullOrUndefined } from "util";
import TranslationNode from "../Globalization/TranslationNode";

/**
 * Represents an item of an option.
 */
export default class OptionItem
{
    /**
     * The name of the item.
     */
    private name: string = '';

    /**
     * The value of the item.
     */
    private value: any = null;

    /**
     * The option this item belongs to.
     */
    private option: Option = null;

    /**
     * The displayname of the item.
     */
    private displayName: Localizable = new Localizable();

    /**
     * Initializes a new instance of the `OptionItem` class.
     */
    public constructor(options: Partial<OptionItem> = { })
    {
        if (!isNullOrUndefined(options.Name))
        {
            this.name = options.Name;
        }

        if (!isNullOrUndefined(options.Value))
        {
            this.value = options.Value;
        }

        if (!isNullOrUndefined(options.Option))
        {
            this.option = options.Option;
        }

        if (!isNullOrUndefined(options.DisplayName))
        {
            Object.assign(this.DisplayName, options.DisplayName);
        }
    }

    /**
     * Gets or sets the name of the item.
     */
    public get Name(): string
    {
        return this.name;
    }

    public set Name(value: string)
    {
        this.name = value;
    }

    /**
     * Gets the displayname of the item.
     */
    public get DisplayName(): Localizable
    {
        return this.displayName;
    }

    /**
     * Gets the full name of the item.
     */
    public get FullName(): string
    {
        return [ this.Option.FullName, this.Name ].join('.');
    }

    /**
     * Gets or sets the value of the item.
     */
    public get Value(): any
    {
        return this.value;
    }

    public set Value(value: any)
    {
        this.value = value;
    }

    /**
     * Gets or sets the option this item belongs to.
     */
    public get Option(): Option
    {
        return this.option;
    }

    public set Option(value: Option)
    {
        this.option = value;
    }

    /**
     * Gets the translation-nodes of this item.
     */
    public get TranslationNodes(): TranslationNode[]
    {
        if (Object.keys(this.DisplayName).length > 0)
        {
            return [ new TranslationNode({
                Name: "wcf.acp.option",
                Nodes: [
                    new TranslationNode({
                        Name: this.FullName,
                        Translations: this.DisplayName
                    })
                ]
            }) ];
        }
        else
        {
            return [ ];
        }
    }
}