import * as assert from "assert";
import { ImageDirectoryDescriptor } from "../System/Customization/Presentation/Themes/ImageDirectoryDescriptor";

suite("WoltLab Suite Core Package Library", () =>
{
    suite(
        "ImageDirectoryDescriptor",
        () =>
        {
            let customFileName: string = "example.tar";
            let customDestination: string = "dist";

            let imageDirectory: ImageDirectoryDescriptor = new ImageDirectoryDescriptor(
                {
                    Source: "example"
                });

            let customImageDirectory: ImageDirectoryDescriptor = new ImageDirectoryDescriptor(
                {
                    Source: "example",
                    FileName: customFileName,
                    DestinationRoot: customDestination
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