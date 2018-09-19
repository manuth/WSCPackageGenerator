import * as assert from "assert";
import { ImageDirectoryDescriptor } from "../System/Customization/Presentation/Themes/ImageDirectoryDescriptor";

suite("WoltLab Suite Core Package Library", () =>
{
    suite(
        "System",
        () =>
        {
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