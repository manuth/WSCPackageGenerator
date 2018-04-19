import * as Path from "path";
import Package from "./lib/Package";
import StyleInstructionCollection from "./lib/Customization/StyleInstructionCollection";
import UpdateInstructionCollection from "./lib/Automation/UpdateInstructionCollection";

function getComponentsPath(value: string): string
{
    return Path.join(__dirname, "components", value);
}

let pkg: Package = new Package({
    Identifier: "<%= identifier %>",
    Name: "<%= name %>",
    DisplayName: {
        en: "<%= displayName %>"
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
                case "style":
                    formatter = (value) =>
                    {
                        return "...new StyleInstructionCollection(\"" + value + "\")";
                    }
                    break;
                default:
                    formatter = (value) =>
                    {
                        return "require(getComponentsPath(\"" + value + "\"))";
                    }
                    break;
            }

            items.push(formatter(componentPaths[component]));
        }
    %>
        <%- items.join(`,
        `) %>
    })
});

export = pkg;