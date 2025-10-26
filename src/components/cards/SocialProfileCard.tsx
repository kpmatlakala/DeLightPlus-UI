import {
    Github,
    Linkedin,
    Twitter,
    Mail,
    Globe,
} from "lucide-react";
import { Button } from "../ui/button";

export interface SocialProfileCardProps {
    name: string;
    username?: string;
    avatarUrl?: string;
    bio?: string;

    githubUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    email?: string;
    websiteUrl?: string;
}

export default function SocialProfileCard({
    name,
    username,
    avatarUrl,
    bio,
    githubUrl,
    linkedinUrl,
    twitterUrl,
    email,
    websiteUrl,
}: SocialProfileCardProps) {
    return (
        <div className="bg-card border rounded-lg shadow-lg p-6 max-w-sm mx-auto text-center text-foreground">
            {/* Avatar */}
            {avatarUrl && (
                <div className="mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 mb-4">
                    <img
                        src={avatarUrl}
                        alt={name}
                        className="w-full h-full object-cover object-top"
                    />
                </div>
            )}

            {/* Name */}
            <h3 className="text-lg font-semibold">{name}</h3>
            {username && <p className="text-sm text-muted-foreground">@{username}</p>}
            {bio && <p className="mt-2 text-sm text-muted-foreground">{bio}</p>}

            {/* Social Buttons */}
            <div className="mt-5 flex flex-wrap justify-center gap-2">
                {githubUrl && (
                    <Button asChild variant="outline" size="sm">
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                        </a>
                    </Button>
                )}

                {linkedinUrl && (
                    <Button asChild variant="outline" size="sm">
                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4 mr-2" />
                            LinkedIn
                        </a>
                    </Button>
                )}

                {twitterUrl && (
                    <Button asChild variant="outline" size="sm">
                        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                            <Twitter className="w-4 h-4 mr-2" />
                            Twitter
                        </a>
                    </Button>
                )}

                {email && (
                    <Button asChild variant="outline" size="sm">
                        <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                        </a>
                    </Button>
                )}

                {websiteUrl && (
                    <Button asChild variant="outline" size="sm">
                        <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                            <Globe className="w-4 h-4 mr-2" />
                            Website
                        </a>
                    </Button>
                )}
            </div>
        </div>
    );
}

/*
Social Profile Card - Usageexample:

<SocialProfileCard
  name="KP Matlakala"
  username="kpmatlakala"
  avatarUrl="/lovable-uploads/c038adea-9318-4e4b-b87b-aca85483cc45.png"
  bio="Full Stack Developer. Building beautiful things with code."
  githubUrl="https://github.com/kpmatlakala"
  linkedinUrl="https://linkedin.com/in/kpmatlakala"
  twitterUrl="https://twitter.com/kpmatlakala"
  websiteUrl="https://kpm.dev"
/>
*/

