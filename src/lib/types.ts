export type TJobItem = {
    id: number;
    badgeLetters: string;
    title: string;
    company: string;
    date: string;
    relevanceScore: number;
    daysAgo: number;
};

export type TJobItemExpanded = TJobItem & {
    description: string;
    qualifications: string[];
    reviews: string[];
    duration: string;
    location: string;
    salary: string;
    coverImgURL:string;
    companyURL: string;
}

export type TSortBy = "relevant" | "recent";

export type TPageDirection = "next" | "previous";