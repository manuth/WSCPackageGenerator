import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { UserOptionFileCompiler } from "../../../../System/Compilation/Options/UserOptionFileCompiler";
import { EditPermission } from "../../../../System/Options/UserPanel/EditPermission";
import { IUserOptionOptions } from "../../../../System/Options/UserPanel/IUserOptionOptions";
import { ViewPermission } from "../../../../System/Options/UserPanel/ViewPermission";
import { UserOptionInstruction } from "../../../../System/PackageSystem/Instructions/Options/UserOptionInstruction";
import { XMLEditor } from "../../../../System/Serialization/XMLEditor";

suite(
    "UserOptionFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let compiler: UserOptionFileCompiler;
        let option: IUserOptionOptions;

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();
                option = {
                    Name: "foo",
                    Required: Math.random() > 0.5,
                    AskOnRegistration: Math.random() > 0.5,
                    EditPermissions: EditPermission.Owner | EditPermission.Admin,
                    ViewPermissions: ViewPermission.Owner | ViewPermission.Admin | ViewPermission.RegisteredUser | ViewPermission.Guest,
                    OutputClass: "wcf\\system\\foo\\bar\\BazUserOptionOutput"
                };

                let userOptionInstruction: UserOptionInstruction = new UserOptionInstruction(
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

                compiler = new UserOptionFileCompiler(userOptionInstruction);
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
                                        let requiredTag: string;
                                        let registrationTag: string;
                                        let editTag: string;
                                        let viewTag: string;
                                        let searchableTag: string;
                                        let outputTag: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                requiredTag = "required";
                                                registrationTag = "askduringregistration";
                                                editTag = "editable";
                                                viewTag = "visible";
                                                searchableTag = "searchable";
                                                outputTag = "outputclass";
                                            });

                                        test(
                                            'Checking whether the "Required"-property is correct...',
                                            () =>
                                            {
                                                assert.strictEqual(optionEditor.HasText(requiredTag, option.Required ? "1" : "0"), true);
                                            });

                                        test(
                                            'Checking whether the "AskOnRegistration"-property is correct...',
                                            () =>
                                            {
                                                assert.strictEqual(optionEditor.HasText(registrationTag, option.AskOnRegistration ? "1" : "0"), true);
                                            });

                                        test(
                                            "Checking whether the permissions are set correctly...",
                                            () =>
                                            {
                                                assert.strictEqual(optionEditor.HasText(editTag, option.EditPermissions.toString()), true);
                                                assert.strictEqual(optionEditor.HasText(viewTag, option.ViewPermissions.toString()), true);
                                            });

                                        test(
                                            'Checking whether the "Searchable"-property is correct...',
                                            () =>
                                            {
                                                assert.strictEqual(optionEditor.HasText(searchableTag, option.Searchable ? "1" : "0"), true);
                                            });

                                        test(
                                            "Checking whether the output-class is correct...",
                                            () =>
                                            {
                                                assert.strictEqual(optionEditor.HasText(outputTag, option.OutputClass), true);
                                            });
                                    });
                            });
                    });
            });
    });