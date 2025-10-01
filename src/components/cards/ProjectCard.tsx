import React, { ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import { Button } from "../ui/Button";

type ProjectCardProps = {
  title: string;
  description: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  children: ReactNode;
  className?: string;
};

export function ProjectCard({
  title,
  description,
  tags = [],
  githubUrl,
  liveUrl,
  children,
  className,
}: ProjectCardProps) {
  return (
    <Card className={`project-card ${className ?? ""}`}>
      {/* Header with title, description and tags */}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="mt-2 text-sm">{description}</p>
        </CardDescription>
      </CardHeader>

      {/* Content area for custom UI */}
      <CardContent>{children}</CardContent>

      {/* Optional footer with buttons */}
      {(githubUrl || liveUrl) && (
        <div className="p-6 pt-0 flex justify-between">
          {githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                Code
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button size="sm" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
