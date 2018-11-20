import { isNullOrUndefined } from "util";
import { Package } from "../../PackageSystem/Package";
import { XMLEditor } from "../../Serialization/XMLEditor";
import { WoltLabXMLCompiler } from "../WoltLabXMLCompiler";

/**
 * Provides the functionality to compile package-files.
 */
export class PackageFileCompiler extends WoltLabXMLCompiler<Package>
{
    /**
     * Initializes a new instance of the `PackageFileCompiler` class.
     *
     * @param item
     * The item to compile.
     */
    public constructor(item: Package)
    {
        super(item);
    }

    protected get TagName()
    {
        return "package";
    }

    protected get SchemaLocation()
    {
        return "http://www.woltlab.com/XSD/tornado/package.xsd";
    }

    protected CreateDocument()
    {
        let document = super.CreateDocument();
        let editor = new XMLEditor(document.documentElement);
        editor.SetAttribute("name", this.Item.Identifier);

        editor.AddElement(
            "packageinformation",
            (packageInfo) =>
            {
                for (let locale of this.Item.DisplayName.GetLocales())
                {
                    packageInfo.AddTextElement(
                        "packagename",
                        this.Item.DisplayName.Data[locale],
                        (displayName) =>
                        {
                            if (locale !== "inv")
                            {
                                displayName.SetAttribute("languagecode", locale);
                            }
                        });
                }

                for (let locale of this.Item.Description.GetLocales())
                {
                    packageInfo.AddTextElement(
                        "packagedescription",
                        this.Item.Description.Data[locale],
                        (description) =>
                        {
                            if (locale !== "inv")
                            {
                                description.SetAttribute("languagecode", locale);
                            }
                        });
                }

                packageInfo.AddTextElement("version", this.Item.Version);
                packageInfo.AddTextElement(
                    "date",
                    this.Item.CreationDate.getFullYear().toString() + "-" +
                    (this.Item.CreationDate.getMonth() + 1).toString().padStart(2, "0") + "-" +
                    this.Item.CreationDate.getDate().toString().padStart(2, "0"));
            });

        editor.AddElement(
            "authorinformation",
            (author) =>
            {
                if (!isNullOrUndefined(this.Item.Author.Name))
                {
                    author.AddTextElement("author", this.Item.Author.Name);
                }

                if (!isNullOrUndefined(this.Item.Author.URL))
                {
                    author.AddTextElement("authorurl", this.Item.Author.URL);
                }
            });

        if (this.Item.RequiredPackages.length > 0)
        {
            editor.AddElement(
                "requiredpackages",
                (packages) =>
                {
                    for (let requiredPackage of this.Item.RequiredPackages)
                    {
                        packages.AddTextElement(
                            "requiredpackage",
                            requiredPackage.Identifier,
                            (requiredPackageNode) =>
                            {
                                requiredPackageNode.SetAttribute("minversion", requiredPackage.MinVersion);

                                if (!isNullOrUndefined(requiredPackage.FileName))
                                {
                                    requiredPackageNode.SetAttribute("file", requiredPackage.FileName);
                                }
                            });
                    }
                });
        }

        if (this.Item.ConflictingPackages.length > 0)
        {
            editor.AddElement(
                "excludedpackages",
                (packages) =>
                {
                    for (let conflictingPackage of this.Item.ConflictingPackages)
                    {
                        packages.AddTextElement(
                            "excludedpackage",
                            conflictingPackage.Identifier,
                            (conflictingPackageNode) =>
                            {
                                conflictingPackageNode.SetAttribute("version", conflictingPackage.Version);
                            });
                    }
                });
        }

        if (this.Item.OptionalPackages.length > 0)
        {
            editor.AddElement(
                "optionalpackages",
                (packages) =>
                {
                    for (let optionalPackage of this.Item.OptionalPackages)
                    {
                        packages.AddTextElement(
                            "optionalpackage",
                            optionalPackage.Identifier,
                            (optionalPackageNode) =>
                            {
                                optionalPackageNode.SetAttribute("file", optionalPackage.FileName);
                            });
                    }
                });
        }

        editor.AddElement(
            "compatibility",
            (compatibility) =>
            {
                compatibility.AddElement("api", (api) => api.SetAttribute("version", "2018"));
            });

        editor.Add(this.Item.InstallSet.Serialize());

        for (let instructionSet of this.Item.UpdateSets)
        {
            editor.Add(instructionSet.Serialize());
        }

        return document;
    }
}