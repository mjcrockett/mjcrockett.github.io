import type { NextConfig } from "next";
import CopyPlugin from "copy-webpack-plugin";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev }) => {
    // append the CopyPlugin to copy the file to your public dir
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          { from: "node_modules/createjs/builds/1.0.0", to: "public/assets/scripts" },
        ],
      }),
    )

    // Important: return the modified config
    return config;
  }
};

export default nextConfig;
