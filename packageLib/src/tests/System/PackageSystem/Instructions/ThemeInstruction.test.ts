import * as assert from "assert";
import * as Path from "path";
import { ThemeInstruction } from "../../../../System/PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";

suite(
    "ThemeInstruction",
    () =>
    {
        let ThemeName: string;
        let themeInstruction: ThemeInstruction;

        suiteSetup(
            () =>
            {
                ThemeName = "Foo";

                themeInstruction = new ThemeInstruction({
                    Theme: {
                        Name: ThemeName,
                        DisplayName: {}
                    }
                });
            });

        suite(
            "FileName",
            () =>
            {
                test(
                    "Checking whether the filename is set to the name of the theme if no filename is specified...",
                    () =>
                    {
                        assert.strictEqual(Path.parse(themeInstruction.FileName).name, ThemeName);
                    });
            });
    });