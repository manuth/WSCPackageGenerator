import { doesNotReject, ok, strictEqual } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { JSONCFileMappingTester } from "@manuth/generator-ts-project-test";
import { Random } from "random-js";
import { ThemeInstructionComponent } from "../../../../generators/package/Components/ThemeInstructionComponent";
import { IThemeComponentOptions } from "../../../../generators/package/Settings/IThemeComponentOptions";
import { PackageComponentType } from "../../../../generators/package/Settings/PackageComponentType";
import { ThemeComponent } from "../../../../generators/package/Settings/ThemeComponent";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings";
import { WoltLabComponentKey } from "../../../../Settings/WoltLabComponentKey";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey";

/**
 * Registers tests for the {@link ThemeInstructionComponent `ThemeInstructionComponent`} class.
 *
 * @param context
 * The test-context.
 */
export function ThemeInstructionComponentTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(ThemeInstructionComponent),
        () =>
        {
            let random: Random;
            let generator: WoltLabPackageGenerator;
            let component: ThemeInstructionComponent<IWoltLabSettings, GeneratorOptions, IThemeComponentOptions>;
            let options: IThemeComponentOptions;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    random = new Random();
                    generator = await context.Generator;
                    component = new ThemeInstructionComponent(generator);
                });

            setup(
                () =>
                {
                    options = {
                        [WoltLabComponentKey.Path]: `${random.string(20)}.ts`,
                        Name: "test",
                        DisplayName: "Test",
                        Description: "This is a test.",
                        CustomScssFileName: generator.assetPath(random.string(5)),
                        ScssOverridesFileName: generator.assetPath(random.string(6)),
                        VariableFileName: generator.assetPath(random.string(7)),
                        Components: [
                            ThemeComponent.CustomScss,
                            ThemeComponent.ScssOverrides,
                            ThemeComponent.Variables
                        ]
                    };

                    generator.Settings[WoltLabSettingKey.ComponentOptions] = {
                        [PackageComponentType.Theme]: options
                    };
                });

            suite(
                nameof<ThemeInstructionComponent<any, any, any>>((component) => component.VariableName),
                () =>
                {
                    test(
                        `Checking whether the value equals the \`${nameof<IThemeComponentOptions>((o) => o.DisplayName)}\`, if specified…`,
                        () =>
                        {
                            strictEqual(component.VariableName, options.DisplayName);
                            options.DisplayName = undefined;
                            ok(typeof component.VariableName === "string");
                        });
                });

            suite(
                nameof<ThemeInstructionComponent<any, any, any>>((component) => component.FileMappings),
                () =>
                {
                    test(
                        `Checking whether a file-mapping for each selected \`${nameof<ThemeComponent>()}\` is created…`,
                        () =>
                        {
                            for (
                                let fileName of [
                                    options.CustomScssFileName,
                                    options.ScssOverridesFileName,
                                    options.VariableFileName
                                ])
                            {
                                ok(
                                    component.FileMappings.some(
                                        (fileMapping) =>
                                        {
                                            return fileMapping.Destination === fileName;
                                        }));
                            }
                        });

                    test(
                        "Checking whether the variable file-mapping contains valid JSON-code…",
                        async () =>
                        {
                            let fileMapping = component.FileMappings.find((fileMapping) => fileMapping.Destination === options.VariableFileName);
                            let tester = new JSONCFileMappingTester(generator, fileMapping);
                            await tester.Run();
                            await doesNotReject(() => tester.ParseOutput());
                        });
                });
        });
}
