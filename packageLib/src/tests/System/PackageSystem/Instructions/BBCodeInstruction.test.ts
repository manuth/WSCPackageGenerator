import * as assert from "assert";
import { BBCode } from "../../../../System/Customization/BBCodes/BBCode";
import { Localization } from "../../../../System/Globalization/Localization";
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
                let category: string;
                let translations: { [category: string]: { [key: string]: Localization } };

                suiteSetup(
                    () =>
                    {
                        category = "wcf.editor.button";
                        translations = bbcodeInstruction.GetMessages();
                    });

                test(
                    `Checking whether the \`${category}\`-category is present...`,
                    () =>
                    {
                        assert.strictEqual(category in translations, true);
                    });

                test(
                    `Checking whether the \`${category}.${bbcode.Name}\` translation is present...`,
                    () =>
                    {
                        assert.strictEqual(`${category}.${bbcode.Name}` in translations[category], true);
                    });

                test(
                    `Checking whether the translation of \`${category}.${bbcode.Name}\` is correct...`,
                    () =>
                    {
                        assert.equal(translations[category][`${category}.${bbcode.Name}`].Data[locale], localization[locale]);
                    });
            });
    });