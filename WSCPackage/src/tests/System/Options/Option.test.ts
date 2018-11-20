import * as assert from "assert";
import { IOptionOptions } from "../../../System/Options/IOptionOptions";
import { Option } from "../../../System/Options/Option";
import { OptionType } from "../../../System/Options/OptionType";

suite(
    "Option",
    () =>
    {
        let option: Option;

        suiteSetup(
            () =>
            {
                option = new class extends Option
                {
                    public constructor(options: IOptionOptions)
                    {
                        super(null, options);
                    }
                }(
                    {
                        Name: "foo"
                    });
            });

        suite(
            "Type",
            () =>
            {
                test(
                    "Checking whether the option-type can be set to an `OptionType` correctly...",
                    () =>
                    {
                        let value = OptionType.TextArea;
                        option.Type = OptionType.TextArea;
                        assert.strictEqual(option.Type, value);
                    });

                test(
                    "Checking whether the option-type can be set to a string...",
                    () =>
                    {
                        let value = "foo";
                        option.Type = value;
                        assert.strictEqual(option.Type, value);
                    });
            });
    });