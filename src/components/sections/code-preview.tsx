import { useState } from 'react';
import { Copy, Check, Code, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface CodePreviewProps {
  preview: React.ReactNode;
  code: string;
  title?: string;
  description?: string;
  filename?: string;
}

export default function CodePreview({ 
  preview, 
  code, 
  title, 
  description,
  filename = 'example.tsx'
}: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="space-y-4">
      {(title || description) && (
        <div>
          {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
      )}
      
      <Card className="typewriter-card terminal-card">
        <Tabs defaultValue="preview" className="w-full">
          <div className="flex items-center justify-between p-4 pb-0">
            <TabsList className="grid w-fit grid-cols-2">
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Code
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {filename}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                className="h-8 w-8"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <CardContent className="p-4">
            <TabsContent value="preview" className="mt-0">
              <div className="rounded-lg border border-border bg-background p-6 min-h-[200px] flex items-center justify-center">
                {preview}
              </div>
            </TabsContent>
            
            <TabsContent value="code" className="mt-0">
              <div className="relative">
                <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
                  <code className="language-tsx text-muted-foreground dark:text-green-200">
                    {code}
                  </code>
                </pre>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}

interface ComponentShowcaseProps {
  examples: Array<{
    title: string;
    description?: string;
    preview: React.ReactNode;
    code: string;
  }>;
}

export function ComponentShowcase({ examples }: ComponentShowcaseProps) {
  return (
    <div className="space-y-8">
      {examples.map((example, index) => (
        <CodePreview
          key={index}
          title={example.title}
          description={example.description}
          preview={example.preview}
          code={example.code}
        />
      ))}
    </div>
  );
}