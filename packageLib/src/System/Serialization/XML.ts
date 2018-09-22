/**
 * Provides utilities for the xml-serialization.
 */
export class XML
{
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
            line = line.trim();

            if (!line.match(/<(\w*)>.*<\/\1>/))
            {
                if (line.match(/<\/\w*/))
                {
                    pad = Math.max(0, pad - 1);
                }
                else if (line.match(/<(\w*)>/))
                {
                    indent = 1;
                }
            }

            if (!line.startsWith("<"))
            {
                plainText = true;
            }

            formatted += `${" ".repeat((plainText ? 0 : pad) * 4)}${line}\n`;
            pad = pad + indent;
        }

        return formatted.trim();
    }
}