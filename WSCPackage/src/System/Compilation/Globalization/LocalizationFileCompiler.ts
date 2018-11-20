import { XMLEditor } from "../../Serialization/XMLEditor";
import { WoltLabXMLCompiler } from "../WoltLabXMLCompiler";

/**
 * Provides the functionality to compile localization-files.
 */
export class LocalizationFileCompiler extends WoltLabXMLCompiler<[string, { [category: string]: { [key: string]: string } }]>
{
    /**
     * Initializes a new instance of the `LocalizationFileCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: [string, { [category: string]: { [key: string]: string } }])
    {
        super(item);
    }

    protected get TagName(): string
    {
        return "language";
    }

    protected get SchemaLocation(): string
    {
        return "http://www.woltlab.com/XSD/tornado/language.xsd";
    }

    protected CreateDocument(): Document
    {
        let document: Document = super.CreateDocument();
        let editor: XMLEditor = new XMLEditor(document.documentElement);

        editor.SetAttribute("languagecode", this.Item[0]);

        for (let categoryName of Object.keys(this.Item[1]))
        {
            editor.AddElement(
                "category",
                (category: XMLEditor) =>
                {
                    category.SetAttribute("name", categoryName);

                    for (let messageName of Object.keys(this.Item[1][categoryName]))
                    {
                        category.AddCDATAElement("item", this.Item[1][categoryName][messageName], (item: XMLEditor) => item.SetAttribute("name", messageName));
                    }
                });
        }

        return document;
    }
}