import * as assert from "assert";
import * as dedent from "dedent";
import { XML } from "../../../System/Serialization/XML";

suite(
    "XML",
    () =>
    {
        suite(
            "CreateDocument",
            () =>
            {
                let tag: string;
                let document: Document;

                suiteSetup(
                    () =>
                    {
                        tag = "html";
                    });

                test(
                    "Checking whether document can be created...",
                    () =>
                    {
                        document = XML.CreateDocument(tag);
                    });

                test(
                    "Checking whether the processing-instruction exists...",
                    () =>
                    {
                        assert.strictEqual(document.childNodes[0].nodeType, document.PROCESSING_INSTRUCTION_NODE);
                    });

                test(
                    "Checking whether the tag-name is correct...",
                    () =>
                    {
                        assert.strictEqual(document.documentElement.tagName, tag);
                    });
            });

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