import * as ColorNames from "colornames";
import * as FileSystem from "fs-extra";
import hexToRgba = require("hex-to-rgba");
import * as OS from "os";
import * as Path from "path";
import { isNullOrUndefined } from "util";
import { Component } from "../../../PackageSystem/Component";
import { FileDescriptor } from "../../../PackageSystem/FileDescriptor";
import { ThemeInstruction } from "../../../PackageSystem/Instructions/Customization/Presentation/ThemeInstruction";
import { Person } from "../../../PackageSystem/Person";
import { ImageDirectoryDescriptor } from "./ImageDirectoryDescriptor";
import { IThemeOptions } from "./IThemeOptions";
import { SassVariableParser } from "./SassVariableParser";

/**
 * Represents a theme.
 */
export class Theme extends Component
{
    /**
     * The thumbnail of the theme.
     */
    private thumbnail: FileDescriptor = null;

    /**
     * The high resolution version of the thumbnail.
     */
    private highResThumbnail: FileDescriptor = null;

    /**
     * The instruction which contains this theme.
     */
    private instruction: ThemeInstruction;

    /**
     * The path to the default cover-photo for user-profiles.
     */
    private coverPhoto: FileDescriptor = null;

    /**
     * The `scss`-code of the theme.
     */
    private customSCSS: string = null;

    /**
     * The variable-overrides of special `scss`-variables.
     */
    private scssOverride: string = null;

    /**
     * The variables of the theme.
     */
    private variables: { [key: string]: string } = {};

    /**
     * The image-directory provided by the theme.
     */
    private images: ImageDirectoryDescriptor = null;

    /**
     * Initializes a new instance of the `Theme` class.
     *
     * @param instruction
     * The instruction of the theme.
     */
    public constructor(instruction: ThemeInstruction, options: IThemeOptions)
    {
        super({
            Name: options.Name,
            DisplayName: options.DisplayName,
            Version: options.Version,
            Author: options.Author,
            CreationDate: options.CreationDate,
            Description: options.Description,
            License: options.License
        });

        let variables: { [key: string]: string } = {};
        this.instruction = instruction;

        if (!isNullOrUndefined(options.Thumbnail))
        {
            this.Thumbnail = new FileDescriptor(typeof options.Thumbnail === "string" ? { Source: options.Thumbnail } : options.Thumbnail);
        }

        if (!isNullOrUndefined(options.HighResThumbnail))
        {
            this.HighResThumbnail = new FileDescriptor(typeof options.HighResThumbnail === "string" ? { Source: options.HighResThumbnail } : options.HighResThumbnail);
        }

        if (!isNullOrUndefined(options.CoverPhoto))
        {
            this.CoverPhoto = new FileDescriptor(typeof options.CoverPhoto === "string" ? { Source: options.CoverPhoto } : options.CoverPhoto);
        }

        if (!isNullOrUndefined(options.CustomScssFileName))
        {
            this.CustomScss = FileSystem.readFileSync(options.CustomScssFileName).toString();
        }

        if (!isNullOrUndefined(options.ScssOverrideFileName))
        {
            Object.assign(variables, new SassVariableParser(options.ScssOverrideFileName).Parse());
        }

        if (!isNullOrUndefined(options.VariableFileName))
        {
            Object.assign(
                variables,
                require(
                    Path.join(
                        ...(Path.isAbsolute(options.VariableFileName) ? [options.VariableFileName] : [process.cwd(), options.VariableFileName]))));
        }

        if (!isNullOrUndefined(options.Images))
        {
            this.images = new ImageDirectoryDescriptor(options.Images);
        }

        this.ParseVariables(variables);
    }

    public get Author(): Person
    {
        return super.Author ||
            ((
                !isNullOrUndefined(this.Instruction) &&
                !isNullOrUndefined(this.Instruction.Collection) &&
                !isNullOrUndefined(this.Instruction.Collection.Package)) ? this.Instruction.Collection.Package.Author : null);
    }

    /**
     * Gets or sets the thumbnail of the theme.
     */
    public get Thumbnail()
    {
        return this.thumbnail;
    }

    public set Thumbnail(value)
    {
        this.thumbnail = value;
    }

