'use client';

import React from 'react';
import { Project } from '../../types/project';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/Card';
import { Button } from '../ui/Button';

export type ProjectCardProps = {
  project: Project;
  children?: React.ReactNode;
  className?: string;
};

export function ProjectCard({ project, children, className }: ProjectCardProps) {
  const { title, description, tech, githubUrl, liveUrl, image } = project;
  const hasCustomContent = Boolean(children);

  return (
    <Card className={`project-card flex flex-col ${className ?? ''}`}>
      {/* Header */}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <CardDescription className="mt-2 text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      {/* Content */}
      <CardContent>
        {hasCustomContent ? (
          children
        ) : (
          image && (
            <img
              src={image}
              alt={`${title} preview`}
              className="w-full h-48 object-cover rounded-md mb-4"
              loading="lazy"
            />
          )
        )}

        {/* Tech Tags */}
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
      </CardContent>

      {/* Footer / Actions */}
      {(githubUrl || liveUrl) && (
        <CardFooter className="flex justify-between gap-2 mt-auto pt-0">
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
        </CardFooter>
      )}
    </Card>
  );
}
