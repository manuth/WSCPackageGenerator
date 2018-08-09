import IPackageOptions from "./IPackageOptions";
import IComponent from "./IComponent";

/**
 * Represents a package for WoltLab Suite Core.
 */
export default interface IPackage extends IComponent, Required<IPackageOptions>
{
}