import type { MetadataRoute } from "next";
import { caseStudies } from "./case-studies/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aidaptics.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/case-studies`, lastModified: new Date() },
    { url: `${baseUrl}/get-started`, lastModified: new Date() },
    { url: `${baseUrl}/Support`, lastModified: new Date() },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date() },
    { url: `${baseUrl}/Terms-of-Service`, lastModified: new Date() },
    { url: `${baseUrl}/cookie-policy`, lastModified: new Date() },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}


