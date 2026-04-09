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
  sm: { width: 48, height: 48, text: "text-base" },
  md: { width: 80, height: 80, text: "text-2xl" },
  lg: { width: 96, height: 96, text: "text-3xl" },
};

export default function MemberPhoto({
  bioguideId,
  firstName,
  lastName,
  size = "md",
}: MemberPhotoProps) {
  const [failed, setFailed] = useState(false);
  const { width, height, text } = dimensions[size];
  const src = `https://theunitedstates.io/images/congress/225x275/${bioguideId}.jpg`;

  if (failed) {
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
    <Image
      src={src}
      alt={`${firstName} ${lastName}`}
      width={width}
      height={height}
      className="rounded-sm object-cover shrink-0"
      style={{ width, height }}
      onError={() => setFailed(true)}
    />
  );
}
