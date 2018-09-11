import { Package } from "../PackageSystem/Package";

describe("WSCPackageGenerator", () =>
{
    let $package: Package;

    before(() =>
    {
        $package = new Package({
            DisplayName: { inv: "Test" },
            Identifier: "test",
            InstallSet: {
                Instructions: [
                ]
            }
        });
    });

    it("World", () =>
    {
    });
});