import * as FileSystem from "fs";
import * as ColorNames from "colornames";
import Component from "../../PackageSystem/Component";
import * as Hex2RgbaMethod from "hex-to-rgba";
import Hex2RgbaModule from "hex-to-rgba";
import IStyleOptions from "./IStyleOptions";
import * as OS from "os";
import * as Path from "path";
import StyleInstruction from "./StyleInstruction";
import ImageFolderDescriptor from "./ImageFolderDescriptor";
import { isNullOrUndefined } from "util";
import { parse } from "sass-variable-parser";
import IStyle from "./IStyle";
const Hex2Rgba: typeof Hex2RgbaModule = Hex2RgbaMethod as any;

/**
 * Represents a style for WoltLab Suite Core.
 */
export default class Style extends Component implements IStyle
{
    /**
     * The instruction this style belongs to.
     */
    private instruction: StyleInstruction = null;

    /**
     * The filename of the thumbnail of the style.
     */
    private thumbnail: string = null;

    /**
     * The filename of the high-resolution version of the thumbnanil of the style.
     */
    private highResThumbnail: string = null;

    /**
     * The default cover-photo for user-profiles.
     */
    private coverPhoto: string = null;

    /**
     * The root of the images provided by this style.
     */
    private images: ImageFolderDescriptor = null;

    /**
     * The variables of the style.
     */
    private variables: object = { };

    /**
     * The scss-code provided by this style.
     */
    private customScss: string = null;

    /**
     * The scss-code provided by this style that is used
     * for overwriting variables originally provided by WoltLab Suite Core.
     */
    private overrideScss: string = null;

    /**
     * Initializes a new instance of the `Style` class.
     */
    public constructor(options: IStyleOptions)
    {
        super(options);

        if (!isNullOrUndefined(options.Thumbnail))
        {
            this.thumbnail = options.Thumbnail;
        }

        if (!isNullOrUndefined(options.HighResThumbnail))
        {
            this.highResThumbnail = options.HighResThumbnail;
        }

        if (!isNullOrUndefined(options.CoverPhoto))
        {
            this.coverPhoto = options.CoverPhoto;
        }

        if (!isNullOrUndefined(options.ImagesRoot))
        {
            this.images = options.ImagesRoot;
        }
        
        if (!isNullOrUndefined(options.VariableFile))
        {
            this.variables = require(Path.join(process.cwd(), options.VariableFile));
        }

        if (!isNullOrUndefined(options.CustomScssFile))
        {
            this.customScss = FileSystem.readFileSync(options.CustomScssFile).toString();
        }

        if (!isNullOrUndefined(options.OverrideScssFile))
        {
            this.ParseOverrides(options.OverrideScssFile);
        }
    }

    public get Instruction(): StyleInstruction
    {
        return this.instruction;
    }

    public set Instruction(value: StyleInstruction)
    {
        this.instruction = value;
    }

    public get Thumbnail(): string
    {
        return this.thumbnail;
    }

    public set Thumbnail(value: string)
    {
        this.thumbnail = value;
    }

    public get HighResThumbnail(): string
    {
        return this.highResThumbnail;
    }

    public set HighResThumbnail(value: string)
    {
        this.highResThumbnail = value;
    }

    public get CoverPhoto(): string
    {
        return this.coverPhoto;
    }

    public set CoverPhoto(value: string)
    {
        this.coverPhoto = value;
    }

    public get Images(): ImageFolderDescriptor
    {
        return this.images;
    }

    public set Images(value: ImageFolderDescriptor)
    {
        this.images = value;
    }

    public get Variables(): object
    {
        return this.variables;
    }

    public set Variables(value: object)
    {
        this.variables = value;
    }

    public get CustomScss(): string
    {
        return this.customScss;
    }

    public set CustomScss(value: string)
    {
        this.customScss = value;
    }

    public get OverrideScss(): string
    {
        return this.overrideScss;
    }

    public set OverrideScss(value: string)
    {
        this.overrideScss = value;
    }

    /**
     * Parses an overrides-file.
     * 
     * @param fileName
     * The name of the overrides-file.
     */
    protected ParseOverrides(fileName: string)
    {
        let variables: { [name: string]: string } = parse(
            FileSystem.readFileSync(fileName).toString(),
            {
                camelCase: false,
                cwd: Path.dirname(fileName)
            });
        
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
                    if (/#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})/.test(variables[name]))
                    {
                        this.Variables[name] = Hex2Rgba(variables[name]);
                    }
                    else if (ColorNames.get.css(variables[name]))
                    {
                        this.Variables[name] = Hex2Rgba(ColorNames.get.css(variables[name]).value);
                    }
                    else if (variables[name] === "transparent")
                    {
                        this.Variables[name] = Hex2Rgba("#0000");
                    }
                    else
                    {
                        this.Variables[name] = variables[name];
                    }
                    break;
                
                case "messageSidebarOrientation":
                case "wcfFontLineHeight":
                    this.OverrideScss += OS.EOL + `$${name}: ${variables[name]}`;
                    break;
            }
        }
    }
}