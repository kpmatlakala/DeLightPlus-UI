// types/project.ts
export type Project = {
    id: number;
    title: string;
    description: string;
    image?: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
};
