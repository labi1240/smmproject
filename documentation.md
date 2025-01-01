# Next-Forge Documentation

## Table of Contents
- [Overview](#overview)
  - [overview](#overview)

- [Getting Started](#setup)
  - [installation](#installation)
  - [prerequisites](#prerequisites)

- [Project Structure](#structure)
  - [apps](#apps)
  - [packages](#packages)

- [Features](#features)
  - [ai](#ai)
  - [analytics](#analytics)
    - [product](#product)
    - [web](#web)
  - [authentication](#authentication)
  - [bundle-analysis](#bundle-analysis)
  - [cms](#cms)
  - [collaboration](#collaboration)
  - [cron](#cron)
  - [database](#database)
  - [design-system](#design-system)
    - [colors](#colors)
    - [components](#components)
    - [dark-mode](#dark-mode)
    - [provider](#provider)
    - [typography](#typography)
  - [documentation](#documentation)
  - [email](#email)
    - [clerk](#clerk)
    - [resend](#resend)
  - [env](#env)
  - [flags](#flags)
  - [formatting](#formatting)
  - [observability](#observability)
    - [debugging](#debugging)
    - [error-capture](#error-capture)
    - [logging](#logging)
    - [uptime](#uptime)
  - [payments](#payments)
  - [security](#security)
    - [application](#application)
    - [dependencies](#dependencies)
    - [headers](#headers)
    - [ip-geolocation](#ip-geolocation)
    - [rate-limiting](#rate-limiting)
  - [seo](#seo)
    - [json-ld](#json-ld)
    - [metadata](#metadata)
    - [sitemap](#sitemap)
  - [storage](#storage)
  - [storybook](#storybook)
  - [testing](#testing)
  - [toolbar](#toolbar)
  - [webhooks](#webhooks)

- [Deployment](#deployment)
  - [netlify](#netlify)
  - [vercel](#vercel)

- [Addons](#addons)
  - [friendlier-words](#friendlier-words)
  - [metabase](#metabase)
  - [motion](#motion)
  - [next-safe-action](#next-safe-action)
  - [nuqs](#nuqs)
  - [react-wrap-balancer](#react-wrap-balancer)
  - [zustand](#zustand)

- [Migrations](#migrations)
  - [authentication](#authentication)
    - [authjs](#authjs)
    - [better-auth](#better-auth)
  - [cms](#cms)
    - [content-collections](#content-collections)
  - [database](#database)
    - [drizzle](#drizzle)
    - [planetscale](#planetscale)
    - [prisma-postgres](#prisma-postgres)
    - [supabase](#supabase)
    - [turso](#turso)
  - [documentation](#documentation)
    - [fumadocs](#fumadocs)
  - [formatting](#formatting)
    - [eslint](#eslint)
  - [payments](#payments)
    - [lemon-squeezy](#lemon-squeezy)
  - [storage](#storage)
    - [upload-thing](#upload-thing)

- [Recipes](#recipes)
  - [ai-chatbot](#ai-chatbot)
  - [analytics-app](#analytics-app)
  - [chat-app](#chat-app)
  - [subscription-saas](#subscription-saas)

- [Code Snippets](#snippets)
  - [authors](#authors)
  - [vercel](#vercel)

- [FAQ](#faq)
  - [faq](#faq)

- [Updates](#updates)
  - [updates](#updates)


## Overview
### overview
## What is next-forge?

next-forge is a production-grade [Turborepo](https://turbo.build/repo) template for [Next.js](https://nextjs.org/) apps. It is designed to be a comprehensive starting point for new apps, providing a solid, opinionated foundation with a minimal amount of configuration.

It is a culmination of my experience building web apps over the last decade and is designed to get you to build your new SaaS app as quick as possible

## Philosophy

next-forge is focused on these key principles.

### Fast

Your project should be **fast**. This doesn't just mean fast to build, run and deploy. It also means it should be fast to validate ideas, iterate and scale. This is critical for front-loading the important parts of starting a startup: finding product-market fit, iterating on the core concept and scaling to customers.

### Cheap

Your project should be **cheap** and preferably free to start. You shouldn't be spending money on tools and infrastructure if you don't have customers yet. It should avoid a flat cost, or have a generous free tier. You should aim to make your project self-sustaining, with the goal of avoiding any recurring costs upfront and finding services that scale with you.

### Opinionated

Your project should be **opinionated**. This means that the tooling should be designed to work together, and the project should be designed to work with the tooling. This is important for reducing friction and increasing productivity.

### Modern

Your project should be **modern**. This means that the tooling should be actively maintained, and the project should be designed to take advantage of the latest features. This is important for reducing technical debt and increasing longevity. This doesn't mean you should use bleeding edge or experimental tooling, but instead should use the latest stable versions of modern tools with healthy communities and long-term support.

### Safe

Your project should be **safe**. Practically, this means end-to-end type safety, securely handling secrets and using platforms that offer robust security posture.

## Getting Started
### installation
## Initialization

Run the `next-forge` init command, replacing `[my-app]` with your project name.

```sh Terminal
npx next-forge@latest init [my-app]
```

You can also specify the package manager to use with the `package-manager` option, e.g.

```sh Terminal
npx next-forge@latest init [my-app] --package-manager bun
```

This will create a new directory with your project name and clone the repo into it. It will run a setup script to install dependencies and copy `.env` files.

## Login

Login to Stripe with:

```sh Terminal
stripe login
```

## Environment variables

You should change the environment variables in each `.env` or `.env.local` file to match your own configuration e.g.

```js .env.local
DATABASE_URL="postgres://..."
```

Read more about environment variables [here](/features/env).

## Database

You will need to scaffold the database using the schema defined in `packages/database/prisma/schema.prisma`:

```sh Terminal
pnpm migrate
```

## CMS

You will need to setup the CMS. Follow the instructions [here](/features/cms), but the summary is:

1. Fork the [`basehub/next-forge`](https://basehub.com/basehub/next-forge?fork=1) template
2. Get your Read Token from the "Connect to Your App" page
3. Add the `BASEHUB_TOKEN` to your [Environment Variables](/features/env)

## Development

Run the development server with:

```sh Terminal
pnpm dev
```

Open the localhost URLs with the relevant ports listed above to see the app, e.g.

- [http://localhost:3000/](http://localhost:3000/) — The main app.
- [http://localhost:3001/](http://localhost:3001/) — The website.
- [http://localhost:3002/](http://localhost:3002/) — The API.
- [http://localhost:3003/](http://localhost:3003/) — Email preview server.
- [http://localhost:3004/](http://localhost:3004/) — The docs

### prerequisites
## Operating System

next-forge is designed to work on macOS, Linux and Windows. While next-forge itself is platform-agnostic, the tooling and dependencies we use have different requirements. We've tested and confirmed that next-forge works on the following combinations of operating systems and versions:

| Operating system | next-forge version | Node.js version | Notes |
| ---------------- | ----------------- | --------------- | ----- |
| macOS Sequoia 15.0.1 (24A348) | 2.14.3 | 20.12.2 |  |
| Ubuntu 24.04 Arm64 | 2.14.3 | 20.18.0 |  |
| Fedora, Release 41 | 2.14.3 | 22.11.0 |  |
| Windows 11 Pro 24H2 (26100.2033) | 2.14.3 | 20.18.0 | Turborepo only supports specific architectures. `windows ia32` is not supported. |

We're aware of issues on [non-Ubuntu Linux distributions](https://github.com/haydenbleasel/next-forge/issues/238). While we don't officially support them, we'd love to know if you get it working!

## Package Manager

next-forge defaults to using [pnpm](https://pnpm.io/) as a package manager, but you can use [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) or [bun](https://bun.sh/) instead.

| Package Manager | Supported |
| ---------------- | ----------------- |
| pnpm | ✅ |
| npm | ✅ |
| yarn | ✅ |
| bun | ✅ |

Learn how to [install pnpm](https://pnpm.io/installation).

## Stripe CLI

We use the Stripe CLI to forward webhooks to your local machine. You can read more about that [here](/features/payments).

Learn how to [install the Stripe CLI](https://docs.stripe.com/stripe-cli) for your operating system.

## Mintlify CLI

We use the Mintlify CLI to preview the docs locally. You can install it with:

```sh Terminal
pnpm add -g @mintlify/cli
```

## Accounts

next-forge relies on various SaaS products. You will need to create accounts with the following services then set the API keys in your [environment variables](/features/env):

- [Arcjet](https://arcjet.com), for [application security](/features/security/application).
- [BetterStack](https://betterstack.com), for [logging](/features/observability/logging) and [uptime monitoring](/features/observability/uptime).
- [Clerk](https://clerk.com), for [authentication](/features/authentication).
- [Google Analytics](https://developers.google.com/analytics), for [web analytics](/features/analytics/web).
- [Posthog](https://posthog.com), for [product analytics](/features/analytics/product).
- [Resend](https://resend.com), for [transactional emails](/features/email/resend).
- [Sentry](https://sentry.io), for [error tracking](/features/observability/error-capture).
- [Stripe](https://stripe.com), for [payments](/features/payments).

## Project Structure
### apps
<Frame>
  <img src="/images/structure/apps.png" alt="" />
</Frame>

next-forge is a monorepo, which means it contains multiple packages in a single repository. This is a common pattern for modern web applications, as it allows you to share code between different parts of the application, and manage them all together.

The monorepo is managed by [Turborepo](https://turbo.build/repo), which is a tool for managing monorepos. It provides a simple way to manage multiple packages in a single repository, and is designed to work with modern web applications.

The monorepo contains the following apps:

| App | Description | Port | Recommended URL |
| --- | ----------- | ---- | --------------- |
| `api` | Contains serverless functions designed to run separately from the main app e.g. webhooks and cron jobs. | 3002 | `api.acme.com` |
| `app` | The main application, featuring a [shadcn/ui](https://ui.shadcn.com/) template. | 3000 | `app.acme.com` |
| `docs` | The documentation, which contains the documentation for the app e.g. guides and tutorials. | 3004 | `docs.acme.com` |
| `email` | The email preview server from [react.email](https://react.email/). | 3003 | |
| `storybook` | The storybook, which contains the storybook for the app. | 6006 | |
| `studio` | [Prisma Studio](https://www.prisma.io/studio), which is a graphical editor for the database. | 3005 | |
| `web` | The website, featuring a [twblocks](https://www.twblocks.com/) template. | 3001 | `acme.com` |

While you can choose to run these apps on the subdomain of your choice, the recommended subdomains are listed above. Remember to add them to your [environment variables](/features/env) under `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_WEB_URL`, and `NEXT_PUBLIC_DOCS_URL`.

### packages
<Frame>
  <img src="/images/structure/packages.png" alt="" />
</Frame>

next-forge contains a number of shared packages that are used across the monorepo. The purpose of these packages is to isolate shared code from the main app, making it easier to manage and update.

Additionally, it makes it easier to swap out parts of the app for different implementations. For example, the `database` package contains everything related to the database, including the schema and migrations. This allows us to easily swap out the database provider or ORM without impacting other parts of the app.

| Package | Description |
| ------- | ----------- |
| `analytics` | Analytics systems. |
| `auth` | Authentication provider. |
| `database` | Database schema and migrations. |
| `design-system` | Contains shared components, utility files and styles. |
| `email` | Email functionality, including provider SDK and templates. |
| `env` | Environment variables. |
| `feature-flags` | Feature flags. |
| `next-config` | Shared Next.js configuration. |
| `observability` | Observability utilities, including logging, error handling and uptime monitoring. |
| `payments` | Payments and billing functionality. |
| `seo` | Search engine optimization, including metadata and structured data. |
| `tailwind-config` | Shared Tailwind CSS configuration. |
| `typescript-config` | Shared TypeScript configuration. |

## Features
### ai
<Frame>
  <img src="/images/ai.png" alt="" />
</Frame>

next-forge has a pre-configured `ai` package that uses [ai-sdk](https://sdk.vercel.ai/) to provide a simple interface for interacting with AI models.

## Usage

To use AI functionality, you can import it from the `@repo/ai` package.

### Generating text

You can use the `generateText` function to generate text from an AI model. For example:

```ts generate.ts
import { generateText } from '@repo/ai';
import { provider } from '@repo/ai/lib/provider';

const response = await generateText({
  model: provider('gpt-4o'),
  prompt: 'Hello, world!',
});
```

### Components

The AI package comes with a few components that you can use to build your own AI chatbot, such as `Thread` and `Message`.

```tsx chatbot.tsx
import { Thread } from '@repo/ai/components/thread';
import { Message } from '@repo/ai/components/message';

export const Chatbot = () => {
  const { messages } = useChat();

  return (
    <Thread>
      {messages.map((message) => (
        <Message key={message.id} data={message} />
      ))}
    </Thread>
  );
}
```

## Adding payment agentic capabilities

You can use the `paymentsAgentToolkit` to add payments capabilities to your AI agent for financial services. As next-forge uses Stripe by default, here's an example of how to use it:

```ts generate.ts
import { generateText } from '@repo/ai';
import { paymentsAgentToolkit } from '@repo/payments/ai';
import { provider } from '@repo/ai/lib/provider';

const response = await generateText({
  model: provider('gpt-4o'),
  tools: {
    ...paymentsAgentToolkit.getTools(),
  },
  maxSteps: 5,
  prompt: 'Create a payment link for a new product called \"Test\" with a price of $100.',
})
```

## Adding analytics

There are quite a few ways to add analytics to your AI agent depending on your use case, environment and whether you're generating or streaming.

Here's a simple example of how to add analytics to a `generateText` request using our `analytics` package:

```ts generate.ts
import { generateText } from '@repo/ai';
import { analytics } from '@repo/analytics/posthog/server';
import { currentUser } from '@repo/auth/server';
import { provider } from '@repo/ai/lib/provider';

const model = provider('gpt-4o');
const prompt = 'Hello, world!';
const tokenInputCost = 0.0000025;
const tokenOutputCost = 0.00001;
const startTime = performance.now();
const user = await currentUser();

if (!user) {
  throw new Error('User not found');
}

const response = await generateText({
  model,
  prompt,
});

const endTime = performance.now();

analytics.capture({
  event: 'chat_completion',
  distinctId: user.id,
  properties: {
    model: model.modelId,
    prompt,
    prompt_tokens: response.usage.promptTokens,
    completion_tokens: response.usage.completionTokens,
    total_tokens: response.usage.totalTokens,
    input_cost_in_dollars: response.usage.promptTokens * tokenInputCost,
    output_cost_in_dollars: response.usage.promptTokens * tokenOutputCost,
    total_cost_in_dollars:
      response.usage.promptTokens * tokenInputCost +
      response.usage.completionTokens * tokenOutputCost,
    response_time_in_ms: endTime - startTime,
  },
});
```

## Using a different provider

If you want to use a different provider, you can modify the `provider` in `@repo/ai/lib/provider.ts` to use the one you want. For example, to use Anthropic, you can change it to:

```ts packages/ai/lib/provider.ts
import { createAnthropic } from '@ai-sdk/anthropic';

export const provider = createAnthropic({
  apiKey: env.ANTHROPIC_API_KEY,
});
```

### analytics


#### product
next-forge has support for product analytics via PostHog — a single platform to analyze, test, observe, and deploy new features.

## Usage

To capture product events, you can use the `analytics` object exported from the `@repo/analytics` package.

Start by importing the `analytics` object for the relevant environment:

```tsx
// For server-side code
import { analytics } from '@repo/analytics/posthog/server';

// For client-side code
import { analytics } from '@repo/analytics/posthog/client';
```

Then, you can use the `capture` method to send events:

```tsx
analytics.capture({
  event: 'Product Purchased',
  distinctId: 'user_123',
});
```

## Webhooks

To automatically capture authentication and payment events, we've combined PostHog's Node.js server-side library with Clerk and Stripe webhooks to wire it up as follows:

<Mermaid chart={`
graph TD
  A[User Action in App] -->|Triggers| B[Clerk Webhook]
  A -->|Triggers| E[Stripe Webhook]
  A -->|Client-Side Call| PostHog
  B -->|Sends Data| C1[webhooks/clerk]
  E -->|Sends Data| C2[webhooks/stripe]

  subgraph API
    C1
    C2
  end

  subgraph PostHog
  end

  C1 -->|Clerk Events| PostHog
  C2 -->|Stripe Events| PostHog
`} />

## Reverse Proxy

We've also setup Next.js rewrites to reverse proxy PostHog requests, meaning your client-side analytics events won't be blocked by ad blockers.

#### web
<Frame>
  <img src="/images/web-analytics.png" alt="" />
</Frame>

next-forge comes with three web analytics libraries.

## Vercel Web Analytics

Vercel's built-in analytics tool offers detailed insights into your website's visitors with new metrics like top pages, top referrers, and demographics. All you have to do to enable it is visit the Analytics tab in your Vercel project and click Enable from the dialog.

Read more about it [here](https://vercel.com/docs/analytics/quickstart).

## Google Analytics

Google Analytics tracks user behavior, page views, session duration, and other engagement metrics to provide insights into user activity and marketing effectiveness. GA tracking code is injected using [@next/third-parties](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-analytics) for performance reasons.

To enable it, simply add a `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` environment variable to your project.

## PostHog

PostHog is a single platform to analyze, test, observe, and deploy new features. It comes with lots of products, including a web analytics tool, event analytics, feature flagging, and more.

PostHog's web analytics tool is enabled by default and captures pageviews, pageleave and custom events.

### Session Replay

PostHog's session replays let you see exactly what users do on your site. It records console logs and network errors, and captures performance data like resource timings and blocked requests. This is disabled by default, so make sure you enable it in your project settings.

### authentication
<Frame>
  <img src="/images/authentication.png" alt="" />
</Frame>

next-forge manages authentication through the use of a `auth` package. By default, this package is a wrapper around [Clerk](https://clerk.com/) which provides a complete authentication and user management solution that integrates seamlessly with Next.js applications.

## In-App

The `@repo/auth` package exposes an `AuthProvider`, however you don't need to use this directly. The [`DesignSystemProvider`](/features/design-system/provider) includes all relevant providers and higher-order components.

From here, you can use all the pre-built components and hooks provided by Clerk. To demonstrate this, we've added the `<OrganizationSwitcher>` and `<UserButton>` components to the sidebar, as well as built out the Sign In and Sign Up pages.

<Frame>
  <img src="/images/sign-in.png" alt="Sign In Page" />
</Frame>

## Webhooks

Clerk uses webhooks to handle authentication events. These are handled in the `POST /webhooks/clerk` route in the `api` app. Make sure you enable the webhook events you need in your Clerk project settings.

### Local Development

Currently there's no way to easily test Clerk webhooks locally, so you'll have to test them in a staging environment. This means deploying your app to a "production" state Vercel project with development environment variables e.g. `staging-api.example.com`. Then you can add this URL to your Clerk project's webhook settings.

### bundle-analysis
next-forge uses [@vercel/next-bundle-analyzer](https://github.com/vercel/next-bundle-analyzer) to analyze and optimize your app's bundle size. Each app has a `next.config.ts` file that is configured to use the analyzer when the `ANALYZE` environment variable is set to `true`.

## Usage

To run the analyzer, simply run the following command from the root of the project:

```sh Terminal
pnpm analyze
```

Turborepo will automatically run the analyzer for each app when the command is executed. Once the bundle analyzer finishes running for each app, it will open three HTML files in your default browser automatically: `client`, `nodejs` and `edge`. Each one shows a treemap, describing the size and impact of modules loaded on that particular environment.

You can then work on optimizing your app by removing or dynamically loading the heaviest modules.

### cms
import { Authors } from "/snippets/authors.mdx";

<Authors
  data={[
    {
      user: {
        name: "Hayden Bleasel",
        id: "haydenbleasel",
      },
      company: {
        name: "next-forge",
        id: "next-forge",
      },
    },
    {
      user: {
        name: "Julian Benegas",
        id: "julianbenegas8",
      },
      company: {
        name: "BaseHub",
        id: "basehub",
      },
    },
  ]}
/>

next-forge has a dedicated CMS package that can be used to generate type-safe data collections from your content. This approach provides a structured way to manage your content while maintaining full type safety throughout your application.

By default, next-forge uses [BaseHub](https://basehub.com) as the CMS. However, it is also possible to use other sources, such as [Content Collections](/migrations/cms/content-collections) to generate type-safe data collections from MDX files.

## Setup

Here's how to quickly get started with your new CMS.

### 1. Fork the [`basehub/next-forge`](https://basehub.com/basehub/next-forge?fork=1) template

You'll be forking a BaseHub repository which contains the next-forge compatible content schema.

Once you fork the repository, you'll need to get your Read Token from the "Connect to your App" page:

```
https://basehub.com/<team-slug>/<repo-slug>/dev/main/dev:connect
```

The token will look something like this:

```
bshb_pk_<password>
```

Keep this connection string handy, you will need it in the next step.

### 2. Update your environment variables

Update your [environment variables](/features/env) to use the new BaseHub token. For example:

```ts apps/web/.env
BASEHUB_TOKEN="<token>"
```

## How it works

### The `Feed` component

The `Feed` component is a wrapper around BaseHub's `Pump` component — a React Server Component that gets generated with the basehub SDK. It leverages RSC, Server Actions, and the existing BaseHub client to subscribe to changes in real time with minimal development effort.

It's also setup by default to use Next.js [Draft Mode](https://nextjs.org/docs/app/building-your-application/configuring/draft-mode), allowing you to preview draft content in your app.

### The `Body` component

The `Body` component is a wrapper around BaseHub's `RichText` component — BaseHub's rich text renderer which supports passing custom handlers for native html elements and BaseHub components.

### The `TableOfContents` component

The `TableOfContents` component leverages the `Body` component to render the table of contents for the current page.

### The `Image` component

The `Image` component is a wrapper around BaseHub's `BaseHubImage` component, which comes with built-in image resizing and optimization. BaseHub recommendeds using the `BaseHubImage` component instead of the standard Next.js `Image` component as it uses `Image` under the hood, but adds a custom loader to leverage BaseHub's image pipeline.

## The `Toolbar` component

The `Toolbar` component is a wrapper around BaseHub's `Toolbar` component, which helps manage draft mode and switch branches in your site previews. It's automatically mounted on CMS pages.

### collaboration
import { Authors } from '/snippets/authors.mdx';

<Authors data={[{
  user: {
    name: 'Hayden Bleasel',
    id: 'haydenbleasel',
  },
  company: {
    name: 'next-forge',
    id: 'next-forge',
  },
}, {
  user: {
    name: 'Chris Nicholas',
    id: 'ctnicholas',
  },
  company: {
    name: 'Liveblocks',
    id: 'liveblocks',
  },
}]} />

<Frame>
  <img src="/images/collaboration.png" alt="" />
</Frame>

next-forge maintains a `collaboration` package designed to provide real-time collaborative features to your apps. By default, we use [Liveblocks](https://liveblocks.io) as our collaboration engine. To showcase what you can do with this package, we've built a simple collaborative experience in the `app` application, featuring an avatar stack and live cursors.

<Tip>Collaboration is enabled by the existence of the `LIVEBLOCKS_SECRET` environment variable.</Tip>

## How it works

Liveblocks relies on the concept of rooms, digital spaces where people collaborate. To set this up, you need to [authenticate your users](https://liveblocks.io/docs/authentication/access-token/nextjs), and [add the correct providers](https://liveblocks.io/docs/get-started/nextjs), however next-forge has already integrated this, meaning you can start building your collaborative application immediately.

We've also wired up two key props for the Liveblocks provider, `resolveUsers` and `resolveMentionSuggestions`, which are used to resolve the users and mention suggestions respectively.

## Usage

Liveblocks provides a number of hooks making it easy to add real-time presence and document storage to your app. For example, [`useOthers`]() returns which users are currently connected, helpful for building avatars stacks and multiplayer cursors.

```tsx toolbar-avatars.tsx
import { useOthers, useSelf } from "@liveblocks/react/suspense";

export function ToolbarAvatars() {
  const others = useOthers();
  const me = useSelf();

  return (
    <div>
      {/* Your avatar */}
      <Avatar src={me.info.avatar} name={me.info.name} />

      {/* Everyone else's avatars */}
      {others.map(({ connectionId, info }) => (
        <Avatar key={connectionId} src={info.avatar} name={info.name} />
      )}
    </div>
  );
}
```

### Multiplayer documents

You can take your collaborative app a step further, and set up multiplayer document state with [`useStorage`](https://liveblocks.io/docs/api-reference/liveblocks-react#useStorage) and [`useMutation`](https://liveblocks.io/docs/api-reference/liveblocks-react#useMutation). This is ideal for creating custom experiences, such as a a multiplayer drawing panel, spreadsheet, or just a simple shared input and that anyone can edit.

```tsx collaborative-input.tsx
import { useStorage, useMutation } from "@liveblocks/react/suspense";

function CollaborativeInput() {
  // Get the input's value
  const inputValue = useStorage((root) => root.inputValue);
  
  // Set the input's value
  const setValue = useMutation(({ storage }), newValue) => {
    storage.set("inputValue", newValue);
  }, []);
  
  return <input value={inputValue} onChange={(e) => setValue(e.target.value)} />;
}
```

### Commenting

Liveblocks also provides ready-made customizable components for adding collaboration, such as [`Thread`](https://liveblocks.io/docs/api-reference/liveblocks-react-ui#Thread) and [`Composer`](https://liveblocks.io/docs/api-reference/liveblocks-react-ui#Composer).

```tsx comments.tsx
import { useThreads } from "@liveblocks/react/suspense";
import { Thread, Composer } from "@liveblocks/react-ui";

function Comments() {
  // Get each thread of comments and render them
  const { threads } = useThreads();

  return (
    <div>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
      <Composer />
    </div>
  );
}
```

### Collaborative editing

To add a rich-text editor with full collaborative editing and floating comments, you can set up a [Tiptap](https://liveblocks.io/docs/get-started/nextjs-tiptap) or [Lexical](https://liveblocks.io/docs/get-started/nextjs-lexical) editor in a few lines of code.

```tsx collaborative-editor.tsx
import { useLiveblocksExtension, FloatingComposer, FloatingThreads } from "@liveblocks/react-tiptap";
import { useThreads, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function Editor() {
  const { threads } = useThreads();
  const liveblocks = useLiveblocksExtension();

  // Set up your multiplayer text editor
  const editor = useEditor({
    extensions: [
      liveblocks,
      StarterKit.configure({ history: false }),
    ],
    immediatelyRender: false,
  });

  return (
    <div>
      <EditorContent editor={editor} />
      <FloatingThreads
        editor={editor}
        threads={threads}
      />
      <FloatingComposer editor={editor} />
    </div>
  );
}
```

### Notifications

Liveblocks also provides [notification components](https://liveblocks.io/docs/api-reference/liveblocks-react-ui#InboxNotificationList), meaning you can send in-app notifications to users that are tagged in comments, are mentioned in the text editor, or for any custom purpose.

```tsx notifications.tsx
import { useInboxNotifications } from "@liveblocks/react/suspense";
import {
  InboxNotification,
  InboxNotificationList,
} from "@liveblocks/react-ui";

export function CollaborativeApp() {
  // Get each notification for the current user
  const { inboxNotifications } = useInboxNotifications();

  return (
    <InboxNotificationList>
      {inboxNotifications.map((inboxNotification) => (
        <InboxNotification
          key={inboxNotification.id}
          inboxNotification={inboxNotification}
        />
      ))}
    </InboxNotificationList>
  );
}
```

### Infrastructure

Liveblocks not only provides these features, but it also has:
- [Browser DevTools](https://liveblocks.io/devtools) to help you build your app.
- [REST APIs](https://liveblocks.io/docs/api-reference/rest-api-endpoints) for sever-side changes.
- [Node.js SDK](https://liveblocks.io/docs/api-reference/liveblocks-node) for using the REST APIs with TypeScript.
- [Webhooks](https://liveblocks.io/docs/platform/webhooks) for triggering user-driven events.
- [Dashboard](https://liveblocks.io/docs/platform/projects) to help with bug spotting and analytics.

Learn more by checking out the Liveblocks [documentation](https://liveblocks.io/docs), [examples](https://liveblocks.io/examples), and [interactive tutorial](https://liveblocks.io/docs/tutorial/react/getting-started/welcome).

### cron
By default, next-forge uses Vercel's cron jobs feature to trigger Next.js serverless functions on a schedule. However, you can replace this setup with the background job service of your choosing, such as trigger.dev or BetterStack.

## Writing functions

Next.js serverless functions act as the basis for scheduled jobs. You can write them in any runtime and trigger them using a simple HTTP call.

To demonstrate, we've created a example endpoint called `keep-alive` that creates, then subsequently deletes, a temporary `page` object in the database. This is a little workaround to prevent databases going to sleep after a period of inactivity. You should probably remove this if you don't need it.

Additionally, while you can add cron jobs to any app, we use the `api` app to keep our background jobs, webhooks and other such tasks isolated from our UI.

You can add new functions by creating the relevant `route.ts` files in the `apps/api/app/cron` folder. While you can put them anywhere, we use the aptly named `cron` folder to hold our endpoints designed to run as cron jobs. For example:

```ts apps/api/app/cron/[your-function]/route.ts
import { database } from '@repo/database';

export const POST = async () => {
  // Do stuff

  return new Response('OK', { status: 200 });
};
```

## Scheduling functions

After you write your serverless function, you can schedule it by amending the `vercel.json` file in the API app. To serve as an example, we've wired up the `keep-alive` job mentioned above to run every 10 minutes.

```json apps/api/vercel.json
{
  "crons": [
    {
      "path": "/cron/keep-alive",
      "schedule": "0 1 * * *"
    }
  ]
}
```

## Triggering functions manually

Should you need to trigger a cron job manually, you can either do so in the Vercel dashboard or just hit the endpoint with a standard HTTP request. For example:

```sh Terminal
curl -X POST http://localhot:3002/cron/keep-alive
```

### database
<Frame>
  <img src="/images/database.png" alt="" />
</Frame>

next-forge aims to provide a robust, type-safe database client that makes it easy to work with your database while maintaining strong typing throughout your application. We aim to support tooling that:

- Provide a declarative way to define your database schema
- Generate type-safe database client
- Handle database migrations
- Offer powerful query capabilities with full TypeScript support

## Default Configuration

By default, next-forge uses [Neon](https://neon.tech) as its database provider and [Prisma](https://prisma.io) as its ORM. However, you can easily switch to other providers if you'd prefer, for example:

- You can use other ORMs like [Drizzle](/migrations/database/drizzle), Kysely or any other type-safe ORM.
- You can use other database providers like [PlanetScale](/migrations/database/planetscale), [Prisma Postgres](/migrations/database/prisma-postgres), [Supabase](/migrations/database/supabase), or any other PostgreSQL/MySQL provider.

## Usage

Database and ORM configuration is located in `@repo/database`. You can import this package into any server-side component, like so:

```page.tsx {1,4}
import { database } from '@repo/database';

const Page = async () => {
  const users = await database.user.findMany();

  // Do something with users!
}
```

## Schema Definition

The database schema is defined in `packages/database/prisma/schema.prisma`. This schema file uses Prisma's schema definition language to describe your database tables, relationships, and types.

### Adding a new model

Let's say we want to add a new model called `Post`, describing a blog post. The blog content will be in a JSON format, generated by a library like [Tiptap](https://tiptap.dev/). To do this, we would add the following to your schema:

```prisma packages/database/prisma/schema.prisma {1-7}
model Post {
  id        String   @id @default(cuid())
  title     String
  content   Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Deploying changes

To deploy your schema changes, run the following command:

```sh Terminal
pnpm migrate
```

This runs the following commands:

- `npx prisma format` to format the schema file
- `npx prisma generate` to generate the Prisma client
- `npx prisma db push` to push the schema changes to the database

## Prisma Studio

next-forge includes Prisma Studio, which is a visual editor for your database. To start it, run the following command:

```sh Terminal
pnpm dev --filter studio
```

### design-system


#### colors
next-forge makes use of the CSS variables offered by [shadcn/ui](https://ui.shadcn.com/). They're a brilliant way of abstracting the scaling and maintenance difficulties associated with [Dark Mode](/features/design-system/dark-mode) and whitelabelling.

These colors have also been applied to other tools, such as the `AuthProvider`, to ensure that third-party components align with the application design as closely as possible.

## Usage

All default pages and components use these colors. You can also use them in your own components, like so:

```component.tsx
export const MyComponent = () => (
  <div className="bg-background text-foreground border rounded-4xl shadow">
    <p>I'm using CSS Variables!</p>
  </div>
);
```

You can also access colors in JavaScript through the `tailwind` utility exported from `@repo/tailwind-config`, like so:

```tsx component.tsx
import { tailwind } from '@repo/tailwind-config';

export const MyComponent = () => (
  <div style={{
    background: tailwind.theme.colors.background,
    color: tailwind.theme.colors.muted.foreground,
  }}>
    <p>I'm using styles directly from the Tailwind config!</p>
  </div>
);
```

## Caveats

Currently, it's not possible to change the Clerk theme to match the exact theme of the app. This is because Clerk's Theme doesn't accept custom CSS variables. We'd like to be able to add the following in the future:

```jsx packages/design-system/providers/clerk.tsx {4-15}
const variables: Theme['variables'] = {
  // ...

  colorBackground: 'hsl(var(--background))',
  colorPrimary: 'hsl(var(--primary))',
  colorDanger: 'hsl(var(--destructive))',
  colorInputBackground: 'hsl(var(--transparent))',
  colorInputText: 'hsl(var(--text-foreground))',
  colorNeutral: 'hsl(var(--neutral))',
  colorShimmer: 'hsl(var(--primary) / 10%)',
  colorSuccess: 'hsl(var(--success))',
  colorText: 'hsl(var(--text-foreground))',
  colorTextOnPrimaryBackground: 'hsl(var(--text-foreground))',
  colorTextSecondary: 'hsl(var(--text-muted-foreground))',
  colorWarning: 'hsl(var(--warning))',
};
```

#### components
next-forge contains a design system out of the box powered by [shadcn/ui](https://ui.shadcn.com/).

## Default configuration

shadcn/ui has been configured by default to use the "New York" style, Tailwind's `neutral` color palette and CSS variables. You can customize the component configuration in `@repo/design-system`, specifically the `components.json` file. All components have been installed and are regularly updated.

## Installing components

To install a new component, use the `shadcn` CLI from the root:

```sh Terminal
npx shadcn@latest add select -c packages/design-system
```

This will install the component into the Design System package.

## Updating components

To update shadcn/ui, you can run the following command from the root:

```sh Terminal
npx shadcn@latest add --all --overwrite -c packages/design-system
```

We also have a dedicated command for this. Read more about [updates](/updates).

## Changing libraries

If you prefer a different component library, you can replace it at any time with something similar, such as Tailwind's [Catalyst](https://catalyst.tailwindui.com/).

#### dark-mode
next-forge comes with built-in dark mode support through the combination of [Tailwind CSS](https://tailwindcss.com/docs/dark-mode) and [next-themes](https://github.com/pacocoursey/next-themes).

## Implementation

The dark mode implementation uses Tailwind's `darkMode: 'class'` strategy, which toggles dark mode by adding a `dark` class to the `html` element. This approach provides better control over dark mode and prevents flash of incorrect theme.

The `next-themes` provider is already configured in the application, handling theme persistence and system preference detection automatically. Third-party components like Clerk's Provider and Sonner have also been preconfigured to respect this setup.

## Usage

By default, each application theme will default to the user's operating system preference.

To allow the user to change theme manually, you can use the `ModeToggle` component which is located in the Design System package. We've already added it to the `app` sidebar and `web` navbar, but you can import it anywhere:

```tsx page.tsx
import { ModeToggle } from '@repo/design-system/components/mode-toggle';

const MyPage = () => (
  <ModeToggle />
);
```

You can check the theme by using the `useTheme` hook directly from `next-themes`. For example:

```tsx page.tsx
import { useTheme } from 'next-themes';

const MyPage = () => {
  const { resolvedTheme } = useTheme();

  return resolvedTheme === 'dark' ? 'Dark mode baby' : 'Light mode ftw';
}
```

#### provider
The design system package also exports a `DesignSystemProvider` component which implements a number of contextual, functional and higher order components, including those for Tooltips, Toasts, Analytics, Dark Mode and more.

This provider is already added to the default apps. If you want to add a new app, make sure you add it to your root layout along with [fonts](/features/design-system/typography) and global CSS, like so:

```tsx layout.tsx
import '@repo/design-system/styles/globals.css';
import { fonts } from '@repo/design-system/lib/fonts';
import { DesignSystemProvider } from '@repo/design-system';
import type { ReactNode } from 'react';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <DesignSystemProvider>{children}</DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;
```

#### typography
The design system package contains a pre-configured fonts file, which has been wired up to all the apps. This `fonts.ts` file imports the default font Geist from Google Fonts, configures the appropriate subset and CSS variable name, then exports a `className` you can use in your app. This CSS variable is then applied to the shared Tailwind configuration.

By default, `fonts.ts` exports a `sans` and `mono` font, but you can configure this to export as many as you need e.g. heading, body, secondary, etc. You can also replace fonts entirely simply by replacing the font name, like so:

```ts packages/design-system/lib/fonts.ts
import { Acme } from 'next/font/google';

const sans = Acme({ subsets: ['latin'], variable: '--font-sans' });
```

You can also load fonts locally. Read more about this on the [Next.js docs](https://nextjs.org/docs/app/building-your-application/optimizing/fonts).

### documentation
import { Authors } from '/snippets/authors.mdx';

<Authors data={[{
  user: {
    name: 'Hayden Bleasel',
    id: 'haydenbleasel',
  },
  company: {
    name: 'next-forge',
    id: 'next-forge',
  },
}, {
  user: {
    name: 'Flo Merian',
    id: 'fmerian',
  },
  company: {
    name: 'Mintlify',
    id: 'mintlify',
  },
}]} />

next-forge uses [Mintlify](https://mintlify.com) to generate beautiful docs. Each page is a `.mdx` file, written in Markdown, with built-in UI components and API playground.

## Creating a new page

To create a new documentation page, add a new MDX file to the `apps/docs` directory. The file name will be used as the slug for the page and the frontmatter will be used to generate the docs page. For example:

```mdx apps/docs/hello-world.mdx
---
title: 'Quickstart'
description: 'Start building modern documentation in under five minutes.'
---
```

Learn more supported [meta tags](https://mintlify.com/docs/page).

## Adding a page to the navigation

To add a page to the sidebar, you'll need to define it in the `mint.json` file in the `apps/docs` directory. From the previous example, here's how you can add it to the sidebar:

```mdx mint.json {2-5}
"navigation": [
  {
    "group": "Getting Started",
    "pages": ["hello-world"]
  },
  {
    // ...
  }
]
```

## Advanced

You can build the docs you want with advanced features.

<Card title="Global Settings" icon="wrench" href="https://mintlify.com/docs/settings/global" horizontal>
  Customize your documentation using the mint.json file
</Card>

<Card title="Components" icon="shapes" href="https://mintlify.com/docs/content/components" horizontal>
  Explore the variety of components available
</Card>

### email


#### clerk
Clerk handles authentication and authorization emails automatically. You can configure the theming of Clerk-sent emails in their dashboard.

<Info>
  Eventually we would like to replace Clerk templates with React Email templates.
</Info>

#### resend
We use [Resend](https://resend.com/) to send transactional emails. The templates, located in `@repo/email`, are powered by [React Email](https://react.email/) - a collection of high-quality, unstyled components for creating beautiful emails using React and TypeScript.

## Email Templates

The `email` package is separated from the app folder for two reasons:

1. We can import the templates into the `email` app, allowing for previewing them in the UI; and
2. We can import both the templates and the SDK into our other apps and use them to send emails.

Resend and React Email play nicely together. For example, here's how you can send a transactional email using a React email template:

```tsx apps/web/app/contact/actions/contact.tsx
import { resend } from '@repo/email';
import { ContactTemplate } from '@repo/email/templates/contact';

await resend.emails.send({
  from: 'sender@acme.com',
  to: 'recipient@acme.com',
  subject: 'The email subject',
  react: <ContactTemplate name={name} email={email} message={message} />,
});
```

## Previewing Emails

To preview the emails templates, simply run the `email` app:

```sh Terminal
pnpm dev --filter email
```

### env
next-forge uses [@t3-oss/env-nextjs](https://github.com/t3-oss/t3-env) to handle environment variables in a type-safe way. This provides runtime validation and autocompletion for all environment variables.

## Overview

Environment variables are defined and validated in `packages/env/index.ts`. The file exports an `env` object that contains all validated environment variables, separated into `server` and `client` variables.

## Initial setup

### App Environment Variables

As part of the initial setup, you will need to fill in the environment variables in each `.env.local` file in each Next.js application, specifically `app`, `web` and `api`.

The initial setup script will copy these `.env.example` files to `.env.local` files, so all you need to do is fill in the variables.

Check out the `packages/env/index.ts` file to see the validation rules for each variable.

<Tip>
  For `FLAGS_SECRET`, you can run `node -e "console.log(crypto.randomBytes(32).toString('base64url'))"` or `openssl rand -base64 32` in your terminal to generate a random value.
</Tip>

Some environment variables will be added by integrations and other tooling. For example, environment variables prefixed with `SENTRY_` are automatically added to a Vercel project when you add the Sentry integration from the Vercel Marketplace. Additionally, `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL` is a very handy environment variable that refers to the "production" URL to which this project is deployed on Vercel.

### Database Environment Variable

You also need to configure a `.env` file in the `packages/database` directory. This file should be created by the setup script, so just add your `DATABASE_URL` and you should be good to go.

### CMS Environment Variable

You also need to configure a `.env.local` file in the `packages/cms` directory. This file should be created by the setup script, so just add your `BASEHUB_TOKEN` and you should be good to go.

## Adding a variable

To add a new environment variable, you need to do two things:

1. Add the variable to each of the `.env.local` files across the repo
2. Add the variable to the `server` or `client` object in `packages/env/index.ts`. The variable will be validated using Zod, so you can use any of the Zod validation primitives.

I recommend being as specific as possible with your validation. For example, if you know that a vendor secret starts with `sec_`, you should validate it as `z.string().min(1).startsWith('sec_')`. This will not only make your intent clearer to anyone reading your code, but will also help prevent errors at runtime.

### flags
Feature flags (also known as feature toggles) allow you to control access to specific features in your application. next-forge provides a simple but powerful feature flag system that can be used to:

- Roll out features gradually to users
- A/B test new functionality
- Enable/disable features based on user segments
- Control access to beta or experimental features

## How it works

next-forge implements feature flags using Vercel's [Flags SDK](https://vercel.com/docs/workflow-collaboration/feature-flags/flags-pattern-nextjs), which is mostly an architectural pattern for working with feature flags. This setup exists in the `@repo/feature-flags` package, so you can import and use it in as many projects as you'd like.

We've created an intelligent function called `createFlag` that you can use to create new flags, complete with authentication, PostHog integration and [Vercel Toolbar](/features/toolbar) overrides without the hassle.

## Adding a new flag

To add a new flag, simply create a feature flag in PostHog and then modify the feature flags index file. Let's add a new flag called `showAnalyticsFeature` that will be enabled for all users:

```ts packages/feature-flags/index.ts {4}
import { createFlag } from './lib/create-flag';

export const showBetaFeature = createFlag('showBetaFeature');
export const showAnalyticsFeature = createFlag('showAnalyticsFeature');
```

Make sure the key you're using matches the key in PostHog exactly.

## Usage in your application

To use the flag in your application, simply import it from the `@repo/feature-flags` package and use it like a normal boolean value.

```tsx page.tsx
import { showAnalyticsFeature } from '@repo/feature-flags';
import { notFound } from 'next/navigation';

export default function Page() {
  const isEnabled = showAnalyticsFeature();

  if (!isEnabled) {
    notFound();
  }

  return <div>Analytics feature is enabled</div>;
}
```

Because feature flags are tied to the user, they only work if the user is signed in. Otherwise, the flag will always return `false`.

## Overriding flags in development

You can override flags in development by using the Vercel Toolbar. Simply open the toolbar by clicking the "Flag" icon in the top right and then selecting the flag you'd like to override.

<Frame>
  <img src="/images/vercel-toolbar.png" alt="Vercel Toolbar" />
</Frame>

### formatting
next-forge uses [Ultracite](https://ultracite.dev) for code formatting and linting. Ultracite is a preconfigured setup of [Biome](https://biomejs.dev), a high-performance Rust-based toolchain which includes a formatter, linter, and more for JavaScript and TypeScript.

## Benefits

Ultracite provides several benefits:

- <Icon icon="check" iconType="solid" /> Zero configuration required - works out of the box
- <Icon icon="check" iconType="solid" /> Extremely fast performance
- <Icon icon="check" iconType="solid" /> Consistent code style across your project
- <Icon icon="check" iconType="solid" /> Built-in linting rules
- <Icon icon="check" iconType="solid" /> TypeScript support

## Usage

The formatter and linter are automatically configured in your project and will run on save. If you want to manually run them across your project, you can run the following commands:

- `pnpm lint` - This will check all files across all apps and packages.
- `pnpm format` - This will check and fix all files across all apps and packages.

### observability


#### debugging
next-forge has pre-configured [VSCode](https://code.visualstudio.com/) to work as adebugger. The `.vscode/launch.json` file contains the configuration for the debugger and is configured to work for all the apps in the monorepo.

To use the debugger, simply open the app in VSCode (or any VSCode-compatible editor) and go to the Debug panel (Ctrl+Shift+D on Windows/Linux, ⇧+⌘+D on macOS). Select a launch configuration, then press `F5` or select `Debug: Start Debugging` from the Command Palette to start your debugging session.

#### error-capture
next-forge uses [Sentry](https://sentry.io/) for error tracking and performance monitoring. It helps identify, debug, and resolve issues by providing detailed error reports, stack traces, and performance metrics across both server and client environments. When an error occurs, Sentry captures the full context including the user's browser information, the sequence of events that led to the error, and relevant application state.

## Configuration

Sentry is configured and managed in three key places:

The `instrumentation.ts` file in your Next.js project initializes Sentry for both Node.js and Edge runtime environments, configuring the DSN (Data Source Name) that routes error data to your Sentry project.

The `sentry.client.config.ts` file configures Sentry for the client environment. This includes settings like the sample rate for errors and sessions, and the integrations to use.

The `next.config.ts` file imports shared Sentry-specific settings through `withSentryConfig`. This enables features like source map uploads for better stack traces and automatic instrumentation of Vercel Cron Monitors. The configuration also optimizes bundle size by tree-shaking logger statements and hiding source maps in production builds.

## Manual Usage

If you want to capture a specific exception rather than letting it bubble up to Sentry, you can use the `captureException` function:

```tsx page.tsx
import { captureException } from '@sentry/nextjs';

captureException(new Error('My error message'));
```

## Tunneling

The `sentryConfig.tunnelRoute` option in `@repo/next-config`'s Sentry configuration routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. This can increase your server load as well as your hosting bill.

<Warning>
  Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-side errors will fail.
</Warning>

#### logging
The logging functionality is abstracted through a simple wrapper that provides a consistent logging interface across environments.

## How it works

In development, logs are output to the console for easy debugging. In production, logs are sent to BetterStack Logs where they can be searched, filtered, and analyzed.

## Usage

To use this logging setup, simply import and use the `log` object. It shares the same interface as the `console` object, so you can replace `console` with `log` in your codebase.

```tsx page.tsx
import { log } from '@repo/observability/log';

log.info('Hello, world!');
```

#### uptime
Uptime monitoring functionality is configured through BetterStack's dashboard.

## Setting up monitoring

When you create your project, I recommend adding some specific URLs to monitor. Assuming we're using `next-forge.com` and it's subdomains, here's what you should add:

1. `next-forge.com` - the `web` project, should be up if the index page returns a successful response.
2. `app.next-forge.com` - the `app` project, should be up if the index page returns a successful response.
3. `api.next-forge.com/health` - the `api` project, should be up if the `health` route returns a successful response. This is a stub endpoint that runs on Edge runtime so it's very quick.

## Usage in the UI

next-forge provides a `Status` component from `@repo/observability` that displays the current status of the application. You can see an example of this in the website footer.

The status component shows 3 potential states:

- `All systems normal` - 100% of the uptime monitors are reporting up
- `Partial outage` - at least one uptime monitor is reporting down
- `Degraded performance` - 0% of the uptime monitors are reporting up

This functionality relies on the `BETTERSTACK_API_KEY` and `BETTERSTACK_URL` environment variables.

### payments
next-forge uses [Stripe](https://stripe.com/) by default for payments and billing. Implementing Stripe in your project is straightforward.

## In-App Purchases

You can use Stripe anywhere in your app by importing the `stripe` object like so:

```ts page.tsx {1,5}
import { stripe } from '@repo/payments';

// ...

await stripe.prices.list();
```

## Webhooks

Stripe webhooks are handled in the `POST /webhooks/stripe` route in the `api` app. This route constructs the event and then switches on the event type to determine how to process the event.

### Local Development

To test webhooks locally, we've configured the Stripe CLI to forward webhooks to your local server. This will start automatically when you run `pnpm dev`.

## Anti-Fraud

As your app grows, you will inevitably encounter credit card fraud. [Stripe Radar](https://stripe.com/radar) is enabled by default if you integrate payments using their SDK as described above. This provides a set of tools to help you detect and prevent fraud.

Stripe Radar supports more [advanced anti-fraud features](https://docs.stripe.com/disputes/prevention/advanced-fraud-detection) if you embed the Stripe JS script in every page load. This is not enabled by default in next-forge, but you can add it as follows:

<Steps>
  <Step title="Edit the layout">
    Edit `apps/app/app/layout.tsx` and add `<Script src="https://js.stripe.com/v3/" />` after the opening `<html>` tag and before the opening `<body>` tag. You will also need to add `import Script from 'next/script'`

    ```tsx {5, 13}
    import '@repo/design-system/styles/globals.css';
    import { DesignSystemProvider } from '@repo/design-system';
    import { fonts } from '@repo/design-system/lib/fonts';
    import type { ReactNode } from 'react';
    import Script from 'next/script';

    type RootLayoutProperties = {
      readonly children: ReactNode;
    };

    const RootLayout = ({ children }: RootLayoutProperties) => (
      <html lang="en" className={fonts} suppressHydrationWarning>
        <Script src="https://js.stripe.com/v3/" />
        <body>
          <DesignSystemProvider>{children}</DesignSystemProvider>
        </body>
      </html>
    );

    export default RootLayout;
    ```
  </Step>
  <Step title="Add script to the website">
    Add the same script to the website in `apps/web/app/layout.tsx`.
  </Step>
  <Step title="Prevent common fraud patterns with Arcjet">
    Prevent common fraud patterns by using [Arcjet](/features/security/application) [IP address analysis](https://docs.arcjet.com/reference/nextjs#ip-analysis) to [block requests from VPNs and proxies](https://docs.arcjet.com/blueprints/vpn-proxy-detection). These are commonly used by fraudsters to hide their location, but have legitimate uses as well so are not blocked by default. You could simply block these users, or you could adjust the checkout process to require approval before processing their payment. 
  </Step>
</Steps>

For example, in `apps/app/app/(authenticated)/layout.tsx` you could add this after the call to `aj.protect()`:

```ts
import { redirect } from 'next/navigation';
// ...

if (
  decision.ip.isHosting() ||
  decision.ip.isVpn() ||
  decision.ip.isProxy() ||
  decision.ip.isRelay()
) {
  // The IP is from a hosting provider, VPN, or proxy. We can check the name
  // of the service and customize the response
  if (decision.ip.hasService()) {
    if (decision.ip.service !== 'Apple Private Relay') {
      // We trust Apple Private Relay because it requires an active iCloud
      // subscription, so deny all other VPNs
      redirect('/vpn-blocked');
    }
  } else {
    // The service name is not available, but we still think it's a VPN
    redirect('/vpn-blocked');
  }
}
```

In this case we are providing a friendly redirect to a page that explains why the user is being blocked (which you would need to create). You could also return a more generic error message. [See the Arcjet documentation](https://docs.arcjet.com/blueprints/payment-form#additional-checks) for more advanced examples.

### security


#### application
import { Authors } from '/snippets/authors.mdx';

<Authors data={[{
  user: {
    name: 'Hayden Bleasel',
    id: 'haydenbleasel',
  },
  company: {
    name: 'next-forge',
    id: 'next-forge',
  },
}, {
  user: {
    name: 'David Mytton',
    id: 'davidmytton',
  },
  company: {
    name: 'Arcjet',
    id: 'arcjet',
  },
}]} />

next-forge uses [Arcjet](https://arcjet.com/), a security as code product that includes several features that can be used individually or combined to provide defense in depth for your site. You can [sign up for a free account](https://arcjet.com/) and add the API key to the environment variables to use the features we have included.

<Note>Security is automatically enabled by the existence of the `ARCJET_KEY` environment variable.</Note>

## Philosophy

Proper security protections need the full context of the application, which is why security rules and protections should be located alongside the code they are protecting.

Arcjet security as code means you can version control your security rules, track changes through pull requests, and test them locally before deploying to production.

## Configuration

Arcjet is configured in next-forge with two main features: bot detection and the Arcjet Shield WAF:

- [Bot detection](https://docs.arcjet.com/bot-protection/concepts) is configured to allow search engines, preview link generators e.g. Slack and Twitter previews, and to allow common uptime monitoring services. All other bots, such as scrapers and AI crawlers, will be blocked. You can [configure additional bot types](https://docs.arcjet.com/bot-protection/identifying-bots) to allow or block.
- [Arcjet Shield WAF](https://docs.arcjet.com/shield/concepts) will detect and block common attacks such as SQL injection, cross-site scripting, and other [OWASP Top 10 vulnerabilities](https://owasp.org/www-project-top-ten/).

Both the `web` and `app` apps have Arcjet configured with a central client at `@repo/security`  that includes the Shield WAF rules. Each app then extends this client with additional rules:

### Web

For the `web` app, bot detection and the Arcjet Shield WAF are both configured in the Middleware to block scrapers and other bots, but still allow search engines, preview link generators, and monitoring services. This will run on every request by default, except for static assets.

### App

For `app`, the central client is extended in the authenticated route layout in `apps/app/app/(authenticated)/layout.tsx` with bot detection to block all bots except preview link generators. This will run just on authenticated routes. For additional protection you may want to configure Arcjet on the `apps/app/app/(unauthenticated)/layout.tsx` route as well, but Clerk includes bot detection and rate limiting in their login route handlers by default.

When a rule is triggered, the request will be blocked and an error returned. You can customize the error message in code, redirect to a different page, or handle the error in a different way as needed.

## Scaling up your security

next-forge includes a boilerplate setup for Arcjet that protects against common threats to SaaS applications, but since the rules are defined in code, you can easily adjust them dynamically at runtime.

For example, if you build out an API for your application you could use [Arcjet rate limiting](https://docs.arcjet.com/rate-limiting/quick-start) with different quotas depending on the pricing plan of the user.

Other features include [PII detection](https://docs.arcjet.com/sensitive-info/quick-start) and [email validation](https://docs.arcjet.com/email-validation/quick-start). They're not used in the boilerplate, but can be added as needed.

### What about DDoS attacks?

Network layer attacks are usually generic and high volume, making them best handled by your hosting platform. Most cloud providers offer network DDoS protection as a default feature.

Arcjet sits closer to your application so it can understand the context. This is important because some types of traffic may not look like a DDoS attack, but can still have the same effect e.g. making too many API requests. Arcjet works in all environments so there's no lock-in to platform-specific security.

Volumetric network attacks are best handled by your hosting provider. Application level attacks need to be handled by the application. That's where Arcjet helps.

#### dependencies
next-forge has Dependabot configured in `.github/dependabot.yml` to check for updates every month. When there are package updates, a pull request will be opened.

You may want to consider a dependency analysis tool like Socket to check for issues with dependencies in pull requests. We also recommend enabling [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning) or a tool [Gitleaks](https://github.com/gitleaks/gitleaks) or [Trufflehog](https://github.com/trufflesecurity/trufflehog) to check for secrets in your code.

#### headers
import { Authors } from '/snippets/authors.mdx';

<Authors data={[{
  user: {
    name: 'Hayden Bleasel',
    id: 'haydenbleasel',
  },
  company: {
    name: 'next-forge',
    id: 'next-forge',
  },
}, {
  user: {
    name: 'David Mytton',
    id: 'davidmytton',
  },
  company: {
    name: 'Arcjet',
    id: 'arcjet',
  },
}]} />

next-forge uses [Nosecone](https://docs.arcjet.com/nosecone/quick-start) to set HTTP response headers related to security.

## Configuration

Here are the headers we have enabled:

- `Cross-Origin-Embedder-Policy` (COEP)
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Resource-Policy`
- `Origin-Agent-Cluster`
- `Referrer-Policy`
- `Strict-Transport-Security` (HSTS)
- `X-Content-Type-Options`
- `X-DNS-Prefetch-Control`
- `X-Download-Options`
- `X-Frame-Options`
- `X-Permitted-Cross-Domain-Policies`
- `X-XSS-Protection`

See the [Nosecone reference](https://docs.arcjet.com/nosecone/reference) for details on each header and configuration options.

## Usage

Recommended headers are set by default and configured in `@repo/security/middleware`. Changing the configuration here will affect all apps.

They are then attached to the response within the middleware in `apps/app/middleware` and `apps/web/middleware.ts`. Adjusting the configuration in these files will only affect the specific app.

## Content Security Policy (CSP)

The CSP header is not set by default because it requires specific configuration based on the next-forge features you have enabled.

In the meantime, you can set the CSP header using the Nosecone configuration. For example, the following CSP configuration will work with the default next-forge features:

```ts
import type { NoseconeOptions } from '@nosecone/next';
import { defaults as noseconeDefaults } from '@nosecone/next';

const noseconeOptions: NoseconeOptions = {
  ...noseconeDefaults,
  contentSecurityPolicy: {
    ...noseconeDefaults.contentSecurityPolicy,
    directives: {
      ...noseconeDefaults.contentSecurityPolicy.directives,
      scriptSrc: [
        // We have to use unsafe-inline because next-themes and Vercel Analytics
        // do not support nonce
        // https://github.com/pacocoursey/next-themes/issues/106
        // https://github.com/vercel/analytics/issues/122
        //...noseconeDefaults.contentSecurityPolicy.directives.scriptSrc,
        "'self'",
        "'unsafe-inline'",
        "https://www.googletagmanager.com",
        "https://*.clerk.accounts.dev",
        "https://va.vercel-scripts.com",
      ],
      connectSrc: [
        ...noseconeDefaults.contentSecurityPolicy.directives.connectSrc,
        "https://*.clerk.accounts.dev",
        "https://*.google-analytics.com",
        "https://clerk-telemetry.com",
      ],
      workerSrc: [
        ...noseconeDefaults.contentSecurityPolicy.directives.workerSrc,
        "blob:",
        "https://*.clerk.accounts.dev"
      ],
      imgSrc: [
        ...noseconeDefaults.contentSecurityPolicy.directives.imgSrc,
        "https://img.clerk.com"
      ],
      objectSrc: [
        ...noseconeDefaults.contentSecurityPolicy.directives.objectSrc,
      ],
      // We only set this in production because the server may be started
      // without HTTPS
      upgradeInsecureRequests: process.env.NODE_ENV === "production",
    },
  },
}
```

#### ip-geolocation
import { Authors } from '/snippets/authors.mdx';

<Authors data={[{
  user: {
    name: 'Hayden Bleasel',
    id: 'haydenbleasel',
  },
  company: {
    name: 'next-forge',
    id: 'next-forge',
  },
}, {
  user: {
    name: 'David Mytton',
    id: 'davidmytton',
  },
  company: {
    name: 'Arcjet',
    id: 'arcjet',
  },
}]} />

next-forge uses [Arcjet](https://arcjet.com) for [application security](/features/security/application) which includes [IP details and geolocation information](https://docs.arcjet.com/reference/nextjs#ip-analysis) you can use in your application.

In the `app` application, Arcjet is called in the `apps/app/app/(authenticated)/layout.tsx` file which runs on every authenticated route.

For the `web` application, Arcjet is called in the middleware, which runs on every request except for static assets.

In both cases you could apply app-/website-wide rules based on the IP details, such as showing different content based on the user's location.

## Accessing IP location data

The IP details are available in the Arcjet decision object, which is returned from the all to `aj.protect()`. The IP location fields may be `undefined`, so you can use various utility functions to retrieve the data.

```ts
// ...
const decision = await aj.protect(req);

if (decision.ip.hasCity() && decision.ip.city === "San Francisco") {
  // Create a custom response for San Francisco
}

if (decision.ip.hasRegion() && decision.ip.region === "California") {
  // Create a custom response for California
}

if (decision.ip.hasCountry() && decision.ip.country === "US") {
  // Create a custom response for the United States
}

if (decision.ip.hasContinent() && decision.ip.continent === "NA") {
  // Create a custom response for North America
}
```

See the Arcjet [IP analysis reference](https://docs.arcjet.com/reference/nextjs#ip-analysis) for more information on the fields available.

## Accessing IP details elsewhere

Next.js does not allow passing data from [the root layout](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates) or middleware to other pages in your application. To access the IP details in other parts of your application, you need to remove the Arcjet call from the root layout (`app`) or middleware (`web`) and call it in the specific page where you need the IP details.

See the Arcjet documentation on how to call `aj.protect()` in [route handlers](https://docs.arcjet.com/reference/nextjs#protect), [pages / server components](https://docs.arcjet.com/reference/nextjs#pages--page-components), and [server actions](https://docs.arcjet.com/reference/nextjs#server-actions).

<Note>
  If you remove the Arcjet call from `apps/app/app/(authenticated)/layout.tsx` or `middleware.ts` it will no longer run on every request. You will need to call `aj.protect()` everywhere you wish to apply Arcjet rules, even if you don't need the IP details.
</Note>

#### rate-limiting
import { Authors } from '/snippets/authors.mdx';

<Authors data={[{
  user: {
    name: 'Hayden Bleasel',
    id: 'haydenbleasel',
  },
  company: {
    name: 'next-forge',
    id: 'next-forge',
  },
}, {
  user: {
    name: 'Fahreddin Özcan',
    id: 'fahreddin',
  },
  company: {
    name: 'Upstash',
    id: 'upstash',
  },
}]} />

<Frame>
  <img src="/images/rate-limit.png" alt="" />
</Frame>

Modern applications need rate limiting to protect against abuse, manage resources efficiently, and enable tiered API access. Without rate limiting, your application is vulnerable to brute force attacks, scraping, and potential service disruptions from excessive usage.

next-forge has a `rate-limit` package powered by [`@upstash/ratelimit`](https://github.com/upstash/ratelimit-js), a connectionless (HTTP-based) rate limiting library designed specifically for serverless and edge environments.

## Setting up

Rate limiting is enabled for the `web` package contact form automatically by the existence of a `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` environment variable. If enabled, the contact form will limit the number of requests to 1 per day per IP address.

To get your environment variables, you can sign up at [Upstash Console](https://console.upstash.com) and create a Redis KV database. You can then find the REST URL and REST token in the database details page. 

You can then paste these environment variables each of the [environment variables](/features/env) files.

## Adding rate limiting

You can add rate limiting to your API routes by using the `createRateLimiter` function. For example, to limit the number of AI requests to 10 per 10 seconds per IP address, you can do something like this:

```ts apps/app/api/chat/route.ts
import { currentUser } from '@repo/auth/server';
import { createRateLimiter, slidingWindow } from '@repo/rate-limit';

export const GET = async (request: NextRequest) => {
  const user = await currentUser();

  const rateLimiter = createRateLimiter({
    limiter: slidingWindow(10, '10 s'),
  });

  const { success } = await rateLimiter.limit(`ai_${user?.id}`);

  if (!success) {
    return new Response(
      JSON.stringify({ error: "Too many requests" }), 
      { status: 429 }
    );
  }
};
```

## Configuration

The `rate-limit` package connects to an [Upstash Redis](https://upstash.com/docs/redis/overall/getstarted) database and automatically limits the number of requests to your API routes.

The default rate limiting configuration allows 10 requests per 10 seconds per identifier. `@upstash/ratelimit` also has other rate limiting algorithms such as:

- Fixed Window
- Sliding Window
- Token Bucket

You can learn more about the different rate limiting strategies other features in the [Upstash documentation](https://upstash.com/docs/redis/sdks/ratelimit-ts/algorithms).

```ts packages/rate-limit/index.ts
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  prefix: "next-forge",
})
```

## Usage

You can use rate limiting in any API Route by importing it from the `rate-limit` package. For example:

```typescript apps/api/app/ratelimit/upstash/route.ts {7}
import { ratelimit } from "@repo/rate-limit";

export const GET = async (request: NextRequest) => {
  // Use any identifier like username, API key, or IP address
  const identifier = "your-identifier";
  
  const { success, limit, remaining } = await ratelimit.limit(identifier);
  
  if (!success) {
    return new Response(
      JSON.stringify({ error: "Too many requests" }), 
      { status: 429 }
    );
  }
  
  // Continue with your API logic
};
```

## Analytics

Upstash Ratelimit provides built-in analytics capabilities through the dashboard on [Upstash Console](https://console.upstash.com).  When enabled, Upstash collects information about:

- Hourly request patterns
- Identifier usage
- Success and failure rates

To enable analytics for your rate limiting, pass the `analytics` configuration to rate limit client:

```typescript packages/security/index.ts
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  prefix: "next-forge",
  analytics: true, // Enable Upstash analytics
})
```

### Dashboard

If the analytics is enabled, you can find information about how many requests were made with which identifiers and how many of the requests were blocked from the [Rate Limit dashboard in Upstash Console](https://console.upstash.com/ratelimit).

To find to the dashboard, simply click the three dots and choose the **Rate Limit Analytics** tab:

<Frame>
  <img src="/images/upstash-ratelimit-navbar.png" alt="Upstash Rate Limit Navbar" />
</Frame>

In the dashboard, you can find information on how many requests were accepted, how many were blocked and how many were received in total. Additionally, you can see requests over time; top allowed, rate limited and denied requests.

<Frame>
  <img src="/images/upstash-ratelimit-dashboard.png" alt="Upstash Rate Limit Dashboard" />
</Frame>

## Best Practices

<Steps>
  <Step title="Choose Appropriate Identifiers">
    Use meaningful identifiers for rate limiting like:

    - User IDs for authenticated requests
    - API keys for external integrations  
    - IP addresses for public endpoints
  </Step>

  <Step title="Configure Rate Limits">
    Consider your application's requirements and resources when setting limits. Start conservative and adjust based on usage patterns.
  </Step>

  <Step title="Implement Error Handling">
    Always return appropriate error responses when rate limits are exceeded. Include information about when the limit will reset if possible.
  </Step>

  <Step title="Monitor and Adjust">
    Use the analytics feature to monitor rate limit hits and adjust limits as needed based on actual usage patterns.
  </Step>
</Steps>

## Further Information

`@upstash/ratelimit` also provides several advanced features:

- **Caching**: Use in-memory caching to reduce Redis calls for blocked identifiers
- **Custom Timeouts**: Configure request timeout behavior
- **Multiple Limits**: Apply different rate limits based on user tiers
- **Custom Rates**: Adjust rate limiting based on batch sizes or request weight
- **Multi-Region Support**: Distribute rate limiting across multiple Redis instances for global applications

For detailed information about these features and their implementation, refer to the [Upstash Ratelimit documentation](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview).

### seo


#### json-ld
## Default Configuration

next-forge has a dedicated JSON+LD helper designed to create fully validated Google structured data, making your content more likely to be featured in Google Search results.

By default, structured data is implemented on the following pages:

- `Blog` for the blog index
- `BlogPosting` for the blog post pages

## Usage

Our `@repo/seo` package provides a JSON+LD helper built on `schema-dts`, allowing for structured data generation in a type-safe way. You can declare your own JSON+LD implementations like so:

```page.tsx
import { JsonLd } from '@repo/seo/json-ld';
import type { WithContext, YourInterface } from '@repo/seo/json-ld';

const jsonLd: WithContext<YourInterface> = {
  // ...
};

return <JsonLd code={jsonLd} />;
```

#### metadata
next-forge relies on Next.js's built-in [Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) API to handle most of our SEO needs. Specifically, the `@repo/seo` package provides a `createMetadata` function that you can use to generate metadata for your pages. For example:

```tsx page.tsx
import { createMetadata } from '@repo/seo/metadata';

export const metadata = createMetadata({
  title: 'My Page',
  description: 'My page description',
});
```

While this looks similar to just exporting a `metadata` object from your page, the `createMetadata` function deep merges your metadata with our default metadata, allowing you to customize only the metadata that you need to. It's also much easier to specify a cover photo for the page, for example:

```tsx page.tsx {6}
import { createMetadata } from '@repo/seo/metadata';

export const metadata = createMetadata({
  title: 'My Page',
  description: 'My page description',
  image: '/my-page-image.png',
});
```

#### sitemap
next-forge automatically generates the sitemap for the website using Next.js's built-in sitemap generation functionality (`sitemap.ts`). The generation process scans different directories in the project and creates sitemap entries for various types of content:

## Page Collection

The system first scans the `app` directory to collect all page routes:

1. Reads all directories in the `app` folder
2. Filters out:
   - Directories starting with underscore (`_`) which are typically internal/private routes
   - Directories starting with parentheses (`(`)  which are usually Next.js route groups
3. Uses the remaining directory names as valid page routes

## Content Collection

The system then scans two content directories:

### Blog Posts
- Reads all files in the `content/blog` directory
- Filters out:
  - Directory entries (only wants files)
  - Files starting with underscore
  - Files starting with parentheses
- Removes the `.mdx` extension from filenames

### Legal Pages
- Similarly scans the `content/legal` directory
- Applies the same filtering rules as blog posts
- Removes `.mdx` extensions

## Sitemap Generation

The final sitemap is generated by combining all these routes:

1. Adds the base URL as the root entry
2. Adds all page routes prefixed with the base URL
3. Adds all blog posts under the `blog/` path
4. Adds all legal pages under the `legal/` path

Each sitemap entry includes:
- A full URL (combining the base URL with the route)
- A `lastModified` timestamp (set to the current date)

The sitemap is automatically regenerated during each build, ensuring it stays up to date with your content.

### storage
next-forge has a `storage` package that provides a simple wrapper around [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) for file storage.

## Usage

### Server uploads

To use the `storage` package using Server Actions, follow the instructions on [Vercel's server action documentation](https://vercel.com/docs/storage/vercel-blob/server-upload#upload-a-file-using-server-actions).

```tsx page.tsx
import { put } from '@repo/storage';
import { revalidatePath } from 'next/cache';
 
export async function Form() {
  async function uploadImage(formData: FormData) {
    'use server';
    const imageFile = formData.get('image') as File;
    const blob = await put(imageFile.name, imageFile, {
      access: 'public',
    });
    revalidatePath('/');
    return blob;
  }
 
  return (
    <form action={uploadImage}>
      <label htmlFor="image">Image</label>
      <input type="file" id="image" name="image" required />
      <button>Upload</button>
    </form>
  );
}
```

<Tip>If you need to upload files larger than 4.5 MB, consider using client uploads.</Tip>

### Client uploads

For client side usage, check out the [Vercel's client upload documentation](https://vercel.com/docs/storage/vercel-blob/client-upload).

```tsx page.tsx
'use client';
 
import { type PutBlobResult } from '@repo/storage';
import { upload } from '@repo/storage/client';
import { useState, useRef } from 'react';
 
export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <>
      <h1>Upload Your Avatar</h1>
 
      <form
        onSubmit={async (event) => {
          event.preventDefault();
 
          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }
 
          const file = inputFileRef.current.files[0];
 
          const newBlob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/avatar/upload',
          });
 
          setBlob(newBlob);
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
```

### storybook
<Frame>
  <img src="/images/storybook.png" alt="next-forge uses Storybook." />
</Frame>

next-forge uses [Storybook](https://storybook.js.org/) as a frontend workshop for the design system. It allows you to interact with the components in the design system, and see how they behave in different states.

## Configuration

By default, Storybook is configured with every component from [shadcn/ui](https://ui.shadcn.com/), and allows you to interact with them. It is also configured with the relevant fonts and higher-order components to ensure a consistent experience between your application and Storybook.

## Running the workshop

Storybook will start automatically when you run `pnpm dev`. You can also start it independently with `pnpm dev --filter storybook`. The preview will be available at [localhost:6006](http://localhost:6006).

## Adding stories

You can add your own components to the workshop by adding them to the `apps/storybook/stories` directory. Each component should have its own `.stories.tsx` file.

### testing
<Frame>
  <img src="/images/testing.png" alt="" />
</Frame>

next-forge uses [Vitest](https://vitest.dev/) for unit testing. It's a fast and lightweight testing framework that's compatible with Jest's API. Unit tests are run automatically as part of the `build` task in Turborepo.

## Running Tests

To run tests, simply execute:

```sh Terminal
pnpm test
```

This will run all tests in the `__tests__` folder in each app, however we've only written a couple of tests for `app` project so far.

## Adding Tests

We use [Testing Library](https://testing-library.com/) for our tests. It's a great library that allows you to test your components in a way that's close to how a user would interact with them.

In the `__tests__` folder, create a new file called `[page].test.tsx` (where `[page]` is the name of the page you want to test). Here's an example of a test for the `home` page:

```tsx apps/app/__tests__/home.test.tsx
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Page from '../app/(unauthenticated)/home/page';

test('Home Page', () => {
  render(<Page />);
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Hello, world!',
    })
  ).toBeDefined();
});
```

## Adding Vitest to other apps

To add Vitest to another app, you'll need to install the dependencies:

```sh Terminal
pnpm install -D vitest @testing-library/react @testing-library/dom --filter [app]
```

as well as adding the `@repo/testing` package to the `devDependencies` section of the `package.json` file:

```json apps/[app]/package.json {2}
"devDependencies": {
  "@repo/testing": "workspace:*"
}
```

Create a new file called `vitest.config.ts` in the root of the app and add the following:

```ts apps/[app]/vitest.config.ts
export { default } from '@repo/testing';
```

Then, create a new file in the `__tests__` folder in the relevant app and add a `test` command to the `package.json` file:

```json apps/[app]/package.json {3}
{
  "scripts": {
    "test": "vitest"
  }
}
```

Turborepo will automatically pick up on the new `test` script and run the tests.

Then, just follow the instructions above to write tests.

### toolbar
The [Vercel Toolbar](https://vercel.com/docs/workflow-collaboration/vercel-toolbar) is a tool that allows you to leave feedback, navigate through important dashboard pages, share deployments, use Draft Mode for previewing unpublished content, and Edit Mode for editing content in real-time. next-forge has the Vercel Toolbar enabled by default.

## Link your applications

Go into each application and run `vercel link`, like so:

<CodeGroup>

```sh Terminal
cd apps/app
vercel link
```

```sh Terminal
cd apps/web
vercel link
```

```sh Terminal
cd apps/api
vercel link
```

</CodeGroup>

This will create a `.vercel/project.json` file in each application.

## Add the environment variable

Then, simply add a `FLAGS_SECRET` environment variable to each application's `.env.local` file, like so:

```js .env.local
FLAGS_SECRET="test"
```

These two steps are optional, but they are recommended to ensure that the Vercel Toolbar is enabled in each application.

### webhooks
next-forge supports sending webhooks to your users using [Svix](https://www.svix.com/). Svix is an enterprise-ready webhooks sending service.

<Note>
  Webhooks are automatically enabled by the existence of the `SVIX_TOKEN` environment variable.
</Note>

## How it works

next-forge uses the Svix API in a stateless manner. The organization ID from the authenticated user is used as the Svix application UID, which is created automatically when the first message is sent.

## Usage

### Send a webhook

To send a webhook, simply use the `send` function from the `@repo/webhooks` package:

```tsx
import { webhooks } from '@repo/webhooks';

await webhooks.send('invoice.created', {
  data: {
    id: 'inv_1234567890',
  },
});
```

### Add webhook endpoints

Svix provides a pre-built [consumer application portal](https://docs.svix.com/app-portal), where users add endpoints and manage everything related to their webhooks subscriptions. App portal access is based on short-lived sessions using special magic links, and can be [embed in an iframe in your dashboard](https://docs.svix.com/app-portal#embedding-in-a-react-application).

To get access to the application portal, use the `getAppPortal` function from `@repo/webhooks` and use the returned URL in an `iframe` on your dashboard.

```tsx
import { webhooks } from '@repo/webhooks';

const { url } = await webhooks.getAppPortal();

return (
  <iframe src={url} style="width: 100%; height: 100%; border: none;" allow="clipboard-write" loading="lazy" />
);
```

We have a prebuilt page at `/webhooks` that you can use as a starting point.

## Deployment
### netlify
<Frame>
  <img src="/images/deployment/netlify.png" alt="" />
</Frame>

To deploy next-forge on Netlify, you need to create 3 new projects for the `app`, `api` and `web` apps. After selecting your repository, change the "Site to deploy" selection to the app of choice e.g. `apps/app`. This should automatically detect the Next.js setup and as such, the build command and output directory.

Then, add all your environment variables to the project.

Finally, just hit "Deploy" and Netlify will take care of the rest!

## Environment variables

If you're deploying on Netlify, we recommend making use of the Shared Environment Variables feature. Variables used by libraries need to exist in all packages and duplicating them can be a headache. Learn more about how [environment variables](/features/env) work in next-forge.

### vercel
import { Authors } from '/snippets/authors.mdx';
import { VercelButton } from '/snippets/vercel.mdx';

<Authors data={[{
  user: {
    name: 'Hayden Bleasel',
    id: 'haydenbleasel',
  },
  company: {
    name: 'next-forge',
    id: 'next-forge',
  },
}, {
  user: {
    name: 'Anthony Shew',
    id: 'anthonysheww',
  },
  company: {
    name: 'Vercel',
    id: 'vercel',
  },
}]} />

<Frame>
  <img src="/images/deployment/vercel.png" alt="" />
</Frame>

To deploy next-forge on Vercel, you need to create 3 new projects for the `app`, `api` and `web` apps. After selecting your repository, change the Root Directory option to the app of choice e.g. `apps/app`. This should automatically detect the Next.js setup and as such, the build command and output directory.

Then, add all your environment variables to the project.

Finally, just hit "Deploy" and Vercel will take care of the rest!

Want to see it in action? next-forge is featured on the [Vercel Marketplace](https://vercel.com/templates/Next.js/next-forge) - try deploying the `app`:

<VercelButton />

## Environment variables

If you're deploying on Vercel, we recommend making use of the Team Environment Variables feature. Variables used by libraries need to exist in all packages and duplicating them can be a headache. Learn more about how [environment variables](/features/env) work in next-forge.

## Integrations

We also recommend installing the [BetterStack](https://vercel.com/integrations/betterstack) and [Sentry](https://vercel.com/integrations/sentry) integrations. This will take care of the relevant [environment variables](/features/env).

## Addons
### friendlier-words
### Installation

To install `friendlier-words`, simply run the following command:

```sh Terminal
pnpm add friendlier-words
```

### Usage

Here is an example of how to use `friendlier-words` for generating friendly words:

```tsx get-project-name.ts
import { friendlyWords } from 'friendlier-words';

// Default (2 segments, '-')
// e.g. robust-chicken, happy-cat, modest-pear
const words = friendlyWords();

// Custom (3 segments, '_')
// e.g. keen_explorer_oak, comforting_cactus_constructor, playful_tiger_breeze
const words = friendlyWords(3, '_');
```

### Benefits

- <Icon icon="check" iconType="solid" /> **Easy to Use**: `friendlier-words` is easy to use and generates friendly words with a simple API.
- <Icon icon="check" iconType="solid" /> **Customizable**: You can customize the number of segments and the separator.

For more information and detailed documentation, visit the [`friendlier-words` GitHub repo](https://github.com/haydenbleasel/friendlier-words).

### metabase
import { Authors } from '/snippets/authors.mdx';

<Authors data={[{
  user: {
    name: 'Hayden Bleasel',
    id: 'haydenbleasel',
  },
  company: {
    name: 'next-forge',
    id: 'next-forge',
  },
}, {
  user: {
    name: 'Matthew Hefferon',
    id: 'heffhq',
  },
  company: {
    name: 'Metabase',
    id: 'metabase',
  },
}]} />

While next-forge does not come with BI tooling out of the box, you can easily add business intelligence and analytics to your app with [Metabase](https://www.metabase.com/).

## Overview

Metabase is an open-source business intelligence platform. You can use Metabase to ask questions about your data, or embed Metabase in your app to let your customers explore their data on their own.

## Installing Metabase

Metabase provides an official Docker image via Dockerhub that can be used for deployments on any system that is running Docker. Here's a one-liner that will start a container running Metabase.

```sh
docker run -d --name metabase -p 3000:3000 metabase/metabase
```

You can also install Metabase by running the JAR file. Links to different installations:

- [Quick Start](https://www.metabase.com/start/oss/)
- [Docker Documentation](https://www.metabase.com/docs/latest/installation-and-operation/running-metabase-on-docker)
- [Jar File Documentation](https://www.metabase.com/docs/latest/installation-and-operation/running-the-metabase-jar-file)

## Database Connection

By default, next-forge uses Neon as its database provider. Metabase works great with Postgres databases so if you're ready to connect, here's what you'll need:

- The `hostname` of the server where your database lives
- The `port` the database server uses
- The `database name`
- The `username` you use for the database
- The `password` you use for the database

You can find these details in your `DATABASE_URL` environment variable:

```js
DATABASE_URL="postgresql://[username]:[password]@[hostname]:[port]/[database_name]?sslmode=require"
```

Next, plug your database connection credentials into Metabase:

<Frame>
  <img src="/images/metabase-add-database.png" style={{ borderRadius: '0.5rem' }} />
</Frame>

Metabase supports over 20 databases. If you're working with a database other than postgres and want to integrate it, check out the [Metabase Database Documentation](https://www.metabase.com/docs/latest/databases/connecting).

## Asking Questions and building Dashboards

Now that you have installed Metabase, have database credentials, you can start asking [Questions](https://www.metabase.com/docs/latest/questions/query-builder/introduction) and building [Dashboards](https://www.metabase.com/docs/latest/dashboards/introduction).

### motion
<Tip>Motion was formerly known as Framer Motion.</Tip>

### Installation

To install Motion, simply run the following command:

```sh Terminal
pnpm add motion
```

### Usage

Here is an example of how to use Motion to animate a component:

```tsx my-component.tsx
import { motion } from 'motion';

function MyComponent() {
  return (
    <motion.div animate={{ x: 100 }}>This is a component that is animated.</motion.div>
  );
}
```

### Benefits

- <Icon icon="check" iconType="solid" /> **Easy Animation**: Motion makes it easy to animate components with a simple and intuitive API.
- <Icon icon="check" iconType="solid" /> **Customization**: Motion allows you to customize animations to your needs, providing a high degree of control over the animation process.
- <Icon icon="check" iconType="solid" /> **Performance**: Motion is performant and has minimal impact on your application's performance.

For more information and detailed documentation, visit the [Motion website](https://motion.dev/).

### next-safe-action
### Installation

To install Next Safe Action, simply run the following command:

```sh Terminal
pnpm add next-safe-action zod --filter app
```

By default, Next Safe Action uses Zod to validate inputs, but it also supports adapters for Valibot, Yup, and Typebox.

### Basic Usage

Here is a basic example of how to use Next Safe Action to call your Server Actions:

<CodeGroup>

```ts action.ts
"use server"

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export const serverAction = createSafeActionClient()
  .schema(
    z.object({
      name: z.string(),
      id: z.string()
    })
  )
  .action(async ({ parsedInput: { name, id } }) => {
    // Fetch data in server
    const data = await fetchData(name, id);
    
    // Write server logic here ...
    
    // Return here the value to the client
    return data;
  });
```

```tsx my-component.tsx
"use client"

import { serverAction } from "./action"
import { useAction } from "next-safe-action/hooks";
import { toast } from "@repo/design-system/components/ui/sonner";

function MyComponent() {
  const { execute, isPending } = useAction(serverAction, {
    onSuccess() {
      // Display success message to client
      toast.success("Action Success");
    },
    onError({ error }) {
      // Display error message to client
      toast.error("Action Failed");
    },
  });

  const onClick = () => {
    execute({ name: "next-forge", id: "example" });
  };

  return (
    <div>
      <Button disabled={isPending} onClick={onClick}>
        Click to call action
      </Button>
    </div>
  );
}
```

</CodeGroup>


In this example, we create an action with input validation on the server, and call it on the client to with type-safe inputs and convinient callback utilities to simplify state management and error handling.

### Benefits

- <Icon icon="check" iconType="solid" /> **Simplified State Management**: Next Safe Action simplifies server action state management by providing callbacks and status utilities.
- <Icon icon="check" iconType="solid" /> **Type-safe**: By using Zod or other validation libraries, your inputs are type-safe and validated end-to-end.
- <Icon icon="check" iconType="solid" /> **Easy Integration**: Next Safe Action is extremely easy to integrate, and you can incrementally use more of its feature like optimistic updates and middlewares.

For more information and detailed documentation, visit the [Next Safe Action website](https://next-safe-action.dev).

### nuqs
### Installation

To install NUQS, simply run the following command:

```sh Terminal
pnpm add nuqs
```

### Usage

Here is an example of how to use NUQS for URL search parameter state management:

```tsx my-component.tsx
import { useSearchParams } from 'nuqs';

function MyComponent() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (event) => {
    setSearchParams({ query: event.target.value });
  };

  return (
    <div>
      <input
        type="text"
        value={searchParams.query || ''}
        onChange={handleInputChange}
      />
      <p>Search Query: {searchParams.query}</p>
    </div>
  );
}
```

In this example, the `useSearchParams` hook from NUQS is used to manage the state of the search query through URL search parameters. The `setSearchParams` function updates the URL search parameters whenever the input value changes.

### Benefits

- <Icon icon="check" iconType="solid" /> **Simplified State Management**: NUQS simplifies state management by using URL search parameters, making it easy to share and persist state across different parts of your application.
- <Icon icon="check" iconType="solid" /> **SEO-Friendly**: By using URL search parameters, NUQS helps improve the SEO of your application by making the state accessible through the URL.
- <Icon icon="check" iconType="solid" /> **Easy Integration**: NUQS is easy to integrate into your existing React application, providing a seamless experience for managing URL search parameters.

For more information and detailed documentation, visit the [NUQS website](https://nuqs.47ng.com/).

### react-wrap-balancer
### Installation

To install `react-wrap-balancer`, simply run the following command:

```sh Terminal
pnpm add react-wrap-balancer
```

### Usage

Here is an example of how to use `react-wrap-balancer` to make titles more readable:

```tsx my-component.tsx
import { Balancer } from 'react-wrap-balancer';

function MyComponent() {
  return (
    <div>
      <Balancer>This is a title that is too long to fit in one line.</Balancer>
    </div>
  );
}
```

### Benefits

- <Icon icon="check" iconType="solid" /> **Improved Readability**: `react-wrap-balancer` makes titles more readable by automatically wrapping them at the appropriate breakpoints.
- <Icon icon="check" iconType="solid" /> **Easy Integration**: `react-wrap-balancer` is easy to integrate into your existing React application, providing a seamless installation experience.

For more information and detailed documentation, visit the [react-wrap-balancer website](https://react-wrap-balancer.vercel.app/).

### zustand
### Installation

To install Zustand, run the following command:

```sh Terminal
pnpm add zustand
```

### Usage

Here is an example of how to use Zustand for state management:

```tsx counter.tsx
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

function Counter() {
  const { count, increment, decrement } = useStore();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

In this example, the `create` function from Zustand is used to create a store with a `count` state and `increment` and `decrement` actions. The `useStore` hook is then used in the `Counter` component to access the state and actions.

### Benefits

- <Icon icon="check" iconType="solid" /> **Simple API**: Zustand provides a simple and intuitive API for managing state in your React application.
- <Icon icon="check" iconType="solid" /> **Performance**: Zustand is optimized for performance, making it suitable for large-scale applications.
- <Icon icon="check" iconType="solid" /> **Scalability**: Zustand is scalable and can be used to manage state in applications of any size.

For more information and detailed documentation, visit the [Zustand website](https://zustand.docs.pmnd.rs/guides/nextjs).

## Migrations
### authentication


#### authjs
<Warning>
next-forge support for Auth.js is currently blocked by [this issue](https://github.com/nextauthjs/next-auth/issues/11076).
</Warning>

Here's how to switch from Clerk to [Auth.js](https://authjs.dev/).

## 1. Replace the dependencies

Uninstall the existing Clerk dependencies from the `auth` package...

```sh Terminal
pnpm remove @clerk/nextjs @clerk/themes @clerk/types --filter @repo/auth
```

... and install the Auth.js dependencies.

```sh Terminal
pnpm add next-auth@beta --filter @repo/auth
```

## 2. Generate an Auth.js secret

Auth.js requires a random value secret, used by the library to encrypt tokens and email verification hashes. In each of the relevant app directories, generate a secret with the following command:

```sh Terminal
cd apps/app && npx auth secret && cd -
cd apps/web && npx auth secret && cd -
cd apps/api && npx auth secret && cd -
```

This will automatically add an `AUTH_SECRET` environment variable to the `.env.local` file in each directory.

## 3. Replace the relevant files

Delete the existing `client.ts` and `server.ts` files in the `auth` package. Then, create the following file:

```tsx packages/auth/index.ts
import NextAuth from "next-auth";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
});
```

## 4. Update the middleware

Update the `middleware.ts` file in the `auth` package with the following content:

```tsx packages/auth/middleware.ts
import 'server-only';

export { auth as authMiddleware } from './';
```

## 5. Update the auth components

Auth.js has no concept of "sign up", so we'll use the `signIn` function to sign up users. Update both the `sign-in.tsx` and `sign-up.tsx` components in the `auth` package with the same content:

<CodeGroup>

```tsx packages/auth/components/sign-in.tsx
import { signIn } from '../';

export const SignIn = () => (
  <form
    action={async () => {
      "use server";
      await signIn();
    }}
  >
    <button type="submit">Sign in</button>
  </form>
);
```

```tsx packages/auth/components/sign-up.tsx
import { signIn } from '../';

export const SignUp = () => (
  <form
    action={async () => {
      "use server";
      await signIn();
    }}
  >
    <button type="submit">Sign up</button>
  </form>
);
```

</CodeGroup>

## 6. Update the Provider file

Auth.js has no concept of a Provider as a higher-order component, so you can either remove it entirely or just replace it with a stub, like so:

```tsx packages/auth/provider.tsx
import type { ReactNode } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => children;
```

## 7. Create an auth route handler

In your `app` application, create an auth route handler file with the following content:

```tsx apps/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@repo/auth"

export const { GET, POST } = handlers;
```

## 8. Update your apps

From here, you'll need to replace any remaining Clerk implementations in your apps with Auth.js references. This means swapping out references like:

```tsx page.tsx
const { orgId } = await auth();
const { redirectToSignIn } = await auth();
const user = await currentUser();
```

Etcetera. Keep in mind that you'll need to build your own "organization" logic as Auth.js doesn't have a concept of organizations.

#### better-auth
import { Authors } from '/snippets/authors.mdx';

<Authors data={[{
  user: {
    name: 'Hayden Bleasel',
    id: 'haydenbleasel',
  },
  company: {
    name: 'next-forge',
    id: 'next-forge',
  },
}, {
  user: {
    name: 'Bereket Engida',
    id: 'imbereket',
  },
  company: {
    name: 'Better Auth',
    id: 'better-auth',
  },
}]} />

Better Auth is a comprehensive, open-source authentication framework for TypeScript. It is designed to be framework agnostic, but integrates well with Next.js and provides a lot of features out of the box.

## 1. Swap out the `auth` package dependencies

Uninstall the existing Clerk dependencies from the `auth` package...

```sh Terminal
pnpm remove @clerk/nextjs @clerk/themes @clerk/types --filter @repo/auth
```

...and install the Better Auth dependencies:

```sh Terminal
pnpm add better-auth @repo/database --filter @repo/auth
```

## 2. Update your environment variables

Generate a secret with the following command to add it to the `.env.local` file in each Next.js application (`app`, `web` and `api`):

```sh Terminal
npx @better-auth/cli secret
```

This will add a `BETTER_AUTH_SECRET` environment variable to the `.env.local` file.

## 3. Setup the server and client auth

Update the `auth` package files with the following code:

<CodeGroup>

  ```ts packages/auth/server.ts
  import { betterAuth } from 'better-auth';
  import { nextCookies } from "better-auth/next-js";
  import { prismaAdapter } from "better-auth/adapters/prisma";
  import { database } from "@repo/database"

  export const auth = betterAuth({
    database: prismaAdapter(database, {
      provider: 'postgresql',
    }),
    plugins: [
      nextCookies()
      // organization() // if you want to use organization plugin
    ],
    //...add more options here
  });
  ```

  ```ts packages/auth/client.ts
  import { createAuthClient } from 'better-auth/react';

  export const { signIn, signOut, signUp, useSession } = createAuthClient();
  ```

</CodeGroup>

Read more in the Better Auth [installation guide](https://www.better-auth.com/docs/installation).

## 4. Update the auth components

Update both the `sign-in.tsx` and `sign-up.tsx` components in the `auth` package to use the `signIn` and `signUp` functions from the `client` file.

<CodeGroup>

  ```tsx packages/auth/components/sign-in.tsx
  "use client";

  import { signIn } from '../client';
  import { useState } from 'react';

  export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signIn.email({
            email,
            password,
            name
          })
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>
    );
  }
  ```

  ```tsx packages/auth/components/sign-up.tsx
  "use client";

  import { signUp } from '../client';
  import { useState } from 'react';

  export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signUp.email({
            email,
            password,
            name
          })
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
    );
  }
  ```

</CodeGroup>

You can use different sign-in methods like social providers, phone, username etc. Read more about Better Auth [basic usage](https://better-auth.com/docs/basic-usage).

## 5. Generate Prisma Models

From the root folder, generate Prisma models for Better Auth by running the following command:

```sh Terminal
npx @better-auth/cli generate --output ./packages/database/prisma/schema.prisma --config ./packages/auth/server.ts
```

<Warning>
You may have to comment out the `server-only` directive in `packages/database/index.ts` temporarily. Ensure you have environment variables set.
</Warning>

<Note>
Best practice is to have a `better-auth.ts` file, but we're just specifying the existing `server.ts` left over from Clerk here.
</Note>


## 6. Update the Provider file

Better Auth has no concept of a Provider as a higher-order component, so you can either remove it entirely or just replace it with a stub, like so:

```tsx packages/auth/provider.tsx
import type { ReactNode } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => children;
```

## 7. Change Middleware

Change the middleware in the `auth` package to the following:

```tsx packages/auth/middleware.ts
import { NextRequest } from "next/server";
import { createAuthClient } from "better-auth/client";

const { getSession } = createAuthClient();

const isProtectedRoute = (request: NextRequest) => {
  return request.url.startsWith("/dashboard"); // change this to your protected route
}

export const authMiddleware = async (request: NextRequest) => {
  const session = await getSession(request);
  
  if (isProtectedRoute(request) && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  
  return NextResponse.next();
}
```

## 8. Update your apps

From here, you'll need to replace any remaining Clerk implementations in your apps with Better Auth.

Here is some inspiration:

```tsx
const user = await currentUser();
const { redirectToSignIn } = await auth();

// to

const session = await auth.api.getSession({
  headers: await headers(), // from next/headers
});
if (!session?.user) {
  return redirect('/sign-in'); // from next/navigation
}
// do something with session.user
```

```tsx
const { orgId } = await auth();

// to

const h = await headers(); // from next/headers
const session = await auth.api.getSession({
  headers: h,
});
const orgId = session?.session.activeOrganizationId;
const fullOrganization = await auth.api.getFullOrganization({
  headers: h,
  query: { organizationId: orgId },
});
```

```tsx webhooks/stripe/route.ts
import { clerkClient } from '@repo/auth/server';

const clerk = await clerkClient();
const users = await clerk.users.getUserList();
const user = users.data.find(
  (user) => user.privateMetadata.stripeCustomerId === customerId
);

// to

import { database } from '@repo/database';

const user = await database.user.findFirst({
  where: {
    privateMetadata: {
      contains: { stripeCustomerId: customerId },
    },
  },
});
```


For using organization, check [organization plugin](https://better-auth.com/docs/plugins/organization) and more from the [Better Auth documentation](https://better-auth.com/docs).

### cms


#### content-collections
It's possible to switch to [Content Collections](https://www.content-collections.dev/) to generate type-safe data collections from MDX files. This approach provides a structured way to manage blog posts while maintaining full type safety throughout your application.

## 1. Swap out the required dependencies

Remove the existing dependencies...

```sh Terminal
pnpm remove basehub --filter @repo/cms
```

... and install the new dependencies...

```sh Terminal
pnpm add @content-collections/mdx fumadocs-core --filter @repo/cms
pnpm add -D @content-collections/cli @content-collections/core @content-collections/next --filter @repo/cms
```

## 2. Update the `.gitignore` file

Add `.content-collections` to the `.gitignore` file:

```git apps/web/.gitignore {1-2}
# content-collections
.content-collections
```

## 3. Modify the CMS package scripts

Now we need to modify the CMS package scripts to replace the `basehub` commands with `content-collections`.

```json packages/cms/package.json {3-5}
{
  "scripts": {
    "dev": "content-collections build",
    "build": "content-collections build",
    "analyze": "content-collections build"
  },
}
```

<Note>
  We're using the Content Collections CLI directly to generate the collections prior to Next.js processes. The files are cached and not rebuilt in the Next.js build process. This is a workaround for [this issue](https://github.com/sdorra/content-collections/issues/214).
</Note>

## 4. Modify the relevant CMS package files

<CodeGroup>

```ts packages/cms/next-config.ts
export { withContentCollections as withCMS } from '@content-collections/next';
```

```ts packages/cms/index.ts
import { allPosts, allLegals } from 'content-collections';

export const blog = {
  postsQuery: null,
  latestPostQuery: null,
  postQuery: (slug: string) => null,
  getPosts: async () => allPosts,
  getLatestPost: async () =>
    allPosts.sort((a, b) => a.date.getTime() - b.date.getTime()).at(0),
  getPost: async (slug: string) =>
    allPosts.find(({ _meta }) => _meta.path === slug),
};

export const legal = {
  postsQuery: null,
  latestPostQuery: null,
  postQuery: (slug: string) => null,
  getPosts: async () => allLegals,
  getLatestPost: async () =>
    allLegals.sort((a, b) => a.date.getTime() - b.date.getTime()).at(0),
  getPost: async (slug: string) =>
    allLegals.find(({ _meta }) => _meta.path === slug),
};
```

```tsx packages/cms/components/body.tsx
import { MDXContent } from '@content-collections/mdx/react';
import type { ComponentProps } from 'react';

type BodyProperties = Omit<ComponentProps<typeof MDXContent>, 'code'> & {
  content: ComponentProps<typeof MDXContent>['code'];
};

export const Body = ({ content, ...props }: BodyProperties) => (
  <MDXContent {...props} code={content} />
);
```

```ts packages/cms/typescript-config.json
{
  "compilerOptions": {
    "paths": {
      "content-collections": ["./.content-collections/generated"]
    }
  }
}
```

```tsx packages/cms/components/toolbar.tsx
export const Toolbar = () => null;
```

```tsx packages/cms/components/toc.tsx
import { getTableOfContents } from 'fumadocs-core/server';

type TableOfContentsProperties = {
  data: string;
};

export const TableOfContents = async ({
  data,
}: TableOfContentsProperties) => {
  const toc = await getTableOfContents(data);

  return (
    <ul className="flex list-none flex-col gap-2 text-sm">
      {toc.map((item) => (
        <li
          key={item.url}
          style={{
            paddingLeft: `${item.depth - 2}rem`,
          }}
        >
          <a
            href={item.url}
            className="line-clamp-3 flex rounded-sm text-foreground text-sm underline decoration-foreground/0 transition-colors hover:decoration-foreground/50"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
```

</CodeGroup>

## 5. Update the `sitemap.ts` file

Update the `sitemap.ts` file to scan the `content` directory for MDX files:

```tsx apps/web/app/sitemap.ts
// ...

const blogs = fs
  .readdirSync('content/blog', { withFileTypes: true })
  .filter((file) => !file.isDirectory())
  .filter((file) => !file.name.startsWith('_'))
  .filter((file) => !file.name.startsWith('('))
  .map((file) => file.name.replace('.mdx', ''));

const legals = fs
  .readdirSync('content/legal', { withFileTypes: true })
  .filter((file) => !file.isDirectory())
  .filter((file) => !file.name.startsWith('_'))
  .filter((file) => !file.name.startsWith('('))
  .map((file) => file.name.replace('.mdx', ''));

// ...
```

## 6. Create your collections

Create a new content collections file in the `cms` package, then import the collections in the `web` package.

<Note>We're remapping the `title` field to `_title` and the `_meta.path` field to `_slug` to match the default next-forge CMS.</Note>

<CodeGroup>

```ts packages/cms/collections.ts
import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';

const posts = defineCollection({
  name: 'posts',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    image: z.string(),
    authors: z.array(z.string()),
    tags: z.array(z.string()),
  }),
  transform: async ({ title, ...page }, context) => {
    const body = await context.cache(page.content, async () =>
      compileMDX(context, page)
    );

    return {
      ...page,
      _title: title,
      _slug: page._meta.path,
      body,
    };
  },
});

const legals = defineCollection({
  name: 'legal',
  directory: 'content/legal',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string(),
  }),
  transform: async ({ title, ...page }, context) => {
    const body = await context.cache(page.content, async () =>
      compileMDX(context, page)
    );

    return {
      ...page,
      _title: title,
      _slug: page._meta.path,
      body,
    };
  },
});

export default defineConfig({
  collections: [posts, legals],
});
```

```ts packages/web/content-collections.ts
export { default } from '@repo/cms/collections';
```

</CodeGroup>

## 7. Create your content

To create a new blog post, add a new MDX file to the `apps/web/content/blog` directory. The file name will be used as the slug for the blog post and the frontmatter will be used to generate the blog post page. For example:

```mdx apps/web/content/blog/my-first-post.mdx
---
title: 'My First Post'
description: 'This is my first blog post'
date: 2024-10-23
image: /blog/my-first-post.png
---
```

The same concept applies to the `legal` collection, which is used to generate the legal policy pages. Also, the `image` field is the path relative to the app's root `public` directory.

## 8. Remove the environment variables

Finally, remove all instances of `BASEHUB_TOKEN` from the `@repo/env` package.

## 9. Bonus features

### Fumadocs MDX Plugins

You can use the [Fumadocs](/migrations/documentation/fumadocs) MDX plugins to enhance your MDX content.

```ts {1-6,8-13,20-23}
import {
  type RehypeCodeOptions,
  rehypeCode,
  remarkGfm,
  remarkHeading,
} from 'fumadocs-core/mdx-plugins';

const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: 'catppuccin-mocha',
    dark: 'catppuccin-mocha',
  },
};

const posts = defineCollection({
  // ...
  transform: async (page, context) => {
    // ...
    const body = await context.cache(page.content, async () =>
      compileMDX(context, page, {
        remarkPlugins: [remarkGfm, remarkHeading],
        rehypePlugins: [[rehypeCode, rehypeCodeOptions]],
      })
    );

    // ...
  },
});
```

### Reading Time

You can calculate reading time for your collection by adding a transform function.

```ts {1,10}
import readingTime from 'reading-time';

const posts = defineCollection({
  // ...
  transform: async (page, context) => {
    // ...

    return {
      // ...
      readingTime: readingTime(page.content).text,
    };
  },
});
```

### Low-Quality Image Placeholder (LQIP)

You can generate a low-quality image placeholder for your collection by adding a transform function.

```ts {1,8-19,23,24}
import { sqip } from 'sqip';

const posts = defineCollection({
  // ...
  transform: async (page, context) => {
    // ...

    const blur = await context.cache(page._meta.path, async () =>
      sqip({
        input: `./public/${page.image}`,
        plugins: [
          'sqip-plugin-primitive',
          'sqip-plugin-svgo',
          'sqip-plugin-data-uri',
        ],
      })
    );

    const result = Array.isArray(blur) ? blur[0] : blur;

    return {
      // ...
      image: page.image,
      imageBlur: result.metadata.dataURIBase64 as string,
    };
  },
});
```

### database


#### drizzle
import { Authors } from '/snippets/authors.mdx';

<Authors data={[{
  user: {
    name: 'Hayden Bleasel',
    id: 'haydenbleasel',
  },
  company: {
    name: 'next-forge',
    id: 'next-forge',
  },
}, {
  user: {
    name: 'Alex Blokh',
    id: 'alexblokh',
  },
  company: {
    name: 'Drizzle',
    id: 'drizzle',
  },
}]} />

Drizzle is a brilliant, type-safe ORM growing quickly in popularity. If you want to switch to Drizzle, you have two options:

1. Keep Prisma and add the Drizzle API to the Prisma client. Drizzle have a [great guide](https://orm.drizzle.team/docs/prisma) on how to do this.
2. Go all-in and switch to Drizzle.

Here, we'll assume you have a working Neon database and cover the second option.

## 1. Swap out the required dependencies in `@repo/database`

Uninstall the existing dependencies...

```sh Terminal
pnpm remove @prisma/adapter-neon @prisma/client prisma --filter @repo/database
```

...and install the new ones:

```sh Terminal
pnpm add drizzle-orm --filter @repo/database
pnpm add -D drizzle-kit --filter @repo/database
```

## 2. Update the database connection code

Delete everything in `@repo/database/index.ts` and replace it with the following:

```ts packages/database/index.ts
import 'server-only';

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { env } from '@repo/env';

const client = neon(env.DATABASE_URL);

export const database = drizzle({ client });
```

## 3. Create a `drizzle.config.ts` file

Next we'll create a Drizzle configuration file, used by Drizzle Kit and contains all the information about your database connection, migration folder and schema files. Create a `drizzle.config.ts` file in the `packages/database` directory with the following contents:

```ts packages/database/drizzle.config.ts
import { defineConfig } from 'drizzle-kit';
import { env } from '@repo/env';

export default defineConfig({
  schema: './schema.ts',
  out: './',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
```

## 4. Generate the schema file

Drizzle uses a schema file to define your database tables. Rather than create one from scratch, we can generate it from the existing database. In the `packages/database` folder, run the following command to generate the schema file:

```sh
npx drizzle-kit pull
```

This should pull the schema from the database, creating a `schema.ts` file containing the table definitions and some other files.

## 5. Update your queries

Now you can update your queries to use the Drizzle ORM.

For example, here's how we can update the `page` query in `app/(authenticated)/page.tsx`:

```ts apps/app/app/(authenticated)/page.tsx {2, 7}
import { database } from '@repo/database';
import { page } from '@repo/database/schema';

// ...

const App = async () => {
  const pages = await database.select().from(page);

  // ...
};

export default App;
```

## 6. Remove Prisma Studio

You can also delete the now unused Prisma Studio app located at `apps/studio`:

```sh Terminal
rm -fr apps/studio
```

## 7. Update the migration script in the root `package.json`

Change the migration script in the root `package.json` from Prisma to Drizzle. Update the `migrate` script to use Drizzle commands:

```json
"scripts": {
  "db:migrate": "cd packages/database && npx drizzle-kit migrate"
  "db:generate": "cd packages/database && npx drizzle-kit generate"
  "db:pull": "cd packages/database && npx drizzle-kit pull"
}
```

#### planetscale
Here's how to switch from Neon to [PlanetScale](https://planetscale.com).

## 1. Create a new database on PlanetScale

Once you create a database on PlanetScale, you will get a connection string. It will look something like this:

```
mysql://<username>:<password>@<region>.aws.connect.psdb.cloud/<database>
```

Keep this connection string handy, you will need it in the next step.

## 2. Update your environment variables

Update your environment variables to use the new PlanetScale connection string:

```js apps/database/.env
DATABASE_URL="mysql://<username>:<password>@<region>.aws.connect.psdb.cloud/<database>"
```

```js apps/app/.env.local
DATABASE_URL="mysql://<username>:<password>@<region>.aws.connect.psdb.cloud/<database>"
```

Etcetera.

## 3. Swap out the required dependencies in `@repo/database`

Uninstall the existing dependencies...

```sh Terminal
pnpm remove @neondatabase/serverless @prisma/adapter-neon ws @types/ws --filter @repo/database
```

...and install the new ones:

```sh Terminal
pnpm add @planetscale/database @prisma/adapter-planetscale --filter @repo/database
```

## 4. Update the database connection code

Update the database connection code to use the new PlanetScale adapter:

```ts packages/database/index.ts {3-4, 17-18}
import 'server-only';

import { Client, connect } from '@planetscale/database';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { PrismaClient } from '@prisma/client';
import { env } from '@repo/env';

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

const client = connect({ url: env.DATABASE_URL });
const adapter = new PrismaPlanetScale(client);

export const database = new PrismaClient({ adapter });
```

## 5. Update your Prisma schema

Update your Prisma schema to use the new database provider:

```prisma packages/database/prisma/schema.prisma {10}
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"
}

// This is a stub model.
// Delete it and add your own Prisma models.
model Page {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

## 6. Add a `dev` script

Add a `dev` script to your `package.json`:

```json packages/database/package.json {3}
{
  "scripts": {
    "dev": "pscale connect [database_name] [branch_name] --port 3309"
  }
}
```

#### prisma-postgres
import { Authors } from '/snippets/authors.mdx';

<Authors data={[{
  user: {
    name: 'Hayden Bleasel',
    id: 'haydenbleasel',
  },
  company: {
    name: 'next-forge',
    id: 'next-forge',
  },
}, {
  user: {
    name: 'Nikolas Burk',
    id: 'nikolasburk',
  },
  company: {
    name: 'Prisma',
    id: 'prisma',
  },
}]} />

Here's how to switch from Neon to [Prisma Postgres](https://www.prisma.io/postgres) — a serverless database with zero cold starts and a generous free tier. You can learn more about its architecture that enables this [here](https://www.prisma.io/blog/announcing-prisma-postgres-early-access).

## 1. Create a new Prisma Postgres instance

Start by creating a new Prisma Postgres instance via the [Prisma Data Platform](https://console.prisma.io/) and get your connection string. It will look something like this:

```
prisma+postgres://accelerate.prisma-data.net/?api_key=ey....
```

## 2. Update your environment variables

Update your environment variables to use the new Prisma Postgres connection string:

```js apps/database/.env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=ey...."
```

## 3. Swap out the required dependencies in `@repo/database`

Uninstall the existing dependencies...

```sh Terminal
pnpm remove @neondatabase/serverless @prisma/adapter-neon ws @types/ws
```

... and install the new dependencies:

```sh Terminal
pnpm add @prisma/extension-accelerate
```

## 4. Update the database connection code

Update the database connection code to use the new Prisma Postgres adapter:

```ts packages/database/index.ts {4,7}
import 'server-only';

import { env } from '@repo/env';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client';

export const database = new PrismaClient().$extends(withAccelerate());
```

Your project is now configured to use your Prisma Postgres instance for migrations and queries.

## 5. Explore caching and real-time database events

Note that thanks to the first-class integration of other Prisma products, Prisma Postgres comes with additional features out-of-the-box that you may find useful:

- [Prisma Accelerate](https://www.prisma.io/accelerate): Enables connection pooling and global caching
- [Prisma Pulse](https://www.prisma.io/pulse): Enables real-time streaming of database events

### Caching

To cache a query with Prisma Client, you can add the [`swr`](https://www.prisma.io/docs/accelerate/caching#stale-while-revalidate-swr) and [`ttl`](https://www.prisma.io/docs/accelerate/caching#time-to-live-ttl) options to any given query, for example:

```ts page.tsx
const pages = await prisma.page.findMany({
  swr: 60, // 60 seconds
  ttl: 60  // 60 seconds
});
```

Learn more in the [Accelerate documentation](https://www.prisma.io/docs/accelerate).

### Real-time database events

To stream database change events from your database, you first need to install the Pulse extension:

```sh Terminal
pnpm add @prisma/extension-pulse
```

Next, you need to add your Pulse API key as an environment variable:

```ts apps/database/.env
PULSE_API_KEY="ey...."
```

<Info>
  You can find your Pulse API key in your Prisma Postgres connection string, it's the value of the `api_key` argument and starts with `ey...`. Alternatively, you can find the API key in your [Prisma Postgres Dashboard](https://console.prisma.io).
</Info>

Then, update the `env` package to include the new `PULSE_API_KEY` environment variable:

```ts packages/env/index.ts {3,11}
export const server = {
  // ...
  PULSE_API_KEY: z.string().min(1).startsWith('ey'),
};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    // ...
    PULSE_API_KEY: process.env.PULSE_API_KEY,
  },
});
```

Finally, update the database connection code to include the Pulse extension:

```ts packages/database/index.ts {2, 7-9}
import 'server-only';
import { withPulse } from '@prisma/extension-pulse';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client';
import { env } from '@repo/env';

export const database = new PrismaClient()
  .$extends(withAccelerate())
  .$extends(withPulse({ apiKey: env.PULSE_API_KEY })) ;
```

You can now stream any change events from your database using the following code:

```ts page.tsx
const stream = await prisma.page.stream();

console.log(`Waiting for an event on the \`Page\` table ... `);

for await (const event of stream) {
  console.log('Received an event:', event);
}
```

Learn more in the [Pulse documentation](https://www.prisma.io/docs/pulse).

#### supabase
[Supabase](https://supabase.com) is an open source Firebase alternative providing a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, and Storage.

`next-forge` uses Neon as the database provider with Prisma as the ORM as well as Clerk for authentication. This guide will provide the steps you need to switch the database provider from Neon to Supabase. This guide is based on a few existing resources, including [Supabase's guide](https://supabase.com/partners/integrations/prisma) and [Prisma's guide](https://www.prisma.io/docs/orm/overview/databases/supabase).

<Note>
 For authentication, another guide will be provided to switch to Supabase Auth with feature parity to Clerk like organization management, user roles, and more (coming soon).
</Note>

Here's how to switch from Neon to [Supabase](https://supabase.com) for your `next-forge` project.

## 1. Sign up to Supabase

Create a free account at [supabase.com](https://supabase.com). You can manage your projects through the Dashboard or use the [Supabase CLI](https://supabase.com/docs/guides/local-development).

_We'll be using both the Dashboard and CLI throughout this guide._

## 2. Create a Project

Create a new project from the [Supabase Dashboard](https://supabase.com/dashboard). Give it a name and choose your preferred region. Once created, you'll get access to your project's connection details. Head to the **Settings** page, then click on **Database**.

We'll need to keep track of the following for the next step:

- The Database URL in `Transaction` mode, with the port ending in `6543`. We'll call this `DATABASE_URL`.
- The Database URL in `Session` mode, with the port ending in `5432`. We'll call this `DIRECT_URL`.

## 3. Update the environment variables

Update the `.env` file with the Supabase connection details. Make sure you add `?pgbouncer=true&connection_limit=1` to the end of the `DATABASE_URL` value. 

```js .env
DATABASE_URL="postgres://postgres:postgres@127.0.0.1:54322/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgres://postgres:postgres@127.0.0.1:54322/postgres"
```

<Note>
`pgbouncer=true` disables Prisma from generating prepared statements. This is required since our connection pooler does not support prepared statements in transaction mode yet. The `connection_limit=1` parameter is only required if you are using Prisma from a serverless environment.
</Note>

## 4. Replace the dependencies

Prisma doesn't have a Supabase adapter yet, so we just need to remove the Neon adapter and connect to Supabase directly.

First, remove the Neon dependencies from the project...

```sh Terminal
pnpm remove @neondatabase/serverless @prisma/adapter-neon ws @types/ws --filter @repo/database
```

... and add the Supabase dependencies:

```sh Terminal
pnpm install -D supabase --filter @repo/database
```

## 5. Update the database package

Update the `database` package. We'll remove the Neon extensions and connect to Supabase directly, which should automatically use the environment variables we set earlier.

```ts packages/database/index.ts
import 'server-only';
import { PrismaClient } from '@prisma/client';

export const database = new PrismaClient();

export * from '@prisma/client';
```

## 6. Update the Prisma schema

Update the `prisma/schema.prisma` file so it contains the `DIRECT_URL`. This allows us to use the Prisma CLI to perform other actions on our database (e.g. migrations) by bypassing Supavisor.

```js prisma/schema.prisma {4}
datasource db {
  provider     = "postgresql"
  url          = env("DATABASE_URL")
  directUrl    = env("DIRECT_URL")
  relationMode = "prisma"
}
```

Now you can run the migration from the root of your `next-forge` project:

```sh Terminal
pnpm run migrate
```

#### turso
import { Authors } from "/snippets/authors.mdx";

<Authors
  data={[
    {
      user: {
        name: "Hayden Bleasel",
        id: "haydenbleasel",
      },
      company: {
        name: "next-forge",
        id: "next-forge",
      },
    },
    {
      user: {
        name: "Jamie Barton",
        id: "notrab",
      },
      company: {
        name: "Turso",
        id: "turso",
      },
    },
  ]}
/>

[Turso](https://turso.tech) is multi-tenant database platform built for all types of apps, including AI apps with on-device RAG, local-first vector search, offline writes, and privacy-focused data access with low latency.

Here's how to switch from Neon to [Turso](https://turso.tech) for your `next-forge` project.

## 1. Sign up to Turso

You can use the [Dashboard](https://app.turso.tech), or the [CLI](https://docs.turso.tech/cli) to manage your account, database, and auth tokens.

_We'll be using the CLI throughout this guide._

## 2. Create a Database

Create a new database and give it a name using the Turso CLI:

```sh Terminal
turso db create <database-name>
```

You can now fetch the URL to the database:

```sh Terminal
turso db show <database-name> --url
```

It will look something like this:

```
libsql://<database-name>-<account-or-org-slug>.turso.io
```

## 3. Create a Database Auth Token

You will need to create an auth token to connect to your Turso database:

```sh Terminal
turso db tokens create <database-name>
```

## 4. Update your environment variables

Update your environment variables to use the new Turso connection string:

```js apps/database/.env
DATABASE_URL="libsql://<database-name>-<account-or-org-slug>.turso.io"
DATABASE_AUTH_TOKEN="..."
```

```js apps/app/.env.local
DATABASE_URL="libsql://<database-name>-<account-or-org-slug>.turso.io"
DATABASE_AUTH_TOKEN="..."
```

Etcetera.

Now inside `packages/env/index.ts`, add `DATABASE_AUTH_TOKEN` to the `server` and `runtimeEnv` objects:

```ts {3,12}
const server: Parameters<typeof createEnv>[0]["server"] = {
  // ...
  DATABASE_AUTH_TOKEN: z.string(),
  // ...
};

export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    // ...
    DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
    // ...
  },
});
```

## 5. Install @libsql/client

The [`@libsql/client`](https://www.npmjs.com/@libsql/client) is used to connect to the hosted Turso database.

Uninstall the existing dependencies for Neon...

```sh Terminal
pnpm remove @neondatabase/serverless @prisma/adapter-neon ws @types/ws --filter @repo/database
```

... and install the new dependencies for Turso & libSQL:

```sh Terminal
pnpm add @libsql/client --filter @repo/database
```

## 6. Update Webpack configuration

Open `packages/next-config/index.ts` and add `@libsql/client` to the list of externals:

```ts packages/next-config/index.ts {5}
let nextConfig: NextConfig = {
  ...config,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), "@libsql/client"];
    }

    // ...
  },
};
```

## 7. Update the database connection code

Open `packages/database/index.ts` and make the following changes:

```ts packages/database/index.ts
import "server-only";

import { createClient } from "@libsql/client";
import { env } from "@repo/env";

const libsql = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const database = libsql;
```

## 8. Apply schema changes

Now connect to the Turso database using the CLI:

```sh Terminal
turso db shell <database-name>
```

And apply the schema to the database:

```sql
CREATE TABLE pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT
);
```

## 9. Update application code

Now wherever you would usually call Prisma, use the `libsql` client instead:

```ts packages/app/app/(authenticated)/page.tsx
import { database } from "@repo/database";

type PageType = {
  id: number;
  email: string;
  name?: string;
};

// ...

const { rows } = await database.execute(`SELECT * FROM pages`);

const pages = rows as unknown as Array<PageType>;
```

### documentation


#### fumadocs
import { Authors } from '/snippets/authors.mdx';

<Authors data={[{
  user: {
    name: 'Hayden Bleasel',
    id: 'haydenbleasel',
  },
  company: {
    name: 'next-forge',
    id: 'next-forge',
  },
}, {
  user: {
    name: 'Fuma Nama',
    id: 'fuma-nama',
  },
  company: {
    name: 'Fumadocs',
    id: 'fumadocs',
  },
}]} />

[Fumadocs](https://fumadocs.vercel.app) is a beautiful & powerful docs framework powered by Next.js, allowing advanced customisations.

## 1. Create a Fumadocs App

Fumadocs is similar to a set of libraries built on **Next.js App Router**, which works very differently from a hosted solution like Mintlify, or other frameworks/static site generator that takes complete control over your app.

To begin, you can use a command to initialize a Fumadocs app quicky:

```sh Terminal
pnpm create fumadocs-app
```

Here we assume you have enabled Fumadocs MDX, Tailwind CSS, and without a default ESLint config.

### What is a Content Source?

The input/source of your content, it can be a CMS, or local data layers like **Content Collections** and **Fumadocs MDX** (the official content source).

Fumadocs is designed carefully to allow a custom content source, there's also examples for [Sanity](https://github.com/fuma-nama/fumadocs-sanity) if you are interested.

<Note>`lib/source.ts` is where you organize code for content sources.</Note>

### Update your Tailwind CSS

Start the app with `pnpm dev`.

If some styles are missing, it could be due to your monorepo setup, you can change the `content` property in your Tailwind CSS config (`tailwind.config.mjs`) to ensure it works:

```js tailwind.config.mjs
export default {
  content: [
    // from
    './node_modules/fumadocs-ui/dist/**/*.js',
    // to
    '../../node_modules/fumadocs-ui/dist/**/*.js',

    './components/**/*.{ts,tsx}',
    // ...
  ],
};
```

You can either keep the Tailwind config file isolated to the docs, or merge it with your existing config from the `tailwind-config` package.

## 2. Migrate MDX Files

Fumadocs, same as Mintlify, utilize MDX for content files. You can move the `.mdx` files from your Mintlify app to `content/docs` directory.

<Note>Fumadocs requires a `title` frontmatter property.</Note>

The MDX syntax of Fumadocs is almost identical to Mintlify, despite from having different components and usage for code blocks. Visit [Markdown](https://fumadocs.vercel.app/docs/ui/markdown) for supported Markdown syntax.

### Code Block

Code block titles are formatted with `title="Title"`.

<CodeGroup>

````sh Mintlify
```sh Name
pnpm i
```
````

````sh Fumadocs
```sh title="Name"
pnpm i
```
````

</CodeGroup>

Code highlighting is done with an inline comment.

<CodeGroup>

````ts Mintlify
```ts {1}
console.log('Highlighted');
```
````

````ts Fumadocs
```ts
console.log('Highlighted'); // [!code highlight]
```
````

</CodeGroup>

In Fumadocs, you can also highlight specific words.

````ts Fumadocs
console.log('Highlighted'); // [!code word:Highlighted]
````

### Code Groups

For code groups, you can use the `Tabs` component:

<CodeGroup>

````tsx Mintlify
<CodeGroup>

```ts Tab One
console.log('Hello, world!');
```

```ts Tab Two
console.log('Hello, world!');
```
</CodeGroup>
````

````tsx Fumadocs
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
 
<Tabs items={["Tab 1", "Tab 2"]}>
 
```ts tab="Tab 1"
console.log('A');
```
 
```ts tab="Tab 2"
console.log('B');
```
 
</Tabs>
````

</CodeGroup>

Fumadocs also has a built-in integration for TypeScript Twoslash, check it out in the [Setup Guide](https://fumadocs.vercel.app/docs/ui/twoslash).

### Callout

Fumadocs uses a generic `Callout` component for callouts, as opposed to Mintlify's specific ones.

<CodeGroup>

```tsx Mintlify
<Note>Hello World</Note>
<Warning>Hello World</Warning>
<Info>Hello World</Info>
<Tip>Hello World</Tip>
<Check>Hello World</Check>
```

```tsx Fumadocs
<Callout title="Title" type="info">Hello World</Callout>
<Callout title="Title" type="warn">Hello World</Callout>
<Callout title="Title" type="error">Hello World</Callout>
```

</CodeGroup>

### Adding Components

To use components without import, add them to your MDX component.

```tsx app/docs/[[...slug]]/page.tsx
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
 
<MDX components={{ Tabs, Tab }} />;
```

## 3. Migrate `mint.json` File

Instead of a single file, you can configure Fumadocs using code.

### Sidebar Items

The sidebar items are generated from your file system, Fumadocs takes `meta.json` as the configurations of a folder.
You don't need to hardcode the sidebar config manually.

For example, to customise the order of pages in `content/docs/components` folder, you can create a `meta.json` folder in the directory:

```json meta.json
{
  "title": "Components", // optional
  "pages": ["index", "apple"] // file names (without extension)
}
```

Fumadocs also support the rest operator (`...`) if you want to include the other pages.

```json meta.json
{ 
  "title": "Components", // optional
  "pages": ["index", "apple", "..."] // file names (without extension)
}
```

Visit the [Pages Organization Guide](https://fumadocs.vercel.app/docs/ui/page-conventions) for an overview of supported syntaxs.

### Appearance

The overall theme can be customised using CSS variables and/or presets.

#### CSS variables

In your global CSS file:

```css global.css
:root {
  /* hsl values, like hsl(239 37% 50%) but without `hsl()` */
  --background: 239 37% 50%;

  /* Want a max width for docs layout? */
  --fd-layout-width: 1400px;
}

.dark {
  /* hsl values, like hsl(239 37% 50%) but without `hsl()` */
  --background: 239 37% 50%;
}
```

#### Tailwind Presets

In your Tailwind config, use the `preset` option.

```js tailwind.config.mjs
import { createPreset } from 'fumadocs-ui/tailwind-plugin';
 
/** @type {import('tailwindcss').Config} */
export default {
  presets: [
    createPreset({
      preset: 'ocean',
    }),
  ],
};
```

See [all available presets](https://fumadocs.vercel.app/docs/ui/theme#presets).

### Layout Styles

You can open `app/layout.config.tsx`, it contains the shared options for layouts.
Fumadocs offer a default **Docs Layout** for documentation pages, and **Home Layout** for other pages.

You can customise the layouts in `layout.tsx`.

### Search

`app/api/search/route.ts` contains the Route Handler for search, it is powered by [Orama](https://orama.com) by default.

### Navigation Links

Navigation links are passed to layouts, you can also customise them in your Layout config.

```tsx app/layout.config.tsx
import { BookIcon } from 'lucide-react';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
 
export const baseOptions: BaseLayoutProps = {
  links: [
    {
      icon: <BookIcon />,
      text: 'Blog',
      url: '/blog',
    },
  ],
};
```

See [all supported items](https://fumadocs.vercel.app/docs/ui/blocks/links).

## Done

Now, you should be able to build and preview the docs.

Visit [Fumadocs](https://fumadocs.vercel.app/docs/ui) for details and additional features.

### formatting


#### eslint
import { Authors } from '/snippets/authors.mdx';

<Authors data={[{
  user: {
    name: 'Hayden Bleasel',
    id: 'haydenbleasel',
  },
  company: {
    name: 'next-forge',
    id: 'next-forge',
  },
}, {
  user: {
    name: 'Nicholas C. Zakas',
    id: 'slicknet',
  },
  company: {
    name: 'ESLint',
    id: 'eslint',
  },
}]} />

Here's how to switch from Biome to [ESLint](https://eslint.org). In this example, we'll also add the Next.js and React plugins, as well as the new ESLint Flat Config.

## 1. Swap out the required dependencies

First, uninstall the existing dependencies from the root `package.json` file...

```sh Terminal
pnpm remove -w @biomejs/biome ultracite
```

...and install the new ones:

```sh Terminal
pnpm add -w -D eslint eslint-plugin-next eslint-plugin-react eslint-plugin-react-hooks
```

## 2. Configure ESLint

Delete the existing `biome.json` file in the root of the project, and create a new `eslint.config.js` file:

```js eslint.config.js
const react = require('eslint-plugin-react');
const next = require('eslint-plugin-next');

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      '@next/next': nextPlugin,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-img-element': 'error',
    },
  },
]
```

## 3. Install the ESLint VSCode extension

<Tip>
This is generally installed if you selected "JavaScript" as a language to support when you first set up Visual Studio Code.
</Tip>

Install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) VSCode extension to get linting and formatting support in your editor.

## 4. Update your `.vscode/settings.json` file

Add the following to your `.vscode/settings.json` file to match the following:

```json .vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "emmet.showExpandedAbbreviation": "never",
  "prettier.enable": true,
  "tailwindCSS.experimental.configFile": "./packages/tailwind-config/config.ts",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 5. Re-enable the `lint` script

As Next.js uses ESLint for linting, we can re-enable the `lint` script in the root `package.json` files. In each of the Next.js apps, update the `package.json` file to include the following:

```json apps/app/package.json {3}
{
  "scripts": {
    "lint": "next lint"
  }
}
```

### payments


#### lemon-squeezy
[Lemon Squeezy](https://www.lemonsqueezy.com) is an all-in-one platform for running your SaaS business. It handles payments, subscriptions, global tax compliance, fraud prevention, multi-currency, and more. Here's how to switch the default payment processor from Stripe to Lemon Squeezy.

## 1. Swap out the required dependencies

First, uninstall the existing dependencies from the Payments package...

```sh Terminal
pnpm remove stripe --filter @repo/payments
```

... and install the new dependencies...

```sh Terminal
pnpm add @lemonsqueezy/lemonsqueezy.js --filter @repo/payments
```

## 2. Update the environment variables

Next, update the environment variables across the project, for example:

```js apps/app/.env
NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY=""
```

Additionally, replace all instances of `STRIPE_SECRET_KEY` with `LEMON_SQUEEZY_API_KEY` in the `packages/env/index.ts` file.

## 3. Update the payments client

Initialize the payments client in the `packages/payments/index.ts` file with the new API key. Then, export the `lemonSqueezySetup` function from the file.

```ts packages/payments/index.ts
import { env } from '@repo/env';
import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

lemonSqueezySetup({
  apiKey,
  onError: (error) => console.error("Error!", error),
});

export * from '@lemonsqueezy/lemonsqueezy.js';
```

## 4. Update the payments webhook handler

Remove the Stripe webhook handler from the API package...

```sh Terminal
rm apps/api/app/webhooks/stripe/route.ts
```

... and create a new webhook handler for Lemon Squeezy:

```ts apps/api/app/webhooks/lemon-squeezy/route.ts
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  return NextResponse.json({ message: 'Hello World' });
};
```

There's quite a lot you can do with Lemon Squeezy, so check out the following resources for more information:

<Card title="Webhooks Overview" icon="webhook" href="https://docs.lemonsqueezy.com/guides/developer-guide/webhooks" horizontal>
  Learn how to handle webhooks from Lemon Squeezy
</Card>

<Card title="Signing Requests" icon="badge-check" href="https://docs.lemonsqueezy.com/help/webhooks/signing-requests" horizontal>
  Learn how to verify webhooks from Lemon Squeezy
</Card>


## 5. Use Lemon Squeezy in your app

Finally, use the new payments client in your app.

```tsx apps/app/app/(authenticated)/page.tsx
import { getStore } from '@repo/payments';

const Page = async () => {
  const store = await getStore(123456);

  return (
    <pre>{JSON.stringify(store, null, 2)}</pre>
  );
};
```

### storage


#### upload-thing
[uploadthing](https://uploadthing.com) is a platform for storing files in the cloud. It's a great alternative to AWS S3 and it's free for small projects. Here's how to switch the default storage provider to uploadthing.

## 1. Swap out the required dependencies

First, uninstall the existing dependencies from the Storage package...

```sh Terminal
pnpm remove @vercel/blob --filter @repo/storage
```

... and install the new dependencies...

```sh Terminal
pnpm add uploadthing @uploadthing/react --filter @repo/storage
```

## 2. Update the environment variables

Next, update the environment variables across the project, for example:

```js apps/app/.env
// Remove this:
BLOB_READ_WRITE_TOKEN=""

// Add this:
UPLOADTHING_TOKEN=""
```

Additionally, replace all instances of `BLOB_READ_WRITE_TOKEN` with `UPLOADTHING_TOKEN` in the `packages/env/index.ts` file.

## 3. Update the existing storage files

Update the `index.ts` and `client.ts` to use the new `uploadthing` packages:

<CodeGroup>

```ts packages/storage/index.ts
import { createUploadthing } from 'uploadthing/next';

export { type FileRouter, createRouteHandler } from 'uploadthing/next';
export { UploadThingError as UploadError, extractRouterConfig } from 'uploadthing/server';

export const storage = createUploadthing();
```

```ts packages/storage/client.ts
export * from '@uploadthing/react';
```

</CodeGroup>

## 4. Create new files for the storage client

We'll also need to create a couple of new files for the storage package to handle the Tailwind CSS classes and SSR.

<CodeGroup>

```ts packages/storage/ssr.ts
export { NextSSRPlugin as StorageSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
```

```ts packages/storage/tailwind.ts
export { withUt as withStorage } from 'uploadthing/tw';
```

</CodeGroup>

## 5. Create a file router in your app

Create a new file in your app's `lib` directory to define the file router. This file will be used to define the file routes for your app, using your [Auth](/features/auth) package to get the current user.

```ts apps/app/app/lib/upload.ts
import { currentUser } from '@repo/auth/server';
import { type FileRouter, UploadError, storage } from '@repo/storage';
  
export const router: FileRouter = {
  imageUploader: storage({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await currentUser();

      if (!user) {
        throw new UploadError('Unauthorized');
      }

      return { userId: user.id };
    })
    .onUploadComplete(({ metadata, file }) => ({ uploadedBy: metadata.userId }),
};
```

## 6. Create a route handler

Create a new route handler in your app's `api` directory to handle the file routes.

```ts apps/app/app/api/upload/route.ts
import { router } from '@/app/lib/upload';
import { createRouteHandler } from '@repo/storage';

export const { GET, POST } = createRouteHandler({ router });
```

## 7. Update your root layout

Update your root layout to include the `StorageSSRPlugin`. This will add SSR hydration and avoid a loading state on your upload button.

```tsx apps/app/app/layout.tsx {4,5,7,16}
import '@repo/design-system/styles/globals.css';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { extractRouterConfig } from '@repo/storage';
import { StorageSSRPlugin } from '@repo/storage/ssr';
import type { ReactNode } from 'react';
import { router } from './lib/upload';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <StorageSSRPlugin routerConfig={extractRouterConfig(router)} />
      <DesignSystemProvider>{children}</DesignSystemProvider>
    </body>
  </html>
);

export default RootLayout;
```

## 8. Update your app's Tailwind config

Update your app's Tailwind config to include the `withStorage` function. This will add the necessary classes to your upload button.

```ts apps/app/tailwind.config.ts
import { withUt } from '@repo/storage/tailwind';
import { config } from '@repo/tailwind-config/config';

export default withUt(config) as typeof config;
```

## 9. Create your upload button

Create a new component for your upload button. This will use the `generateUploadButton` function to create a button that will upload files to the `imageUploader` endpoint.

```tsx apps/app/app/(authenticated)/components/upload-button.tsx
'use client';

import type { router } from '@/app/lib/upload';
import { generateUploadButton } from '@repo/storage/client';
import { toast } from 'sonner';

const UploadButton = generateUploadButton<typeof router>();

export const UploadForm = () => (
  <UploadButton
    endpoint="imageUploader"
    onClientUploadComplete={(res) => {
      // Do something with the response
      console.log('Files: ', res);
      toast.success('Upload Completed');
    }}
    onUploadError={(error: Error) => {
      toast.error(`ERROR! ${error.message}`);
    }}
  />
);
```

Now you can import this component into your app and use it as a regular component.

## 10. Advanced configuration

uploadthing is a powerful platform that offers a lot of advanced configuration options. You can learn more about them in the [uploadthing documentation](https://docs.uploadthing.com/).

<Card title="File Routes" icon="route" href="https://docs.uploadthing.com/file-routes" horizontal>
  Learn how to define file routes
</Card>

<Card title="Security" icon="shield" href="https://docs.uploadthing.com/concepts/auth-security" horizontal>
  How to protect different parts of the UploadThing flow.
</Card>

## Recipes
### ai-chatbot
Today we're going to create an AI chatbot using next-forge and the built-in AI package, powered by [Vercel AI SDK](https://sdk.vercel.ai/).

<Frame>
  <img src="/images/ai-chatbot.png" style={{ borderRadius: '0.5rem' }} />
</Frame>

## 1. Create a new project

```bash Terminal
npx next-forge@latest init ai-chatbot
```

This will create a new project with the name `ai-chatbot` and install the necessary dependencies.

## 2. Configure your environment variables

Follow the guide on [Environment Variables](/features/env) to fill in your environment variables.

Specifically, make sure you set an `OPENAI_API_KEY` environment variable.

<Tip>Make sure you have some credits in your OpenAI account.</Tip>

## 3. Create the chatbot UI

We're going to start by creating a simple chatbot UI with a text input and a button to send messages.

Create a new file called `Chatbot` in the `app/components` directory. We're going to use a few things here:

- `useChat` from our AI package to handle the chat logic.
- `Button` and `Input` components from our Design System to render the form.
- `Thread` and `Message` components from our AI package to render the chat history.
- `handleError` from our Design System to handle errors.
- `SendIcon` from `lucide-react` to create a send icon.

```tsx apps/app/app/(authenticated)/components/chatbot.tsx
'use client';

import { Message } from '@repo/ai/components/message';
import { Thread } from '@repo/ai/components/thread';
import { useChat } from '@repo/ai/lib/react';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { handleError } from '@repo/design-system/lib/utils';
import { SendIcon } from 'lucide-react';

export const Chatbot = () => {
  const { messages, input, handleInputChange, isLoading, handleSubmit } =
    useChat({
      onError: handleError,
      api: '/api/chat',
    });

  return (
    <div className="flex h-[calc(100vh-64px-16px)] flex-col divide-y overflow-hidden">
      <Thread>
        {messages.map((message) => (
          <Message key={message.id} data={message} />
        ))}
      </Thread>
      <form
        onSubmit={handleSubmit}
        className="flex shrink-0 items-center gap-2 px-8 py-4"
        aria-disabled={isLoading}
      >
        <Input
          placeholder="Ask a question!"
          value={input}
          onChange={handleInputChange}
        />
        <Button type="submit" size="icon" disabled={isLoading}>
          <SendIcon className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
```

## 4. Create the chatbot API route

Create a new file called `chat` in the `app/api` directory. This Next.js route handler will handle the chatbot's responses.

We're going to use the `streamText` function from our AI package to stream the chatbot's responses to the client. We'll also use the `provider` function from our AI package to get the OpenAI provider, and the `log` function from our Observability package to log the chatbot's responses.

```tsx apps/app/app/api/chat/route.ts
import { streamText } from '@repo/ai';
import { provider } from '@repo/ai/lib/provider';
import { log } from '@repo/observability/log';

export const POST = async (req: Request) => {
  const body = await req.json();

  log.info('🤖 Chat request received.', { body });
  const { messages } = body;

  log.info('🤖 Generating response...');
  const result = streamText({
    model: provider('gpt-4'),
    system: 'You are a helpful assistant.',
    messages,
  });

  log.info('🤖 Streaming response...');
  return result.toDataStreamResponse();
};
```

## 5. Update the app

Finally, we'll update the `app/page.tsx` file to be a simple entry point that renders the chatbot UI.

```tsx apps/app/app/(authenticated)/page.tsx
import { auth } from '@repo/auth/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Chatbot } from './components/chatbot';
import { Header } from './components/header';

const title = 'Acme Inc';
const description = 'My application.';

export const metadata: Metadata = {
  title,
  description,
};

const App = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    notFound();
  }

  return (
    <>
      <Header pages={['Building Your Application']} page="AI Chatbot" />
      <Chatbot />
    </>
  );
};

export default App;
```

## 6. Run the app

Run the app development server and you should be able to see the chatbot UI at [http://localhost:3000](http://localhost:3000).

```sh Terminal
pnpm dev --filter app
```

That's it! You've now created an AI chatbot using next-forge and the built-in AI package. If you have any questions, please reach out to me on [Twitter](https://x.com/haydenbleasel) or open an issue on [GitHub](https://github.com/haydenbleasel/next-forge).

### analytics-app


### chat-app


### subscription-saas


## Code Snippets
### authors
export const Authors = ({ data }) => {
  const baseUrl = (typeof window !== 'undefined' && window.location.origin.includes('localhost')) ? '' : 'https://raw.githubusercontent.com/haydenbleasel/next-forge/refs/heads/main/docs';

  return (
    <div style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <span style={{ color: 'rgb(107, 114, 128)', fontSize: '0.875rem' }}>Co-authored by</span>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
        {data.map((author) => (
          <div
            key={author.name}
            style={{
              padding: '0.75rem',
              paddingRight: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontWeight: 'normal',
              position: 'relative',
              ringWidth: '2px',
              ringColor: 'transparent',
              borderRadius: '0.75rem',
              backgroundColor: 'white',
              border: '1px solid rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{ overflow: 'hidden', border: '1px solid #e5e7eb', borderRadius: '9999px', width: '2rem', height: '2rem' }}>
                <img
                  style={{ margin: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  src={`${baseUrl}/images/authors/${author.company.id}/${author.user.id}.jpg`}
                  alt=""
                  width={32}
                  height={32}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  border: '1px solid white',
                  overflow: 'hidden',
                  borderRadius: '9999px',
                  objectFit: 'cover',
                  width: '1rem',
                  height: '1rem',
                  right: '-0.25rem',
                  bottom: '-0.25rem'
                }}
              >
                <img
                  style={{ margin: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  src={`${baseUrl}/images/authors/${author.company.id}/logo.jpg`}
                  alt=""
                  width={16}
                  height={16}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontWeight: 600,
                  lineHeight: 1.25,
                  fontSize: '13px',
                  letterSpacing: '-0.01em'
                }}
              >
                {author.user.name}
              </span>
              <span
                style={{
                  color: 'rgb(107, 114, 128)',
                  lineHeight: 1.25,
                  fontSize: '11px'
                }}
              >
                {author.company.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

### vercel
export const VercelButton = () => {
  const url = new URL('https://vercel.com/new/clone');

  url.searchParams.set('build-command', 'turbo build');
  url.searchParams.set('demo-description', 'Comprehensive Turborepo template for Next.js apps.');
  url.searchParams.set('demo-image', '//images.ctfassets.net/e5382hct74si/2XyyD0ftVZoyj9fHabQB2G/8e5779630676c645214ddb3729d8ff96/opengraph-image.png');
  url.searchParams.set('demo-title', 'next-forge');
  url.searchParams.set('demo-url', 'https://www.next-forge.com/');
  url.searchParams.set('env', [
    'DATABASE_URL',
    'RESEND_TOKEN',
    'RESEND_FROM',
    'CLERK_SECRET_KEY',
    'CLERK_WEBHOOK_SECRET',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    "BASEHUB_TOKEN",
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'NEXT_PUBLIC_CLERK_SIGN_IN_URL',
    'NEXT_PUBLIC_CLERK_SIGN_UP_URL',
    'NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL',
    'NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL',
    'NEXT_PUBLIC_POSTHOG_KEY',
    'NEXT_PUBLIC_POSTHOG_HOST',
    'NEXT_PUBLIC_APP_URL',
    'NEXT_PUBLIC_WEB_URL',
    'NEXT_PUBLIC_DOCS_URL',
  ].join(','));
  url.searchParams.set('envLink', 'https://docs.next-forge.com/setup#accounts');
  url.searchParams.set('from', 'templates');
  url.searchParams.set('project-name', 'next-forge');
  url.searchParams.set('repository-name', 'next-forge');
  url.searchParams.set('repository-url', 'https://github.com/haydenbleasel/next-forge');
  url.searchParams.set('root-directory', 'apps/app');
  url.searchParams.set('skippable-integrations', '1');

  return (
    <a href={url.toString()}>
      <img src="https://vercel.com/button" alt="Deploy with Vercel" />
    </a>
  );
};

## FAQ
### faq
## Why don't you use trpc?

While tRPC is a great tool for building type-safe APIs, Next.js Server Actions provide similar benefits with tighter framework integration. This native solution reduces complexity while maintaining the type safety that makes tRPC attractive. Since Server Actions are part of the framework itself, they're also likely to receive continued optimization and feature improvements directly from the Next.js team.

## Why did you pick X as the default tool instead of Y?

The default next-forge tooling was chosen by [myself](https://x.com/haydenbleasel) after having used them in numerous production applications. It doesn't mean they're the best tools, it means they're the ones that helped me launch quickly. Tools and tastes change over time and it's inevitable that the defaults will change at some point.

That being said, if you really believe tool Y is a much better choice than tool X, feel free to start up a conversation with me on X and we can hash it out!

## Why is there a `suppressHydrationWarning` on every `html` tag?

This is the recommendation by `next-themes` to supress the warning stemming from determining theme on the client side.

## Why are there unused dependencies like `import-in-the-middle`?

> Without these packages, Turbopack throws warnings highlighting cases where packages are being used but are not installed so it can fail when running in production.
> 
> This was already an issue when we were using Webpack, it just never warned us that it was missing. This can be fixed by installing the external packages into the project itself.

- [@timneutkens](https://github.com/haydenbleasel/next-forge/pull/170#issuecomment-2459255583)

## Why is the `api` separate from the `web` app?

The API is separated from the web app for two reasons:

1. To isolate functions that are not part of the main user-facing application i.e. background jobs, cron jobs, webhooks, etc.
2. To provide a dedicated endpoint for non-web applications e.g. mobile apps, smart home devices, etc.

Functionally speaking, it doesn't matter as much if you're running these projects on Vercel. Serverless functions are all independent pieces of infrastructure and can scale independently.

## Why are certain folders ignored by the linting configuration?

There are three types of files that are ignored by the linting configuration:

1. **shadcn/ui components, libraries, and hooks** - shadcn/ui has its own linting configuration that is less strict than the one used in this project. As such, we ignore these files to avoid modifying them. This makes it easier to update shadcn/ui in the future.
2. **Collaboration package configuration** - This is a package that is used to configure the collaboration package. The types are stubs and fail some of the linting rules, but it's not important unless you're using them.
3. **Internal documentation files** - These are the documentation files for this project. They're deleted when you initialize the project, so they're not important to lint.

## Updates
### updates
next-forge comes with some built-in helpers to help you keep your dependencies up to date.

## Upgrading next-forge

As next-forge evolves, you may want to stay up to date with the latest changes. This can be difficult to do manually, so we've created a script to help you.

```sh Terminal
npx next-forge@latest update --from 2.18.30 --to 2.18.31
```

This will clone the latest version of next-forge into a temporary directory, apply the updates, and then copy the files over to your project.

## Upgrading dependencies

You can upgrade all the dependencies in all your `package.json` files and installs the new versions with the `bump-deps` command:

```sh Terminal
pnpm bump-deps
```

## Upgrading shadcn/ui components

You can upgrade all the shadcn/ui components in the [Design System](/features/design-system/components) package with the `bump-ui` command:

```sh Terminal
pnpm bump-ui
```

<Warning>
This will override all customization you've made to the components. To avoid this happening, we recommend proxying the components into a new folder, such as `@repo/design-system/components`.
</Warning>

<Warning>
The `shadcn` CLI will likely make some unwanted changes to your shared Tailwind config file and global CSS. Make sure you review changes before committing them.
</Warning>