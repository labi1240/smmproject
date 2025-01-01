import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { Suspense } from 'react';
import { InstagramForm } from './client';

function LoadingCard() {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-64 animate-pulse rounded bg-gray-100" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-full animate-pulse rounded bg-gray-100" />
          </div>
          <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  );
}

function InstagramCard() {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Instagram User ID Finder</CardTitle>
        <CardDescription>
          Enter an Instagram username to find their user ID
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={<div className="animate-pulse">Loading form...</div>}
        >
          <InstagramForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default function InstagramPage() {
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<LoadingCard />}>
        <InstagramCard />
      </Suspense>
    </div>
  );
}
