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
                            <?xml version="1.0" encoding="UTF-8"?><foo>
                                <bar><baz>this
                            is
                            a
                            test for the indentation of the XML-formatter
                            Let's see it it works :')</baz></bar></foo>`);

                        let output: string = dedent(`
                            <?xml version="1.0" encoding="UTF-8"?>
                            <foo>
                                <bar>
                                    <baz>this
                            is
                            a
                            test for the indentation of the XML-formatter
                            Let's see it it works :')</baz>
                                </bar>
                            </foo>`);

                        assert.strictEqual(XML.Format(input), output);
                    });
            });
    });