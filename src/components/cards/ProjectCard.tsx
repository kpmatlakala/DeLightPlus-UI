'use client';

import { Project } from "../../types/project";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import { Button } from "../ui/Button";

export type ProjectCardProps = {
  project: Project;
  children?: React.ReactNode;
  className?: string;
};

export function ProjectCard({ project, children, className }: ProjectCardProps) {
  const { title, description, tech, githubUrl, liveUrl, image } = project;

  const hasCustomContent = Boolean(children);

  return (
    <Card className={`project-card ${className ?? ""}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="mt-2 text-sm block">{description}</span>
        </CardDescription>
      </CardHeader>

      {/* Default or Custom Card Content */}
      {hasCustomContent ? (
        <CardContent>{children}</CardContent>
      ) : (
        <CardContent>
          <img
            src={image}
            alt={`${title} preview`}
            className="w-full h-48 object-cover rounded-md"
            loading="lazy"
          />
        </CardContent>
      )}

      {tech?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tech.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
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
