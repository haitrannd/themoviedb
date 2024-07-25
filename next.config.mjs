/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  env: {
    ACCESS_TOKEN:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTY4NzEzNmFhZWZjMjgyZDFmMDZkZjU3NmIzNWEyZCIsInN1YiI6IjY1MmY2NWIxYzk5NWVlMDBlM2Y2OTVkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zD3NUmTth87m07ABUp_j2-8mK0kPK9BsmVFhPwCEOhw",
    API_KEY: "8a687136aaefc282d1f06df576b35a2d",
    SMALL_IMG_PREFIX: "https://image.tmdb.org/t/p/original",
    BIG_IMG_PREFIX: "https://image.tmdb.org/t/p/w500",
    SECRET_COOKIE_PASSWORD: "YFSnPj1iECRtEXr8DkFfnfib2gf3OqDA",
  },
};

export default nextConfig;
