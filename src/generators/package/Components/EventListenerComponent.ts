import { GeneratorOptions } from "@manuth/extended-yo-generator";
// eslint-disable-next-line node/no-unpublished-import
import { EventListenerInstruction } from "@manuth/woltlab-compiler";
import { ListenerComponentBase } from "../../../Components/ListenerComponentBase";
import { IWoltLabComponentOptions } from "../../../Settings/IWoltLabComponentOptions";
import { IWoltLabSettings } from "../../../Settings/IWoltLabSettings";
import { WoltLabGenerator } from "../../../WoltLabGenerator";
import { PackageComponentType } from "../Settings/PackageComponentType";

/**
 * Provides a component for generating event-listeners.
 *
 * @template TSettings
 * The type of the settings of the generator.
 *
 * @template TOptions
 * The type of the options of the generator.
 *
 * @template TComponentOptions
 * The type of the options of the component.
 */
export class EventListenerComponent<TSettings extends IWoltLabSettings, TOptions extends GeneratorOptions, TComponentOptions extends IWoltLabComponentOptions> extends ListenerComponentBase<TSettings, TOptions, TComponentOptions>
{
    /**
     * Initializes a new instance of the {@link EventListenerComponent `EventListenerComponent<TSettings, TOptions, TComponentOptions>`} class.
     *
     * @param generator
     * The generator of the component.
     */
    public constructor(generator: WoltLabGenerator<TSettings, TOptions>)
    {
        super(generator);
    }

    /**
     * @inheritdoc
     */
    public get ClassName(): string
    {
        return nameof<EventListenerInstruction>();
    }

    /**
     * @inheritdoc
     */
    public get OutputFileName(): string
    {
        return "eventListeners.xml";
    }

    /**
     * @inheritdoc
     */
    public get ID(): string
    {
        return PackageComponentType.EventListener;
    }

    /**
     * @inheritdoc
     */
    public get DisplayName(): string
    {
        return "Event-Listeners";
    }
}
