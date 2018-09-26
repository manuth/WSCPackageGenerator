import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { DOMParser } from "xmldom";
import { ThemeVariableCompiler } from "../../../../System/Compilation/Presentation/ThemeVariableCompiler";
import { TempFile } from "../../../../System/FileSystem/TempFile";

suite(
    "ThemeVariableCompiler",
    () =>
    {
        let tempFile: TempFile;
        let compiler: ThemeVariableCompiler;
        let variableName: string;
        let value: string;

        suiteSetup(
            () =>
            {
                let variables: { [key: string]: string } = {};
                tempFile = new TempFile();
                variableName = "wcfHeaderBackground";
                value = "rgba(255, 0, 0, 1)";
                variables[variableName] = value;

                compiler = new ThemeVariableCompiler(variables);
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

                test(
                    "Checking whether the compiler executes without any errors...",
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
                    "Checking whether the content of the file is correct...",
                    async () =>
                    {
                        let content: string = (await FileSystem.readFile(tempFile.FileName)).toString();
                        let xml: Document = new DOMParser().parseFromString(content);
                        assert.strictEqual(xml.documentElement.tagName, "variables");
                        assert.strictEqual(xml.documentElement.getElementsByTagName("variable").length, 1);

                        let variableElement: Element = xml.documentElement.getElementsByTagName("variable")[0];
                        assert.strictEqual(variableElement.hasAttribute("name"), true);
                        assert.strictEqual(variableElement.getAttribute("name"), variableName);
                        assert.strictEqual(variableElement.textContent, value);
                    });
            });
    });