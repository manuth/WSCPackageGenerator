import { isNullOrUndefined } from "util";
import { Node } from "../../NodeSystem/Node";
import { Category } from "../../Options/Category";
import { Option } from "../../Options/Option";
import { OptionItem } from "../../Options/OptionItem";
import { OptionInstruction } from "../../PackageSystem/Instructions/Options/OptionInstruction";
import { XML } from "../../Serialization/XML";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { WoltLabXMLCompiler } from "../WoltLabXMLCompiler";

/**
 * Provides the functionality to compile option-files.
 */
export abstract class OptionFileCompiler<TCategory extends Category<TOption, TOptionOptions>, TCategoryOptions, TOption extends Option, TOptionOptions> extends WoltLabXMLCompiler<OptionInstruction<TCategory, TCategoryOptions, TOption, TOptionOptions>>
{
    /**
     * The language-category which contains translations for options.
     */
    private languageCategory: string;

    /**
     * Initializes a new instance of the `OptionFileCompiler<TCategory, TCategoryOptions, TOption, TOptionOptions>` class.
     *
     * @param item
     * The item to compile.
     *
     * @param languageCategory
     * The language-category which contains translations for options.
     */
    public constructor(item: OptionInstruction<TCategory, TCategoryOptions, TOption, TOptionOptions>)
    {
        super(item);
        this.LanguageCategory = `${item.RootCategory}${isNullOrUndefined(item.OptionCategory) ? "" : `.${item.OptionCategory}`}`;
    }

    /**
     * Gets or sets the language-category which contains translations for options.
     */
    public get LanguageCategory(): string
    {
        return this.languageCategory;
    }

    public set LanguageCategory(value: string)
    {
        this.languageCategory = value;
    }

    protected CreateDocument(): Document
    {
        let document: Document = super.CreateDocument();
        let editor: XMLEditor = new XMLEditor(document.documentElement);

        editor.AddElement(
            "import",
            ($import: XMLEditor) =>
            {
                $import.AddElement(
                    "categories",
                    (categories: XMLEditor) =>
                    {
                        for (let rootCategory of this.Item.Nodes)
                        {
                            for (let category of rootCategory.GetAllNodes())
                            {
                                categories.Add(this.CreateCategory(category));
                            }
                        }
                    });

                $import.AddElement(
                    "options",
                    (options: XMLEditor) =>
                    {
                        for (let rootCategory of this.Item.Nodes)
                        {
                            for (let category of rootCategory.GetAllNodes())
                            {
                                if (!isNullOrUndefined(category.Item))
                                {
                                    for (let option of category.Item.Options)
                                    {
                                        options.Add(this.CreateOption(option));
                                    }
                                }
                            }
                        }
                    });
            });

        return document;
    }

    /**
     * Serializes a category to xml.
     *
     * @param category
     * The category to serialize.
     */
    protected CreateCategory(category: Node<TCategory, TCategoryOptions>): Element
    {
        let document: Document = XML.CreateDocument("category");
        let editor: XMLEditor = new XMLEditor(document.documentElement);
        editor.SetAttribute("name", category.FullName);

        if (!isNullOrUndefined(category.Parent))
        {
            editor.AddTextElement("parent", category.Parent.FullName);
        }

        if (
            !isNullOrUndefined(category.Item) &&
            !isNullOrUndefined(category.Item.ShowOrder))
        {
            editor.AddTextElement("showorder", category.Item.ShowOrder.toString());
        }

        return editor.Element;
    }

    /**
     * Serializes an option to xml.
     *
     * @param option
     * The option to serialize.
     */
    protected CreateOption(option: TOption): Element
    {
        let document: Document = XML.CreateDocument("option");
        let editor: XMLEditor = new XMLEditor(document.documentElement);
        editor.SetAttribute("name", option.Name);
        editor.AddTextElement("categoryname", option.Category.Node.FullName);
        editor.AddTextElement("optiontype", option.Type);

        if (!isNullOrUndefined(option.DefaultValue))
        {
            editor.AddTextElement("defaultvalue", option.DefaultValue);
        }

        if (!isNullOrUndefined(option.ShowOrder))
        {
            editor.AddTextElement("showorder", option.ShowOrder.toString());
        }

        if (!isNullOrUndefined(option.ValidationPattern))
        {
            editor.AddTextElement("validationpattern", option.ValidationPattern.source);
        }

        if (option.Items.length > 0)
        {
            editor.AddTextElement(
                "selectoptions",
                option.Items.map((optionItem: OptionItem) =>
                {
                    return `${optionItem.Value}:${this.LanguageCategory}.${option.Name}.${optionItem.Name}`;
                }).join("\n"));
        }

        if (option.Options.length > 0)
        {
            editor.AddTextElement("options", option.Options.join(","));
        }

        if (option.EnableOptions.length > 0)
        {
            editor.AddTextElement("enableoptions", option.EnableOptions.join(","));
        }

        for (let additionalProperty in option.AdditionalProperties)
        {
            editor.AddTextElement(additionalProperty, option.AdditionalProperties[additionalProperty]);
        }

        return editor.Element;
    }
}