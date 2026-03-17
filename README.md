# GitHub Contributor Grid Generator

A high-performance, full-stack web application that dynamically generates circular avatar grids of GitHub contributors. Built with an integrated microservice architecture, it fetches real-time repository data and composites a clean PNG image on the fly.

## ✨ Features

- **Dynamic Image Generation:** Converts standard GitHub API JSON into a perfectly measured, transparent PNG grid.
- **Circular Masks:** Automatically crops GitHub avatars into perfect circles using SVG masking.
- **Unified Architecture:** Uses ElysiaJS directly inside Next.js App Router for zero-latency, cross-origin-free API handling.
- **Auto-Scaling Grid:** Dynamically calculates image dimensions based on the exact number of contributors.
- **Instant Markdown:** Generates a ready-to-use markdown snippet to drop directly into your GitHub repository `README.md`.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Runtime & Package Manager:** Bun
- **Backend API:** ElysiaJS (Integrated via Next.js Web Standards)
- **Image Processing:** Sharp (High-performance Node.js C++ image compositing)
- **Styling:** Tailwind CSS + Shadcn UI
- **Language:** TypeScript

## 🚀 Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository:

```bash
    git clone https://github.com/kankangain/contributer-fetcher.git
    cd contributer-fetcher
```

3.  Install dependencies:

```bash
    bun install
```

4.  Set up environment variables:
    Create a `.env` file in the root directory and add a GitHub Personal Access Token to bypass unauthenticated rate limits.

```env
    GITHUB_TOKEN=your_github_pat_here
```

5.  Start the development server:

```bash
    bun run dev
```

6.  Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser.

## 🔌 API Usage

You don't have to use the frontend UI. You can hit the API directly to generate images for your markdown files:

```http
GET /api/contributors/:owner/:repo
```

## **Example Markdown Embed:**

### NextJS Contributors:

[![Contributors](https://contrib.oxxyhosting.com/api/contributors/vercel/next.js)](https://github.com/vercel/next.js.git)

## 🐳 Deployment Notes

This project is optimized for deployment via **Dokploy** (using Nixpacks) or standard Docker Swarm.

Because we use `sharp` for image generation, the build environment requires Node.js standard libraries. The frontend and backend are unified, so you only need to expose a single web port (default `3000`).

**Required Build Commands for Nixpacks/Dokploy:**

- **Install:** `bun install --no-save`
- **Build:** `bun run build`
- **Start:** `bun run start`

---

_Developed by [Kankan Gain](https://www.google.com/search?q=https://github.com/kankangain)_
