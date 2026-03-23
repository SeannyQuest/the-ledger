# Daonra

**For the people. By the people. About the people.**

*Daonra* (Irish Gaelic: "the populace/the people") is a civic transparency platform that tracks campaign finance, lobbying, PAC donations, congressional stock trades, and government contracts in American politics.

Built with [Next.js](https://nextjs.org), Prisma, and Neon PostgreSQL.

## Getting Started

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Data Sources

- **FEC** (Federal Election Commission): Campaign finance, PAC donations, independent expenditures
- **Senate LDA**: Lobbying disclosure filings
- **USASpending.gov**: Federal contracts and grants
- **Congress.gov**: Legislation and voting records
- **House/Senate Stock Watcher**: Congressional stock trades
- **Federal Register**: Rules, proposed rules, and presidential documents
- **FARA**: Foreign agent registrations
- **ProPublica Nonprofit Explorer**: 501(c)(4) dark money tracking

## Tech Stack

- **Framework:** Next.js (App Router)
- **Database:** Neon PostgreSQL + Prisma ORM
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
