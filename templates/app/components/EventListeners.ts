import { EventListenerInstruction } from "../lib/System/PackageSystem/Instructions/Events/EventListenerInstruction";
import { ListenerEnvironment } from "../lib/System/Events/ListenerEnvironment";

const eventListenerInstruction: EventListenerInstruction = new EventListenerInstruction({
    FileName: "eventListeners.xml",
    Listeners: [
    ]
});

export = eventListenerInstruction;