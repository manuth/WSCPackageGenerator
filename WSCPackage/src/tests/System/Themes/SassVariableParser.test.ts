import * as assert from "assert";
import * as dedent from "dedent";
import * as FileSystem from "fs-extra";
import * as Path from "path";
import { TempDirectory } from "temp-filesystem";
import { SassVariableParser } from "../../../System/Customization/Presentation/Themes/SassVariableParser";

suite(
    "SassVariableParser",
    () =>
    {
        let mainFile: string;
        let importFile: string;
        let tempDir: TempDirectory;

        let var1Name: string;
        let var1Value: string;
        let var2Name: string;
        let var2Value: string;
        let var3Name: string;

        let variablesWithoutImport: { [key: string]: string };
        let variablesWithImport: { [key: string]: string };

        suiteSetup(
            async () =>
            {
                mainFile = "main.scss";
                importFile = "import.scss";
                tempDir = new TempDirectory();

                var1Name = "a";
                var1Value = "#000";
                var2Name = "b";
                var2Value = '"Hello World"';

                await FileSystem.writeFile(tempDir.MakePath(mainFile), `$${var1Name}: ${var1Value};`);
                await FileSystem.writeFile(
                    tempDir.MakePath(importFile),
                    dedent(
                        `
                        @import "${Path.basename(mainFile)}";
                        $${var2Name}: ${var2Value};
                        $${var3Name}: $${var1Name};`
                    ));

                variablesWithoutImport = new SassVariableParser(tempDir.MakePath(mainFile)).Parse();
                variablesWithImport = new SassVariableParser(tempDir.MakePath(importFile)).Parse();
            });

        suiteTeardown(
            () =>
            {
                tempDir.Dispose();
            });

        suite(
            "Testing scss-files without import-statements...",
            () =>
            {
                test(
                    "Checking whether expected variable is present...",
                    () => assert.strictEqual(var1Name in variablesWithoutImport, true));

                test(
                    "Checking whether the value of the expected variable is correct...",
                    () => assert.strictEqual(variablesWithoutImport[var1Name], var1Value));
            });

        suite(
            "Testing scss-files with import-statements...",
            () =>
            {
                test(
                    "Checking whether the expected variables are present...",
                    () =>
                    {
                        assert.strictEqual(var2Name in variablesWithImport, true);
                        assert.strictEqual(var3Name in variablesWithImport, true);
                    });

                test(
                    "Checking whether variables imported variables are not present...",
                    () =>
                    {
                        assert.strictEqual(var1Name in variablesWithImport, false);
                    });

                test(
                    "Checking whether independent variables have the correct value...",
                    () =>
                    {
                        assert.strictEqual(variablesWithImport[var2Name], var2Value);
                    });

                test(
                    "Checking whether variables which depend on imports have the correct value...",
                    () =>
                    {
                        assert.strictEqual(variablesWithImport[var3Name], var1Value);
                    });
            });
    });