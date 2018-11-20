import * as assert from "assert";
import { ILocalization } from "../../../../System/Globalization/ILocalization";
import { ILocalizationItemOptions } from "../../../../System/Globalization/ILocalizationItemOptions";
import { LocalizationItem } from "../../../../System/Globalization/LocalizationItem";
import { LocalizationInstruction } from "../../../../System/PackageSystem/Instructions/Globalization/LocalizationInstruction";
import { TranslationInstruction } from "../../../../System/PackageSystem/Instructions/Globalization/TranslationInstruction";

suite(
    "LocalizationInstruction",
    () =>
    {
        let locale: string;
        let category: string;
        let messageName: string;
        let messageValue: string;
        let instruction: LocalizationInstruction<LocalizationItem, ILocalizationItemOptions>;
        let translations: { [locale: string]: { [category: string]: { [key: string]: string } } };

        suiteSetup(
            () =>
            {
                let localization: ILocalization = {};

                locale = "en";
                category = "foo";
                messageName = "bar";
                messageValue = "baz";
                localization[locale] = messageValue;

                instruction = new TranslationInstruction(
                    {
                        FileName: "foo",
                        Nodes: [
                            {
                                Name: category,
                                Nodes: [
                                    {
                                        Name: messageName,
                                        Item:
                                        {
                                            Translations: localization
                                        }
                                    }
                                ]
                            }
                        ]
                    });

                translations = instruction.GetMessages();
            });

        suite(
            "GetMessages()",
            () =>
            {
                test(
                    "Checking whether an entry for the locale of the translations is present...",
                    () =>
                    {
                        assert.strictEqual(locale in translations, true);
                    });

                test(
                    "Checking whether categories are created correctly...",
                    () =>
                    {
                        assert.strictEqual(category in translations[locale], true);
                    });

                test(
                    "Checking whether keys are created correctly...",
                    () =>
                    {
                        assert.strictEqual(`${category}.${messageName}` in translations[locale][category], true);
                    });

                test(
                    "Checking whether translations are created correctly...",
                    () =>
                    {
                        assert.strictEqual(translations[locale][category][`${category}.${messageName}`], messageValue);
                    });
            });
    });