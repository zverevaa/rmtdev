import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { TPageDirection } from "../lib/types";
import { useJobItemsContext } from "../lib/hooks";

export default function PaginationControls() {
    const { currentPage, handleChangePage, totalNumberOfPages } =
        useJobItemsContext();
    return (
        <section className="pagination">
            {currentPage > 1 && (
                <PaginationButton
                    direction={"previous"}
                    onClick={() => handleChangePage("previous")}
                    currentPage={currentPage}
                />
            )}
            {currentPage < totalNumberOfPages && (
                <PaginationButton
                    direction={"next"}
                    onClick={() => handleChangePage("next")}
                    currentPage={currentPage}
                />
            )}
        </section>
    );
}

type TPaginationButtonProps = {
    onClick: () => void;
    currentPage: number;
    direction: TPageDirection;
};

function PaginationButton({
    direction,
    onClick,
    currentPage,
}: TPaginationButtonProps) {
    return (
        <button
            onClick={(e) => {
                onClick();
                e.currentTarget.blur();
            }}
            className={`pagination__button pagination__button--${direction}`}
        >
            {direction === "previous" && (
                <>
                    <ArrowLeftIcon />
                    Page {currentPage - 1}
                </>
            )}
            {direction === "next" && (
                <>
                    Page {currentPage + 1}
                    <ArrowRightIcon />
                </>
            )}
        </button>
    );
}
