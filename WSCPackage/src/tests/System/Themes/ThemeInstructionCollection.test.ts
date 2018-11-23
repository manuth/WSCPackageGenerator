import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempDirectory } from "temp-filesystem";
import { IThemeOptions } from "../../../System/Customization/Presentation/Themes/IThemeOptions";
import { ThemeInstructionCollection } from "../../../System/Customization/Presentation/Themes/ThemeInstructionCollection";
import { ThemeInstruction } from "../../../System/PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";

suite(
    "ThemeInstructionCollection",
    () =>
    {
        let collection: ThemeInstructionCollection;
        let themeRoot: TempDirectory;
        let themeDirectories: string[];
        let name: string;

        suiteSetup(
            async () =>
            {
                themeRoot = new TempDirectory();
                themeDirectories = ["foo", "bar", "baz", "this", "is", "a", "test"];
                name = "Foo";

                for (let themeDirectory of themeDirectories)
                {
                    let tsPath: string = themeRoot.MakePath(themeDirectory, "Theme.ts");
                    let jsPath: string = themeRoot.MakePath(themeDirectory, "Theme.js");

                    await FileSystem.ensureDir(themeRoot.MakePath(themeDirectory));
                    await FileSystem.ensureFile(tsPath);
                    await FileSystem.ensureFile(jsPath);
                    await FileSystem.writeFile(tsPath, "");
                    await FileSystem.writeFile(jsPath, `module.exports = ${
                        JSON.stringify(
                            {
                                Name: name,
                                DisplayName: {}
                            } as IThemeOptions)}`);
                }
            });

        suiteTeardown(
            () =>
            {
                themeRoot.Dispose();
            });

        test(
            "Checking whether a new ThemeInstructionCollection can be initialized...",
            () =>
            {
                collection = new ThemeInstructionCollection(themeRoot.FullName);
            });

        test(
            "Checking whether themes are automatically added to the collection...",
            () =>
            {
                assert.strictEqual(collection.length, themeDirectories.length);
            });

        test(
            "Checking whether the meta-data is applied correctly...",
            () =>
            {
                assert.strictEqual(collection.every((themeInstruction: ThemeInstruction) => themeInstruction.Theme.Name === name), true);
            });
    });