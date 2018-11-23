import * as assert from "assert";
import * as dedent from "dedent";
import * as FileSystem from "fs-extra";
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { LocalizationFileCompiler } from "../../../../System/Compilation/Globalization/LocalizationFileCompiler";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { TranslationInstruction } from "../../../../System/PackageSystem/Instructions/Globalization/TranslationInstruction";
import { XMLEditor } from "../../../../System/Serialization/XMLEditor";

suite(
    "LocalizationFileCompiler",
    () =>
    {
        let compiler: LocalizationFileCompiler;
        let tempFile: TempFile;
        let locale: string;
        let category: string;
        let messageName: string;
        let messageValue: string;

        suiteSetup(
            () =>
            {
                let instruction: TranslationInstruction;
                let localization: ILocalization = {};

                tempFile = new TempFile();
                locale = "en";
                category = "foo";
                messageName = "bar";
                messageValue = dedent(
                    `
                    This is a test
                    with a message which has
                    multiple lines`);
                localization[locale] = messageValue;

                instruction = new TranslationInstruction(
                    {
                        FileName: "foo",
                        Nodes: [
                            {
                                Name: category,
                                Nodes: [
                                    {
                                        Name: messageName,
                                        Item:
                                        {
                                            Translations: localization
                                        }
                                    }
                                ]
                            }
                        ]
                    });

                compiler = new LocalizationFileCompiler([locale, instruction.GetMessages()[locale]]);
                compiler.DestinationPath = tempFile.FullName;
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
                    "General",
                    () =>
                    {
                        test(
                            "Checking whether the item can be compiled...",
                            async () =>
                            {
                                await compiler.Execute();
                            });

                        test(
                            "Checking whether the expected file exists...",
                            async () =>
                            {
                                assert.strictEqual(await FileSystem.pathExists(tempFile.FullName), true);
                            });
                    });

                suite(
                    "Testing the integrity of the compiled file...",
                    () =>
                    {
                        let document: Document;
                        let rootTag: string;
                        let rootEditor: XMLEditor;
                        let languageAttribute: string;

                        suiteSetup(
                            async () =>
                            {
                                document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                                rootTag = "language";
                                rootEditor = new XMLEditor(document.documentElement);
                                languageAttribute = "languagecode";
                            });

                        suite(
                            "Testing the XML-Document...",
                            () =>
                            {
                                test(
                                    "Checking whether the tag-name is correct...",
                                    () =>
                                    {
                                        assert.strictEqual(rootEditor.TagName, rootTag);
                                    });

                                test(
                                    "Checking whether the language is specified...",
                                    () =>
                                    {
                                        assert.strictEqual(rootEditor.HasAttribute(languageAttribute), true);
                                    });

                                test(
                                    "Checking whether the language is specified correctly...",
                                    () =>
                                    {
                                        assert.strictEqual(rootEditor.GetAttribute(languageAttribute), locale);
                                    });
                            });

                        suite(
                            "Checking the integrity of the categories...",
                            () =>
                            {
                                let categoryTag: string;
                                let categoryEditor: XMLEditor;
                                let nameAttribute: string;

                                suiteSetup(
                                    () =>
                                    {
                                        categoryTag = "category";
                                        nameAttribute = "name";
                                    });

                                suite(
                                    "General",
                                    () =>
                                    {
                                        test(
                                            "Checking whether the category exists...",
                                            () =>
                                            {
                                                assert.strictEqual(rootEditor.HasTag(categoryTag, true), true);
                                                categoryEditor = rootEditor.GetChildrenByTag(categoryTag)[0];
                                            });

                                        test(
                                            "Checking whether the integrity of the name of the category...",
                                            () =>
                                            {
                                                assert.strictEqual(categoryEditor.HasAttribute(nameAttribute, category), true);
                                            });
                                    });

                                suite(
                                    "Checking the integrity of the translations...",
                                    () =>
                                    {
                                        let itemTag: string;
                                        let itemEditor: XMLEditor;

                                        suiteSetup(
                                            () =>
                                            {
                                                itemTag = "item";
                                            });

                                        test(
                                            "Checking whether the translation exists...",
                                            () =>
                                            {
                                                assert.strictEqual(categoryEditor.HasTag(itemTag, true), true);
                                                itemEditor = categoryEditor.GetChildrenByTag(itemTag)[0];
                                            });

                                        test(
                                            "Checking whether the integrity of the name of the translation...",
                                            () =>
                                            {
                                                assert.strictEqual(itemEditor.HasAttribute(nameAttribute, `${category}.${messageName}`), true);
                                            });

                                        test(
                                            "Checking the integrity of the text of the translation...",
                                            () =>
                                            {
                                                assert.strictEqual(itemEditor.TextContent, messageValue);
                                            });
                                    });
                            });
                    });
            });
    });