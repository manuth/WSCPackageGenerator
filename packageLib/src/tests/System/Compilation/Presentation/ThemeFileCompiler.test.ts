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
                        let rootElement: Element;

                        suiteSetup(
                            async () =>
                            {
                                document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                                rootTag = "style";
                                rootElement = document.documentElement;
                            });

                        suite(
                            "Testing the XML-document...",
                            () =>
                            {
                                test(
                                    "Checking whether the name of the root-tag is correct...",
                                    () =>
                                    {
                                        assert.strictEqual(rootElement.tagName, rootTag);
                                    });
                            });

                        suite(
                            "Testing the theme-metadata...",
                            () =>
                            {
                                let generalTag: string;
                                let authorTag: string;
                                let filesTag: string;
                                let generalElement: Element;
                                let authorElement: Element;
                                let filesElement: Element;

                                suiteSetup(
                                    () =>
                                    {
                                        generalTag = "general";
                                        authorTag = "author";
                                        filesTag = "files";

                                        assert.strictEqual(rootElement.getElementsByTagName(generalTag).length, 1);
                                        generalElement = rootElement.getElementsByTagName(generalTag)[0];
                                        assert.strictEqual(generalElement.parentNode === rootElement, true);

                                        assert.strictEqual(rootElement.getElementsByTagName(authorTag).length, 1);
                                        authorElement = rootElement.getElementsByTagName(authorTag)[0];
                                        assert.strictEqual(authorElement.parentNode === rootElement, true);

                                        assert.strictEqual(rootElement.getElementsByTagName(filesTag).length, 1);
                                        filesElement = rootElement.getElementsByTagName(filesTag)[0];
                                        assert.strictEqual(filesElement.parentNode === rootElement, true);
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
                                        let nameElements: Element[];
                                        let versionElement: Element;
                                        let dateElement: Element;
                                        let descriptionElements: Element[];
                                        let licenseElement: Element;
                                        let packageElement: Element;
                                        let apiElement: Element;
                                        let thumbnailElement: Element;
                                        let highResThumbnailElement: Element;
                                        let coverPhotoElement: Element;

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

                                                nameElements = [];

                                                assert.strictEqual(rootElement.getElementsByTagName(versionTag).length, 1);
                                                versionElement = rootElement.getElementsByTagName(versionTag)[0];
                                                assert.strictEqual(versionElement.parentNode === generalElement, true);

                                                assert.strictEqual(rootElement.getElementsByTagName(dateTag).length, 1);
                                                dateElement = rootElement.getElementsByTagName(dateTag)[0];
                                                assert.strictEqual(dateElement.parentNode === generalElement, true);

                                                descriptionElements = [];

                                                assert.strictEqual(rootElement.getElementsByTagName(licenseTag).length, 1);
                                                licenseElement = rootElement.getElementsByTagName(licenseTag)[0];
                                                assert.strictEqual(licenseElement.parentNode === generalElement, true);

                                                assert.strictEqual(rootElement.getElementsByTagName(packageTag).length, 1);
                                                packageElement = rootElement.getElementsByTagName(packageTag)[0];
                                                assert.strictEqual(packageElement.parentNode === generalElement, true);

                                                assert.strictEqual(rootElement.getElementsByTagName(apiTag).length, 1);
                                                apiElement = rootElement.getElementsByTagName(apiTag)[0];
                                                assert.strictEqual(apiElement.parentNode === generalElement, true);

                                                assert.strictEqual(rootElement.getElementsByTagName(thumbnailTag).length, 1);
                                                thumbnailElement = rootElement.getElementsByTagName(thumbnailTag)[0];
                                                assert.strictEqual(thumbnailElement.parentNode === generalElement, true);

                                                assert.strictEqual(rootElement.getElementsByTagName(highResThumbnailTag).length, 1);
                                                highResThumbnailElement = rootElement.getElementsByTagName(highResThumbnailTag)[0];
                                                assert.strictEqual(highResThumbnailElement.parentNode === generalElement, true);

                                                assert.strictEqual(rootElement.getElementsByTagName(coverPhotoTag).length, 1);
                                                coverPhotoElement = rootElement.getElementsByTagName(coverPhotoTag)[0];
                                                assert.strictEqual(coverPhotoElement.parentNode === generalElement, true);

                                                languageAttribute = "language";

                                                let nameNodes: NodeListOf<Element> = document.getElementsByTagName(nameTag);
                                                let descriptionNodes: NodeListOf<Element> = document.getElementsByTagName(descriptionTag);

                                                for (let i: number = 0; i < nameNodes.length; i++)
                                                {
                                                    nameElements.push(nameNodes.item(i));
                                                }

                                                for (let i: number = 0; i < descriptionNodes.length; i++)
                                                {
                                                    descriptionElements.push(descriptionNodes.item(i));
                                                }
                                            });

                                        test(
                                            "Checking whether the localized theme-name is correct...",
                                            () =>
                                            {
                                                let localizedElement: Element;
                                                let localizedElements: Element[] = nameElements.filter(
                                                    (node: Element): boolean =>
                                                    {
                                                        return node.hasAttribute(languageAttribute);
                                                    });

                                                assert.strictEqual(localizedElements.length, 1);
                                                localizedElement = localizedElements[0];
                                                assert.strictEqual(localizedElement.parentNode === generalElement, true);
                                                assert.strictEqual(localizedElement.getAttribute(languageAttribute), locale);
                                                assert.strictEqual(localizedElement.textContent, localizedName);
                                            });

                                        test(
                                            "Checking whether the invariant theme-name is correct...",
                                            () =>
                                            {
                                                let invariantElement: Element;
                                                let invariantElements: Element[] = nameElements.filter(
                                                    (node: Element): boolean =>
                                                    {
                                                        return !node.hasAttribute(languageAttribute);
                                                    });

                                                assert.strictEqual(invariantElements.length, 1);
                                                invariantElement = invariantElements[0];
                                                assert.strictEqual(invariantElement.parentNode === generalElement, true);
                                                assert.strictEqual(invariantElement.textContent, invariantName);
                                            });

                                        test(
                                            "Checking whether the version is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(versionElement.textContent, version);
                                            });

                                        test(
                                            "Checking whether the date is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(new Date(dateElement.textContent).getTime(), date.getTime());
                                            });

                                        test(
                                            "Checking whether the localized description is correct...",
                                            () =>
                                            {
                                                let localizedElement: Element;
                                                let localizedElements: Element[] = descriptionElements.filter(
                                                    (node: Element): boolean =>
                                                    {
                                                        return node.hasAttribute(languageAttribute);
                                                    });

                                                assert.strictEqual(localizedElements.length, 1);
                                                localizedElement = localizedElements[0];
                                                assert.strictEqual(localizedElement.parentNode === generalElement, true);
                                                assert.strictEqual(localizedElement.textContent, localizedDescription);
                                            });

                                        test(
                                            "Checking whether the invariant description is correct...",
                                            () =>
                                            {
                                                let invariantElement: Element;
                                                let invariantElements: Element[] = descriptionElements.filter(
                                                    (node: Element): boolean =>
                                                    {
                                                        return !node.hasAttribute(languageAttribute);
                                                    });

                                                assert.strictEqual(invariantElements.length, 1);
                                                invariantElement = invariantElements[0];
                                                assert.strictEqual(invariantElement.parentNode === generalElement, true);
                                                assert.strictEqual(invariantElement.textContent, invariantDescription);
                                            });

                                        test(
                                            "Checking whether the license is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(licenseElement.textContent, license);
                                            });

                                        test(
                                            "Checking whether the package-name is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(packageElement.textContent, packageName);
                                            });

                                        test(
                                            "Checking whether the api-version is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(apiElement.textContent, "3.1");
                                            });

                                        test(
                                            "Checking whether the thumbnail is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(thumbnailElement.textContent, thumbnail);
                                            });

                                        test(
                                            "Checking whether the high-resolution thumbnail is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(highResThumbnailElement.textContent, highResThumbnail);
                                            });

                                        test(
                                            "Checking whether the cover-photo is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(coverPhotoElement.textContent, coverPhoto);
                                            });
                                    });

                                suite(
                                    "Testing the integrity of the author-metadata...",
                                    () =>
                                    {
                                        let authorNameTag: string;
                                        let authorURLTag: string;
                                        let authorNameElement: Element;
                                        let authorURLElement: Element;

                                        suiteSetup(
                                            () =>
                                            {
                                                authorNameTag = "authorname";
                                                authorURLTag = "authorurl";

                                                assert.strictEqual(rootElement.getElementsByTagName(authorNameTag).length, 1);
                                                authorNameElement = rootElement.getElementsByTagName(authorNameTag)[0];
                                                assert.strictEqual(authorNameElement.parentNode === authorElement, true);

                                                assert.strictEqual(rootElement.getElementsByTagName(authorURLTag).length, 1);
                                                authorURLElement = rootElement.getElementsByTagName(authorURLTag)[0];
                                                assert.strictEqual(authorURLElement.parentNode === authorElement, true);
                                            });

                                        test(
                                            "Checking whether the name of the author is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(authorNameElement.textContent, author.Name);
                                            });

                                        test(
                                            "Checking whether the website of the author is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(authorURLElement.textContent, author.URL);
                                            });
                                    });

                                suite(
                                    "Testing the integrity of the metadata of the files...",
                                    () =>
                                    {
                                        let variablesTag: string;
                                        let imageTag: string;
                                        let imagePathAttribute: string;
                                        let variablesElement: Element;
                                        let imageElement: Element;

                                        suiteSetup(
                                            () =>
                                            {
                                                variablesTag = "variables";
                                                imageTag = "images";
                                                imagePathAttribute = "path";

                                                assert.strictEqual(rootElement.getElementsByTagName(variablesTag).length, 1);
                                                variablesElement = rootElement.getElementsByTagName(variablesTag)[0];
                                                assert.strictEqual(variablesElement.parentNode === filesElement, true);

                                                assert.strictEqual(rootElement.getElementsByTagName(imageTag).length, 1);
                                                imageElement = rootElement.getElementsByTagName(imageTag)[0];
                                                assert.strictEqual(imageElement.parentNode === filesElement, true);

                                            });

                                        test(
                                            "Checking whether the variables-file is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(variablesElement.textContent, variableFileName);
                                            });

                                        test(
                                            "Checking whether the image-descriptor is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(imageElement.getAttribute(imagePathAttribute), imageDescriptor.DestinationRoot);
                                                assert.strictEqual(imageElement.textContent, imageDescriptor.FileName);
                                            });
                                    });
                            });
                    });
            });
    });