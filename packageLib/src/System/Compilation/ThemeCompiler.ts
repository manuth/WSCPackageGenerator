import * as FileSystem from "fs-extra";
import { isNullOrUndefined } from "util";
import { XMLSerializer } from "xmldom";
import { Theme } from "../Customization/Presentation/Themes/Theme";
import { XML } from "../Serialization/XML";
import { Compiler } from "./Compiler";
import { ThemeVariableCompiler } from "./ThemeVariableCompiler";

/**
 * Provides the functionality to compile theme.
 */
export class ThemeCompiler extends Compiler<Theme>
{
    /**
     * The name to save the variables to.
     */
    private variableFileName: string = "variables.xml";

    /**
     * Initializes a new instance of the `ThemeCompiler` class.
     */
    public constructor(item: Theme, variableFileName?: string)
    {
        super(item);

        if (!isNullOrUndefined(variableFileName))
        {
            this.VariableFileName = variableFileName;
        }
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

    protected async Compile(): Promise<void>
    {
        let variables: { [key: string]: string } = {};
        Object.assign(variables, this.Item.Variables);

        if (!isNullOrUndefined(this.Item.CustomScss))
        {
            variables.indivicualScss = this.Item.CustomScss;
        }

        if (!isNullOrUndefined(this.Item.ScssOverride))
        {
            variables.overrideScss = this.Item.ScssOverride;
        }

        let document: Document = XML.CreateDocument("style");
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

            let $package: Element = document.createElement("packageName");
            $package.appendChild(document.createTextNode(this.Item.Instruction.Collection.Package.Identifier));
            general.appendChild($package);

            for (let locale of this.Item.Description.GetLocales())
            {
                let description: Element = document.createElement("description");

                if (locale !== "inv")
                {
                    description.setAttribute("languag", locale);
                }

                description.appendChild(document.createTextNode(this.Item.Description.Data[locale]));
                general.appendChild(description);
            }

            let api: Element = document.createElement("apiVersion");
            api.appendChild(document.createTextNode("3.1"));
            general.appendChild(api);

            let date: Element = document.createElement("date");
            date.appendChild(
                document.createTextNode(
                    this.Item.CreationDate.getFullYear() + "-" +
                    (this.Item.CreationDate.getMonth() + 1).toString().padStart(2, "0") + "-" +
                    this.Item.CreationDate.getDate().toString().padStart(2, "0")));
            general.appendChild(date);

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

            if (!isNullOrUndefined(this.Item.License))
            {
                let license: Element = document.createElement("license");
                license.appendChild(document.createTextNode(this.Item.License));
                general.appendChild(license);
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
            }
        }
        document.documentElement.appendChild(author);

        if (Object.keys(variables).length > 0 || !isNullOrUndefined(this.Item.Images))
        {
            let files: Element = document.createElement("files");
            {
                if (Object.keys(variables).length > 0)
                {
                    let variableCompiler: ThemeVariableCompiler = new ThemeVariableCompiler(variables);
                    variableCompiler.DestinationPath = this.MakeDestinationPath(this.VariableFileName);
                    await variableCompiler.Execute();

                    let variableFile: Element = document.createElement("variables");
                    variableFile.appendChild(document.createTextNode(this.VariableFileName));
                    files.appendChild(variableFile);
                }

                if (!isNullOrUndefined(this.Item.Images))
                {
                    let images: Element = document.createElement("images");
                    images.setAttribute("path", this.Item.Images.DestinationRoot);
                    images.appendChild(document.createTextNode(this.Item.Images.FileName));
                    files.appendChild(images);
                }
            }
            document.documentElement.appendChild(files);
        }

        await FileSystem.writeFile(this.MakeDestinationPath("style.xml"), XML.Prettify(new XMLSerializer().serializeToString(document)));
    }
}