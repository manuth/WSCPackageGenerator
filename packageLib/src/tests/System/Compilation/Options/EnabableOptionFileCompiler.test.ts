import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { DOMParser } from "xmldom";
import { EnabableOptionFileCompiler } from "../../../../System/Compilation/Options/EnabableOptionFileCompiler";
import { TempFile } from "../../../../System/FileSystem/TempFile";
import { INode } from "../../../../System/NodeSystem/INode";
import { Node } from "../../../../System/NodeSystem/Node";
import { EnabableCategory } from "../../../../System/Options/EnabableCategory";
import { ICategory } from "../../../../System/Options/ICategory";
import { IEnabableCategoryOptions } from "../../../../System/Options/IEnabableCategoryOptions";
import { IOptionOptions } from "../../../../System/Options/IOptionOptions";
import { Option } from "../../../../System/Options/Option";
import { INodeSystemInstructionOptions } from "../../../../System/PackageSystem/Instructions/NodeSystem/INodeSystemInstructionOptions";
import { EnabableOptionInstruction } from "../../../../System/PackageSystem/Instructions/Options/EnabableOptionInstruction";
import { XMLEditor } from "../../../../System/Serialization/XMLEditor";

suite(
    "EnabableOptionFileCompiler",
    () =>
    {
        class MyOption extends Option
        {
            public constructor(category: ICategory, options: IOptionOptions)
            {
                super(category, options);
            }
        }

        class MyCategory extends EnabableCategory<MyOption, IOptionOptions>
        {
            public constructor(node: INode, options: IEnabableCategoryOptions<IOptionOptions>)
            {
                super(
                    node,
                    options,
                    (category: EnabableCategory<MyOption, IOptionOptions>, optionOptions: IOptionOptions) =>
                    {
                        return new MyOption(category, optionOptions);
                    });
            }
        }

        class MyOptionInstruction extends EnabableOptionInstruction<MyCategory, IEnabableCategoryOptions<IOptionOptions>, MyOption, IOptionOptions>
        {
            public constructor(options: INodeSystemInstructionOptions<IEnabableCategoryOptions<IOptionOptions>>)
            {
                super(
                    options,
                    (node: Node<MyCategory, IEnabableCategoryOptions<IOptionOptions>>, categoryOptions: IEnabableCategoryOptions<IOptionOptions>) =>
                    {
                        return new MyCategory(node, categoryOptions);
                    });
            }

            public get RootCategory(): string
            {
                return "wcf.foo.option";
            }

            public get Type(): string
            {
                return "bar";
            }
        }

        let tempFile: TempFile;
        let compiler: EnabableOptionFileCompiler<MyCategory, IEnabableCategoryOptions<IOptionOptions>, Option, IOptionOptions>;
        let enableOptions: string[];

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();
                enableOptions = ["foo", "bar", "baz"];

                let categoryID: string = "category";
                let optionInstruction: MyOptionInstruction = new MyOptionInstruction(
                    {
                        FileName: null,
                        Nodes: [
                            {
                                ID: categoryID,
                                Name: "helloWorld",
                                Item: {
                                    EnableOptions: enableOptions
                                }
                            }
                        ]
                    });

                compiler = new class extends EnabableOptionFileCompiler<MyCategory, IEnabableCategoryOptions<IOptionOptions>, Option, IOptionOptions>
                {
                    protected get SchemaLocation(): string
                    {
                        return "http://example.com/myOptions.xsd";
                    }
                }(optionInstruction);
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
                                        let document: Document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                                        editor = new XMLEditor(document.documentElement);
                                    });
                            });

                        suite(
                            "Checking the integrity of the category...",
                            () =>
                            {
                                let categoryEditor: XMLEditor;

                                suite(
                                    "General",
                                    () =>
                                    {
                                        let categoryTag: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                categoryTag = "category";
                                            });

                                        test(
                                            "Checking whether the category exists...",
                                            () =>
                                            {
                                                assert.strictEqual(editor.GetElementsByTag(categoryTag).length, 1);
                                                categoryEditor = editor.GetElementsByTag(categoryTag)[0];
                                            });
                                    });

                                suite(
                                    "Checking the integrity of the meta-data...",
                                    () =>
                                    {
                                        let enableOptionsTag: string;

                                        suiteSetup(
                                            () =>
                                            {
                                                enableOptionsTag = "options";
                                            });

                                        test(
                                            'Checking whether the "options"-property is correct...',
                                            () =>
                                            {
                                                assert.strictEqual(categoryEditor.GetText(enableOptionsTag).split(",").sort().join(","), enableOptions.sort().join(","));
                                            });
                                    });
                            });
                    });
            });
    });