    /**
     * Gets or sets the high resolution version of the thumbnail.
     */
    public get HighResThumbnail()
    {
        return this.highResThumbnail;
    }

    public set HighResThumbnail(value)
    {
        this.highResThumbnail = value;
    }

    /**
     * Gets the instruction which contains this theme.
     */
    public get Instruction()
    {
        return this.instruction;
    }

    /**
     * Gets or sets the path to the default cover-photo for user-profiles.
     */
    public get CoverPhoto()
    {
        return this.coverPhoto;
    }

    public set CoverPhoto(value)
    {
        this.coverPhoto = value;
    }

    /**
     * Gets or sets the `scss`-code of the theme.
     */
    public get CustomScss()
    {
        return this.customSCSS;
    }

    public set CustomScss(value)
    {
        this.customSCSS = value;
    }

    /**
     * Gets or sets the variable-overrides of special `scss`-variables.
     */
    public get ScssOverride()
    {
        return this.scssOverride;
    }

    public set ScssOverride(value)
    {
        this.scssOverride = value;
    }

    /**
     * Gets the variables of the theme.
     */
    public get Variables()
    {
        return this.variables;
    }

    /**
     * Gets the image-directory of the theme.
     */
    public get Images()
    {
        return this.images;
    }

    /**
     * Parses the variables and adds them either to the override scss-code or the variables-property.
     *
     * @param variables
     * The variables to parse.
     */
    protected ParseVariables(variables: { [key: string]: string }): void
    {
        let normalVariables: { [key: string]: string } = {};
        let specialVariables: { [key: string]: string } = {};

        for (let name in variables)
        {
            switch (name)
            {
                case "wcfLayoutMinWidth":
                case "wcfLayoutMaxWidth":
                case "pageLogo":
                case "pageLogoWidth":
                case "pageLogoHeight":
                case "pageLogoMobile":
                case "wcfFontSizeDefault":
                case "wcfFontSizeSmall":
                case "wcfFontSizeHeadline":
                case "wcfFontSizeSection":
                case "wcfFontSizeTitle":
                case "useGoogleFont":
                case "wcfFontFamilyGoogle":
                case "wcfFontFamilyFallback":

                case "wcfHeaderBackground":
                case "wcfHeaderText":
                case "wcfHeaderLink":
                case "wcfHeaderLinkActive":

                case "wcfHeaderSearchBoxBackground":
                case "wcfHeaderSearchBoxText":
                case "wcfHeaderSearchBoxPlaceholder":
                case "wcfHeaderSearchBoxPlaceholderActive":
                case "wcfHeaderSearchBoxBackgroundActive":
                case "wcfHeaderSearchBoxTextActive":
                case "wcfHeaderMenuBackground":
                case "wcfHeaderMenuLinkBackground":
                case "wcfHeaderMenuLinkBackgroundActive":
                case "wcfHeaderMenuLink":
                case "wcfHeaderMenuLinkActive":

                case "wcfHeaderMenuDropdownBackground":
                case "wcfHeaderMenuDropdownLink":
                case "wcfHeaderMenuDropdownBackgroundActive":
                case "wcfHeaderMenuDropdownLinkActive":

                case "wcfNavigationBackground":
                case "wcfNavigationText":
                case "wcfNavigationLink":
                case "wcfNavigationLinkActive":

                case "wcfSidebarBackground":
                case "wcfSidebarText":
                case "wcfSidebarLink":
                case "wcfSidebarLinkActive":

                case "wcfSidebarDimmedText":
                case "wcfSidebarDimmedLink":
                case "$wcfSidebarDimmedLinkActive":

                case "wcfSidebarHeadlineText":
                case "wcfSidebarHeadlineLink":
                case "wcfSidebarHeadlineLinkActive":

                case "wcfContentBackground":
                case "wcfContentBorder":
                case "wcfContentBorderInner":
                case "wcfContentText":
                case "wcfContentLink":
                case "wcfContentLinkActive":

                case "wcfContentContainerBackground":
                case "wcfContentContainerBorder":

                case "wcfContentDimmedText":
                case "wcfContentDimmedLink":
                case "wcfContentDimmedLinkActive":

                case "wcfContentHeadlineBorder":
                case "wcfContentHeadlineText":
                case "wcfContentHeadlineLink":
                case "wcfContentHeadlineLinkActive":

                case "wcfTabularBoxBorderInner":
                case "wcfTabularBoxHeadline":
                case "wcfTabularBoxBackgroundActive":
                case "wcfTabularBoxHeadlineActive":

                case "wcfInputLabel":
                case "wcfInputBackground":
                case "wcfInputBorder":
                case "wcfInputText":
                case "wcfInputPlaceholder":
                case "wcfInputPlaceholderActive":
                case "wcfInputBackgroundActive":
                case "wcfInputBorderActive":
                case "wcfInputTextActive":

                case "wcfInputDisabledBackground":
                case "wcfInputDisabledBorder":
                case "wcfInputDisabledText":

                case "wcfButtonBackground":
                case "wcfButtonText":
                case "wcfButtonBackgroundActive":
                case "wcfButtonTextActive":

                case "wcfButtonPrimaryBackground":
                case "wcfButtonPrimaryText":
                case "wcfButtonPrimaryBackgroundActive":
                case "wcfButtonPrimaryTextActive":

                case "wcfButtonDisabledBackground":
                case "wcfButtonDisabledText":

                case "wcfEditorButtonBackground":
                case "wcfEditorButtonBackgroundActive":
                case "wcfEditorButtonText":
                case "wcfEditorButtonTextActive":
                case "wcfEditorButtonTextDisabled":

                case "wcfDropdownBackground":
                case "wcfDropdownBorderInner":
                case "wcfDropdownText":
                case "wcfDropdownLink":
                case "wcfDropdownBackgroundActive":
                case "wcfDropdownLinkActive":

                case "wcfStatusInfoBackground":
                case "wcfStatusInfoBorder":
                case "wcfStatusInfoText":
                case "wcfStatusInfoLink":
                case "wcfStatusInfoLinkActive":

                case "wcfStatusSuccessBackground":
                case "wcfStatusSuccessBorder":
                case "wcfStatusSuccessText":
                case "wcfStatusSuccessLink":
                case "wcfStatusSuccessLinkActive":

                case "wcfStatusWarningBackground":
                case "wcfStatusWarningBorder":
                case "wcfStatusWarningText":
                case "wcfStatusWarningLink":
                case "wcfStatusWarningLinkActive":

                case "wcfStatusErrorBackground":
                case "wcfStatusErrorBorder":
                case "wcfStatusErrorText":
                case "wcfStatusErrorLink":
                case "wcfStatusErrorLinkActive":

                case "wcfFooterBoxBackground":
                case "wcfFooterBoxText":
                case "wcfFooterBoxLink":
                case "wcfFooterBoxLinkActive":

                case "wcfFooterBoxHeadlineText":
                case "wcfFooterBoxHeadlineLink":
                case "wcfFooterBoxHeadlineLinkActive":

                case "wcfFooterBackground":
                case "wcfFooterText":
                case "wcfFooterLink":
                case "wcfFooterLinkActive":

                case "wcfFooterHeadlineText":
                case "wcfFooterHeadlineLink":
                case "wcfFooterHeadlineLinkActive":

                case "wcfFooterCopyrightBackground":
                case "wcfFooterCopyrightText":
                case "wcfFooterCopyrightLink":
                case "wcfFooterCopyrightLinkActive":
                    if (/#(([0-9a-fA-F]{3}){1,2}|([0-9a-fA-F]{4}){1,2})/.test(variables[name]))
                    {
                        normalVariables[name] = hexToRgba(variables[name]);
                    }
                    else if (ColorNames.get.css(variables[name]))
                    {
                        normalVariables[name] = hexToRgba(ColorNames.get.css(variables[name]).value);
                    }
                    else if (variables[name] === "transparent")
                    {
                        normalVariables[name] = hexToRgba("#0000");
                    }
                    else
                    {
                        normalVariables[name] = variables[name];
                    }
                    break;

                default:
                    specialVariables[name] = variables[name];
                    break;
            }
        }

        this.variables = normalVariables;

        if (Object.keys(specialVariables).length > 0)
        {
            this.ScssOverride = Object.keys(specialVariables).map(
                (name: string) =>
                {
                    return `$${name}: ${specialVariables[name]};`;
                }).join(OS.EOL);
        }
    }
}