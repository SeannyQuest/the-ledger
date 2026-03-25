export type StatePrimary = {
  state: string;
  abbr: string;
  primaryDate: string;
  primaryType: "open" | "closed" | "semi-open" | "semi-closed";
  notes?: string;
};

export type Race = {
  id: string;
  name: string;
  date: string;
  type: "senate" | "governor" | "special";
  state: string;
  description: string;
  competitiveness: "safe-d" | "lean-d" | "toss-up" | "lean-r" | "safe-r";
};

export type StateElectionBoard = {
  state: string;
  abbr: string;
  url: string;
};

export const primaryCalendar: StatePrimary[] = [
  {
    state: "Alabama",
    abbr: "AL",
    primaryDate: "2026-06-02",
    primaryType: "open",
  },
  {
    state: "Alaska",
    abbr: "AK",
    primaryDate: "2026-08-25",
    primaryType: "semi-closed",
  },
  {
    state: "Arizona",
    abbr: "AZ",
    primaryDate: "2026-08-04",
    primaryType: "semi-closed",
  },
  {
    state: "Arkansas",
    abbr: "AR",
    primaryDate: "2026-05-19",
    primaryType: "open",
  },
  {
    state: "California",
    abbr: "CA",
    primaryDate: "2026-06-02",
    primaryType: "semi-closed",
  },
  {
    state: "Colorado",
    abbr: "CO",
    primaryDate: "2026-06-23",
    primaryType: "semi-closed",
  },
  {
    state: "Connecticut",
    abbr: "CT",
    primaryDate: "2026-08-11",
    primaryType: "closed",
  },
  {
    state: "Delaware",
    abbr: "DE",
    primaryDate: "2026-09-15",
    primaryType: "closed",
  },
  {
    state: "Florida",
    abbr: "FL",
    primaryDate: "2026-08-18",
    primaryType: "closed",
  },
  {
    state: "Georgia",
    abbr: "GA",
    primaryDate: "2026-05-19",
    primaryType: "open",
  },
  {
    state: "Hawaii",
    abbr: "HI",
    primaryDate: "2026-08-08",
    primaryType: "open",
  },
  {
    state: "Idaho",
    abbr: "ID",
    primaryDate: "2026-05-19",
    primaryType: "open",
  },
  {
    state: "Illinois",
    abbr: "IL",
    primaryDate: "2026-03-17",
    primaryType: "open",
  },
  {
    state: "Indiana",
    abbr: "IN",
    primaryDate: "2026-05-05",
    primaryType: "open",
  },
  {
    state: "Iowa",
    abbr: "IA",
    primaryDate: "2026-06-02",
    primaryType: "semi-open",
  },
  {
    state: "Kansas",
    abbr: "KS",
    primaryDate: "2026-08-04",
    primaryType: "closed",
  },
  {
    state: "Kentucky",
    abbr: "KY",
    primaryDate: "2026-05-19",
    primaryType: "closed",
  },
  {
    state: "Louisiana",
    abbr: "LA",
    primaryDate: "2026-10-10",
    primaryType: "open",
    notes:
      "Jungle primary — all candidates appear on one ballot regardless of party.",
  },
  {
    state: "Maine",
    abbr: "ME",
    primaryDate: "2026-06-09",
    primaryType: "closed",
  },
  {
    state: "Maryland",
    abbr: "MD",
    primaryDate: "2026-06-23",
    primaryType: "closed",
  },
  {
    state: "Massachusetts",
    abbr: "MA",
    primaryDate: "2026-09-15",
    primaryType: "semi-open",
  },
  {
    state: "Michigan",
    abbr: "MI",
    primaryDate: "2026-08-04",
    primaryType: "open",
  },
  {
    state: "Minnesota",
    abbr: "MN",
    primaryDate: "2026-08-11",
    primaryType: "open",
  },
  {
    state: "Mississippi",
    abbr: "MS",
    primaryDate: "2026-06-02",
    primaryType: "open",
  },
  {
    state: "Missouri",
    abbr: "MO",
    primaryDate: "2026-08-04",
    primaryType: "open",
  },
  {
    state: "Montana",
    abbr: "MT",
    primaryDate: "2026-06-02",
    primaryType: "open",
  },
  {
    state: "Nebraska",
    abbr: "NE",
    primaryDate: "2026-05-12",
    primaryType: "semi-open",
  },
  {
    state: "Nevada",
    abbr: "NV",
    primaryDate: "2026-06-09",
    primaryType: "closed",
  },
  {
    state: "New Hampshire",
    abbr: "NH",
    primaryDate: "2026-09-08",
    primaryType: "semi-open",
  },
  {
    state: "New Jersey",
    abbr: "NJ",
    primaryDate: "2026-06-02",
    primaryType: "semi-open",
  },
  {
    state: "New Mexico",
    abbr: "NM",
    primaryDate: "2026-06-02",
    primaryType: "closed",
  },
  {
    state: "New York",
    abbr: "NY",
    primaryDate: "2026-06-23",
    primaryType: "closed",
  },
  {
    state: "North Carolina",
    abbr: "NC",
    primaryDate: "2026-05-19",
    primaryType: "semi-open",
  },
  {
    state: "North Dakota",
    abbr: "ND",
    primaryDate: "2026-06-09",
    primaryType: "open",
  },
  { state: "Ohio", abbr: "OH", primaryDate: "2026-05-05", primaryType: "open" },
  {
    state: "Oklahoma",
    abbr: "OK",
    primaryDate: "2026-06-16",
    primaryType: "semi-open",
  },
  {
    state: "Oregon",
    abbr: "OR",
    primaryDate: "2026-05-19",
    primaryType: "closed",
  },
  {
    state: "Pennsylvania",
    abbr: "PA",
    primaryDate: "2026-05-19",
    primaryType: "closed",
  },
  {
    state: "Rhode Island",
    abbr: "RI",
    primaryDate: "2026-09-15",
    primaryType: "closed",
  },
  {
    state: "South Carolina",
    abbr: "SC",
    primaryDate: "2026-06-09",
    primaryType: "open",
  },
  {
    state: "South Dakota",
    abbr: "SD",
    primaryDate: "2026-06-02",
    primaryType: "semi-open",
  },
  {
    state: "Tennessee",
    abbr: "TN",
    primaryDate: "2026-08-06",
    primaryType: "open",
  },
  {
    state: "Texas",
    abbr: "TX",
    primaryDate: "2026-03-03",
    primaryType: "open",
  },
  {
    state: "Utah",
    abbr: "UT",
    primaryDate: "2026-06-23",
    primaryType: "semi-open",
  },
  {
    state: "Vermont",
    abbr: "VT",
    primaryDate: "2026-08-11",
    primaryType: "open",
  },
  {
    state: "Virginia",
    abbr: "VA",
    primaryDate: "2026-06-09",
    primaryType: "open",
  },
  {
    state: "Washington",
    abbr: "WA",
    primaryDate: "2026-08-04",
    primaryType: "open",
  },
  {
    state: "West Virginia",
    abbr: "WV",
    primaryDate: "2026-05-12",
    primaryType: "semi-open",
  },
  {
    state: "Wisconsin",
    abbr: "WI",
    primaryDate: "2026-08-11",
    primaryType: "open",
  },
  {
    state: "Wyoming",
    abbr: "WY",
    primaryDate: "2026-08-18",
    primaryType: "closed",
  },
  {
    state: "District of Columbia",
    abbr: "DC",
    primaryDate: "",
    primaryType: "closed",
    notes:
      "No federal primary scheduled for 2026. DC elects a non-voting delegate to the House.",
  },
];

