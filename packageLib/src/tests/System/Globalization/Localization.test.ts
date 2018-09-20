import * as assert from "assert";
import { Localization } from "../../../System/Globalization/Localization";

suite(
    "Localization",
    () =>
    {
        suite(
            "GetLocales()",
            () =>
            {
                let locales1: string[];
                let locales2: string[];
                let testValue: string;
                let localization1: Localization;
                let localization2: Localization;

                suiteSetup(
                    () =>
                    {
                        locales1 = ["de", "en"];
                        locales2 = ["de", "en", "it", "fr"];
                        testValue = "Test";
                        localization1 = new Localization();
                        localization2 = new Localization();

                        for (let locale of locales1)
                        {
                            localization1.Data[locale] = testValue;
                        }

                        for (let locale of locales2)
                        {
                            localization2.Data[locale] = testValue;
                        }
                    });

                test(
                    "Checking whether the locales of the `Localization` are evaluated correctly...",
                    () =>
                    {
                        assert.strictEqual(locales1.every((locale: string) => localization1.GetLocales().includes(locale)), true);
                        assert.strictEqual(locales2.every((locale: string) => localization2.GetLocales().includes(locale)), true);
                    });
            });
    });