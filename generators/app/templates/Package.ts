import * as Path from "path";
import Package from "./lib/Package";
import Instruction from "./lib/Instruction";

function getComponentsPath(value: string): string
{
    return Path.join(__dirname, "<%= componentsPath %>", value);
}

let pkg: Package = new Package({
    Identifier: "<%= identifier %>",
    Name: {
        en: "<%= name %>"
    },
    Date: new Date("<% let date = new Date(); %><%=
        date.getFullYear() + "/" +
        (date.getMonth() + 1).toString().padStart(2, "0") + "/" +
        date.getDate().toString().padStart(2, "0") %>"),
    Description: {
        en: "<%= description %>"
    },
    InstallInstruction: new Instruction({<%
        let items = [];

        for (let component of components)
        {
            let value = "";
            let optionName = "";
            let item = "";
            let formatter = (value) =>
            {
                return value;
            }

            switch (component)
            {
                case "files":
                    optionName = "Files";
                    value = filesConfig;
                    break;
                case "acpOptions":
                    optionName = "Options";
                    value = optionsFile;
                    break;
                case "eventListener":
                    optionName = "EventListeners";
                    value = eventListenersFile;
                    break;
                case "translations":
                    optionName = "Translations";
                    value = translationsFile;
                    break;
                case "style":
                    optionName = "StylesRoot";
                    value = stylePath;
                    break;
                case "template":
                    optionName = "TemplateMappings";
                    value = templateConfig;
                    break;
                case "acpTemplate":
                    optionName = "ACPTemplateMappings";
                    value = acpTemplateConfig;
                    break;
                case "templateListener":
                    optionName = "TemplateListeners";
                    value = templateListenerFile;
                    break;
                case "emoji":
                    optionName = "Emojis";
                    value = emojiFile;
                    break;
            }

            switch (component)
            {
                case "style":
                    formatter = (value) =>
                    {
                        return "Path.join(__dirname, \"" + value + "\")";
                    }
                    break;
                default:
                    formatter = (value) =>
                    {
                        return "getComponentsPath(\"" + value + "\")";
                    }
                    break;
            }

            items.push(optionName + ": " + formatter(value));
        }
    %>
        <%- items.join(`,
        `) %>
    })
});

export = pkg;