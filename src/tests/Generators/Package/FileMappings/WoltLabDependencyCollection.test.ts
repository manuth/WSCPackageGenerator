import { notEqual } from "assert";
import { DependencyOverrides } from "@manuth/generator-ts-project";
import { PackageType } from "@manuth/package-json-editor";
import { WoltLabDependencyCollection } from "../../../../generators/package/FileMappings/WoltLabDependencyCollection.js";

/**
 * Registers tests for the {@link WoltLabDependencyCollection `WoltLabDependencyCollection`} class.
 */
export function WoltLabDependencyCollectionTests(): void
{
    suite(
        nameof(WoltLabDependencyCollection),
        () =>
        {
            /**
             * Provides an implementation of the {@link WoltLabDependencyCollection `WoltLabDependencyCollection`} class for testing.
             */
            class TestDependencyCollection extends WoltLabDependencyCollection
            {
                /**
                 * Initializes a new instance of the {@link TestDependencyCollection `TestDependencyCollection`} class.
                 */
                public constructor()
                {
                    super(false);
                }

                /**
                 * @inheritdoc
                 */
                public override get ESModule(): boolean
                {
                    return esModule;
                }

                /**
                 * @inheritdoc
                 */
                public override get CommonJSOverrides(): DependencyOverrides
                {
                    return super.CommonJSOverrides;
                }
            }

            let esModule: boolean;
            let collection: TestDependencyCollection;
            let compilerPackageName: string;

            suiteSetup(
                () =>
                {
                    compilerPackageName = "@manuth/woltlab-compiler";
                });

            setup(
                () =>
                {
                    esModule = true;
                    collection = new TestDependencyCollection();
                });

            suite(
                nameof(WoltLabDependencyCollection.constructor),
                () =>
                {
                    test(
                        "Checking whether all expected dependencies are present…",
                        () =>
                        {
                            collection.DevelopmentDependencies.Has(compilerPackageName);
                            collection.DevelopmentDependencies.Has("ts-node");
                        });
                });

            suite(
                nameof<TestDependencyCollection>((collection) => collection.CommonJSOverrides),
                () =>
                {
                    test(
                        `Checking whether the \`${compilerPackageName}\` version differs for \`${nameof(PackageType.CommonJS)}\` projects…`,
                        () =>
                        {
                            let version = collection.AllDependencies.Get(compilerPackageName);
                            esModule = false;
                            notEqual(collection.AllDependencies.Get(compilerPackageName), version);
                        });
                });
        });
}
