// types/project.ts
export type Project = {
    id: number;
    title: string;
    description: string;
    tags?: string[];
    category: string;
    image: string;
    year: string;
    tech: string[];
    status: string;
    liveUrl?: string | null;
    githubUrl?: string | null;
    featured?: boolean;
};