export const notableRaces: Race[] = [
  {
    id: "ga-senate",
    name: "Georgia Senate",
    date: "2026-11-03",
    type: "senate",
    state: "GA",
    description:
      "Jon Ossoff (D) defends in a state that has swung back and forth in recent cycles. One of the most expensive races in the country.",
    competitiveness: "toss-up",
  },
  {
    id: "mi-senate",
    name: "Michigan Senate",
    date: "2026-11-03",
    type: "senate",
    state: "MI",
    description:
      "Gary Peters (D) retiring. Open seat in a battleground state that has trended toward tight margins.",
    competitiveness: "toss-up",
  },
  {
    id: "mn-senate",
    name: "Minnesota Senate",
    date: "2026-11-03",
    type: "senate",
    state: "MN",
    description:
      "Tina Smith (D) seeks re-election. Minnesota has been slowly tightening at the federal level.",
    competitiveness: "lean-d",
  },
  {
    id: "nh-senate",
    name: "New Hampshire Senate",
    date: "2026-11-03",
    type: "senate",
    state: "NH",
    description:
      "Open seat after Jeanne Shaheen (D) announced she will not seek re-election. Competitive swing state with a history of surprise outcomes.",
    competitiveness: "toss-up",
  },
  {
    id: "va-senate",
    name: "Virginia Senate",
    date: "2026-11-03",
    type: "senate",
    state: "VA",
    description:
      "Mark Warner (D) retiring. Open seat in a state that has trended blue but remains competitive statewide.",
    competitiveness: "lean-d",
  },
  {
    id: "nc-senate",
    name: "North Carolina Senate",
    date: "2026-11-03",
    type: "senate",
    state: "NC",
    description:
      "Thom Tillis (R) retiring. Open seat in a perpetual battleground state.",
    competitiveness: "toss-up",
  },
  {
    id: "me-senate",
    name: "Maine Senate",
    date: "2026-11-03",
    type: "senate",
    state: "ME",
    description:
      "Susan Collins (R) seeks re-election. Collins has survived tough cycles before but Maine is shifting.",
    competitiveness: "lean-r",
  },
  {
    id: "ia-senate",
    name: "Iowa Senate",
    date: "2026-11-03",
    type: "senate",
    state: "IA",
    description:
      "Joni Ernst (R) defends. Iowa swung hard right in 2024 but Democrats see an opening.",
    competitiveness: "lean-r",
  },
  {
    id: "tx-senate",
    name: "Texas Senate",
    date: "2026-11-03",
    type: "senate",
    state: "TX",
    description:
      "John Cornyn (R) defends in a state Democrats keep investing in. Margins have been shrinking.",
    competitiveness: "lean-r",
  },
  {
    id: "il-gov",
    name: "Illinois Governor",
    date: "2026-11-03",
    type: "governor",
    state: "IL",
    description:
      "Open seat after Pritzker. Illinois is reliably blue statewide but the primary will draw attention.",
    competitiveness: "safe-d",
  },
  {
    id: "fl-gov",
    name: "Florida Governor",
    date: "2026-11-03",
    type: "governor",
    state: "FL",
    description:
      "DeSantis is term-limited. Wide-open race in the nation's third-largest state.",
    competitiveness: "lean-r",
  },
  {
    id: "tx-gov",
    name: "Texas Governor",
    date: "2026-11-03",
    type: "governor",
    state: "TX",
    description:
      "Abbott is term-eligible but the field is forming. Democrats will make a serious play.",
    competitiveness: "lean-r",
  },
  {
    id: "pa-gov",
    name: "Pennsylvania Governor",
    date: "2026-11-03",
    type: "governor",
    state: "PA",
    description:
      "Shapiro (D) seeks re-election after a strong first term. Republicans looking for a top-tier challenger.",
    competitiveness: "lean-d",
  },
  {
    id: "mi-gov",
    name: "Michigan Governor",
    date: "2026-11-03",
    type: "governor",
    state: "MI",
    description:
      "Whitmer (D) is term-limited. Open seat in a premier swing state.",
    competitiveness: "toss-up",
  },
  {
    id: "oh-gov",
    name: "Ohio Governor",
    date: "2026-11-03",
    type: "governor",
    state: "OH",
    description:
      "DeWine (R) is term-limited. Open seat in a state that has shifted reliably red at the federal level.",
    competitiveness: "lean-r",
  },
  {
    id: "ga-gov",
    name: "Georgia Governor",
    date: "2026-11-03",
    type: "governor",
    state: "GA",
    description:
      "Kemp (R) is term-limited. Another open seat in a top battleground state.",
    competitiveness: "toss-up",
  },
  {
    id: "wi-gov",
    name: "Wisconsin Governor",
    date: "2026-11-03",
    type: "governor",
    state: "WI",
    description:
      "Evers (D) seeks re-election in a state decided by razor-thin margins.",
    competitiveness: "toss-up",
  },
  {
    id: "ny-gov",
    name: "New York Governor",
    date: "2026-11-03",
    type: "governor",
    state: "NY",
    description:
      "Hochul (D) faces re-election with middling approval. May draw a competitive primary.",
    competitiveness: "lean-d",
  },
];

