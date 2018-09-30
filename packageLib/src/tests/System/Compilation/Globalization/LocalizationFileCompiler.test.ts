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
                                assert.strictEqual(await FileSystem.pathExists(tempFile.FileName), true);
                            });
                    });

                suite(
                    "Testing the integrity of the compiled file...",
                    () =>
                    {
                        let document: Document;
                        let rootElement: Element;
                        let categoryElement: Element;
                        let itemElement: Element;
                        let rootTag: string = "language";
                        let categoryTag: string = "category";
                        let itemTag: string = "item";
                        let languageAttribute: string = "languagecode";
                        let categoryAttribute: string = "name";
                        let itemAttribute: string = "name";

                        suiteSetup(
                            async () =>
                            {
                                document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                                rootElement = document.documentElement;
                                categoryElement = rootElement.getElementsByTagName(categoryTag)[0];
                                assert.strictEqual(categoryElement.parentNode === rootElement, true);
                                itemElement = categoryElement.getElementsByTagName(itemTag)[0];
                                assert.strictEqual(itemElement.parentNode === categoryElement, true);
                            });

                        suite(
                            `<${rootTag}>-tag...`,
                            () =>
                            {
                                test(
                                    "Checking whether the tag-name is correct...",
                                    () =>
                                    {
                                        assert.strictEqual(rootElement.tagName, rootTag);
                                    });

                                test(
                                    `Checking whether the \`${languageAttribute}\`-attribute is present...`,
                                    () =>
                                    {
                                        assert.strictEqual(rootElement.hasAttribute(languageAttribute), true);
                                    });

                                test(
                                    `Checking whether the value of the \`${languageAttribute}\`-attribute is correct...`,
                                    () =>
                                    {
                                        assert.strictEqual(rootElement.getAttribute(languageAttribute), locale);
                                    });
                            });

                        suite(
                            `<${categoryTag}>-tag...`,
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
                            `<${itemTag}>-tag...`,
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