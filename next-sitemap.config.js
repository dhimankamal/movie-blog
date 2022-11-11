module.exports = {
  siteUrl:process.env.NEXT_PUBLIC_DOMAIN_URL,
  exclude: ["/404"],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/404"],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}sitemap.xml`,
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}server-sitemap.xml`,
    ],
  },
};