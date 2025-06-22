/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://aidaptics.com',
  generateRobotsTxt: false, // We already have robots.txt
  exclude: [
    '/admin/*',
    '/dashboard/*',
    '/api/*',
    '/login',
    '/signup',
    '/user/*',
    '/profile/*',
    '/temp/*',
    '/tmp/*',
    '/test/*',
    '/dev/*'
  ],
  additionalPaths: async () => [
    // Add any dynamic routes here
    // await config.transform(config, '/additional-page'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/api/', '/login/', '/signup/']
      }
    ]
  }
}