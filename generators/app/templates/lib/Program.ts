import * as ChildProcess from "child_process";
import * as FileSystem from "fs-extra";
import * as Path from "path";
import * as memFsEditor from "mem-fs-editor";
import * as memFs from "mem-fs";
import FilesInstruction from "./FilesInstruction";
import OptionsInstruction from "./ControlPanel/OptionsInstruction";
import EventListenersInstruction from "./EventListenersInstruction";
import TranslationsInstruction from "./Globalization/TranslationsInstruction";
import StyleInstruction from "./Customization/StyleInstruction";
import TemplatesInstruction from "./Customization/TemplatesInstruction";
import TemplateListenersInstruction from "./Customization/TemplateListenersInstruction";
import EmojisInstruction from "./Customization/EmojisInstruction";
const MemFileSystem = memFsEditor.create(memFs.create());

import * as WSCPackage from "../Package";

/**
 * Represents the main entry-point of the script.
 */
class Program
{
    /**
     * The destination-path.
     */
    private static destinationPath: string = "bin";

    /**
     * The temp-path.
     */
    private static tempPath: string = "obj";

    /**
     * The style-path.
     */
    private static stylesPath: string = "styles";

    /**
     * The components-path.
     */
    private static componentsPath: string = "components";
    
    /**
     * The main entry-point of the script.
     * 
     * @param args The arguments passed to the script.
     */
    public static async Main(args: string[])
    {
        await FileSystem.emptyDir(this.destinationPath);
        await FileSystem.emptyDir(this.tempPath);

        MemFileSystem.copyTpl(this.TemplatePath("package.xml"), this.PackagePath("package.xml"), { Package: WSCPackage, StylesPath: this.stylesPath, ComponentsPath: this.componentsPath });

        for (let instruction of WSCPackage.InstallInstructions)
        {
            if (instruction instanceof FilesInstruction)
            {
                let filesGenerator = memFsEditor.create(memFs.create());
                filesGenerator.copyTpl(instruction.SourceRoot, this.PackagePath(instruction.SourceRoot), WSCPackage);

                await new Promise((resolve) =>
                {
                    filesGenerator.commit([], () => {
                        resolve();
                    })
                });

                this.Compress(this.PackagePath(instruction.SourceRoot), this.PackagePath(instruction.FileName));
                await FileSystem.remove(this.PackagePath(instruction.SourceRoot));
            }
            else if (instruction instanceof OptionsInstruction)
            {
                MemFileSystem.copyTpl(this.TemplatePath("options.xml"), this.ComponentsPath(instruction.FileName), { Package: WSCPackage, Instruction: instruction });

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
                            this.TemplatePath("language.xml"),
                            this.ComponentsPath(instruction.TranslationsDirectory, locale + ".xml"),
                            { Package: WSCPackage, Instruction: instruction, Locale: locale });
                    }
                }
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
                        this.TemplatePath("language.xml"),
                        this.ComponentsPath(instruction.FileName, locale + ".xml"),
                        { Package: WSCPackage, Instruction: instruction, Locale: locale });
                }
            }
            else if (instruction instanceof EventListenersInstruction)
            {
                MemFileSystem.copyTpl(this.TemplatePath("eventListeners.xml"), this.ComponentsPath(instruction.FileName), { Package: WSCPackage, Instruction: instruction });
            }
            else if (instruction instanceof StyleInstruction)
            {
                let style = instruction.Style;
                let styleGenerator = memFsEditor.create(memFs.create());

                styleGenerator.copyTpl(
                    this.TemplatePath("style", "style.xml"),
                    this.StylesPath(instruction.Style.Name, "style.xml"),
                    { Package: WSCPackage, Instruction: instruction });
                styleGenerator.copyTpl(
                    this.TemplatePath("style", "variables.xml"),
                    this.StylesPath(instruction.Style.Name, "variables.xml"),
                    { Package: WSCPackage, Instruction: instruction });
                
                await new Promise((resolve) =>
                {
                    styleGenerator.commit([], () =>
                    {
                        resolve();
                    })
                });

                if (style.ImagesRoot)
                {
                    let imagesGenerator = memFsEditor.create(memFs.create());
                    imagesGenerator.copyTpl(Path.join(style.SourceRoot, style.ImagesRoot), this.StylesPath(instruction.Style.Name, "images"), WSCPackage);
    
                    await new Promise((resolve) =>
                    {
                        imagesGenerator.commit([], () =>
                        {
                            resolve();
                        })
                    });

                    this.Compress(this.StylesPath(instruction.Style.Name, "images"), this.StylesPath(instruction.Style.Name, "images.tar"));
                    await FileSystem.remove(this.StylesPath(instruction.Style.Name, "images"));
                }

                this.Compress(this.StylesPath(instruction.Style.Name), this.PackagePath(this.stylesPath, instruction.FileName));
            }
            else if (instruction instanceof TemplateListenersInstruction)
            {
                MemFileSystem.copyTpl(
                    this.TemplatePath("templateListeners.xml"),
                    this.ComponentsPath(instruction.FileName),
                    { Package: WSCPackage, Instruction: instruction });
            }
            else if (instruction instanceof EmojisInstruction)
            {
                MemFileSystem.copyTpl(this.TemplatePath("emojis.xml"), this.ComponentsPath(instruction.FileName), { Package: WSCPackage, Instruction: instruction });
            }
        }

        await new Promise((resolve) =>
        {
            MemFileSystem.commit([], () =>
            {
                resolve();
            })
        });

        this.Compress(this.PackagePath(), this.DestinationPath(WSCPackage.Name + ".tar"));
    }

    /**
     * Compresses a folder and saves the result to a specified file.
     * 
     * @param source
     * The folder that is to be compressed.
     * 
     * @param destination
     * The filename to save the compressed file to.
     */
    private static Compress(source: string, destination: string)
    {
        ChildProcess.execFileSync(
            "7z",
            [
                "a",
                "-up0q0",
                Path.resolve(destination),
                "*"
            ],
            {
                cwd: source
            });
    }

    /**
     * Joins the paths and returns the path inside the template-folder.
     * 
     * @param path
     * The path inside the template-folder.
     */
    private static TemplatePath(...path: string[]): string
    {
        return Path.join(__dirname, "templates", ...path);
    }

    /**
     * Joins the paths and returns the path inside the destination-folder.
     * 
     * @param path
     * The path inside the destination-folder.
     */
    private static DestinationPath(...path: string[]): string
    {
        return Path.join(this.destinationPath, ...path);
    }

    /**
     * Joins the paths and returns the path inside the temp-folder.
     * 
     * @param path
     * The path inside the temp-folder.
     */
    private static TempPath(...path: string[]): string
    {
        return Path.join(this.tempPath, ...path);
    }

    /**
     * Joins the paths and returns the path inside the package-folder.
     * 
     * @param path
     * The path inside the package-folder.
     */
    private static PackagePath(...path: string[]): string
    {
        return Path.join(this.TempPath("package"), ...path);
    }

    /**
     * Joins the paths and returns the path inside the styles-folder.
     * 
     * @param path
     * The path inside the styles-folder.
     */
    private static StylesPath(...path: string[]): string
    {
        return Path.join(this.TempPath(this.stylesPath), ...path);
    }

    /**
     * Joins the paths and returns the path inside the styles-folder.
     * 
     * @param path
     * The path inside the styles-folder.
     */
    private static ComponentsPath(...path: string[]): string
    {
        return Path.join(this.PackagePath(this.componentsPath), ...path);
    }
}

Program.Main(process.argv);