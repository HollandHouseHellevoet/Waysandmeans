import type { MetadataRoute } from "next";
import { getAllMembers } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const members = getAllMembers();
  const baseUrl = "https://waysandmeans.rojasreport.com";

  const memberPages = members.map((m) => ({
    url: `${baseUrl}/member/${m.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...memberPages,
  ];
}
