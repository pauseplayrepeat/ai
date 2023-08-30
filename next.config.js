/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "googleusercontent.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "cdn.openai.com",
      "res.cloudinary.com",
      "replicate.com",
      "pbxt.replicate.delivery",
    ],
  },
};

module.exports = nextConfig;
