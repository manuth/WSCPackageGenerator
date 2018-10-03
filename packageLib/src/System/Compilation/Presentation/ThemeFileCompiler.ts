import { isNullOrUndefined } from "util";
import { Theme } from "../../Customization/Presentation/Themes/Theme";
import { XML } from "../../Serialization/XML";
import { WoltLabXMLCompiler } from "../WoltLabXMLCompiler";

/**
 * Provides the functionality to compile theme-files.
 */
export class ThemeFileCompiler extends WoltLabXMLCompiler<Theme>
{
    /**
     * The name to save the variables to.
     */
    private variableFileName: string;

    /**
     * Initializes a new instance of the `ThemeFileCompiler<T>` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: Theme, variableFileName: string)
    {
        super(item);
        this.VariableFileName = variableFileName;
    }

    protected get TagName(): string
    {
        return "style";
    }

    protected get SchemaLocation(): string
    {
        return "https://www.woltlab.com/XSD/vortex/style.xsd";
    }

    protected CreateDocument(): Document
    {
        let document: Document = super.CreateDocument();

        XML.AddElement(
            document.documentElement,
            "general",
            (general: Element) =>
            {
                for (let locale of this.Item.DisplayName.GetLocales())
                {
                    XML.AddTextElement(
                        general,
                        "stylename",
                        this.Item.DisplayName.Data[locale],
                        (name: Element) =>
                        {
                            if (locale !== "inv")
                            {
                                name.setAttribute("language", locale);
                            }
                        });
                }

                XML.AddTextElement(general, "version", this.Item.Version);
                XML.AddTextElement(
                    general,
                    "date",
                    this.Item.CreationDate.getFullYear() + "-" +
                    (this.Item.CreationDate.getMonth() + 1).toString().padStart(2, "0") + "-" +
                    this.Item.CreationDate.getDate().toString().padStart(2, "0"));

                for (let locale of this.Item.Description.GetLocales())
                {
                    XML.AddTextElement(
                        general,
                        "description",
                        this.Item.Description.Data[locale],
                        (description: Element) =>
                        {
                            if (locale !== "inv")
                            {
                                description.setAttribute("language", locale);
                            }
                        });
                }

                if (!isNullOrUndefined(this.Item.License))
                {
                    XML.AddTextElement(general, "license", this.Item.License);
                }

                XML.AddTextElement(general, "packageName", this.Item.Instruction.Collection.Package.Identifier);
                XML.AddTextElement(general, "apiVersion", "3.1");

                if (!isNullOrUndefined(this.Item.Thumbnail))
                {
                    XML.AddTextElement(general, "image", this.Item.Thumbnail.FileName);
                }

                if (!isNullOrUndefined(this.Item.HighResThumbnail))
                {
                    XML.AddTextElement(general, "image2x", this.Item.HighResThumbnail.FileName);
                }

                if (!isNullOrUndefined(this.Item.CoverPhoto))
                {
                    XML.AddTextElement(general, "coverPhoto", this.Item.CoverPhoto.FileName);
                }
            });

        XML.AddElement(
            document.documentElement,
            "author",
            (author: Element) =>
            {
                if (!isNullOrUndefined(this.Item.Author.Name))
                {
                    XML.AddTextElement(author, "authorname", this.Item.Author.Name);
                }

                if (!isNullOrUndefined(this.Item.Author.URL))
                {
                    XML.AddTextElement(author, "authorurl", this.Item.Author.URL);
                }
            });

        let files: Element = document.createElement("files");
        {
            if (
                Object.keys(this.Item.Variables).length > 0 ||
                !isNullOrUndefined(this.Item.CustomScss) ||
                !isNullOrUndefined(this.Item.ScssOverride))
            {
                XML.AddTextElement(files, "variables", this.VariableFileName);
            }

            if (!isNullOrUndefined(this.Item.Images))
            {
                XML.AddTextElement(
                    files,
                    "images",
                    this.Item.Images.FileName,
                    (images: Element) =>
                    {
                        images.setAttribute("path", this.Item.Images.DestinationRoot);
                    });
            }
        }

        if (files.childNodes.length > 0)
        {
            document.documentElement.appendChild(files);
        }

        return document;
    }

    /**
     * Gets or sets the filename to save variables to.
     */
    public get VariableFileName(): string
    {
        return this.variableFileName;
    }

    public set VariableFileName(value: string)
    {
        this.variableFileName = value;
    }
}