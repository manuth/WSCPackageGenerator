import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { DOMParser } from "xmldom";
import { ThemeFileCompiler } from "../../../../System/Compilation/Presentation/ThemeFileCompiler";
import { IImageDirectoryDescriptorOptions } from "../../../../System/Customization/Presentation/Themes/IImageDirectoryDescriptorOptions";
import { TempFile } from "../../../../System/FileSystem/TempFile";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { ThemeInstruction } from "../../../../System/PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Package } from "../../../../System/PackageSystem/Package";
import { Person } from "../../../../System/PackageSystem/Person";
import { XMLEditor } from "../../../../System/Serialization/XMLEditor";

suite(
    "ThemeFileCompiler",
    () =>
    {
        let compiler: ThemeFileCompiler;
        let tempFile: TempFile;
        let locale: string;
        let localizedName: string;
        let invariantName: string;
        let localizedDescription: string;
        let invariantDescription: string;
        let version: string;
        let date: Date;
        let license: string;
        let packageName: string;
        let thumbnail: string;
        let highResThumbnail: string;
        let coverPhoto: string;
        let author: Person;
        let variableFileName: string;
        let imageDescriptor: IImageDirectoryDescriptorOptions;

        suiteSetup(
            async () =>
            {
                tempFile = new TempFile();
                locale = "en";
                localizedName = "test";
                invariantName = "invariant-test";
                localizedDescription = "test-description";
                invariantDescription = "invariant-test-description";
                version = "1.0 Beta 3";
                date = new Date("2019-06-12");
                license = "Apache-2.0";
                packageName = "foo.bar";
                thumbnail = "thumb.png";
                highResThumbnail = "highResThumb.png";
                coverPhoto = "cover.jpg";
                author = new Person(
                    {
                        Name: "John Doe",
                        URL: "https://examle.com/"
                    });
                variableFileName = "variables.xml";
                imageDescriptor = {
                    Source: "./images",
                    DestinationRoot: "foo/bar/images",
                    FileName: "images.tar"
                };

                let themeName: ILocalization = {};
                let description: ILocalization = {};
                themeName[locale] = localizedName;
                themeName["inv"] = invariantName;
                description[locale] = localizedDescription;
                description["inv"] = invariantDescription;

                let variableFile: TempFile = new TempFile({ postfix: ".json" });
                await FileSystem.writeJson(variableFile.FileName, { wfcHeaderBackground: "red" });

                let themeInstruction: ThemeInstruction = new ThemeInstruction(
                    {
                        Theme: {
                            Name: null,
                            DisplayName: themeName,
                            Version: version,
                            CreationDate: date,
                            License: license,
                            Description: description,
                            Thumbnail: thumbnail,
                            HighResThumbnail: highResThumbnail,
                            CoverPhoto: coverPhoto,
                            Author: {
                                Name: author.Name,
                                URL: author.URL
                            },
                            VariableFileName: variableFile.FileName,
                            Images: imageDescriptor
                        }
                    });

                variableFile.Dispose();

                let $package: Package = new Package(
                    {
                        DisplayName: {},
                        Identifier: packageName,
                        InstallSet: {
                            Instructions: []
                        }
                    });

                $package.InstallSet.push(themeInstruction);
                compiler = new ThemeFileCompiler(themeInstruction.Theme, variableFileName);
                compiler.DestinationPath = tempFile.FileName;
            });

        suiteTeardown(
            () =>
            {
                tempFile.Dispose();
            });

        suite(
            "Compile()",
            () =>
            {
                suite(
                    "General tests...",
                    () =>
                    {
                        test(
                            "Checking whether the compiler can be executed...",
                            async () =>
                            {
                                await compiler.Execute();
                            });

                        test(
                            "Checking whether the expected file exists...",
                            async () =>
                            {
                                assert.strictEqual(await FileSystem.pathExists(tempFile.FileName), true);
                            });
                    });

                suite(
                    "Testing the integrity of the compiled file...",
                    () =>
                    {
                        let document: Document;
                        let rootTag: string;
                        let rootEditor: XMLEditor;

                        suiteSetup(
                            async () =>
                            {
                                document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                                rootTag = "style";
                                rootEditor = new XMLEditor(document.documentElement);
                            });

                        suite(
                            "Testing the XML-document...",
                            () =>
                            {
                                test(
                                    "Checking whether the name of the root-tag is correct...",
                                    () =>
                                    {
                                        assert.strictEqual(rootEditor.TagName, rootTag);
                                    });
                            });

                        suite(
                            "Testing the theme-metadata...",
                            () =>
                            {
                                let generalTag: string;
                                let authorTag: string;
                                let filesTag: string;
                                let generalEditor: XMLEditor;
                                let authorEditor: XMLEditor;
                                let filesEditor: XMLEditor;

                                suiteSetup(
                                    () =>
                                    {
                                        generalTag = "general";
                                        authorTag = "author";
                                        filesTag = "files";
                                    });

                                suite(
                                    "General",
                                    () =>
                                    {
                                        test(
                                            "Checking whether the general meta-data is present...",
                                            () =>
                                            {
                                                rootEditor.AssertTag(generalTag, true);
                                                generalEditor = rootEditor.ChildrenByTag(generalTag)[0];
                                            });

                                        test(
                                            "Checking whether the author meta-data is present...",
                                            () =>
                                            {
                                                rootEditor.AssertTag(authorTag, true);
                                                authorEditor = rootEditor.ChildrenByTag(authorTag)[0];
                                            });

                                        test(
                                            "Checking whether the files meta-data is present...",
                                            () =>
                                            {
                                                rootEditor.AssertTag(filesTag, true);
                                                filesEditor = rootEditor.ChildrenByTag(filesTag)[0];
                                            });
                                    });

                                suite(
                                    "Testing general metadata...",
                                    () =>
                                    {
                                        let nameTag: string;
                                        let versionTag: string;
                                        let dateTag: string;
                                        let descriptionTag: string;
                                        let licenseTag: string;
                                        let packageTag: string;
                                        let apiTag: string;
                                        let thumbnailTag: string;
                                        let highResThumbnailTag: string;
                                        let coverPhotoTag: string;

                                        let languageAttribute: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                nameTag = "stylename";
                                                versionTag = "version";
                                                dateTag = "date";
                                                descriptionTag = "description";
                                                licenseTag = "license";
                                                packageTag = "packageName";
                                                apiTag = "apiVersion";
                                                thumbnailTag = "image";
                                                highResThumbnailTag = "image2x";
                                                coverPhotoTag = "coverPhoto";

                                                languageAttribute = "language";
                                            });

                                        test(
                                            "Checking the integrity of the name...",
                                            () =>
                                            {
                                                for (let editor of generalEditor.ChildrenByTag(nameTag))
                                                {
                                                    if (editor.HasAttribute(languageAttribute))
                                                    {
                                                        assert.strictEqual(editor.GetAttribute(languageAttribute), locale);
                                                    }

                                                    assert.strictEqual(editor.TextContent, editor.HasAttribute(languageAttribute) ? localizedName : invariantName);
                                                }
                                            });

                                        test(
                                            "Checking whether the version is correct...",
                                            () =>
                                            {
                                                generalEditor.AssertText(versionTag, version);
                                            });

                                        test(
                                            "Checking whether the date is correct...",
                                            () =>
                                            {
                                                generalEditor.AssertTag(dateTag, true);
                                                assert.strictEqual(new Date(generalEditor.GetElementsByTag(dateTag)[0].TextContent).getTime(), date.getTime());
                                            });

                                        test(
                                            "Checking whether the localized description is correct...",
                                            () =>
                                            {
                                                for (let editor of generalEditor.ChildrenByTag(descriptionTag))
                                                {
                                                    if (editor.HasAttribute(languageAttribute))
                                                    {
                                                        assert.strictEqual(editor.GetAttribute(languageAttribute), locale);
                                                    }

                                                    assert.strictEqual(editor.TextContent, editor.HasAttribute(languageAttribute) ? localizedDescription : invariantDescription);
                                                }
                                            });

                                        test(
                                            "Checking whether the license is correct...",
                                            () =>
                                            {
                                                generalEditor.AssertText(licenseTag, license);
                                            });

                                        test(
                                            "Checking whether the package-name is correct...",
                                            () =>
                                            {
                                                generalEditor.AssertText(packageTag, packageName);
                                            });

                                        test(
                                            "Checking whether the api-version is correct...",
                                            () =>
                                            {
                                                generalEditor.AssertText(apiTag, "3.1");
                                            });

                                        test(
                                            "Checking whether the thumbnail is correct...",
                                            () =>
                                            {
                                                generalEditor.AssertText(thumbnailTag, thumbnail);
                                            });

                                        test(
                                            "Checking whether the high-resolution thumbnail is correct...",
                                            () =>
                                            {
                                                generalEditor.AssertText(highResThumbnailTag, highResThumbnail);
                                            });

                                        test(
                                            "Checking whether the cover-photo is correct...",
                                            () =>
                                            {
                                                generalEditor.AssertText(coverPhotoTag, coverPhoto);
                                            });
                                    });

                                suite(
                                    "Testing the integrity of the author-metadata...",
                                    () =>
                                    {
                                        let authorNameTag: string;
                                        let authorURLTag: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                authorNameTag = "authorname";
                                                authorURLTag = "authorurl";
                                            });

                                        test(
                                            "Checking whether the name of the author is correct...",
                                            () =>
                                            {
                                                authorEditor.AssertText(authorNameTag, author.Name);
                                            });

                                        test(
                                            "Checking whether the website of the author is correct...",
                                            () =>
                                            {
                                                authorEditor.AssertText(authorURLTag, author.URL);
                                            });
                                    });

                                suite(
                                    "Testing the integrity of the metadata of the files...",
                                    () =>
                                    {
                                        let variablesTag: string;
                                        let imageTag: string;
                                        let imagePathAttribute: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                variablesTag = "variables";
                                                imageTag = "images";
                                                imagePathAttribute = "path";
                                            });

                                        test(
                                            "Checking whether the variables-file is correct...",
                                            () =>
                                            {
                                                filesEditor.AssertText(variablesTag, variableFileName);
                                            });

                                        test(
                                            "Checking whether the image-descriptor is correct...",
                                            () =>
                                            {
                                                filesEditor.AssertTag(imageTag, true);
                                                let imageEditor: XMLEditor = filesEditor.ChildrenByTag(imageTag)[0];
                                                assert.strictEqual(imageEditor.GetAttribute(imagePathAttribute), imageDescriptor.DestinationRoot);
                                                assert.strictEqual(imageEditor.TextContent, imageDescriptor.FileName);
                                            });
                                    });
                            });
                    });
            });
    });