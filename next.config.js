/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export to enable API routes
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add webpack configuration to handle ONNX runtime and kokoro-js
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Server-side configuration for ONNX runtime and kokoro-js
      config.externals = config.externals || [];
      config.externals.push({
        'onnxruntime-node': 'commonjs onnxruntime-node',
        'kokoro-js': 'commonjs kokoro-js',
      });
      
      // Handle Node.js specific modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    } else {
      // Client-side: exclude ONNX runtime and kokoro-js
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'onnxruntime-node': false,
        'onnxruntime-web': false,
        'kokoro-js': false,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
