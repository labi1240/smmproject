'use client';

import { CopyIcon, ReloadIcon } from '@radix-ui/react-icons';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@repo/design-system/components/ui/alert';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { getInstagramUserId } from './actions';

type RecentLookup = {
  username: string;
  userId: string;
  timestamp: number;
};

type InstagramResponse = {
  userId?: string;
  error?: string;
};

function RecentLookups({ onSelect }: { onSelect: (username: string) => void }) {
  const [lookups, setLookups] = useState<RecentLookup[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('instagram-lookups');
    if (saved) {
      setLookups(JSON.parse(saved));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('instagram-lookups');
    setLookups([]);
  };

  if (lookups.length === 0) return null;

  return (
    <div className="mx-auto mt-8 max-w-md text-gray-500 text-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-medium">Recent Lookups</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="text-gray-500 hover:text-gray-700"
        >
          Clear History
        </Button>
      </div>
      <ul className="space-y-1">
        {lookups.map((lookup) => (
          <li
            key={lookup.timestamp}
            className="group flex items-center justify-between"
          >
            <button
              type="button"
              onClick={() => onSelect(lookup.username)}
              className="flex-1 text-left hover:text-gray-900"
            >
              • @{lookup.username} → {lookup.userId}
            </button>
            <span className="text-gray-400 text-xs opacity-0 group-hover:opacity-100">
              {new Date(lookup.timestamp).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InstagramForm() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recentLookups, setRecentLookups] = useState<RecentLookup[]>([]);
  const [copied, setCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus input on mount
    inputRef.current?.focus();

    // Load recent lookups from localStorage
    const saved = localStorage.getItem('instagram-lookups');
    if (saved) {
      setRecentLookups(JSON.parse(saved));
    }
  }, []);

  const { mutate, isPending, data } = useMutation({
    mutationFn: getInstagramUserId,
    onSuccess: (result: InstagramResponse) => {
      if (result.userId) {
        // Add to recent lookups
        const newLookup = {
          username,
          userId: result.userId,
          timestamp: Date.now(),
        };
        const updated = [newLookup, ...recentLookups.slice(0, 4)];
        setRecentLookups(updated);
        localStorage.setItem('instagram-lookups', JSON.stringify(updated));
      }
    },
    onError: (err: unknown) => {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setCopied(false);

    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    mutate(username);
  };

  const copyToClipboard = async (text: string) => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    } finally {
      setIsCopying(false);
    }
  };

  const handleUsernameSelect = (selectedUsername: string) => {
    setUsername(selectedUsername);
    mutate(selectedUsername);
    // Focus input after selecting a username
    inputRef.current?.focus();
  };

  return (
    <>
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Instagram Username</Label>
            <Input
              ref={inputRef}
              id="username"
              placeholder="e.g., instagram"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              disabled={isPending}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
                }
              }}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Finding ID...
              </>
            ) : (
              'Find User ID'
            )}
          </Button>
        </form>

        {data?.userId && (
          <Alert className="mt-4 bg-green-50">
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription className="mt-2">
              <div className="flex items-center gap-2">
                <code className="rounded bg-green-100 p-2 font-mono">
                  {data.userId}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(data.userId)}
                  disabled={isCopying}
                >
                  {isCopying ? (
                    <ReloadIcon className="h-4 w-4 animate-spin" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                  <span className="ml-2">{copied ? 'Copied!' : 'Copy'}</span>
                </Button>
              </div>
              <p className="mt-2 text-sm">User ID found for @{username}</p>
            </AlertDescription>
          </Alert>
        )}

        {(error || data?.error) && (
          <Alert className="mt-4 bg-red-50" variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || data?.error}</AlertDescription>
          </Alert>
        )}
      </div>
      <RecentLookups onSelect={handleUsernameSelect} />
    </>
  );
}
