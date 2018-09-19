import * as assert from "assert";
import * as FileSystem from "fs-extra";
import * as Path from "path";
import { ImageDirectoryDescriptor } from "../System/Customization/Presentation/Themes/ImageDirectoryDescriptor";
import { TempDirectory } from "../System/FileSystem/TempDirectory";

suite("WoltLab Suite Core Package Library", () =>
{
    suite(
        "System",
        () =>
        {
            suite(
                "FileSystem",
                () =>
                {
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
                                () => assert.strictEqual(FileSystem.existsSync(Path.join(tempDirName, tempFileName)), true));

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
                });

            suite(
                "Themes",
                () =>
                {
                    suite(
                        "ImageDirectoryDescriptor",
                        () =>
                        {
                            let customFileName: string;
                            let customDestination: string;

                            let imageDirectory: ImageDirectoryDescriptor;

                            let customImageDirectory: ImageDirectoryDescriptor;

                            suiteSetup(
                                () =>
                                {
                                    customFileName = "example.tar";
                                    customDestination = "dist";

                                    imageDirectory = new ImageDirectoryDescriptor(
                                        {
                                            Source: "example"
                                        });

                                    customImageDirectory = new ImageDirectoryDescriptor(
                                        {
                                            Source: "example",
                                            FileName: customFileName,
                                            DestinationRoot: customDestination
                                        });
                                });

                            suite(
                                "FileName",
                                () =>
                                {
                                    test(
                                        'Check whether the `FileName`-property is set to "images.tar" when no filename is specified...',
                                        () => assert.strictEqual(imageDirectory.FileName, "images.tar"));

                                    test(
                                        "Check whether the `FileName`-property is set properly when a filename is specified...",
                                        () => assert.strictEqual(customImageDirectory.FileName, customFileName));
                                });

                            suite(
                                "DestinationRoot",
                                () =>
                                {
                                    test(
                                        "Check whether `DestinationRoot` is set to `Source` when no destination-root is specified...",
                                        () => assert.strictEqual(imageDirectory.DestinationRoot, imageDirectory.Source));

                                    test(
                                        "Check whether `DestinationRoot` is set properly when a destination-root is specified...",
                                        () => assert.strictEqual(customImageDirectory.DestinationRoot, customDestination));
                                });
                        });
                });
        });
});