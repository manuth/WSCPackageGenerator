import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { NamedObjectDeletionFileCompiler } from "../../../System/Compilation/NamedObjectDeletionFileCompiler";
import { INamedObject } from "../../../System/INamedObject";
import { INamedDeleteInstruction } from "../../../System/PackageSystem/Instructions/INamedDeleteInstruction";
import { Instruction } from "../../../System/PackageSystem/Instructions/Instruction";
import { XMLEditor } from "../../../System/Serialization/XMLEditor";

suite(
    "NamedObjectDeletionFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let objectTag: string;
        let compiler: NamedObjectDeletionFileCompiler<INamedDeleteInstruction>;
        let objectsToDelete: INamedObject[];

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();
                objectTag = "myObject";
                objectsToDelete = [
                    {
                        Name: "foo"
                    },
                    {
                        Name: "bar"
                    },
                    {
                        Name: "baz"
                    }
                ];

                compiler = new class extends NamedObjectDeletionFileCompiler<INamedDeleteInstruction>
                {
                    protected get SchemaLocation(): string
                    {
                        return "http://example.com/mySchema.xsd";
                    }

                    protected get ObjectTagName(): string
                    {
                        return objectTag;
                    }
                }(
                    new class extends Instruction implements INamedDeleteInstruction
                    {
                        public Type = "foo";

                        public ObjectsToDelete: INamedObject[] = objectsToDelete;

                        public constructor()
                        {
                            super(
                                {
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
                                        let document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                                        editor = new XMLEditor(document.documentElement);
                                    });
                            });

                        suite(
                            "Checking the integrity of the meta-data...",
                            () =>
                            {
                                test(
                                    "Checking the integrity of the named deletions...",
                                    () =>
                                    {
                                        let deletedObjects = editor.GetElementsByTag(objectTag);
                                        assert.strictEqual(deletedObjects.length, objectsToDelete.length);

                                        for (let objectToDelete of objectsToDelete)
                                        {
                                            let matches = deletedObjects.filter((objectNode: XMLEditor) => objectNode.HasAttribute("name", objectToDelete.Name));
                                            assert.strictEqual(matches.length, 1);
                                        }
                                    });
                            });
                    });
            });
    });