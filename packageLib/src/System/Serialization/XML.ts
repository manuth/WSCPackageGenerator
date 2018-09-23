import { DOMParser } from "xmldom";

/**
 * Provides utilities for the xml-serialization.
 */
export class XML
{
    /**
     * Creates a new xml-document.
     *
     * @param tagName
     * The name of the tag of the `documentElement`.
     */
    public static CreateDocument(tagName: string): Document
    {
        let result: Document = new DOMParser().parseFromString(`<${tagName} />`);
        result.insertBefore(
            result.createProcessingInstruction("xml", 'version="1.0" encoding="UTF-8"'),
            result.documentElement);

        return result;
    }

    /**
     * Beautifies xml-code.
     *
     * @param xml
     * The xml-code to beautify.
     *
     * @returns
     * Beautified xml-code.
     */
    public static Prettify(xml: string): string
    {
        let formatted: string = "";
        let pad: number = 0;
        xml = xml.replace(/(\r\n)|(\r)|(\n)|(\n\r)/, "\n");
        xml = xml.replace(/></g, ">\n<");

        for (let line of xml.split("\n"))
        {
            let indent: number = 0;
            let plainText: boolean = false;

            if (!line.match(/<(\w+)[^>]*>.*<\/\1>/))
            {
                if (line.match(/<\/\w+/))
                {
                    pad = Math.max(0, pad - 1);
                }
                else if (line.match(/<\w+[^>]*>/))
                {
                    indent = 1;
                }
            }

            if (!line.trim().startsWith("<"))
            {
                plainText = true;
            }

            formatted += `${plainText ? line : `${" ".repeat(pad * 4)}${line.trim()}`}\n`;
            pad = pad + indent;
        }

        return formatted.trim();
    }
}