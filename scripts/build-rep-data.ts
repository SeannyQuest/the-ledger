import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// --- Types ---

interface LegislatorId {
  bioguide: string;
  [key: string]: unknown;
}

interface LegislatorName {
  first: string;
  last: string;
  official_full?: string;
}

interface Term {
  type: "sen" | "rep";
  start: string;
  end: string;
  state: string;
  district?: number;
  party: string;
  phone?: string;
  contact_form?: string;
  url?: string;
}

interface Legislator {
  id: LegislatorId;
  name: LegislatorName;
  terms: Term[];
}

interface SocialEntry {
  id: { bioguide: string };
  social: {
    twitter?: string;
    facebook?: string;
    [key: string]: unknown;
  };
}

interface Member {
  bioguide: string;
  name: string;
  party: string;
  state: string;
  type: "sen" | "rep";
  district?: number;
  phone?: string;
  contactForm?: string;
  website?: string;
  twitter?: string;
  facebook?: string;
}

interface StateLegislators {
  senators: Member[];
  representatives: Record<number, Member>;
}

// --- Paths ---

const dataDir = join(__dirname, "data");
const outDir = join(__dirname, "..", "src", "lib", "data");

// --- Read source data ---

const legislators: Legislator[] = JSON.parse(
  readFileSync(join(dataDir, "legislators-current.json"), "utf-8")
);

const socialRaw: SocialEntry[] = JSON.parse(
  readFileSync(join(dataDir, "legislators-social-media.json"), "utf-8")
);

const zipCsv = readFileSync(join(dataDir, "zip-to-district.csv"), "utf-8");

// --- Build social media lookup ---

const socialMap = new Map<string, { twitter?: string; facebook?: string }>();
for (const entry of socialRaw) {
  socialMap.set(entry.id.bioguide, {
    twitter: entry.social.twitter,
    facebook: entry.social.facebook,
  });
}

// --- Process legislators ---

const stateData: Record<string, StateLegislators> = {};

let count = 0;

for (const leg of legislators) {
  const currentTerm = leg.terms[leg.terms.length - 1];

  // Filter: term end date must be >= 2025
  const endYear = parseInt(currentTerm.end.split("-")[0], 10);
  if (endYear < 2025) continue;

  const bioguide = leg.id.bioguide;
  const social = socialMap.get(bioguide);

  const member: Member = {
    bioguide,
    name: leg.name.official_full || `${leg.name.first} ${leg.name.last}`,
    party: currentTerm.party,
    state: currentTerm.state,
    type: currentTerm.type,
    ...(currentTerm.type === "rep" && currentTerm.district !== undefined
      ? { district: currentTerm.district }
      : {}),
    ...(currentTerm.phone ? { phone: currentTerm.phone } : {}),
    ...(currentTerm.contact_form
      ? { contactForm: currentTerm.contact_form }
      : {}),
    ...(currentTerm.url ? { website: currentTerm.url } : {}),
    ...(social?.twitter ? { twitter: social.twitter } : {}),
    ...(social?.facebook ? { facebook: social.facebook } : {}),
  };

  // Initialize state bucket
  if (!stateData[currentTerm.state]) {
    stateData[currentTerm.state] = { senators: [], representatives: {} };
  }

  if (currentTerm.type === "sen") {
    stateData[currentTerm.state].senators.push(member);
  } else {
    stateData[currentTerm.state].representatives[
      currentTerm.district ?? 0
    ] = member;
  }

  count++;
}

// --- Process zip-to-district ---

const zipDistricts: Record<string, { state_abbr: string; districts: number[] }> = {};

const lines = zipCsv.trim().split("\n");
// Skip header
for (let i = 1; i < lines.length; i++) {
  const parts = lines[i].split(",");
  if (parts.length < 4) continue;
  const stateAbbr = parts[1].trim();
  const zip = parts[2].trim();
  const cd = parseInt(parts[3].trim(), 10);

  if (!zipDistricts[zip]) {
    zipDistricts[zip] = { state_abbr: stateAbbr, districts: [] };
  }
  if (!zipDistricts[zip].districts.includes(cd)) {
    zipDistricts[zip].districts.push(cd);
  }
}

// --- Write output ---

writeFileSync(
  join(outDir, "legislators.json"),
  JSON.stringify(stateData, null, 2)
);

writeFileSync(
  join(outDir, "zip-districts.json"),
  JSON.stringify(zipDistricts, null, 2)
);

console.log(
  `Done: ${count} current members across ${Object.keys(stateData).length} states/territories`
);
console.log(
  `Zip districts: ${Object.keys(zipDistricts).length} zip codes mapped`
);
