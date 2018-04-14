import * as Path from "path";
import Package from "./lib/Package";
import Instruction from "./lib/Instruction";

function getComponentsPath(value: string): string
{
    return Path.join(__dirname, "components", value);
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
                    break;
                case "acpOptions":
                    optionName = "Options";
                    break;
                case "eventListener":
                    optionName = "EventListeners";
                    break;
                case "translations":
                    optionName = "Translations";
                    break;
                case "style":
                    optionName = "StylesRoot";
                    break;
                case "template":
                    optionName = "TemplateMappings";
                    break;
                case "acpTemplate":
                    optionName = "ACPTemplateMappings";
                    break;
                case "templateListener":
                    optionName = "TemplateListeners";
                    break;
                case "emoji":
                    optionName = "Emojis";
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

            items.push(optionName + ": " + formatter(componentPaths[component]));
        }
    %>
        <%- items.join(`,
        `) %>
    })
});

export = pkg;