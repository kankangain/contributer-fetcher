'use client';

import Chai4Me from '@/components/chai4me';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Home() {
  const [repoPath, setRepoPath] = useState('username/repo');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!repoPath.includes('/')) {
      alert('Please enter a valid format: owner/repo');
      return;
    }

    setIsLoading(true);

    const generatedUrl = `/api/contributors/${repoPath}`;

    // Append timestamp to force fresh fetch and bypass browser cache
    setImageUrl(`${generatedUrl}?t=${Date.now()}`);

    // Fallback timeout in case image loads instantly from Next.js server cache
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 text-zinc-50">
      <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800 text-zinc-50">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Contributor Grid</CardTitle>
          <CardDescription className="text-center text-zinc-400">
            Generate a clean, high-performance SVG/PNG grid for your GitHub README.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-8">
          <form onSubmit={handleGenerate} className="flex gap-4">
            <Input
              type="text"
              value={repoPath}
              onChange={(e) => setRepoPath(e.target.value)}
              placeholder="owner/repo"
              className="flex-1 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-white text-zinc-900 hover:bg-zinc-200 min-w-[120px]"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </Button>
          </form>

          {imageUrl && (
            <div className="flex flex-col items-center gap-4 p-6 bg-zinc-950 rounded-lg border border-zinc-800">
              <span className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Preview</span>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Contributors"
                className="max-w-full h-auto min-h-[64px]"
                onLoad={() => setIsLoading(false)}
              />

              <div className="w-full mt-4 p-4 bg-black border border-zinc-800 rounded-md overflow-x-auto">
                <code className="text-xs text-emerald-400 whitespace-nowrap">
                  [![Contributors](https://contrib.oxxyhosting.com{imageUrl.split('?')[0]})](https://github.com/{repoPath}/graphs/contributors)
                </code>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-8">
        <Chai4Me />
      </div>
    </main>
  );
}