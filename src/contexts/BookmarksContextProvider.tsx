import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { TJobItemExpanded } from "../lib/types";

type TBookmarksContext = {
    bookmarkedIds: number[];
    handleToggleBookmark: (id: number) => void;
    bookmarkedJobItems: TJobItemExpanded[];
    isLoading: boolean;
};

export const BookmarksContext = createContext<TBookmarksContext | null>(null);

export default function BookmarksContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
        "bookmarkedIds",
        []
    );

    const { jobItems: bookmarkedJobItems, isLoading } =
        useJobItems(bookmarkedIds);

    const handleToggleBookmark = (id: number) => {
        if (bookmarkedIds.includes(id)) {
            setBookmarkedIds((prev) => prev.filter((item) => item != id));
        } else {
            setBookmarkedIds((prev) => [...prev, id]);
        }
    };

    return (
        <BookmarksContext.Provider
            value={{
                bookmarkedIds,
                handleToggleBookmark,
                bookmarkedJobItems,
                isLoading,
            }}
        >
            {children}
        </BookmarksContext.Provider>
    );
}
