# Daonra | Action Center & "What Can I Do?" Research

*Compiled: 2026-03-22*

---

## 1. Action Resources Database

### 1.1 DSA Chapter Finder

**How it works:** DSA (Democratic Socialists of America) has 100,000+ members and a decentralized chapter structure. There is no single public API.

| Resource | URL | Notes |
|----------|-----|-------|
| Join/Find Chapter | `https://act.dsausa.org/donate/membership/` | Joining routes you to your local chapter automatically |
| Chapter Directory | `https://dsausa.org/chapters/` | Browse by state |
| California DSA | `californiadsa.org` | Example of state-level federation |
| NYC DSA | `socialists.nyc/branches/` | Branches within large metros |

**Integration approach:** Link directly to DSA's chapter finder. No API available — best to embed an outbound link with context like "Find your local DSA chapter" pointing to `dsausa.org/chapters/`.

---

### 1.2 Major Progressive Organizations — Action Pages

| Organization | Action Page URL | What They Offer | Platform Used |
|---|---|---|---|
| **Sunrise Movement** | `sunrisemovement.org/take-action/` | Hub finder, campaigns (climate, Green New Deal), events | Mobilize, Action Network |
| **Indivisible** | `indivisible.org/get-involved/take-action/` | Local group finder, call/email campaigns targeting specific reps | Action Network |
| **Working Families Party** | `workingfamilies.org/get-active/` | Membership, volunteer signups, welcome gatherings | Action Network |
| **Our Revolution** | `ourrevolution.com/action/` | Endorsements, volunteer, phonebanking | — |
| **March For Our Lives** | `marchforourlives.com/take-action/` | Gun violence prevention campaigns, voter registration drives | Mobilize |
| **Poor People's Campaign** | `poorpeoplescampaign.org/get-involved/` | Mass assemblies, state coordinating committees, moral agenda | Action Network |

**Key insight:** Most major progressive orgs use **Action Network** and/or **Mobilize** as their backend. Integrating with these two platforms covers a huge swath of the progressive action ecosystem.

---

### 1.3 Protest/Rally Aggregation Sources

| Source | URL | Type | API Available? |
|--------|-----|------|---------------|
| **Mobilize** (formerly MobilizeAmerica) | `mobilize.us` | Volunteer & event hub for progressive campaigns | ✅ Yes — GitHub: `mobilizeamerica/api`, OSDI-compliant |
| **Action Network** | `actionnetwork.org` | Events, petitions, email, fundraising | ✅ Yes — HAL+JSON REST API, OSDI v1.1.1 (paid partners) |
| **Protest.net** | `protest.net` | Activism event calendar (online + in-person) | ⚠️ Open-source, no formal API documented |
| **ACLED** | `acleddata.com` | Political violence & protest data (research-grade) | ✅ Yes — registration required, better for analysis than live events |
| **PredictHQ** | `predicthq.com` | Commercial event aggregator (protests are one category) | ✅ Yes — paid, more suited for demand forecasting |

**Recommendation for Daonra:**
- **Primary:** Integrate **Mobilize API** for upcoming progressive events/actions (free, OSDI-compliant, widely used)
- **Secondary:** Link to **Action Network** events (API requires paid partnership)
- **Tertiary:** Scrape/link **Protest.net** for broader coverage

---

### 1.4 Petition Platforms

| Platform | API? | Access Model | Notes |
|----------|------|-------------|-------|
| **Action Network** | ✅ Full REST API (OSDI) | Paid partners / on request | Best for progressive orgs. Petition tool with full signer tracking, email follow-up. Webhooks available. |
| **Change.org** | ✅ Public API | Free with API key | GitHub: `change/api_docs`. Can retrieve petitions, signatures, targets. Node.js client: `edsadr/change-api`. Support may be limited. |
| **MoveOn** | ⚠️ Informal | Progressive Partner Program (CSV export) | No formal public API. Community tools exist (`ChrisHardie/moveon-petition-tools`). Partners get signer data export. |

**Recommendation:** For Daonra's own petitions, use **Action Network** as the backend (progressive-aligned, born from Occupy, powers Women's March / MFOL). For surfacing external petitions, link to Change.org and MoveOn.

---

### 1.5 Voter Registration Tools

