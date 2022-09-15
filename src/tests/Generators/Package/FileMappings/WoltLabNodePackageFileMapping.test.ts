import { deepStrictEqual, ok, strictEqual } from "assert";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { TestContext } from "@manuth/extended-yo-generator-test";
import { TSProjectSettingKey } from "@manuth/generator-ts-project";
import { PackageFileMappingTester } from "@manuth/generator-ts-project-test";
import { IPackageJSON, Package, PackageType } from "@manuth/package-json-editor";
import { WoltLabDependencyCollection } from "../../../../generators/package/FileMappings/WoltLabDependencyCollection.js";
import { WoltLabNodePackageFileMapping } from "../../../../generators/package/FileMappings/WoltLabNodePackageFileMapping.js";
import { WoltLabPackageGenerator } from "../../../../generators/package/WoltLabPackageGenerator.js";
import { IWoltLabSettings } from "../../../../Settings/IWoltLabSettings.js";
import { WoltLabSettingKey } from "../../../../Settings/WoltLabSettingKey.js";

/**
 * Registers tests for the {@link WoltLabNodePackageFileMapping `WoltLabNodePackageFileMapping<TSettings, TOptions>`} class.
 *
 * @param context
 * The test-context.
 */
export function WoltLabNodePackageFileMappingTests(context: TestContext<WoltLabPackageGenerator>): void
{
    suite(
        nameof(WoltLabNodePackageFileMapping),
        () =>
        {
            let generator: WoltLabPackageGenerator;
            let fileMapping: WoltLabNodePackageFileMapping<IWoltLabSettings, GeneratorOptions>;
            let tester: PackageFileMappingTester<WoltLabPackageGenerator, IWoltLabSettings, GeneratorOptions, WoltLabNodePackageFileMapping<IWoltLabSettings, GeneratorOptions>>;
            let parsedPackage: Package;

            suiteSetup(
                async function()
                {
                    this.timeout(5 * 60 * 1000);
                    generator = await context.Generator;
                    fileMapping = new WoltLabNodePackageFileMapping(generator);
                    tester = new PackageFileMappingTester(generator, fileMapping);
                });

            suiteTeardown(
                async () =>
                {
                    await context.ResetSettings();
                    await tester.Run();
                });

            setup(
                async () =>
                {
                    Object.assign<IWoltLabSettings, Partial<IWoltLabSettings>>(
                        generator.Settings,
                        {
                            [WoltLabSettingKey.HomePage]: "https://example.com/home"
                        });

                    await tester.Clean();
                    await tester.Run();
                    parsedPackage = await tester.ParseOutput();
                });

            teardown(
                async () =>
                {
                    await tester.Clean();
                });

            suite(
                nameof<WoltLabNodePackageFileMapping<any, any>>((fileMapping) => fileMapping.LoadPackage),
                () =>
                {
                    test(
                        "Checking whether the required dependencies are present…",
                        () =>
                        {
                            tester.AssertDependencyNames(
                                {
                                    devDependencies: [
                                        "@manuth/woltlab-compiler",
                                        "ts-node"
                                    ]
                                });
                        });

                    test(
                        "Checking whether unnecessary dependencies are removed…",
                        () =>
                        {
                            ok(!parsedPackage.AllDependencies.Has("mocha"));
                            ok(!parsedPackage.AllDependencies.Has("@types/mocha"));
                            ok(!parsedPackage.AllDependencies.Has("source-map-support"));
                        });

                    test(
                        "Checking whether unnecessary properties are removed…",
                        async () =>
                        {
                            for (
                                let property of [
                                    nameof<IPackageJSON>((pkg) => pkg.main),
                                    nameof<IPackageJSON>((pkg) => pkg.types)
                                ])
                            {
                                ok(!(property in parsedPackage.ToJSON()));
                            }
                        });

                    test(
                        "Checking whether the values of the packages are set correctly…",
                        () =>
                        {
                            strictEqual(parsedPackage.Author.URL, generator.Settings[WoltLabSettingKey.HomePage]);
                            deepStrictEqual(parsedPackage.PublishConfig, {});
                            deepStrictEqual(parsedPackage.Files, []);
                        });

                    test(
                        "Checking whether the expected dependencies are added…",
                        async () =>
                        {
                            for (let value of [true, false])
                            {
                                generator.Settings[TSProjectSettingKey.ESModule] = value;
                                await tester.Run();
                                await tester.AssertDependencies(new WoltLabDependencyCollection(value));
                            }
                        });
                });

            suite(
                nameof<WoltLabNodePackageFileMapping<any, any>>((fileMapping) => fileMapping.TypeScriptScripts),
                () =>
                {
                    test(
                        "Checking whether all unnecessary scripts are excluded…",
                        () =>
                        {
                            for (
                                let script of [
                                    "rebuild",
                                    "build",
                                    "watch",
                                    "clean"
                                ])
                            {
                                ok(!parsedPackage.Scripts.Has(script));
                            }
                        });
                });

            suite(
                nameof<WoltLabNodePackageFileMapping<any, any>>((fileMapping) => fileMapping.MiscScripts),
                () =>
                {
                    let scriptName: string;
                    let packageScript: string;
                    let tsNodeBin: string;
                    let tsNodeEsmBin: string;

                    suiteSetup(
                        () =>
                        {
                            scriptName = "package";
                            tsNodeBin = "ts-node";
                            tsNodeEsmBin = `${tsNodeBin}-esm`;
                            packageScript = `${tsNodeEsmBin} ./src/index.ts`;
                        });

                    test(
                        "Checking whether unnecessary scripts are excluded…",
                        () =>
                        {
                            for (
                                let script of [
                                    "prepare",
                                    "test"
                                ])
                            {
                                ok(!parsedPackage.Scripts.Has(script));
                            }
                        });

                    test(
                        "Checking whether a script for creating a woltlab-package is present…",
                        async () =>
                        {
                            await tester.AssertScript(scriptName, packageScript);
                        });

                    test(
                        `Checking whether the script is adjusted for \`${nameof(PackageType.CommonJS)}\` projects…`,
                        async () =>
                        {
                            generator.Settings[TSProjectSettingKey.ESModule] = false;
                            await tester.Run();

                            await tester.AssertScript(
                                scriptName,
                                packageScript.replace(tsNodeEsmBin, tsNodeBin));
                        });
                });
        });
}
