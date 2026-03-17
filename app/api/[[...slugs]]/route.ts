import { Elysia } from "elysia";
import sharp from "sharp";

const AVATAR_SIZE = 64;
const GAP = 5;
const COLUMNS = 12;

// SVG mask to make the avatars perfectly circular
const circleSvg = `<svg width="${AVATAR_SIZE}" height="${AVATAR_SIZE}">
  <circle cx="${AVATAR_SIZE / 2}" cy="${AVATAR_SIZE / 2}" r="${AVATAR_SIZE / 2}" fill="#fff"/>
</svg>`;

const app = new Elysia({ prefix: "/api" }).get(
  "/contributors/:owner/:repo",
  async ({ params: { owner, repo }, set }) => {
    try {
      // 1. Fetch from GitHub API
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contributors`,
        {
          headers: {
            // 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`, // Add token here later
            "User-Agent": "Elysia-NextJS-App",
          },
        },
      );

      if (!response.ok)
        throw new Error(`GitHub API returned ${response.status}`);

      const data = await response.json();
      const contributors = data.filter((c: any) => c.type === "User");

      if (contributors.length === 0) {
        set.status = 404;
        return { error: "No human contributors found." };
      }

      // 2. Fetch & Mask Avatars (Make them circular)
      const avatarBuffers = await Promise.all(
        contributors.map(async (c: any) => {
          const imgRes = await fetch(c.avatar_url);
          const arrayBuffer = await imgRes.arrayBuffer();

          return sharp(Buffer.from(arrayBuffer))
            .resize(AVATAR_SIZE, AVATAR_SIZE)
            .composite([{ input: Buffer.from(circleSvg), blend: "dest-in" }]) // Applies the circle mask
            .png()
            .toBuffer();
        }),
      );

      // 3. Calculate Dynamic Grid Dimensions
      const actualColumns = Math.min(contributors.length, COLUMNS);
      const rows = Math.ceil(contributors.length / COLUMNS);

      const width =
        actualColumns * AVATAR_SIZE + Math.max(0, actualColumns - 1) * GAP;
      const height = rows * AVATAR_SIZE + Math.max(0, rows - 1) * GAP;

      // 4. Position Each Avatar
      const composites = avatarBuffers.map((buffer, index) => ({
        input: buffer,
        top: Math.floor(index / COLUMNS) * (AVATAR_SIZE + GAP),
        left: (index % COLUMNS) * (AVATAR_SIZE + GAP),
      }));

      // 5. Composite Final Image
      const finalImage = await sharp({
        create: {
          width,
          height,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      })
        .composite(composites)
        .png()
        .toBuffer();

      // 6. Return Response (Fixed for TypeScript / Web Standards)
      return new Response(new Uint8Array(finalImage), {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=3600",
        },
      });
    } catch (error) {
      console.error("Image Generation Error:", error);
      set.status = 500;
      return { error: "Could not generate contributor grid" };
    }
  },
);

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const PATCH = app.handle;
export const DELETE = app.handle;
