import { TemplateListenerInstruction } from "../lib/System/PackageSystem/Instructions/Events/TemplateListenerInstruction";
import { ListenerEnvironment } from "../lib/System/Events/ListenerEnvironment";

const templateListenerInstruction: TemplateListenerInstruction = new TemplateListenerInstruction({
    FileName: "templateListeners.xml",
    Listeners: [
    ]
});

export = templateListenerInstruction;