export const stateElectionBoards: StateElectionBoard[] = [
  {
    state: "Alabama",
    abbr: "AL",
    url: "https://www.sos.alabama.gov/alabama-votes",
  },
  { state: "Alaska", abbr: "AK", url: "https://www.elections.alaska.gov" },
  { state: "Arizona", abbr: "AZ", url: "https://azsos.gov/elections" },
  {
    state: "Arkansas",
    abbr: "AR",
    url: "https://www.sos.arkansas.gov/elections",
  },
  { state: "California", abbr: "CA", url: "https://www.sos.ca.gov/elections" },
  {
    state: "Colorado",
    abbr: "CO",
    url: "https://www.sos.state.co.us/pubs/elections",
  },
  {
    state: "Connecticut",
    abbr: "CT",
    url: "https://portal.ct.gov/sots/election-services",
  },
  { state: "Delaware", abbr: "DE", url: "https://elections.delaware.gov" },
  { state: "Florida", abbr: "FL", url: "https://dos.fl.gov/elections" },
  { state: "Georgia", abbr: "GA", url: "https://sos.ga.gov/elections" },
  { state: "Hawaii", abbr: "HI", url: "https://elections.hawaii.gov" },
  { state: "Idaho", abbr: "ID", url: "https://sos.idaho.gov/elections" },
  { state: "Illinois", abbr: "IL", url: "https://www.elections.il.gov" },
  { state: "Indiana", abbr: "IN", url: "https://www.in.gov/sos/elections" },
  { state: "Iowa", abbr: "IA", url: "https://sos.iowa.gov/elections" },
  { state: "Kansas", abbr: "KS", url: "https://sos.ks.gov/elections" },
  { state: "Kentucky", abbr: "KY", url: "https://elect.ky.gov" },
  {
    state: "Louisiana",
    abbr: "LA",
    url: "https://www.sos.la.gov/ElectionsAndVoting",
  },
  { state: "Maine", abbr: "ME", url: "https://www.maine.gov/sos/cec/elec" },
  { state: "Maryland", abbr: "MD", url: "https://elections.maryland.gov" },
  {
    state: "Massachusetts",
    abbr: "MA",
    url: "https://www.sec.state.ma.us/divisions/elections",
  },
  { state: "Michigan", abbr: "MI", url: "https://mvic.sos.state.mi.us" },
  {
    state: "Minnesota",
    abbr: "MN",
    url: "https://www.sos.state.mn.us/elections-voting",
  },
  { state: "Mississippi", abbr: "MS", url: "https://www.sos.ms.gov/elections" },
  { state: "Missouri", abbr: "MO", url: "https://www.sos.mo.gov/elections" },
  { state: "Montana", abbr: "MT", url: "https://sosmt.gov/elections" },
  { state: "Nebraska", abbr: "NE", url: "https://sos.nebraska.gov/elections" },
  { state: "Nevada", abbr: "NV", url: "https://www.nvsos.gov/sos/elections" },
  {
    state: "New Hampshire",
    abbr: "NH",
    url: "https://www.sos.nh.gov/elections",
  },
  { state: "New Jersey", abbr: "NJ", url: "https://nj.gov/state/elections" },
  {
    state: "New Mexico",
    abbr: "NM",
    url: "https://www.sos.nm.gov/voting-and-elections",
  },
  { state: "New York", abbr: "NY", url: "https://www.elections.ny.gov" },
  { state: "North Carolina", abbr: "NC", url: "https://www.ncsbe.gov" },
  { state: "North Dakota", abbr: "ND", url: "https://vip.sos.nd.gov" },
  {
    state: "Ohio",
    abbr: "OH",
    url: "https://www.ohiosos.gov/elections-voting",
  },
  { state: "Oklahoma", abbr: "OK", url: "https://oklahoma.gov/elections" },
  { state: "Oregon", abbr: "OR", url: "https://sos.oregon.gov/voting" },
  { state: "Pennsylvania", abbr: "PA", url: "https://www.vote.pa.gov" },
  { state: "Rhode Island", abbr: "RI", url: "https://elections.ri.gov" },
  { state: "South Carolina", abbr: "SC", url: "https://scvotes.gov" },
  {
    state: "South Dakota",
    abbr: "SD",
    url: "https://sdsos.gov/elections-voting",
  },
  { state: "Tennessee", abbr: "TN", url: "https://sos.tn.gov/elections" },
  { state: "Texas", abbr: "TX", url: "https://www.sos.texas.gov/elections" },
  { state: "Utah", abbr: "UT", url: "https://vote.utah.gov" },
  { state: "Vermont", abbr: "VT", url: "https://sos.vermont.gov/elections" },
  { state: "Virginia", abbr: "VA", url: "https://www.elections.virginia.gov" },
  { state: "Washington", abbr: "WA", url: "https://www.sos.wa.gov/elections" },
  { state: "West Virginia", abbr: "WV", url: "https://sos.wv.gov/elections" },
  { state: "Wisconsin", abbr: "WI", url: "https://elections.wi.gov" },
  { state: "Wyoming", abbr: "WY", url: "https://sos.wyo.gov/Elections" },
  { state: "District of Columbia", abbr: "DC", url: "https://www.dcboe.org" },
];
