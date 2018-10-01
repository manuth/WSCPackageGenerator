import * as assert from "assert";
import * as dedent from "dedent";
import * as FileSystem from "fs-extra";
import { DOMParser } from "xmldom";
import { LocalizationFileCompiler } from "../../../../System/Compilation/Globalization/LocalizationFileCompiler";
import { TempFile } from "../../../../System/FileSystem/TempFile";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { TranslationInstruction } from "../../../../System/PackageSystem/Instructions/Globalization/TranslationInstruction";

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
                compiler.DestinationPath = tempFile.FileName;
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
                            "Checking whether the item can be compiled...",
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
                        let categoryTag: string;
                        let itemTag: string;
                        let rootElement: Element;
                        let categoryElement: Element;
                        let itemElement: Element;
                        let languageAttribute: string;
                        let categoryAttribute: string;
                        let itemAttribute: string;

                        suiteSetup(
                            async () =>
                            {
                                document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                                rootTag = "language";
                                categoryTag = "category";
                                itemTag = "item";
                                rootElement = document.documentElement;
                                categoryElement = rootElement.getElementsByTagName(categoryTag)[0];
                                assert.strictEqual(categoryElement.parentNode === rootElement, true);
                                itemElement = categoryElement.getElementsByTagName(itemTag)[0];
                                assert.strictEqual(itemElement.parentNode === categoryElement, true);
                                languageAttribute = "languagecode";
                                categoryAttribute = "name";
                                itemAttribute = "name";
                            });

                        suite(
                            "Testing the XML-Document...",
                            () =>
                            {
                                test(
                                    "Checking whether the tag-name is correct...",
                                    () =>
                                    {
                                        assert.strictEqual(rootElement.tagName, rootTag);
                                    });

                                test(
                                    `Checking whether the language is specified...`,
                                    () =>
                                    {
                                        assert.strictEqual(rootElement.hasAttribute(languageAttribute), true);
                                    });

                                test(
                                    `Checking whether the language is specified correctly...`,
                                    () =>
                                    {
                                        assert.strictEqual(rootElement.getAttribute(languageAttribute), locale);
                                    });
                            });

                        suite(
                            "Testing the categories...",
                            () =>
                            {
                                test(
                                    "Checking whether the name of the category is correct...",
                                    () =>
                                    {
                                        assert.strictEqual(categoryElement.hasAttribute(categoryAttribute), true);
                                        assert.strictEqual(categoryElement.getAttribute(categoryAttribute), category);
                                    });
                            });

                        suite(
                            "Testing the translations...",
                            () =>
                            {
                                test(
                                    "Checking whether the name of the message is correct...",
                                    () =>
                                    {
                                        assert.strictEqual(itemElement.hasAttribute(itemAttribute), true);
                                        assert.strictEqual(itemElement.getAttribute(itemAttribute), `${category}.${messageName}`);
                                    });

                                test(
                                    "Checking whether the value of the message is correct...",
                                    () =>
                                    {
                                        assert.strictEqual(itemElement.textContent, messageValue);
                                    });
                            });
                    });
            });
    });