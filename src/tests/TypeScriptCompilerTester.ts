import { GeneratorOptions, IFileMapping, IGenerator, IGeneratorSettings } from "@manuth/extended-yo-generator";
import { ICompilationResult, TypeScriptFileMappingTester } from "@manuth/generator-ts-project-test";

/**
 * Provides the functionality to both compile and test typescript file mappings.
 */
export class TypeScriptCompilerTester<TGenerator extends IGenerator<TSettings, TOptions>, TSettings extends IGeneratorSettings, TOptions extends GeneratorOptions, TFileMapping extends IFileMapping<TSettings, TOptions>> extends TypeScriptFileMappingTester<TGenerator, TSettings, TOptions, TFileMapping>
{
    /**
     * @inheritdoc
     *
     * @param esModule
     * A value indicating whether the underlying file should be compiled as an ESModule.
     *
     * @returns
     * An object containing information about the compilation.
     */
    public override Compile(esModule: boolean): Promise<ICompilationResult>
    {
        return super.Compile(esModule);
    }
}
