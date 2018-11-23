import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { GroupOptionFileCompiler } from "../../../../System/Compilation/Options/GroupOptionFileCompiler";
import { IGroupOptionOptions } from "../../../../System/Options/Groups/IGroupOptionOptions";
import { GroupOptionInstruction } from "../../../../System/PackageSystem/Instructions/Options/GroupOptionInstruction";
import { XMLEditor } from "../../../../System/Serialization/XMLEditor";

suite(
    "GroupOptionFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let compiler: GroupOptionFileCompiler;
        let option: IGroupOptionOptions;

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();
                option = {
                    Name: "test",
                    UserDefaultValue: "foo",
                    ModDefaultValue: "bar",
                    AdminDefaultValue: "baz",
                    RegisteredOnly: Math.random() > 0.5
                };

                let groupOptionInstruction: GroupOptionInstruction = new GroupOptionInstruction(
                    {
                        FileName: null,
                        Nodes: [
                            {
                                Name: "example",
                                Item: {
                                    Options: [
                                        option
                                    ]
                                }
                            }
                        ]
                    });

                compiler = new GroupOptionFileCompiler(groupOptionInstruction);
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
                            "Checking the integrity of the option",
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
                                        let userValueTag: string;
                                        let modValueTag: string;
                                        let adminValueTag: string;
                                        let registeredTag: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                userValueTag = "userdefaultvalue";
                                                modValueTag = "moddefaultvalue";
                                                adminValueTag = "admindefaultvalue";
                                                registeredTag = "usersonly";
                                            });

                                        test(
                                            "Checking whether the default values are correct...",
                                            () =>
                                            {
                                                assert.strictEqual(optionEditor.HasText(userValueTag, `${option.UserDefaultValue}`), true);
                                                assert.strictEqual(optionEditor.HasText(modValueTag, `${option.ModDefaultValue}`), true);
                                                assert.strictEqual(optionEditor.HasText(adminValueTag, `${option.AdminDefaultValue}`), true);
                                            });

                                        test(
                                            "Checking whether the registered-restriction is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(optionEditor.HasText(registeredTag, option.RegisteredOnly ? "1" : "0"), true);
                                            });
                                    });
                            });
                    });
            });
    });