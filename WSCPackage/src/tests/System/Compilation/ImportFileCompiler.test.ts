import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { ImportFileCompiler } from "../../../System/Compilation/ImportFileCompiler";
import { XMLEditor } from "../../../System/Serialization/XMLEditor";

suite(
    "ImportFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let compiler: ImportFileCompiler<{}>;

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();
                compiler = new class extends ImportFileCompiler<{}>
                {
                    protected get SchemaLocation(): string
                    {
                        return "http://example.com/mySchema.xsd";
                    }
                }({});
                compiler.DestinationPath = tempFile.FullName;
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
                                    "Checking whether the import- and the delete-list are present...",
                                    () =>
                                    {
                                        assert.strictEqual(editor.HasTag("import", true), true);
                                        assert.strictEqual(editor.HasTag("delete", true), true);
                                    });
                            });
                    });
            });
    });