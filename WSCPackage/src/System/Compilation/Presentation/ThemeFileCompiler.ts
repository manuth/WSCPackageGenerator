import { isNullOrUndefined } from "util";
import { Theme } from "../../Customization/Presentation/Themes/Theme";
import { XMLEditor } from "../../Serialization/XMLEditor";
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

    protected get TagName()
    {
        return "style";
    }

    protected get SchemaLocation()
    {
        return "https://www.woltlab.com/XSD/vortex/style.xsd";
    }

    protected CreateDocument()
    {
        let document = super.CreateDocument();
        let editor = new XMLEditor(document.documentElement);

        editor.AddElement(
            "general",
            (general) =>
            {
                for (let locale of this.Item.DisplayName.GetLocales())
                {
                    general.AddTextElement(
                        "stylename",
                        this.Item.DisplayName.Data[locale],
                        (name) =>
                        {
                            if (locale !== "inv")
                            {
                                name.SetAttribute("language", locale);
                            }
                        });
                }

                general.AddTextElement("version", this.Item.Version);
                general.AddTextElement(
                    "date",
                    this.Item.CreationDate.getFullYear().toString() + "-" +
                    (this.Item.CreationDate.getMonth() + 1).toString().padStart(2, "0") + "-" +
                    this.Item.CreationDate.getDate().toString().padStart(2, "0"));

                for (let locale of this.Item.Description.GetLocales())
                {
                    general.AddTextElement(
                        "description",
                        this.Item.Description.Data[locale],
                        (description) =>
                        {
                            if (locale !== "inv")
                            {
                                description.SetAttribute("language", locale);
                            }
                        });
                }

                if (!isNullOrUndefined(this.Item.License))
                {
                    general.AddTextElement("license", this.Item.License);
                }

                general.AddTextElement("packageName", this.Item.Instruction.Collection.Package.Identifier);
                general.AddTextElement("apiVersion", "3.1");

                if (!isNullOrUndefined(this.Item.Thumbnail))
                {
                    general.AddTextElement("image", this.Item.Thumbnail.FileName);
                }

                if (!isNullOrUndefined(this.Item.HighResThumbnail))
                {
                    general.AddTextElement("image2x", this.Item.HighResThumbnail.FileName);
                }

                if (!isNullOrUndefined(this.Item.CoverPhoto))
                {
                    general.AddTextElement("coverPhoto", this.Item.CoverPhoto.FileName);
                }
            });

        editor.AddElement(
            "author",
            (author) =>
            {
                if (!isNullOrUndefined(this.Item.Author.Name))
                {
                    author.AddTextElement("authorname", this.Item.Author.Name);
                }

                if (!isNullOrUndefined(this.Item.Author.URL))
                {
                    author.AddTextElement("authorurl", this.Item.Author.URL);
                }
            });

        let files = new XMLEditor(document.createElement("files"));
        {
            if (
                Object.keys(this.Item.Variables).length > 0 ||
                !isNullOrUndefined(this.Item.CustomScss) ||
                !isNullOrUndefined(this.Item.ScssOverride))
            {
                files.AddTextElement("variables", this.VariableFileName);
            }

            if (!isNullOrUndefined(this.Item.Images))
            {
                files.AddTextElement(
                    "images",
                    this.Item.Images.FileName,
                    (images) =>
                    {
                        images.SetAttribute("path", this.Item.Images.DestinationRoot);
                    });
            }
        }

        if (files.ChildNodes.length > 0)
        {
            editor.Add(files.Element);
        }

        return document;
    }

    /**
     * Gets or sets the filename to save variables to.
     */
    public get VariableFileName()
    {
        return this.variableFileName;
    }

    public set VariableFileName(value)
    {
        this.variableFileName = value;
    }
}