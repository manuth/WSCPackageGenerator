import * as ColorNames from "colornames";
import * as FileSystem from "fs-extra";
import * as Hex2RgbaMethod from "hex-to-rgba";
import Hex2RgbaModule from "hex-to-rgba";
import * as OS from "os";
import { isNullOrUndefined } from "util";
import { Component } from "../../PackageSystem/Component";
import { StyleInstruction } from "../../PackageSystem/Instructions/Customization/StyleInstruction";
import { ModuleInfo } from "../../PackageSystem/ModuleInfo";
import { ImageDirectoryDescriptor } from "./ImageDirectoryDescriptor";
import { IStyleOptions } from "./IStyleOptions";
import { SassVariableParser } from "./SassVariableParser";
const hexToRgba: typeof Hex2RgbaModule = Hex2RgbaMethod as any;

/**
 * Represents a theme.
 */
export class Style extends Component
{
    /**
     * The thumbnail of the theme.
     */
    private thumbnail: string = null;

    /**
     * The high resolution version of the thumbnail.
     */
    private highResThumbnail: string = null;

    /**
     * The instruction which contains this theme.
     */
    private instruction: StyleInstruction;

    /**
     * The path to the default cover-photo for user-profiles.
     */
    private coverPhoto: string = null;

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

    public constructor(instruction: StyleInstruction, options: IStyleOptions)
    {
        super({
            Name: options.Name,
            DisplayName: options.DisplayName,
            Version: options.Version || new ModuleInfo().Version,
            Author: options.Author,
            CreationDate: options.CreationDate,
            Description: options.Description,
            License: options.License
        });

        this.instruction = instruction;

        if (!isNullOrUndefined(options.Thumbnail))
        {
            this.Thumbnail = options.Thumbnail;
        }

        if (!isNullOrUndefined(options.HighResThumbnail))
        {
            this.HighResThumbnail = options.HighResThumbnail;
        }

        if (!isNullOrUndefined(options.CoverPhoto))
        {
            this.CoverPhoto = options.CoverPhoto;
        }

        if (!isNullOrUndefined(options.CustomScssFileName))
        {
            this.CustomScss = FileSystem.readFileSync(options.CustomScssFileName).toString();
        }

        if (!isNullOrUndefined(options.ScssOverrideFileName))
        {
            FileSystem.readFileSync(options.ScssOverrideFileName).toString();
            this.ParseOverrideFile(options.ScssOverrideFileName);
        }

        if (!isNullOrUndefined(options.VariableFileName))
        {
            Object.assign(this.Variables, require(options.VariableFileName));
        }
    }

    /**
     * Gets or sets the thumbnail of the theme.
     */
    public get Thumbnail(): string
    {
        return this.thumbnail;
    }

    public set Thumbnail(value: string)
    {
        this.thumbnail = value;
    }

    /**
     * Gets or sets the high resolution version of the thumbnail.
     */
    public get HighResThumbnail(): string
    {
        return this.highResThumbnail;
    }

    public set HighResThumbnail(value: string)
    {
        this.highResThumbnail = value;
    }

    /**
     * Gets the instruction which contains this theme.
     */
    public get Instruction(): StyleInstruction
    {
        return this.instruction;
    }

    /**
     * Gets or sets the path to the default cover-photo for user-profiles.
     */
    public get CoverPhoto(): string
    {
        return this.coverPhoto;
    }

    public set CoverPhoto(value: string)
    {
        this.coverPhoto = value;
    }

    /**
     * Gets or sets the `scss`-code of the theme.
     */
    public get CustomScss(): string
    {
        return this.customSCSS;
    }

    public set CustomScss(value: string)
    {
        this.customSCSS = value;
    }

    /**
     * Gets or sets the variable-overrides of special `scss`-variables.
     */
    public get ScssOverride(): string
    {
        return this.scssOverride;
    }

    public set ScssOverride(value: string)
    {
        this.scssOverride = value;
    }

    /**
     * Gets the variables of the theme.
     */
    public get Variables(): { [key: string]: string }
    {
        return this.variables;
    }

    public get Images(): ImageDirectoryDescriptor
    {
        return this.images;
    }

    /**
     * Parses a `.scss`-override file.
     *
     * @param fileName
     * The name of the file which contains the `scss`-overrides.
     */
    public ParseOverrideFile(fileName: string): void
    {
        let variables: { [key: string]: string } = new SassVariableParser(fileName).Variables;

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
                        this.Variables[name] = hexToRgba(variables[name]);
                    }
                    else if (ColorNames.get.css(variables[name]))
                    {
                        this.Variables[name] = hexToRgba(ColorNames.get.css(variables[name]).value);
                    }
                    else if (variables[name] === "transparent")
                    {
                        this.Variables[name] = hexToRgba("#0000");
                    }
                    else
                    {
                        this.Variables[name] = variables[name];
                    }
                    break;

                default:
                    this.ScssOverride += OS.EOL + `$${name}: ${variables[name]}`;
                    break;
            }
        }
    }
}