| Tool | URL | Integration Method | Cost |
|------|-----|-------------------|------|
| **Vote.org** | `vote.org/technology/` | Embeddable iframe snippets (all 50 states) | Free (basic) / Paid (Vote.org+ with data) |
| **VoteAmerica** | `docs.voteamerica.org/api/` | Full civic data API | Free (API key required) |
| **We Vote** | `api.wevoteusa.org/apis/v1/docs/` | API for election centers, ballot info | Free / open-source |
| **Vote.gov** | `vote.gov` | Direct link to federal voter registration | Free |

**Vote.org Free Tools (embed via iframe):**
- Register to vote
- Absentee ballot request
- Verify voter registration status
- Election reminders
- "What's on your ballot"
- Pledge to register

**Recommendation:** Embed **Vote.org** free tools (immediate, no API key needed, mobile-optimized). For deeper integration, use **VoteAmerica API** which provides structured data.

---

## 2. "Contact Your Rep" Enhancement

### 2.1 Data Sources for Legislator Contact Info

| Source | URL | Data Available | Status |
|--------|-----|---------------|--------|
| **unitedstates/congress-legislators** (GitHub) | `github.com/unitedstates/congress-legislators` | Full bio, terms, social media for all legislators 1789–present | ✅ Active, YAML/JSON/CSV, community-maintained |
| **Legisletter API** | `legisletter.org/docs/api` | Name, chamber, party, state, phone, social media; lookup by address | ✅ Active |
| **Congress.gov API** | `api.congress.gov` | Member data, bills, votes (NOT contact info directly) | ✅ Active (free API key from api.data.gov) |
| **Google Civic Information API** | `developers.google.com/civic-information` | Reps by address (federal → municipal) | ⚠️ Representatives endpoint deprecated April 2025; new Divisions API replacing it |
| **ProPublica Congress API** | `projects.propublica.org/api-docs/congress-api/` | Was the gold standard (contact forms, office, phone) | ❌ Discontinued Feb 2025, no new API keys |
| **House.gov / Senate.gov** | `house.gov/representatives/find-your-representative` | Official directories | ✅ Always current, no API |

**Recommended Stack for Daonra:**
1. **Primary data:** `unitedstates/congress-legislators` GitHub repo — bulk download `legislators-current.yaml` for all current members (bio, terms, IDs). Also grab `legislators-social-media.yaml`.
2. **Contact details:** **Legisletter API** for phone numbers and contact info by address lookup.
3. **Address-to-rep lookup:** **Legisletter API** or the new Google Divisions API (when available). Fallback: `house.gov/representatives/find-your-representative` embed.
4. **Enrich with:** Congress.gov API for voting records, bill sponsorship.

### 2.2 Google Civic Information API — Status Update

- **Was:** Free, 25,000 queries/day, federal → municipal reps by address
- **Now:** `representativeInfoByAddress` endpoint **deprecated April 2025**
- **Replacement:** New method under Divisions API (OCD-ID lookup by address) — expected to be available
- **Action:** Monitor `developers.google.com/civic-information` for the replacement. In the meantime, use Legisletter API.

### 2.3 Pre-Written Call Scripts

**Generic Template (adaptable to any issue):**

```
Hi, my name is [NAME] and I'm a constituent from [CITY, STATE, ZIP].

I'm calling to urge [REP/SENATOR NAME] to [SUPPORT/OPPOSE] [BILL NAME/ISSUE].

[1-2 sentences on why this matters to you personally.]

I'd like to know [REP/SENATOR NAME]'s position on this issue.

Thank you for your time.
```

**Issue-Specific Script Templates for Daonra:**

#### Healthcare
```
I'm calling to urge [REP] to support policies that expand access to
affordable healthcare for all Americans, including:
- Strengthening the ACA and expanding coverage options
- Lowering prescription drug costs
- Ensuring mental health parity in insurance coverage
[This matters to me because...]
```

#### Climate Action
```
I'm calling to urge [REP] to support bold climate action, including:
- Investment in renewable energy and green jobs
- A rapid transition away from fossil fuels
- Environmental justice for frontline communities
[This matters to me because...]
```

#### Workers' Rights / Labor
```
I'm calling to urge [REP] to stand with working families by supporting:
- The PRO Act to protect the right to organize
- A $15+ federal minimum wage
- Paid family and medical leave for all workers
[This matters to me because...]
```

