import * as assert from "assert";
import { ApplicationFileSystemInstruction } from "../../../../System/PackageSystem/Instructions/FileSystem/ApplicationFileSystemInstruction";
import { Package } from "../../../../System/PackageSystem/Package";

suite(
    "ApplicationFileSystemInstruction",
    () =>
    {
        let application: string;
        let normalElement: Element;
        let applicationElement: Element;
        let normalInstruction: ApplicationFileSystemInstruction;
        let applicationInstruction: ApplicationFileSystemInstruction;

        suiteSetup(
            () =>
            {
                let $package: Package = new Package(
                    {
                        Identifier: "foo",
                        DisplayName: {},
                        InstallSet: {
                            Instructions: []
                        }
                    });

                application = "gallery";

                normalInstruction = new ApplicationFileSystemInstruction(
                    {
                        Source: "files"
                    });

                applicationInstruction = new ApplicationFileSystemInstruction(
                    {
                        Source: "gallery/files",
                        Application: application
                    });

                $package.InstallSet.push(normalInstruction);
                $package.InstallSet.push(applicationInstruction);
                normalElement = normalInstruction.Serialize();
                applicationElement = applicationInstruction.Serialize();
            });

        suite(
            "FileName",
            () =>
            {
                test(
                    "Checking whether the filename is set correctly when no filename is specified...",
                    () =>
                    {
                        assert.strictEqual(applicationInstruction.FileName, `${applicationInstruction.Source}.tar`);
                    });
            });

        suite(
            "Serialize()",
            () =>
            {
                test(
                    "Checking whether the `application`-attribute is not present if the `Application` is not specified...",
                    () =>
                    {
                        assert.strictEqual(normalElement.hasAttribute("application"), false);
                    });

                test(
                    "Checking whether the `application`-attribute is present if the `Application` is specified...",
                    () =>
                    {
                        assert.strictEqual(applicationElement.hasAttribute("application"), true);
                    });
            });
    });