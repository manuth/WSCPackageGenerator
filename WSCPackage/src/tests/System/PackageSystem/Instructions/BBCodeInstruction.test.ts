import * as assert from "assert";
import { BBCode } from "../../../../System/Customization/BBCodes/BBCode";
import { BBCodeInstruction } from "../../../../System/PackageSystem/Instructions/Customization/BBCodeInstruction";

suite(
    "BBCodeInstruction",
    () =>
    {
        let locale = "en";
        let localization: { [locale: string]: string } = {};

        localization[locale] = "bar";

        let bbCode = new BBCode(
            {
                Name: "foo",
                DisplayName: localization
            });

        let bbCodeInstruction: BBCodeInstruction;

        suiteSetup(
            () =>
            {

                bbCodeInstruction = new BBCodeInstruction(
                    {
                        FileName: "test.xml",
                        BBCodes: []
                    });

                bbCodeInstruction.BBCodes.push(bbCode);
            });

        suite(
            "TranslationDirectory",
            () =>
            {
                test(
                    "Checking whether `TranslationDirectory` is set to `bbcode` if no directory is specified...",
                    () =>
                    {
                        assert.strictEqual(bbCodeInstruction.TranslationDirectory, "bbcode");
                    });
            });

        suite(
            "GetMessages()",
            () =>
            {
                let category = "wcf.editor.button";
                let translations: { [locale: string]: { [category: string]: { [key: string]: string } } };

                suiteSetup(
                    () =>
                    {
                        translations = bbCodeInstruction.GetMessages();
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
                    `Checking whether the \`${category}.${bbCode.Name}\` translation is present...`,
                    () =>
                    {
                        assert.strictEqual(`${category}.${bbCode.Name}` in translations[locale][category], true);
                    });

                test(
                    `Checking whether the translation of \`${category}.${bbCode.Name}\` is correct...`,
                    () =>
                    {
                        assert.equal(translations[locale][category][`${category}.${bbCode.Name}`], localization[locale]);
                    });
            });
    });