#### Anti-War / Military Spending
```
I'm calling to urge [REP] to prioritize diplomacy over military action and:
- Reduce the Pentagon budget and redirect funds to domestic needs
- Oppose unauthorized military interventions
- Support transparent oversight of defense spending
[This matters to me because...]
```

#### Democracy / Voting Rights
```
I'm calling to urge [REP] to protect our democracy by supporting:
- The John Lewis Voting Rights Advancement Act
- Automatic voter registration and expanded early voting
- An end to partisan gerrymandering
[This matters to me because...]
```

**Tips to display alongside scripts:**
- Be polite and concise (staffers take hundreds of calls)
- Give your zip code — constituent calls carry more weight
- Ask for the rep's position — this gets logged
- Call the DC office AND district office for maximum impact
- Follow up with an email or letter

---

## 3. Progressive Scorecards

### 3.1 Scorecard Sources

| Organization | What They Score | URL | API/Bulk Data? | Data Format |
|---|---|---|---|---|
| **League of Conservation Voters (LCV)** | Environmental/climate votes | `lcv.org/scorecard` | ✅ GitHub scraper: `CasparDP/lcv` (1971–2024 data) | HTML → structured via scripts |
| **AFL-CIO** | Labor/working family votes | `aflcio.org/scorecard` | ❌ No API; view online or PDF download | Web / PDF |
| **ACLU** | Civil liberties/civil rights votes | `aclu.org/congressional-scorecards` | ❌ No API; PDF reports available | Web / PDF |
| **Human Rights Campaign (HRC)** | LGBTQ+ rights votes | `hrc.org/scorecard` | ❌ No API; PDF scorecards (S3-hosted) | PDF |
| **Progressive Punch** | Overall progressive voting record | `progressivepunch.org` | ❌ No API; website search by name/zip/score | Web only |
| **GovTrack** | Ideology (liberal↔conservative) + leadership scores | `govtrack.us` | ⚠️ Historical data was open; Temboo integration existed | YAML/JSON (historical) |

### 3.2 Data Access Strategy

**Tier 1 — Easily Obtainable (automate):**
- **LCV Scores:** Use the `CasparDP/lcv` GitHub repo to bulk download and process 50+ years of environmental scores. This is the most accessible scorecard dataset.
- **GovTrack Ideology:** Historical data available in structured format. Can be scraped or accessed via bulk data files.
- **Progressive Punch:** Scores visible on site, can be scraped (name, state, overall progressive score, lifetime score).

**Tier 2 — Manual Collection (scrape or parse PDFs):**
- **AFL-CIO:** Scrape `aflcio.org/scorecard/legislators` for per-legislator scores. State federations sometimes publish PDFs.
- **ACLU:** Parse PDF scorecards from `aclu.org/congressional-scorecards`. Individual legislator pages have percentage scores.
- **HRC:** PDFs hosted on S3 (e.g., `hrc-prod-requests.s3-us-west-2.amazonaws.com/...`). Parse for per-member scores.

**Tier 3 — Build a Composite Score:**
Create a **"Daonra Progressive Index"** that combines:
- LCV (environment) — 20%
- AFL-CIO (labor) — 20%
- ACLU (civil liberties) — 20%
- HRC (LGBTQ+ rights) — 15%
- Progressive Punch (overall progressive) — 25%

This gives users a single at-a-glance score plus breakdowns by issue area.

### 3.3 Display Concept

For each legislator on Daonra:
```
Rep. Jane Smith (D-IL-5)
━━━━━━━━━━━━━━━━━━━━━━
📊 Daonra Progressive Index: 78/100

  🌍 Environment (LCV):     85%  ████████░░
  👷 Labor (AFL-CIO):       72%  ███████░░░
  ⚖️ Civil Liberties (ACLU): 80%  ████████░░
  🏳️‍🌈 LGBTQ+ Rights (HRC):   90%  █████████░
  ✊ Progressive Punch:      65%  ██████░░░░

📞 Call: (202) 225-XXXX
📧 Contact Form: smith.house.gov/contact
```

---

## 4. Content Calendar — First Month of Launch

### Overview: Themed Days

