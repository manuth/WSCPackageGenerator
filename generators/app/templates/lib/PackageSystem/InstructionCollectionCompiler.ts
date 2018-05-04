import * as FileSystem from "fs-extra";
import * as memFs from "mem-fs";
import * as memFsEditor from "mem-fs-editor";
import * as Path from "path";
import BBCodesInstruction from "../Customization/BBCodes/BBCodesInstruction";
import Compiler from "../Compiler";
import EmojisInstruction from "../Customization/Emojis/EmojisInstruction";
import EventListenersInstruction from "../Events/EventListenersInstruction";
import FilesInstruction from "../FilesInstruction";
import Instruction from "../Automation/Instruction";
import InstructionCollection from "../Automation/InstructionCollection";
import OptionsInstruction from "../Options/ControlPanel/OptionsInstruction";
import SQLInstruction from "../Automation/Data/SQL/SQLInstruction";
import StyleInstruction from "../Customization/Styles/StyleInstruction";
import TemplateListenersInstruction from "../Customization/Presentation/TemplateListenersInstruction";
import TranslationsInstruction from "../Globalization/TranslationsInstruction";

const MemFileSystem = memFsEditor.create(memFs.create());

/**
 * Provides the functionality to compile an `InstructionCollection`.
 */
export default class InstructionCollectionCompiler extends Compiler<InstructionCollection<Instruction>>
{
    /**
     * The path to save compiled styles to.
     */
    private stylesPath: string;

    /**
     * The path to save compiled components to.
     */
    private componentsPath: string;

    /**
     * Initializes a new instance of the `InstructionCollectionCompiler`.
     * 
     * @param instructionCollection
     * The `InstructionCollection` which is to be compiled.
     * 
     * @param destinationPath
     * The path to save the compiled instructions to.
     * 
     * @param stylesPath
     * The path to save compiled styles to.
     * 
     * @param componentsPath
     * The path to save compiled components to.
     */
    public constructor(instructionCollection: InstructionCollection<Instruction>, destinationPath: string = "obj", stylesPath: string = "styles", componentsPath: string = "components")
    {
        super(instructionCollection, destinationPath);
        this.stylesPath = stylesPath;
        this.componentsPath = componentsPath;
    }

