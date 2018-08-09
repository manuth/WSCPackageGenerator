import IComponent from "./IComponent";
import IPackageOptions from "./IPackageOptions";

/**
 * Represents a package for WoltLab Suite Core.
 */
export default interface IPackage extends IComponent, Required<IPackageOptions>
{
}