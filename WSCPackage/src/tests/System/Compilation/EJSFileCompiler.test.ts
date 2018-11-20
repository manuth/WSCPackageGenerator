import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { DOMParser } from "xmldom";
import { EJSFileCompiler } from "../../../System/Compilation/EJSFileCompiler";
import { TempFile } from "../../../System/FileSystem/TempFile";

suite(
    "EJSFileCompiler",
    () =>
    {
        let tempFile: TempFile;
        let variableName: string;
        let variableValue: string;
        let compiler: EJSFileCompiler<{}>;

        suiteSetup(
            async () =>
            {
                let context: { [key: string]: string } = {};
                tempFile = new TempFile();
                variableName = "foo";
                variableValue = "Hello World";
                context[variableName] = variableValue;

                compiler = new class extends EJSFileCompiler<{}>
                {
                    protected TagName = "test";

                    public constructor()
                    {
                        super({});
                    }

                    protected CreateDocument()
                    {
                        let document = super.CreateDocument();
                        document.documentElement.appendChild(document.createTextNode(`<%= ${variableName} %>`));
                        return document;
                    }

                    protected async Compile()
                    {
                        await super.Compile();
                        await this.CopyTemplate(this.DestinationPath, this.DestinationPath, context);
                    }
                }();

                compiler.DestinationPath = tempFile.FileName;
            });

        suite(
            "Compile()",
            () =>
            {
                test(
                    "Checking whether the component can be compiled...",
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
                    "Checking whether the EJS-variable has been replaced...",
                    async () =>
                    {
                        let document = new DOMParser().parseFromString((await FileSystem.readFile(tempFile.FileName)).toString());
                        assert.strictEqual(document.documentElement.textContent, variableValue);
                    });
            });
    });