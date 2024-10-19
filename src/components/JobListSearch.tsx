import JobList from "./JobList";
import { useJobItemsContext } from "../lib/hooks";

export default function JobListSearch() {
    const { jobItemsSliced, isLoading } = useJobItemsContext();
    return (
        <>
            <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
        </>
    );
}
