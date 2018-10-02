import * as FileSystem from "fs-extra";
import * as memFs from "mem-fs";
import * as memFsEditor from "mem-fs-editor";
import * as Path from "path";
import { BBCodesInstruction } from "../Appearance/BBCodes/BBCodesInstruction";
import { EmojisInstruction } from "../Appearance/Emojis/EmojisInstruction";
import { TemplateListenersInstruction } from "../Appearance/Presentation/TemplateListenersInstruction";
import { Theme } from "../Appearance/Themes/Theme";
import { ThemeInstruction } from "../Appearance/Themes/ThemeInstruction";
import { SQLInstruction } from "../Automation/Data/SQL/SQLInstruction";
import { Instruction } from "../Automation/Instruction";
import { InstructionCollection } from "../Automation/InstructionCollection";
import { Compiler } from "../Core/Compiler";
import { CronjobInstruction } from "../Core/Cronjobs/CronjobInstruction";
import { FilesInstruction } from "../Core/FilesInstruction";
import { EventListenersInstruction } from "../Events/EventListenersInstruction";
import { TranslationsInstruction } from "../Localization/TranslationsInstruction";
import { OptionsInstruction } from "../Options/ControlPanel/OptionsInstruction";

const MemFileSystem: memFsEditor.memFsEditor.Editor = memFsEditor.create(memFs.create());

/**
 * Provides the functionality to compile an `InstructionCollection`.
 */
export class InstructionCollectionCompiler extends Compiler<InstructionCollection<Instruction>>
{
    /**
     * The path to save compiled themes to.
     */
    private themesPath: string;

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
     * @param themesPath
     * The path to save compiled themes to.
     *
     * @param componentsPath
     * The path to save compiled components to.
     */
    public constructor(instructionCollection: InstructionCollection<Instruction>, destinationPath: string = "obj", themesPath: string = "themes", componentsPath: string = "components")
    {
        super(instructionCollection, destinationPath);
        this.themesPath = themesPath;
        this.componentsPath = componentsPath;
    }

    /**
     * Compiles the instruction-collection.
     */
    protected async Compile(): Promise<void>
    {
        for (let instruction of this.Item)
        {
            if (instruction instanceof FilesInstruction)
            {
                let filesGenerator: memFsEditor.memFsEditor.Editor = memFsEditor.create(memFs.create());
                filesGenerator.copyTpl(instruction.SourceRoot, this.MakeTempPath(instruction.SourceRoot), instruction.Package);

                await new Promise((resolve: (value?: {} | PromiseLike<{}>) => void): void =>
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
            else if (instruction instanceof ThemeInstruction)
            {
                let theme: Theme = instruction.Theme;
                let themeGenerator: memFsEditor.memFsEditor.Editor = memFsEditor.create(memFs.create());

                themeGenerator.copyTpl(
                    this.MakeTemplatePath("theme", "theme.xml"),
                    this.MakeThemesTempPath(instruction.Theme.Name, "theme.xml"),
                    { Instruction: instruction });
                themeGenerator.copyTpl(
                    this.MakeTemplatePath("theme", "variables.xml"),
                    this.MakeThemesTempPath(theme.Name, "variables.xml"),
                    { Instruction: instruction });

                if (theme.Thumbnail)
                {
                    themeGenerator.copy(
                        Path.join(instruction.SourceRoot, theme.Thumbnail),
                        this.MakeThemesTempPath(theme.Name, theme.Thumbnail));
                }

                if (theme.HighResThumbnail)
                {
                    themeGenerator.copy(
                        Path.join(instruction.SourceRoot, theme.HighResThumbnail),
                        this.MakeThemesTempPath(theme.Name, theme.HighResThumbnail));
                }

                if (theme.CoverPhoto)
                {
                    themeGenerator.copy(
                        Path.join(instruction.SourceRoot, theme.CoverPhoto),
                        this.MakeThemesTempPath(theme.Name, theme.CoverPhoto));
                }

                await new Promise((resolve: (value?: {} | PromiseLike<{}>) => void): void =>
                {
                    themeGenerator.commit([], () =>
                    {
                        resolve();
                    });
                });

                if (theme.Images)
                {
                    let imagesGenerator: memFsEditor.memFsEditor.Editor = memFsEditor.create(memFs.create());
                    imagesGenerator.copyTpl(Path.join(instruction.SourceRoot, theme.Images.SourceRoot), this.MakeTempPath(theme.Name, "images"), instruction.Package);

                    await new Promise((resolve: (value?: {} | PromiseLike<{}>) => void): void =>
                    {
                        imagesGenerator.commit([], () =>
                        {
                            resolve();
                        });
                    });

                    this.Compress(this.MakeTempPath(theme.Name, "images"), this.MakeThemesTempPath(theme.Name, theme.Images.FileName));
                    await FileSystem.remove(this.MakeTempPath(theme.Name, "images"));
                }

                await this.Compress(this.MakeThemesTempPath(theme.Name), this.MakeThemesPath(instruction.FileName));
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
                MemFileSystem.copyTpl(this.MakeTemplatePath("bbCodes.xml"), this.MakeComponentsPath(instruction.FileName), { Instruction: instruction });
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
            else if (instruction instanceof CronjobInstruction)
            {
                MemFileSystem.copyTpl(this.MakeTemplatePath("cronJobs.xml"), this.MakeComponentsPath(instruction.FileName), { Instruction: instruction });
            }
        }

        await new Promise((resolve: (value?: {} | PromiseLike<{}>) => void): void =>
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
     * Joins the paths and returns the path contained by the temporary themes-folder.
     *
     * @param path
     * The path that is to be joined.
     */
    protected MakeThemesTempPath(...path: string[]): string
    {
        return super.MakeDestinationPath("themes", ...path);
    }

    /**
     * Joins the paths and returns the path contained by the themes-folder.
     *
     * @param path
     * The path that is to be joined.
     */
    protected MakeThemesPath(...path: string[]): string
    {
        return this.MakeDestinationPath(this.themesPath, ...path);
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