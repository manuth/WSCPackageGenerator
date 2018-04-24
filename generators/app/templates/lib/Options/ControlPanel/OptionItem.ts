import IOptionItem from "./IOptionItem";
import Localizable from "../../Globalization/Localizable";
import Node from "../../Nodes/Node";
import Option from "./Option";
import TranslationNode from "../../Globalization/TranslationNode";
import { isNullOrUndefined } from "util";

/**
 * Represents an item of an option.
 */
export default class OptionItem implements IOptionItem
{
    /**
     * The name of the item.
     */
    private name: string = "";

    /**
     * The displayname of the item.
     */
    private displayName: Localizable = new Localizable();

    /**
     * The value of the item.
     */
    private value: any = null;

    /**
     * The option this item belongs to.
     */
    private option: Option = null;

    /**
     * Initializes a new instance of the `OptionItem` class.
     */
    public constructor(options: IOptionItem)
    {
        this.name = options.Name;

        if (!isNullOrUndefined(options.DisplayName))
        {
            Object.assign(this.DisplayName, options.DisplayName);
        }

        this.value = options.Value;
    }

    public get Name(): string
    {
        return this.name;
    }

    public set Name(value: string)
    {
        this.name = value;
    }

    public get DisplayName(): Localizable
    {
        return this.displayName;
    }

    /**
     * Gets the full name of the item.
     */
    public get FullName(): string
    {
        return [ this.Option.FullName, this.Name ].join(".");
    }

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
                        Name: this.Option.Name,
                        Nodes: [
                            new TranslationNode({
                                Name: this.Name,
                                Translations: this.DisplayName
                            })
                        ]
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