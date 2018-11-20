import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { DOMParser } from "xmldom";
import { XMLFileCompiler } from "../../../System/Compilation/XMLFileCompiler";
import { TempFile } from "../../../System/FileSystem/TempFile";

suite(
    "XMLFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let rootTag: string;
        let compiler: XMLFileCompiler<{}>;

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();
                rootTag = "foo";
                compiler = new class extends XMLFileCompiler<{}>
                {
                    protected TagName = "foo";

                    public constructor()
                    {
                        super({});
                    }
                }();

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
                let document: Document;

                test(
                    "Checking whether the compiler can be executed...",
                    async () =>
                    {
                        await compiler.Execute();
                    });

                test(
                    "Checking whether the compiled file exists...",
                    async () =>
                    {
                        assert.strictEqual(await FileSystem.pathExists(tempFile.FileName), true);
                    });

                test(
                    "Checking whether the compiled xml-file can be parsed...",
                    async () =>
                    {
                        document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                    });

                test(
                    "Checking whether a processing-instruction for `xml` is present...",
                    () =>
                    {
                        assert.strictEqual(document.childNodes[0].nodeType, document.PROCESSING_INSTRUCTION_NODE);
                        assert.strictEqual((document.childNodes[0] as ProcessingInstruction).target, "xml");
                    });

                test(
                    "Checking whether the root-tag is set correct...",
                    () =>
                    {
                        assert.strictEqual(document.documentElement.tagName, rootTag);
                    });
            });
    });