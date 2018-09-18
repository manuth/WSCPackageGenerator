import { Localizable } from "../../../Globalization/Localizable";
import { LocalizationNode } from "../../../Globalization/LocalizationNode";
import { INodeSystemInstructionOptions } from "../INodeSystemInstructionOptions";
import { NodeSystemInstruction } from "../NodeSystemInstruction";
import { ILocalizationInstruction } from "./ILocalizationInstruction";

export abstract class LocalizationInstruction<T extends LocalizationNode, TOptions> extends NodeSystemInstruction<T, TOptions> implements ILocalizationInstruction
{
    /**
     * Initializes a new instance of the `TranslationInstruction<T>` class.
     *
     * @param options
     * The options for generating the object.
     *
     * @param generator
     * The generator-function for generating sub-nodes.
     */
    public constructor(options: INodeSystemInstructionOptions<TOptions>, generator: (options: TOptions) => T)
    {
        super(options, generator);
    }

    public get Type(): string
    {
        return "language";
    }

    public GetMessages(): { [category: string]: { [key: string]: Localizable } }
    {
        let result: { [category: string]: { [key: string]: Localizable } } = {};

        for (let node of this.Nodes)
        {
            result[node.FullName] = node.GetTranslations();
        }

        return result;
    }
}