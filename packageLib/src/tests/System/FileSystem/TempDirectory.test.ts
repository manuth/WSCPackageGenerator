import * as assert from "assert";
import * as FileSystem from "fs-extra";
import * as Path from "path";
import { TempDirectory } from "../../../System/FileSystem/TempDirectory";

suite(
    "TempDirectory",
    () =>
    {
        let tempDir: TempDirectory;
        let tempDirName: string;
        let tempFileName: string;

        suiteSetup(
            () =>
            {
                tempDir = new TempDirectory();
                tempDirName = tempDir.FileName;
                tempFileName = "test.txt";
            });

        test(
            "Checking whether the temporary directory exists...",
            () => assert.strictEqual(FileSystem.pathExistsSync(tempDirName), true));

        test(
            "Checking whether files can be written to the temporary directory...",
            () => FileSystem.writeFileSync(tempDir.MakePath(tempFileName), "test"));

        test(
            "Checking whether the file written to the temporary directory exists...",
            async () => assert.strictEqual(await FileSystem.pathExists(Path.join(tempDirName, tempFileName)), true));

        test(
            "Checking whether the `TempDirectory`-object can be disposed...",
            () => assert.doesNotThrow(() => tempDir.Dispose()));

        test(
            "Checking whether the temporary directory has been deleted...",
            () =>
            {
                assert.strictEqual(FileSystem.pathExistsSync(tempDirName), false);
            });
    });