import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { TJobItem, TPageDirection, TSortBy } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";

type TJobItemsContext = {
    jobItems: TJobItem[] | undefined;
    jobItemsSliced: TJobItem[];
    isLoading: boolean;
    totalNumberOfResults: number;
    totalNumberOfPages: number;
    currentPage: number;
    sortBy: TSortBy;
    handleChangePage: (direction: TPageDirection) => void;
    handleChangeSortBy: (newSortBy: TSortBy) => void;
};

export const JobItemsContext = createContext<TJobItemsContext | null>(null);

export default function JobItemsContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { debouncedSearchText } = useSearchTextContext();
    const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
    const [currentPage, setCurrentPage] = useState(1);
    const slicedPage = currentPage * RESULTS_PER_PAGE;
    const [sortBy, setSortBy] = useState<TSortBy>("relevant");

    const jobItemsSorted = useMemo(
        () =>
            [...(jobItems || [])]?.sort((a, b) => {
                if (sortBy === "relevant") {
                    return b.relevanceScore - a.relevanceScore;
                } else {
                    return a.daysAgo - b.daysAgo;
                }
            }),
        [jobItems, sortBy]
    );
    const jobItemsSliced = useMemo(
        () =>
            jobItemsSorted?.slice(slicedPage - RESULTS_PER_PAGE, slicedPage) ||
            [],
        [slicedPage, jobItemsSorted]
    );

    const totalNumberOfResults = jobItems?.length || 0;
    const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;

    const handleChangePage = useCallback((direction: TPageDirection) => {
        if (direction === "next") {
            setCurrentPage((prev) => prev + 1);
        } else if (direction === "previous") {
            setCurrentPage((prev) => prev - 1);
        }
    }, []);
    const handleChangeSortBy = useCallback((newSortBy: TSortBy) => {
        setCurrentPage(1);
        setSortBy(newSortBy);
    }, []);

    const contextValue = useMemo(
        () => ({
            jobItems,
            jobItemsSliced,
            isLoading,
            totalNumberOfResults,
            totalNumberOfPages,
            currentPage,
            sortBy,
            handleChangePage,
            handleChangeSortBy,
        }),
        [
            jobItems,
            jobItemsSliced,
            isLoading,
            totalNumberOfResults,
            totalNumberOfPages,
            currentPage,
            sortBy,
            handleChangePage,
            handleChangeSortBy,
        ]
    );
    return (
        <JobItemsContext.Provider value={contextValue}>
            {children}
        </JobItemsContext.Provider>
    );
}