| Day | Theme | Description |
|-----|-------|-------------|
| **Monday** | 💰 Follow the Money Monday | Dark money, lobbying, campaign finance, corporate influence |
| **Tuesday** | 🌍 Trade Watch Tuesday | Trade deals, tariffs, supply chains, worker impact |
| **Wednesday** | 📊 Scorecard Wednesday | Legislator spotlight — how they vote vs. what they say |
| **Thursday** | 🔍 Deep Dive Thursday | Long-form investigative feature |
| **Friday** | ✊ Action Friday | "What Can I Do?" — specific call-to-action for the weekend |
| **Saturday** | 📖 Weekend Read | Curated roundup of the week's most important stories |
| **Sunday** | 💡 Sunday School | Explainer/educational content (how a bill becomes law, what a PAC is, etc.) |

---

### Week 1: LAUNCH WEEK 🚀

**Theme: "They Hope You're Not Paying Attention"**

| Day | Content | Platform |
|-----|---------|----------|
| **Mon** | 🚀 **Launch post:** "Daonra is here. We follow the money so you don't have to." Tease top 5 most corporate-funded legislators. | All platforms |
| **Tue** | 📊 **"Who Owns Your Rep?"** — Interactive feature showing top donors for every member of Congress. Use OpenSecrets data. | Website + TikTok explainer |
| **Wed** | 🗳️ **Scorecard Launch:** "We graded every member of Congress. Here's how your rep scored." Roll out Daonra Progressive Index. | Website + X thread + Bluesky |
| **Thu** | 🔍 **Deep Dive:** "The Military-Industrial Complex in 2026: Where Your Tax Dollars Actually Go" — defense spending breakdown with visualizations. | Website (long-form) |
| **Fri** | ✊ **Action Friday:** "Call your rep about [current bill]. Here's exactly what to say." — Launch the Contact Your Rep tool with pre-written scripts. | All platforms + website tool |
| **Sat** | 📖 **Week 1 Roundup:** Best stories from launch week + reader reactions. | Email newsletter + website |
| **Sun** | 💡 **Sunday School:** "What is Dark Money? A 60-Second Explainer" | TikTok + Instagram Reels + Bluesky |

---

### Week 2: "YOUR MONEY, THEIR POWER"

| Day | Content |
|-----|---------|
| **Mon** | 💰 Top 10 recipients of fossil fuel money in Congress. Name names. |
| **Tue** | 🌍 How trade deals are negotiated in secret — and who benefits. |
| **Wed** | 📊 Legislator Spotlight: Pick a swing-state senator, show their scores vs. their rhetoric. |
| **Thu** | 🔍 Deep Dive: "Pharma's Grip on Congress" — prescription drug pricing and lobbying. |
| **Fri** | ✊ Action: Link to relevant petition + call script for drug pricing reform. |
| **Sat** | 📖 Weekly roundup + introduce "Join a Local Chapter" feature (DSA, Indivisible, Sunrise). |
| **Sun** | 💡 Sunday School: "How to Read a Campaign Finance Report" |

---

### Week 3: "LABOR UNDER FIRE"

| Day | Content |
|-----|---------|
| **Mon** | 💰 Which corporations are spending the most to fight unionization? |
| **Tue** | 🌍 Global labor exploitation in supply chains — who's profiting? |
| **Wed** | 📊 AFL-CIO scorecard spotlight: Who votes for workers and who doesn't? |
| **Thu** | 🔍 Deep Dive: "The Gig Economy Hustle" — how labor protections are being eroded. |
| **Fri** | ✊ Action: Support a current labor action/strike + volunteer with Working Families Party. |
| **Sat** | 📖 Weekly roundup + feature on voter registration tools ("Are you registered?"). |
| **Sun** | 💡 Sunday School: "What is the PRO Act and Why Should You Care?" |

---

### Week 4: "DEMOCRACY IN DANGER"

| Day | Content |
|-----|---------|
| **Mon** | 💰 Who's funding voter suppression efforts? Follow the money. |
| **Tue** | 🌍 How authoritarian tactics are spreading globally — and showing up here. |
| **Wed** | 📊 ACLU scorecard spotlight: Civil liberties voting records exposed. |
| **Thu** | 🔍 Deep Dive: "Gerrymandering: How Your Vote Gets Stolen Before You Cast It." |
| **Fri** | ✊ Action: Register to vote (embed Vote.org tool) + find your local Indivisible group. |
| **Sat** | 📖 Monthly retrospective: What we learned, what's coming, reader survey. |
| **Sun** | 💡 Sunday School: "What is Ranked Choice Voting?" |

