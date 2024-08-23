import Metadata from "./Metadata";
import Exclusions from "./Exclusions";
import Measurements from "./Measurements";

export default interface Model {
    type: "model";
    id: string;
    attributes: {
        name: string;
        description: string;
        publisher: string;
        "publish-date": string;
        metadata: Metadata;
        exclusions: Exclusions;
        measurements: Measurements;
    };
}