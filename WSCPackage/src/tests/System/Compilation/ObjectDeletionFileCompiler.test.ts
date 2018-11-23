import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { ObjectDeletionFileCompiler } from "../../../System/Compilation/ObjectDeletionFileCompiler";
import { IDeleteInstruction } from "../../../System/PackageSystem/Instructions/IDeleteInstruction";
import { Instruction } from "../../../System/PackageSystem/Instructions/Instruction";
import { XML } from "../../../System/Serialization/XML";
import { XMLEditor } from "../../../System/Serialization/XMLEditor";

suite(
    "ObjectDeletionFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let objectTag: string;
        let compiler: ObjectDeletionFileCompiler<IDeleteInstruction<{}>, {}>;

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();
                objectTag = "myObject";
                compiler = new class extends ObjectDeletionFileCompiler<IDeleteInstruction<{}>, {}>
                {
                    protected get SchemaLocation(): string
                    {
                        return "http://example.com/mySchema.xsd";
                    }

                    protected CreateDeleteObject(): Element
                    {
                        return XML.CreateDocument(objectTag).documentElement;
                    }

                }(
                    new class extends Instruction implements IDeleteInstruction<{}>
                    {
                        public Type = "foo";

                        public ObjectsToDelete: {}[] = [
                            {},
                            {}
                        ];

                        public constructor()
                        {
                            super({
                                FileName: null
                            });
                        }
                    }());

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
                        let editor: XMLEditor;

                        suite(
                            "General",
                            () =>
                            {
                                test(
                                    "Checking whether the content of the compiled file is valid xml...",
                                    async () =>
                                    {
                                        let document: Document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                                        editor = new XMLEditor(document.documentElement);
                                    });
                            });

                        suite(
                            "Checking the integrity of the meta-data...",
                            () =>
                            {
                                test(
                                    "Checking whether the integrity of the deleted objects...",
                                    () =>
                                    {
                                        let deletedObjects: XMLEditor[] = editor.GetElementsByTag(objectTag);
                                        assert.strictEqual(
                                            deletedObjects.every(
                                                (object: XMLEditor) =>
                                                {
                                                    return (object.ParentNode.nodeType === object.Element.ELEMENT_NODE) &&
                                                        ((object.ParentNode as Element).tagName === "delete");
                                                }),
                                            true);
                                    });
                            });
                    });
            });
    });