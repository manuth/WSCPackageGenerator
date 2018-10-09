import { ListenerEnvironment } from "../lib/System/Events/ListenerEnvironment";
import { EventListenerInstruction } from "../lib/System/PackageSystem/Instructions/Events/EventListenerInstruction";

const eventListenerInstruction: EventListenerInstruction = new EventListenerInstruction({
    FileName: "eventListeners.xml",
    Listeners: [
    ]
});

export = eventListenerInstruction;