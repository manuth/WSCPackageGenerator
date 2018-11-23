import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempFile } from "temp-filesystem";
import { DOMParser } from "xmldom";
import { WoltLabXMLCompiler } from "../../../System/Compilation/WoltLabXMLCompiler";

suite(
    "WoltLabXMLCompiler",
    () =>
    {
        let tempFile: TempFile;
        let namespace: string;
        let schemaLocation: string;
        let compiler: WoltLabXMLCompiler<{}>;

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();
                namespace = "http://www.woltlab.com";
                schemaLocation = "http://example.com/helloWorld.xsd";

                compiler = new class extends WoltLabXMLCompiler<{}>
                {
                    protected SchemaLocation = schemaLocation;

                    public constructor()
                    {
                        super({});
                    }
                }();

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
                    "General tests...",
                    () =>
                    {
                        test(
                            "Checking whether the item can be compiled...",
                            async () =>
                            {
                                await compiler.Execute();
                            });

                        test(
                            "Checking whether the compiled file exists...",
                            async () =>
                            {
                                assert.strictEqual(await FileSystem.pathExists(tempFile.FullName), true);
                            });
                    });

                suite(
                    "Testing the integrity of the compiled file...",
                    () =>
                    {
                        let document: Document;

                        suiteSetup(
                            async () =>
                            {
                                document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FullName)).toString());
                            });

                        test(
                            "Checking whether the namespace is correct...",
                            () =>
                            {
                                assert.strictEqual(document.documentElement.getAttribute("xmlns"), namespace);
                            });

                        test(
                            "Checking whether the schema-instance is correct...",
                            () =>
                            {
                                assert.strictEqual(document.documentElement.getAttribute("xmlns:xsi"), "http://www.w3.org/2001/XMLSchema-instace");
                            });

                        test(
                            "Checking whether the schema-location is correct...",
                            () =>
                            {
                                assert.strictEqual(document.documentElement.getAttribute("xsi:schemaLocation"), `${namespace} ${schemaLocation}`);
                            });
                    });
            });
    });