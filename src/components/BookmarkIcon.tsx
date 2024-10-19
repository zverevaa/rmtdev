import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";

type TBookmarkIconProps = {
    id: number;
};

export default function BookmarkIcon({ id }: TBookmarkIconProps) {
    const context = useBookmarksContext();
    const { bookmarkedIds, handleToggleBookmark } = context;

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleToggleBookmark(id);
            }}
            className="bookmark-btn"
        >
            <BookmarkFilledIcon
                className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
            />
        </button>
    );
}
