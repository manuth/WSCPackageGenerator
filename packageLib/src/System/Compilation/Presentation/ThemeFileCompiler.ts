import { isNullOrUndefined } from "util";
import { Theme } from "../../Customization/Presentation/Themes/Theme";
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

    protected get XMLElement(): Document
    {
        let document: Document = super.XMLElement;

        let general: Element = document.createElement("general");
        {
            for (let locale of this.Item.DisplayName.GetLocales())
            {
                let name: Element = document.createElement("stylename");

                if (locale !== "inv")
                {
                    name.setAttribute("language", locale);
                }

                name.appendChild(document.createTextNode(this.Item.DisplayName.Data[locale]));
                general.appendChild(name);
            }

            let version: Element = document.createElement("version");
            version.appendChild(document.createTextNode(this.Item.Version));
            general.appendChild(version);

            let date: Element = document.createElement("date");
            date.appendChild(
                document.createTextNode(
                    this.Item.CreationDate.getFullYear() + "-" +
                    (this.Item.CreationDate.getMonth() + 1).toString().padStart(2, "0") + "-" +
                    this.Item.CreationDate.getDate().toString().padStart(2, "0")));
            general.appendChild(date);

            for (let locale of this.Item.Description.GetLocales())
            {
                let description: Element = document.createElement("description");

                if (locale !== "inv")
                {
                    description.setAttribute("language", locale);
                }

                description.appendChild(document.createTextNode(this.Item.Description.Data[locale]));
                general.appendChild(description);
            }

            if (!isNullOrUndefined(this.Item.License))
            {
                let license: Element = document.createElement("license");
                license.appendChild(document.createTextNode(this.Item.License));
                general.appendChild(license);
            }

            let $package: Element = document.createElement("packageName");
            $package.appendChild(document.createTextNode(this.Item.Instruction.Collection.Package.Identifier));
            general.appendChild($package);

            let api: Element = document.createElement("apiVersion");
            api.appendChild(document.createTextNode("3.1"));
            general.appendChild(api);

            if (!isNullOrUndefined(this.Item.Thumbnail))
            {
                let thumbnail: Element = document.createElement("image");
                thumbnail.appendChild(document.createTextNode(this.Item.Thumbnail));
                general.appendChild(thumbnail);
            }

            if (!isNullOrUndefined(this.Item.HighResThumbnail))
            {
                let highResThumbnail: Element = document.createElement("image2x");
                highResThumbnail.appendChild(document.createTextNode(this.Item.HighResThumbnail));
                general.appendChild(highResThumbnail);
            }

            if (!isNullOrUndefined(this.Item.CoverPhoto))
            {
                let coverPhoto: Element = document.createElement("coverPhoto");
                coverPhoto.appendChild(document.createTextNode(this.Item.CoverPhoto));
                general.appendChild(coverPhoto);
            }
        }
        document.documentElement.appendChild(general);

        let author: Element = document.createElement("author");
        {
            if (!isNullOrUndefined(this.Item.Author.Name))
            {
                let name: Element = document.createElement("authorname");
                name.appendChild(document.createTextNode(this.Item.Author.Name));
                author.appendChild(name);
            }

            if (!isNullOrUndefined(this.Item.Author.URL))
            {
                let url: Element = document.createElement("authorurl");
                url.appendChild(document.createTextNode(this.Item.Author.URL));
                author.appendChild(url);
            }
        }
        document.documentElement.appendChild(author);

        let files: Element = document.createElement("files");
        {
            if (
                Object.keys(this.Item.Variables).length > 0 ||
                !isNullOrUndefined(this.Item.CustomScss) ||
                !isNullOrUndefined(this.Item.ScssOverride))
            {
                let variables: Element = document.createElement("variables");
                variables.appendChild(document.createTextNode(this.VariableFileName));
                files.appendChild(variables);
            }

            if (!isNullOrUndefined(this.Item.Images))
            {
                let images: Element = document.createElement("images");
                images.setAttribute("path", this.Item.Images.DestinationRoot);
                images.appendChild(document.createTextNode(this.Item.Images.FileName));
                files.appendChild(images);
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