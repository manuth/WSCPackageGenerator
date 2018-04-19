import Style from "<%= basePath %>lib/Customization/Style";

let style: Style = new Style({
    Name: "<%= name  %>",
    DisplayName: {
        en: "<%= displayName %>"
    },
    Description: {
        en: "<%= description %>"
    }<%
%><% if (components.includes("customStyles")) { %><%
    %>,
    CustomScssFile: "<%= componentPaths["customStyles"] %>"<%
%><% } %><%
%><% if (components.includes("variableOverrides")) { %><%
    %>,
    OverrideScssFile: "<%= componentPaths["variableOverrides"] %>"<%
%><% } %>
});

export = style;