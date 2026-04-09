#!/usr/bin/env node

/**
 * Downloads official congressional headshots for all Ways & Means members.
 * Run: node scripts/download-headshots.mjs
 *
 * Tries multiple sources in order:
 * 1. congress.gov (official)
 * 2. theunitedstates.io (community project on GitHub Pages)
 * 3. bioguide.congress.gov (Biographical Directory)
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const membersPath = path.join(__dirname, "..", "data", "members.json");
const outputDir = path.join(__dirname, "..", "public", "members");

const members = JSON.parse(fs.readFileSync(membersPath, "utf-8"));

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function download(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { timeout: 10000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        download(res.headers.location).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        res.resume();
        return;
      }
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
    request.on("error", reject);
    request.on("timeout", () => {
      request.destroy();
      reject(new Error("timeout"));
    });
  });
}

const sources = [
  (id) => `https://www.congress.gov/img/member/${id.toLowerCase()}_200.jpg`,
  (id) => `https://theunitedstates.io/images/congress/225x275/${id}.jpg`,
  (id) => `https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/${id}.jpg`,
  (id) => `https://bioguide.congress.gov/bioguide/photo/${id[0]}/${id}.jpg`,
];

async function downloadMember(member) {
  const dest = path.join(outputDir, `${member.id}.jpg`);

  if (fs.existsSync(dest)) {
    console.log(`  SKIP ${member.firstName} ${member.lastName} (exists)`);
    return true;
  }

  for (const makeUrl of sources) {
    const url = makeUrl(member.bioguideId);
    try {
      const data = await download(url);
      if (data.length < 1000) throw new Error("too small, likely error page");
      fs.writeFileSync(dest, data);
      console.log(`  OK   ${member.firstName} ${member.lastName} <- ${url}`);
      return true;
    } catch {
      // try next source
    }
  }

  console.log(`  FAIL ${member.firstName} ${member.lastName} (${member.bioguideId})`);
  return false;
}

async function main() {
  console.log(`Downloading headshots for ${members.length} members...\n`);
  let ok = 0;
  let fail = 0;
  for (const m of members) {
    const success = await downloadMember(m);
    if (success) ok++;
    else fail++;
  }
  console.log(`\nDone: ${ok} downloaded, ${fail} failed.`);
  console.log(`Images saved to: ${outputDir}`);
}

main();
