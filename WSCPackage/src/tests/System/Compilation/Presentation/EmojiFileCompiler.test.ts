import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { EmojiFileCompiler } from "../../../../System/Compilation/Presentation/EmojiFileCompiler";
import { EmojiInstruction } from "../../../../System/PackageSystem/Instructions/Customization/EmojiInstruction";
import { XMLEditor } from "../../../../System/Serialization/XMLEditor";

suite(
    "EmojiFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let compiler: EmojiFileCompiler;
        let name: string;
        let displayName: string;
        let aliases: string[];
        let showOrder: number;
        let fileName: string;
        let highResFileName: string;

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();
                name = "foo";
                displayName = "bar";
                aliases = ["baz", "this", "is", "a", "test"];
                showOrder = Math.floor(Math.random() * 100);
                fileName = "lowRes.png";
                highResFileName = "highRes.png";

                let instruction: EmojiInstruction = new EmojiInstruction(
                    {
                        FileName: null,
                        Emojis: [
                            {
                                Name: name,
                                DisplayName: displayName,
                                Aliases: aliases,
                                ShowOrder: showOrder,
                                FileName: fileName,
                                HighResFileName: highResFileName
                            }
                        ]
                    });

                compiler = new EmojiFileCompiler(instruction);
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
                            "Checking whether the compiler can be executed...",
                            async () =>
                            {
                                await compiler.Execute();
                            });
                    });

                suite(
                    "Checking the integrity of the file...",
                    () =>
                    {
                        let importEditor: XMLEditor;

                        suite(
                            "General",
                            () =>
                            {
                                test(
                                    "Checking whether the content of the compiled file is valid xml...",
                                    async () =>
                                    {
                                        let document: Document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                                        importEditor = new XMLEditor(document.documentElement).GetChildrenByTag("import")[0];
                                    });
                            });

                        suite(
                            "Checking the integrity of the emoji...",
                            () =>
                            {
                                let emojiEditor: XMLEditor;
                                let emojiTag: string;
                                let nameAttribute: string;
                                let displayNameTag: string;
                                let aliasesTag: string;
                                let showOrderTag: string;
                                let fileNameTag: string;
                                let highResFileNameTag: string;

                                suiteSetup(
                                    () =>
                                    {
                                        emojiTag = "smiley";
                                        nameAttribute = "name";
                                        displayNameTag = "title";
                                        aliasesTag = "aliases";
                                        showOrderTag = "showorder";
                                        fileNameTag = "path";
                                        highResFileNameTag = "path2x";
                                    });

                                test(
                                    "Checking whether the emoji is present...",
                                    () =>
                                    {
                                        assert.strictEqual(importEditor.HasTag(emojiTag, true), true);
                                        emojiEditor = importEditor.GetChildrenByTag(emojiTag)[0];
                                    });

                                test(
                                    "Checking the integrity of the meta-data...",
                                    () =>
                                    {
                                        assert.strictEqual(emojiEditor.HasAttribute(nameAttribute, `:${name}:`), true);
                                        assert.strictEqual(emojiEditor.HasText(displayNameTag, displayName), true);
                                        assert.strictEqual(emojiEditor.HasText(aliasesTag, aliases.map((alias: string) => `:${alias}:`).join("\n")), true);
                                        assert.strictEqual(emojiEditor.HasText(showOrderTag, showOrder.toString()), true);
                                        assert.strictEqual(emojiEditor.HasText(fileNameTag, fileName), true);
                                        assert.strictEqual(emojiEditor.HasText(highResFileNameTag, highResFileName), true);
                                    });
                            });
                    });
            });
    });