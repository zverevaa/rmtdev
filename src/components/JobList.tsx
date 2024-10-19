import { useActiveIdContext } from "../lib/hooks";
import { TJobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type TJobListProps = {
    jobItems: TJobItem[];
    isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: TJobListProps) {
    const { activeId } = useActiveIdContext();
    return (
        <ul className="job-list">
            {isLoading && (
                <li>
                    <Spinner />
                </li>
            )}
            {!isLoading &&
                jobItems.map((item) => (
                    <JobListItem
                        key={item.id}
                        jobItem={item}
                        isActive={item.id === activeId}
                    />
                ))}
        </ul>
    );
}

export default JobList;
