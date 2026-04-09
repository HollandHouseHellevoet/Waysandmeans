"use client";

import Image from "next/image";
import { useState } from "react";

interface MemberPhotoProps {
  bioguideId: string;
  firstName: string;
  lastName: string;
  size?: "sm" | "md" | "lg";
}

const dimensions = {
  sm: { width: 48, height: 48, text: "text-base", imgSize: 96 },
  md: { width: 80, height: 80, text: "text-2xl", imgSize: 160 },
  lg: { width: 96, height: 96, text: "text-3xl", imgSize: 200 },
};

/**
 * Image sources in priority order. The browser fetches these directly,
 * so they aren't affected by build-environment network restrictions.
 * If you run `node scripts/download-headshots.mjs`, local files at
 * /members/{id}.jpg will be tried first.
 */
function getSources(bioguideId: string, memberId?: string): string[] {
  const sources: string[] = [];
  if (memberId) {
    sources.push(`/members/${memberId}.jpg`);
  }
  sources.push(
    `https://www.congress.gov/img/member/${bioguideId.toLowerCase()}_200.jpg`,
    `https://theunitedstates.io/images/congress/225x275/${bioguideId}.jpg`,
    `https://bioguide.congress.gov/bioguide/photo/${bioguideId[0]}/${bioguideId}.jpg`
  );
  return sources;
}

export default function MemberPhoto({
  bioguideId,
  firstName,
  lastName,
  size = "md",
}: MemberPhotoProps) {
  const memberId = `${firstName}-${lastName}`.toLowerCase().replace(/[^a-z-]/g, "");
  const sources = getSources(bioguideId, memberId);
  const [srcIndex, setSrcIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);
  const { width, height, text } = dimensions[size];

  if (allFailed) {
    return (
      <div
        className="rounded-sm bg-rojas-border flex items-center justify-center shrink-0"
        style={{ width, height }}
      >
        <span className={`font-serif ${text} text-rojas-text-muted`}>
          {firstName[0]}
          {lastName[0]}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sources[srcIndex]}
      alt={`${firstName} ${lastName}`}
      width={width}
      height={height}
      className="rounded-sm object-cover shrink-0 bg-rojas-border"
      style={{ width, height }}
      loading="lazy"
      onError={() => {
        if (srcIndex + 1 < sources.length) {
          setSrcIndex(srcIndex + 1);
        } else {
          setAllFailed(true);
        }
      }}
    />
  );
}
