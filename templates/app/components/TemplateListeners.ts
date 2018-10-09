import { ListenerEnvironment } from "../lib/System/Events/ListenerEnvironment";
import { TemplateListenerInstruction } from "../lib/System/PackageSystem/Instructions/Events/TemplateListenerInstruction";

const templateListenerInstruction: TemplateListenerInstruction = new TemplateListenerInstruction({
    FileName: "templateListeners.xml",
    Listeners: [
    ]
});

export = templateListenerInstruction;