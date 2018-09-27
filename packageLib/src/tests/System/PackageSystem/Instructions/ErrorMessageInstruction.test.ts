import * as assert from "assert";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
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
                let translations: { [locale: string]: { [category: string]: { [key: string]: string } } };

                suiteSetup(
                    () =>
                    {
                        translations = errorMessageInstruction.GetMessages();
                    });

                test(
                    "Checking whether the locale is present...",
                    () =>
                    {
                        assert.strictEqual(locale in translations, true);
                    });

                test(
                    `Checking whether the \`${category}\`-category is present...`,
                    () =>
                    {
                        assert.strictEqual(category in translations[locale], true);
                    });

                test(
                    `Checking whether the \`${category}.${messageName}\`-message is present...`,
                    () =>
                    {
                        assert.strictEqual(`${category}.${messageName}` in translations[locale][category], true);
                    });

                test(
                    `Checking whether the \`${category}.${messageName}\`-message has the expected value...`,
                    () =>
                    {
                        assert.strictEqual(translations[locale][category][`${category}.${messageName}`], messageValue);
                    });
            });
    });