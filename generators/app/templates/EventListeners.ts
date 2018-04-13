import EventListener from "../lib/EventListener";
import WSCEnvironment from "../lib/WSCEnvironment";<%
if ("acpOptions" in components)
{
    %>import * as options from "./Options";<%
}%>

let eventListeners: EventListener[] = [
];

export = eventListeners;