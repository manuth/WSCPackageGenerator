import * as assert from "assert";
import { BBCode } from "../../../../System/Customization/BBCodes/BBCode";
import { BBCodeInstruction } from "../../../../System/PackageSystem/Instructions/Customization/BBCodeInstruction";

suite(
    "BBCodeInstruction",
    () =>
    {
        let locale: string = "en";
        let localization: { [locale: string]: string } = {};

        localization[locale] = "bar";

        let bbcode: BBCode = new BBCode(
            {
                Name: "foo",
                DisplayName: localization
            });

        let bbcodeInstruction: BBCodeInstruction;

        suiteSetup(
            () =>
            {

                bbcodeInstruction = new BBCodeInstruction(
                    {
                        FileName: "test.xml",
                        BBCodes: []
                    });

                bbcodeInstruction.BBCodes.push(bbcode);
            });

        suite(
            "TranslationDirectory",
            () =>
            {
                test(
                    "Checking whether `TranslationDirectory` is set to `bbcode` if no directory is specified...",
                    () =>
                    {
                        assert.strictEqual(bbcodeInstruction.TranslationDirectory, "bbcode");
                    });
            });

        suite(
            "GetMessages()",
            () =>
            {
                let category: string = "wcf.editor.button";
                let translations: { [locale: string]: { [category: string]: { [key: string]: string } } };

                suiteSetup(
                    () =>
                    {
                        translations = bbcodeInstruction.GetMessages();
                    });

                test(
                    "Checking whether an entry for the locale of the translations are present...",
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
                    `Checking whether the \`${category}.${bbcode.Name}\` translation is present...`,
                    () =>
                    {
                        assert.strictEqual(`${category}.${bbcode.Name}` in translations[locale][category], true);
                    });

                test(
                    `Checking whether the translation of \`${category}.${bbcode.Name}\` is correct...`,
                    () =>
                    {
                        assert.equal(translations[locale][category][`${category}.${bbcode.Name}`], localization[locale]);
                    });
            });
    });