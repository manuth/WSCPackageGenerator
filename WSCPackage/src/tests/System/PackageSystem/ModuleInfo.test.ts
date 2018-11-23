import * as assert from "assert";
import * as ClearModule from "clear-module";
import * as FileSystem from "fs-extra";
import * as Path from "path";
import { ModuleInfo } from "../../../System/PackageSystem/ModuleInfo";
import { Person } from "../../../System/PackageSystem/Person";

suite(
    "ModuleInfo",
    () =>
    {
        let name: string;
        let version: string;
        let license: string;
        let author: Person;
        let packageFileName: string;
        let moduleInfo: ModuleInfo;

        suiteSetup(
            async () =>
            {
                name = "example";
                version = "2.0.1";
                license = "Apache-2.0";

                author = new Person(
                    {
                        Name: "John Doe",
                        URL: "https://example.com/"
                    });

                packageFileName = Path.join(__dirname, "..", "..", "..", "..", "package.json");
            });

        suiteTeardown(
            async () =>
            {
                await FileSystem.unlink(packageFileName);
            });

        suite(
            "Testing whether the values are read correctly...",
            () =>
            {
                setup(
                    () =>
                    {
                        try
                        {
                            ClearModule(packageFileName);
                        }
                        catch
                        { }
                    });

                test(
                    "Checking whether the author inside the `package.json`-file with author set to a string can be read...",
                    async () =>
                    {
                        await FileSystem.writeJson(
                            packageFileName,
                            {
                                author: author.Name
                            });

                        moduleInfo = new ModuleInfo();
                        assert.strictEqual(moduleInfo.Author.Name, author.Name);
                        assert.equal(moduleInfo.Author.URL, null);
                    });

                test(
                    "Checking whether the author inside the `package.json`-file with author set to an object can be read...",
                    async () =>
                    {
                        await FileSystem.writeJson(
                            packageFileName,
                            {
                                author: {
                                    name: author.Name,
                                    url: author.URL
                                }
                            });

                        moduleInfo = new ModuleInfo();
                        assert.strictEqual(moduleInfo.Author.Name, author.Name);
                        assert.strictEqual(moduleInfo.Author.URL, author.URL);
                    });

                test(
                    "Checking whether all the other values of the `package.json`-file are read correctly...",
                    async () =>
                    {
                        await FileSystem.writeJson(
                            packageFileName,
                            {
                                name,
                                version,
                                license,
                                author: {
                                    name: author.Name,
                                    url: author.URL
                                }
                            });

                        moduleInfo = new ModuleInfo();
                        assert.strictEqual(moduleInfo.Name, name);
                        assert.strictEqual(moduleInfo.Version, version);
                        assert.strictEqual(moduleInfo.License, license);
                    });
            });
    });