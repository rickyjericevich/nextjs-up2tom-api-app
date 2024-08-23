import BatchFile from "./BatchFile";
import Job from "./Job";

export default interface GetBatchFilesResponse {
    files: BatchFile[];
    jobs: Job[];
}