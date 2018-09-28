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
    public constructor(item: [string, {[category: string]: {[key: string]: string}}])
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

    protected get XMLElement(): Document
    {
        let document: Document = super.XMLElement;
        document.documentElement.setAttribute("languagecode", this.Item[0]);

        for (let categoryName of Object.keys(this.Item[1]))
        {
            let categoryNode: Element = document.createElement("category");
            categoryNode.setAttribute("name", categoryName);

            for (let messageName of Object.keys(this.Item[1][categoryName]))
            {
                let itemNode: Element = document.createElement("item");
                itemNode.setAttribute("name", messageName);
                itemNode.appendChild(document.createCDATASection(this.Item[1][categoryName][messageName]));
                categoryNode.appendChild(itemNode);
            }

            document.documentElement.appendChild(categoryNode);
        }

        return document;
    }
}