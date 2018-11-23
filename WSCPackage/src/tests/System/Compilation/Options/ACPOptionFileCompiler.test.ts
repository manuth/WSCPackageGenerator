import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { ACPOptionFileCompiler } from "../../../../System/Compilation/Options/ACPOptionFileCompiler";
import { IACPOptionOptions } from "../../../../System/Options/ControlPanel/IACPOptionOptions";
import { ACPOptionInstruction } from "../../../../System/PackageSystem/Instructions/Options/ACPOptionInstruction";
import { XMLEditor } from "../../../../System/Serialization/XMLEditor";

suite(
    "ACPOptionFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let compiler: ACPOptionFileCompiler;
        let option: IACPOptionOptions;

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();
                option = {
                    Name: "foo",
                    Localizable: Math.random() > 0.5,
                    ForceLocalization: Math.random() > 0.5,
                    Visible: Math.random() > 0.5
                };

                let acpInstruction: ACPOptionInstruction = new ACPOptionInstruction(
                    {
                        FileName: null,
                        Nodes: [
                            {
                                Name: "bar",
                                Item: {
                                    Options: [
                                        option
                                    ]
                                }
                            }
                        ]
                    });

                compiler = new ACPOptionFileCompiler(acpInstruction);
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
                    "Checking the integrity of the compiled file...",
                    () =>
                    {
                        let editor: XMLEditor;

                        suite(
                            "General",
                            () =>
                            {
                                test(
                                    "Checking whether the file is a valid xml-file...",
                                    async () =>
                                    {
                                        let document: Document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                                        editor = new XMLEditor(document.documentElement);
                                    });
                            });

                        suite(
                            "Checking the integrity of the option...",
                            () =>
                            {
                                let optionEditor: XMLEditor;

                                suite(
                                    "General",
                                    () =>
                                    {
                                        let optionTag: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                optionTag = "option";
                                            });

                                        test(
                                            "Checking whether the option exists...",
                                            () =>
                                            {
                                                assert.strictEqual(editor.GetElementsByTag(optionTag).length, 1);
                                                optionEditor = editor.GetElementsByTag(optionTag)[0];
                                            });
                                    });

                                suite(
                                    "Checking the integrity of the meta-data...",
                                    () =>
                                    {
                                        let visibleTag: string;
                                        let localizableTag: string;
                                        let forceLocalizationTag: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                visibleTag = "hidden";
                                                localizableTag = "supporti18n";
                                                forceLocalizationTag = "requirei18n";
                                            });

                                        test(
                                            "Checking whether the visibility is set correctly...",
                                            () =>
                                            {
                                                assert.strictEqual(optionEditor.HasText(visibleTag, option.Visible ? "0" : "1"), true);
                                            });

                                        test(
                                            "Checking whether the localization-support is set correctly...",
                                            () =>
                                            {
                                                assert.strictEqual(optionEditor.HasText(localizableTag, option.Localizable ? "1" : "0"), true);
                                            });

                                        test(
                                            "Checking whether the localization-requirement is set correctly...",
                                            () =>
                                            {
                                                assert.strictEqual(optionEditor.HasText(forceLocalizationTag, option.ForceLocalization ? "1" : "0"), true);
                                            });
                                    });
                            });
                    });
            });
    });