    /**
     * Compiles the instruction-collection.
     */
    protected async Compile()
    {
        for (let instruction of this.Item)
        {
            if (instruction instanceof FilesInstruction)
            {
                let filesGenerator = memFsEditor.create(memFs.create());
                filesGenerator.copyTpl(instruction.SourceRoot, this.MakeTempPath(instruction.SourceRoot), instruction.Package);

                await new Promise((resolve) =>
                {
                    filesGenerator.commit([], () => {
                        resolve();
                    });
                });

                this.Compress(this.MakeTempPath(instruction.SourceRoot), this.MakeDestinationPath(instruction.FileName));
                await FileSystem.remove(this.MakeTempPath(instruction.SourceRoot));
            }
            else if (instruction instanceof OptionsInstruction)
            {
                MemFileSystem.copyTpl(this.MakeTemplatePath("options.xml"), this.MakeComponentsPath(instruction.FileName), { Instruction: instruction });
                {
                    let locales: string[] = [];

                    for (let translationNode of instruction.TranslationNodes)
                    {
                        for (let translation of translationNode.GetTranslations())
                        {
                            for (let locale in translation.Translations)
                            {
                                if (!locales.includes(locale))
                                {
                                    locales.push(locale);
                                }
                            }
                        }
                    }

                    for (let locale of locales)
                    {
                        MemFileSystem.copyTpl(
                            this.MakeTemplatePath("language.xml"),
                            this.MakeComponentsPath(instruction.TranslationsDirectory, locale + ".xml"),
                            { Instruction: instruction, Locale: locale });
                    }
                }
            }
            else if (instruction instanceof SQLInstruction)
            {
                MemFileSystem.copyTpl(instruction.SourceRoot, this.MakeDestinationPath(instruction.FileName), { Instruction: instruction });
            }
            else if (instruction instanceof TranslationsInstruction)
            {
                let locales: string[] = [];

                for (let translationNode of instruction.TranslationNodes)
                {
                    for (let translation of translationNode.GetTranslations())
                    {
                        for (let locale in translation.Translations)
                        {
                            if (!locales.includes(locale))
                            {
                                locales.push(locale);
                            }
                        }
                    }
                }

                for (let locale of locales)
                {
                    MemFileSystem.copyTpl(
                        this.MakeTemplatePath("language.xml"),
                        this.MakeComponentsPath(instruction.FileName, locale + ".xml"),
                        { Instruction: instruction, Locale: locale });
                }
            }
            else if (instruction instanceof EventListenersInstruction)
            {
                MemFileSystem.copyTpl(this.MakeTemplatePath("eventListeners.xml"), this.MakeComponentsPath(instruction.FileName), { Instruction: instruction });
            }
            else if (instruction instanceof StyleInstruction)
            {
                let style = instruction.Style;
                let styleGenerator = memFsEditor.create(memFs.create());

                styleGenerator.copyTpl(
                    this.MakeTemplatePath("style", "style.xml"),
                    this.MakeStylesTempPath(instruction.Style.Name, "style.xml"),
                    { Instruction: instruction });
                styleGenerator.copyTpl(
                    this.MakeTemplatePath("style", "variables.xml"),
                    this.MakeStylesTempPath(style.Name, "variables.xml"),
                    { Instruction: instruction });
                
                await new Promise((resolve) =>
                {
                    styleGenerator.commit([], () =>
                    {
                        resolve();
                    });
                });

                if (style.ImagesRoot)
                {
                    let imagesGenerator = memFsEditor.create(memFs.create());
                    imagesGenerator.copyTpl(Path.join(instruction.SourceRoot, style.ImagesRoot), this.MakeStylesTempPath(style.Name, "images"), instruction.Package);

                    await new Promise((resolve) =>
                    {
                        imagesGenerator.commit([], () =>
                        {
                            resolve();
                        });
                    });

                    this.Compress(this.MakeStylesTempPath(style.Name, "images"), this.MakeStylesTempPath(style.Name, "images.tar"));
                    await FileSystem.remove(this.MakeStylesTempPath(style.Name, "images"));
                }

                await this.Compress(this.MakeStylesTempPath(style.Name), this.MakeStylesPath(instruction.FileName));
            }
            else if (instruction instanceof TemplateListenersInstruction)
            {
                MemFileSystem.copyTpl(
                    this.MakeTemplatePath("templateListeners.xml"),
                    this.MakeComponentsPath(instruction.FileName),
                    { Instruction: instruction });
            }
            else if (instruction instanceof EmojisInstruction)
            {
                MemFileSystem.copyTpl(this.MakeTemplatePath("emojis.xml"), this.MakeComponentsPath(instruction.FileName), { Instruction: instruction });
            }
            else if (instruction instanceof BBCodesInstruction)
            {
                MemFileSystem.copyTpl(this.MakeTemplatePath("bbcodes.xml"), this.MakeComponentsPath(instruction.FileName), { Instruction: instruction });
                {
                    let locales: string[] = [];

                    for (let translationNode of instruction.TranslationNodes)
                    {
                        for (let translation of translationNode.GetTranslations())
                        {
                            for (let locale in translation.Translations)
                            {
                                if (!locales.includes(locale))
                                {
                                    locales.push(locale);
                                }
                            }
                        }
                    }

                    for (let locale of locales)
                    {
                        MemFileSystem.copyTpl(
                            this.MakeTemplatePath("language.xml"),
                            this.MakeComponentsPath(instruction.TranslationsDirectory, locale + ".xml"),
                            { Instruction: instruction, Locale: locale });
                    }
                }
            }
        }

        await new Promise((resolve) =>
        {
            MemFileSystem.commit([], () =>
            {
                resolve();
            });
        });
    }

    /**
     * Joins the paths and returns the path contained by the template-folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    protected MakeDestinationPath(...path: string[]): string
    {
        return super.MakeDestinationPath("package", this.Item.Destination, ...path);
    }

    /**
     * Joins the paths and returns the path contained by the temporar styles-folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    protected MakeStylesTempPath(...path: string[]): string
    {
        return super.MakeDestinationPath("styles", ...path);
    }

    /**
     * Joins the paths and returns the path contained by the styles-folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    protected MakeStylesPath(...path: string[]): string
    {
        return this.MakeDestinationPath(this.stylesPath, ...path);
    }

    /**
     * Joins the paths and returns the path contained by the components-folder.
     * 
     * @param path
     * The path that is to be joined.
     */
    protected MakeComponentsPath(...path: string[]): string
    {
        return this.MakeDestinationPath(this.componentsPath, ...path);
    }
}