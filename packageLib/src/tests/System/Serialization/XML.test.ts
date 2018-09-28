import * as assert from "assert";
import * as dedent from "dedent";
import { XML } from "../../../System/Serialization/XML";

suite(
    "XML",
    () =>
    {
        suite(
            "Format()",
            () =>
            {
                test(
                    "Checking whether `xml`-code is formatted correctly...",
                    () =>
                    {
                        let input: string = dedent(`
                            <foo>
                                <bar><baz>this
                            is
                            a
                            test</baz></bar></foo>`);

                        let output: string = dedent(`
                            <foo>
                                <bar>
                                    <baz>this
                            is
                            a
                            test</baz>
                                </bar>
                            </foo>`);

                        assert.strictEqual(XML.Format(input), output);
                    });
            });
    });