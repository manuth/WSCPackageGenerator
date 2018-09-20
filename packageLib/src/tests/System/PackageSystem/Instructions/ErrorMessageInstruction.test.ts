import * as assert from "assert";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { Localization } from "../../../../System/Globalization/Localization";
import { ErrorMessageInstruction } from "../../../../System/PackageSystem/Instructions/Globalization/ErrorMessageInstruction";

suite(
    "ErrorMessageInstruction",
    () =>
    {
        let locale: string;
        let category: string = "wcf.acp.option.error";
        let messageName: string = "error";
        let messageValue: string;
        let errorMessageInstruction: ErrorMessageInstruction;

        suiteSetup(
            () =>
            {
                let localization: ILocalization = {};

                locale = "en";
                messageValue = "This is an error";
                localization[locale] = messageValue;

                errorMessageInstruction = new ErrorMessageInstruction(
                    {
                        FileName: "foo",
                        Nodes: [
                            {
                                Name: messageName,
                                Item: {
                                    Translations: localization
                                }
                            }
                        ]
                    });
            });

        suite(
            "GetMessage()",
            () =>
            {
                let translations: { [category: string]: { [key: string]: Localization } };

                suiteSetup(
                    () =>
                    {
                        translations = errorMessageInstruction.GetMessages();
                    });

                test(
                    `Checking whether the \`${category}\`-category is present...`,
                    () =>
                    {
                        assert.strictEqual(category in translations, true);
                    });

                test(
                    `Checking whether the \`${category}.${messageName}\`-message is present...`,
                    () =>
                    {
                        assert.strictEqual(`${category}.${messageName}` in translations[category], true);
                    });

                test(
                    `Checking whether the \`${category}.${messageName}\`-message has the expected value...`,
                    () =>
                    {
                        assert.strictEqual(translations[category][`${category}.${messageName}`].Data[locale], messageValue);
                    });
            });
    });