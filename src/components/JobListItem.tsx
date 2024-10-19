import { TJobItem } from "../lib/types";
import BookmarkIcon from "./BookmarkIcon";

type TJobListItemProps = {
    jobItem: TJobItem;
    isActive: boolean;
};

export default function JobListItem({ jobItem, isActive }: TJobListItemProps) {
    const { title, company, badgeLetters, daysAgo } = jobItem;
    return (
        <li className={`job-item ${isActive ? "job-item--active" : ""}`}>
            <a href={`#${jobItem.id}`} className="job-item__link">
                <div className="job-item__badge">{badgeLetters}</div>

                <div className="job-item__middle">
                    <h3 className="third-heading">{title}</h3>
                    <p className="job-item__company">{company}</p>
                </div>

                <div className="job-item__right">
                    <BookmarkIcon id={jobItem.id} />
                    <time className="job-item__time">{daysAgo}d</time>
                </div>
            </a>
        </li>
    );
}
