const isProjectPages = process.env.NEXT_PUBLIC_BASE_PATH && process.env.NEXT_PUBLIC_BASE_PATH !== "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isProjectPages ? process.env.NEXT_PUBLIC_BASE_PATH : "",
  assetPrefix: isProjectPages ? process.env.NEXT_PUBLIC_BASE_PATH : ""
};

module.exports = nextConfig;