---

### Social Media Posting Schedule

#### TikTok / Instagram Reels (short-form video)
| Frequency | Content Type | Best Time (CT) |
|-----------|-------------|----------------|
| 3-4x/week | 60-sec explainers, "Did You Know?" facts, scorecard reveals, rage-bait stats | 11am–1pm or 7pm–9pm |
| Format | Hook in first 2 sec → shocking stat → context → "follow for more" | — |

#### X (Twitter)
| Frequency | Content Type | Best Time (CT) |
|-----------|-------------|----------------|
| Daily | Morning thread (key story), afternoon engagement (polls/questions), evening action items | 8am, 12pm, 6pm |
| Format | Thread format for deep content; single tweets for hot takes; quote-tweet current news with Daonra analysis | — |

#### Bluesky
| Frequency | Content Type | Best Time (CT) |
|-----------|-------------|----------------|
| Daily | Mirror X content but with more depth/nuance; longer posts; community engagement | 9am, 5pm |
| Format | Bluesky audience skews more policy-literate — lean into data and analysis over hot takes | — |

#### Email Newsletter
| Frequency | Content Type |
|-----------|-------------|
| Weekly (Saturday) | Curated roundup: top stories, one action item, one scorecard highlight, one "Sunday School" preview |
| Monthly | "State of Daonra" — metrics, reader feedback, upcoming focus areas |

---

## 5. Technical Integration Summary

### Recommended API/Data Stack

```
┌─────────────────────────────────────────────────┐
│                DAONRA STACK                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  LEGISLATOR DATA                                 │
│  ├── unitedstates/congress-legislators (GitHub)  │
│  ├── Legisletter API (contact + address lookup)  │
│  └── Congress.gov API (votes, bills)             │
│                                                  │
│  SCORECARDS                                      │
│  ├── LCV via CasparDP/lcv scraper (GitHub)       │
│  ├── Progressive Punch (scrape)                  │
│  ├── AFL-CIO, ACLU, HRC (scrape/PDF parse)       │
│  └── GovTrack ideology data                      │
│                                                  │
│  ACTIONS & EVENTS                                │
│  ├── Mobilize API (progressive events)           │
│  ├── Action Network API (petitions, email, events)│
│  └── Protest.net (supplemental)                  │
│                                                  │
│  VOTER TOOLS                                     │
│  ├── Vote.org embeds (free iframe tools)          │
│  ├── VoteAmerica API (structured data)           │
│  └── We Vote API (ballot info)                   │
│                                                  │
│  PETITION / CAMPAIGN FINANCE                     │
│  ├── Change.org API (external petitions)         │
│  ├── OpenSecrets API (campaign finance)          │
│  └── FEC API (raw federal election data)         │
│                                                  │
└─────────────────────────────────────────────────┘
```

### Priority Implementation Order

1. **Phase 1 (Launch):** Contact Your Rep (Legisletter API + unitedstates/congress-legislators) + call scripts + Vote.org embed
2. **Phase 2 (Week 2-3):** Progressive scorecards (start with LCV + Progressive Punch, add others)
3. **Phase 3 (Week 3-4):** Action feed (Mobilize API integration) + org directory (links to DSA, Indivisible, etc.)
4. **Phase 4 (Month 2):** Composite "Daonra Progressive Index" + petition integration (Action Network)

---

## 6. Key Contacts & Resources

| Resource | URL | API Key Needed? |
|----------|-----|----------------|
| Congress.gov API | `api.congress.gov` | Yes (free from api.data.gov) |
| Legisletter API | `legisletter.org/docs/api` | Check docs |
| Mobilize API | `github.com/mobilizeamerica/api` | Check docs |
| Action Network API | `actionnetwork.org/docs/` | Yes (paid partner) |
| Change.org API | `github.com/change/api_docs` | Yes (free) |
| Vote.org Embed | `vote.org/technology/` | No |
| VoteAmerica API | `docs.voteamerica.org/api/` | Yes (free) |
| LCV Scraper | `github.com/CasparDP/lcv` | No |
| Congress Legislators Data | `github.com/unitedstates/congress-legislators` | No |
| OpenSecrets API | `opensecrets.org/open-data/api` | Yes (free) |
