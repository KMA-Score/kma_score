module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://score.superkma.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://score.superkma.com"
      }/server-sitemap.xml`,
    ],
  },
};
