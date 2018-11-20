import * as assert from "assert";
import { ModuleInfo } from "../../../System/PackageSystem/ModuleInfo";
import { Package } from "../../../System/PackageSystem/Package";

suite(
    "Package",
    () =>
    {
        let $package: Package;

        suiteSetup(
            () =>
            {
                $package = new Package(
                    {
                        Identifier: "example",
                        DisplayName: {},
                        InstallSet: {
                            Instructions: []
                        }
                    });
            });

        suite(
            "Name",
            () =>
            {
                test(
                    "Checking whether the name is set to the name of the npm-module if no name is specified...",
                    () =>
                    {
                        assert.strictEqual($package.Name, new ModuleInfo().Name);
                    });
            });

        suite(
            "Version",
            () =>
            {
                test(
                    "Checking whether the version is set to the version of the npm-module if no version is specified...",
                    () =>
                    {
                        assert.strictEqual($package.Version, new ModuleInfo().Version);
                    });
            });
    });