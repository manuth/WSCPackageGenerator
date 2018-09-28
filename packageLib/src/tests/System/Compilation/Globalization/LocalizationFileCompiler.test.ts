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

                suite(
                    "Testing the integrity of the compiled file...",
                    () =>
                    {
                        let document: Document;
                        let element: Element;

                        suiteSetup(
                            async () =>
                            {
                                document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                                element = document.documentElement;
                            });

                        test(
                            "Checking whether the root-tag is correct...",
                            () =>
                            {
                                assert.strictEqual(element.tagName, "language");
                                assert.strictEqual(element.hasAttribute("languagecode"), true);
                                assert.strictEqual(element.getAttribute("languagecode"), locale);
                            });

                        test(
                            "Checking whether the category-element is present...",
                            () =>
                            {
                                assert.strictEqual(element.getElementsByTagName("category").length, 1);

                                let categoryElement: Element = element.getElementsByTagName("category")[0];
                                assert.strictEqual(categoryElement.parentNode === element, true);
                                element = categoryElement;
                            });

                        test(
                            "Checking whether the category-element is correct...",
                            () =>
                            {
                                assert.strictEqual(element.hasAttribute("name"), true);
                                assert.strictEqual(element.getAttribute("name"), category);
                            });

                        test(
                            "Checking whether the message-element is present...",
                            () =>
                            {
                                assert.strictEqual(element.getElementsByTagName("item").length, 1);

                                let itemElement: Element = element.getElementsByTagName("item")[0];
                                assert.strictEqual(itemElement.parentNode === element, true);
                                element = itemElement;
                            });

                        test(
                            "Checking whether the message-element is correct...",
                            () =>
                            {
                                assert.strictEqual(element.hasAttribute("name"), true);
                                assert.strictEqual(element.getAttribute("name"), `${category}.${messageName}`);
                                assert.strictEqual(element.textContent, messageValue);
                            });
                    });
            });
    });