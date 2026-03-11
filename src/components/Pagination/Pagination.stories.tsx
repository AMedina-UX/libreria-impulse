import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationFirst,
    PaginationLast,
    PaginationResultPerPage,
    type PaginationSize
} from './Pagination';

const meta = {
    title: 'Componentes/Pagination',
    component: Pagination,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractivePagination = ({ size = "md", showEdges = false }: { size?: PaginationSize, showEdges?: boolean }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 25;

    // Helper to generate the pages to show
    const getVisiblePages = () => {
        let pages: (number | "ellipsis1" | "ellipsis2")[] = [];

        if (totalPages <= 7) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            if (currentPage <= 4) {
                pages = [1, 2, 3, 4, 5, "ellipsis2", totalPages];
            } else if (currentPage >= totalPages - 3) {
                pages = [1, "ellipsis1", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, "ellipsis1", currentPage - 1, currentPage, currentPage + 1, "ellipsis2", totalPages];
            }
        }
        return pages;
    };

    const visiblePages = getVisiblePages();

    // Calculate hidden pages for ellipsis dropdowns
    const getHiddenPages1 = () => {
        if (currentPage > 4) {
            const end = currentPage >= totalPages - 3 ? totalPages - 4 : currentPage - 1;
            return Array.from({ length: end - 2 }, (_, i) => i + 2);
        }
        return [];
    };

    const getHiddenPages2 = () => {
        if (currentPage < totalPages - 3) {
            const start = currentPage <= 4 ? 5 : currentPage + 1;
            return Array.from({ length: totalPages - start - 1 }, (_, i) => i + start + 1);
        }
        return [];
    };

    const handlePageChange = (p: number) => {
        if (p >= 1 && p <= totalPages) setCurrentPage(p);
    };

    return (
        <Pagination>
            <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4">
                <PaginationContent>
                    {showEdges && (
                        <PaginationItem>
                            <PaginationFirst
                                size={size}
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(1)}
                            />
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationPrevious
                            size={size}
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        />
                    </PaginationItem>

                    {visiblePages.map((p) => {
                        if (p === "ellipsis1") {
                            return (
                                <PaginationItem key="e1">
                                    <PaginationEllipsis
                                        size={size}
                                        hiddenPages={getHiddenPages1()}
                                        onPageSelect={handlePageChange}
                                    />
                                </PaginationItem>
                            );
                        }
                        if (p === "ellipsis2") {
                            return (
                                <PaginationItem key="e2">
                                    <PaginationEllipsis
                                        size={size}
                                        hiddenPages={getHiddenPages2()}
                                        onPageSelect={handlePageChange}
                                    />
                                </PaginationItem>
                            );
                        }
                        return (
                            <PaginationItem key={p}>
                                <PaginationLink
                                    size={size}
                                    isActive={currentPage === p}
                                    onClick={() => handlePageChange(p as number)}
                                >
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    <PaginationItem>
                        <PaginationNext
                            size={size}
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        />
                    </PaginationItem>
                    {showEdges && (
                        <PaginationItem>
                            <PaginationLast
                                size={size}
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(totalPages)}
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-light text-impulse-neutro-900 dark:text-impulse-neutro-100">Result per page</span>
                    <PaginationResultPerPage value="50" size={size} />
                </div>
            </div>
        </Pagination>
    );
};

export const Default: Story = {
    render: () => <InteractivePagination />
};

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-8 w-full items-start">
            <InteractivePagination size="sm" />
            <InteractivePagination size="md" />
            <InteractivePagination size="lg" />
        </div>
    ),
};

export const FirstAndLast: Story = {
    render: () => <InteractivePagination showEdges={true} />
};
