import * as assert from "assert";
import * as FileSystem from "fs-extra";
import { TempFile } from "../../../System/FileSystem/TempFile";

suite(
    "TempFile",
    () =>
    {
        let tempFile: TempFile;
        let tempFileName: string;
        let text: string;

        suiteSetup(
            () =>
            {
                tempFile = new TempFile();
                tempFileName = tempFile.FileName;
                text = "test";
            });

        test(
            "Checking whether the temporary file exists...",
            async () => assert.strictEqual(await FileSystem.pathExists(tempFileName), true));

        test(
            "Checking whether files can be written to the temporary file...",
            () => FileSystem.writeFileSync(tempFileName, text));

        test(
            "Checking whether the file written to the temporary file exists...",
            () => assert.strictEqual(FileSystem.readFileSync(tempFileName).toString(), text));

        test(
            "Checking whether the `TempFile`-object can be disposed...",
            () => assert.doesNotThrow(() => tempFile.Dispose()));

        test(
            "Checking whether the temporary file has been deleted...",
            async () =>
            {
                assert.strictEqual(await FileSystem.pathExists(tempFileName), false);
            });
    });