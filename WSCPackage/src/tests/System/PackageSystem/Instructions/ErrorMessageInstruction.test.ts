import * as assert from "assert";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { ErrorMessageInstruction } from "../../../../System/PackageSystem/Instructions/Globalization/ErrorMessageInstruction";

suite(
    "ErrorMessageInstruction",
    () =>
    {
        let locale: string;
        let optionCategory = "wcf.acp.option";
        let errorCategory = "error";
        let messageName = "error";
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
                    `Checking whether the \`${optionCategory}\`-category is present...`,
                    () =>
                    {
                        assert.strictEqual(optionCategory in translations[locale], true);
                    });

                test(
                    `Checking whether the \`${optionCategory}.${errorCategory}.${messageName}\`-message is present...`,
                    () =>
                    {
                        assert.strictEqual(`${optionCategory}.${errorCategory}.${messageName}` in translations[locale][optionCategory], true);
                    });

                test(
                    `Checking whether the \`${optionCategory}.${errorCategory}.${messageName}\`-message has the expected value...`,
                    () =>
                    {
                        assert.strictEqual(translations[locale][optionCategory][`${optionCategory}.${errorCategory}.${messageName}`], messageValue);
                    });
            });
    });