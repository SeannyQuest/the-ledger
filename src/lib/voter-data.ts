export interface StateVoterData {
  state: string;
  abbr: string;
  onlineRegistration: boolean;
  onlineRegistrationUrl: string;
  registrationDeadline: string;
  sameDayRegistration: boolean;
  idRequirements: string;
  checkRegistrationUrl: string;
  earlyVoting: boolean;
  noExcuseAbsenteeBallot: boolean;
  notes: string;
}

export const stateVoterData: StateVoterData[] = [
  {
    state: "Alabama",
    abbr: "AL",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://www.alabamavotes.gov/",
    registrationDeadline: "15 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required. Accepted forms include driver's license, passport, state-issued ID, military ID, or tribal ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: false,
    noExcuseAbsenteeBallot: false,
    notes:
      "Alabama does not offer early voting. Absentee voting requires a valid excuse. Felony convictions involving moral turpitude result in disenfranchisement unless rights are restored.",
  },
  {
    state: "Alaska",
    abbr: "AK",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://voterregistration.alaska.gov/",
    registrationDeadline: "30 days before election (online/mail); same-day registration available in person",
    sameDayRegistration: true,
    idRequirements:
      "ID required at polls. Accepted forms include driver's license, state ID, passport, military ID, or other government-issued photo ID. Voters without ID may vote a questioned ballot.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Alaska uses ranked-choice voting for general elections. Same-day registration available at early voting locations and on Election Day. Any registered voter can request an absentee ballot.",
  },
  {
    state: "Arizona",
    abbr: "AZ",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://azsos.gov/elections",
    registrationDeadline: "29 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required at the polls. Accepted forms include AZ driver's license, tribal ID, or two forms of non-photo ID (utility bill, bank statement, etc.).",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Active Early Voting List (AEVL) lets you automatically receive a mail ballot for every election. Early voting begins 27 days before election.",
  },
  {
    state: "Arkansas",
    abbr: "AR",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://www.sos.arkansas.gov/elections/voter-information/",
    registrationDeadline: "30 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required. Accepted forms include driver's license, passport, or other government-issued photo ID. Voters without ID may cast a provisional ballot.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: false,
    notes:
      "Early voting begins 15 days before election. Absentee voting requires a valid excuse. Strict photo ID requirement at polls.",
  },
  {
    state: "California",
    abbr: "CA",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://registertovote.ca.gov/",
    registrationDeadline: "15 days before election (online/mail); conditional same-day registration available",
    sameDayRegistration: true,
    idRequirements:
      "No photo ID required for most voters. First-time voters who did not provide ID with registration may need to show ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "All registered voters automatically receive a mail ballot. Automatic voter registration through the DMV. Same-day conditional voter registration available at any polling place or county elections office.",
  },
  {
    state: "Colorado",
    abbr: "CO",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://www.sos.state.co.us/voter/pages/pub/olvr/verifyNewVoter.xhtml",
    registrationDeadline: "8 days before election (online); same-day registration available in person",
    sameDayRegistration: true,
    idRequirements:
      "ID required for in-person voting. Accepted forms include CO driver's license, passport, or other government-issued ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "All-mail voting state — every registered voter automatically receives a ballot by mail. Ballots mailed approximately 22 days before election. Voter service and polling centers available for in-person voting.",
  },
  {
    state: "Connecticut",
    abbr: "CT",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://voterregistration.ct.gov/",
    registrationDeadline: "7 days before election (online/mail); same-day registration available on Election Day",
    sameDayRegistration: true,
    idRequirements:
      "ID required for first-time voters who registered by mail. Accepted forms include any document with name and address.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Early voting added starting in 2024. Election Day registration available at designated locations. No-excuse absentee voting available.",
  },
  {
    state: "Delaware",
    abbr: "DE",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://ivote.de.gov/",
    registrationDeadline: "24 days before election (4th Saturday before)",
    sameDayRegistration: true,
    idRequirements:
      "ID number required for registration (DE driver's license or last 4 digits of SSN). No photo ID required at polls.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Same-day registration available during early voting and on Election Day. Early voting period is 10 days before Election Day.",
  },
  {
    state: "District of Columbia",
    abbr: "DC",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://www.dcboe.org/voters/register-to-vote",
    registrationDeadline: "Same day — register and vote on Election Day",
    sameDayRegistration: true,
    idRequirements:
      "No photo ID required. First-time voters who registered by mail may need to show ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Same-day voter registration available. Automatic voter registration through the DMV. DC residents have no voting representation in Congress — a delegate in the House but no senators.",
  },
  {
    state: "Florida",
    abbr: "FL",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://registertovoteflorida.gov/",
    registrationDeadline: "29 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Photo and signature ID required at polls. Accepted forms include FL driver's license, state ID, passport, military ID, or student ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Mail ballots must be requested each general election cycle. Early voting runs for at least 8 days. Felons must complete all terms of sentence including restitution before registering.",
  },
  {
    state: "Georgia",
    abbr: "GA",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://registertovote.sos.ga.gov/",
    registrationDeadline: "29 days before election (5th Monday before)",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required at polls and for absentee ballot applications. Accepted forms include GA driver's license, state-issued ID, passport, military ID, or government employee ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Photo ID required for both in-person and absentee voting. Early voting begins the 4th Monday before election. Automatic voter registration available through the DMV.",
  },
  {
    state: "Hawaii",
    abbr: "HI",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://olvr.hawaii.gov/",
    registrationDeadline: "Same day — register and vote on Election Day",
    sameDayRegistration: true,
    idRequirements:
      "ID may be required for first-time voters who registered by mail. Mail voters do not need photo ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "All-mail voting state — every registered voter receives a ballot by mail. Same-day registration available at voter service centers. Automatic voter registration.",
  },
  {
    state: "Idaho",
    abbr: "ID",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://idahovotes.gov/",
    registrationDeadline: "25 days before election (online); same-day registration available at polls",
    sameDayRegistration: true,
    idRequirements:
      "Photo ID required at the polls. Accepted forms include Idaho driver's license, passport, tribal ID, or student photo ID with additional documentation.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Same-day registration available at the polls on Election Day with valid photo ID. In-person absentee voting available at county clerk offices.",
  },
  {
    state: "Illinois",
    abbr: "IL",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://ova.elections.il.gov/",
    registrationDeadline: "28 days before election (online/mail); same-day registration available in person",
    sameDayRegistration: true,
    idRequirements:
      "No photo ID required for most voters. Same-day registrants must show two forms of ID, one with current address.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Automatic voter registration. Grace period registration available through Election Day at designated locations. Early voting begins 40 days before election.",
  },
  {
    state: "Indiana",
    abbr: "IN",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://indianavoters.in.gov/",
    registrationDeadline: "29 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Strict photo ID required. Must be government-issued with photo, name, and expiration date. Includes IN driver's license, US passport, or military ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: false,
    notes:
      "One of the strictest photo ID laws in the country. In-person early voting begins 28 days before election at county election offices. Absentee by mail requires a valid excuse.",
  },
  {
    state: "Iowa",
    abbr: "IA",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://sos.iowa.gov/elections/voterinformation/voterregistration.html",
    registrationDeadline: "15 days before election (online/mail); same-day registration available at polls",
    sameDayRegistration: true,
    idRequirements:
      "Photo ID required. Accepted forms include IA driver's license, US passport, military ID, or tribal ID. Voters without ID may have identity attested by a registered voter.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Election Day registration available at all polling places. Early (in-person absentee) voting begins 20 days before election. Photo ID law in effect.",
  },
  {
    state: "Kansas",
    abbr: "KS",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://www.kdor.ks.gov/Apps/VoterReg/",
    registrationDeadline: "21 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required. Accepted forms include driver's license, state ID, US passport, military ID, or concealed carry license.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Advance (early) voting begins 20 days before election. Any voter can request a mail ballot without excuse.",
  },
  {
    state: "Kentucky",
    abbr: "KY",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://vrsws.sos.ky.gov/ovrweb/",
    registrationDeadline: "29 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required. Accepted forms include driver's license, state ID, US passport, military ID, or other government-issued photo ID. Voters without photo ID can get a free ID or sign a reasonable impediment declaration.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: false,
    notes:
      "Limited early voting — 3 days (Thursday through Saturday before Election Day). Absentee by mail requires a valid excuse. Felony disenfranchisement is among the strictest — governor must individually restore rights.",
  },
  {
    state: "Louisiana",
    abbr: "LA",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://voterportal.sos.la.gov/",
    registrationDeadline: "30 days before election (online); 20 days before (in-person/mail)",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required. Accepted forms include LA driver's license, state ID, or other generally recognized picture ID. Voters without ID may sign an affidavit.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: false,
    notes:
      "Early voting runs from 14 to 7 days before election. Absentee by mail requires a valid excuse. Louisiana uses an open primary (jungle primary) system.",
  },
  {
    state: "Maine",
    abbr: "ME",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://www.maine.gov/sos/cec/elec/voter-info/voterguide.html",
    registrationDeadline: "Same day — register and vote on Election Day",
    sameDayRegistration: true,
    idRequirements:
      "No photo ID required at the polls. First-time voters who registered by mail without ID may need to show identification.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Same-day voter registration at the polls on Election Day. Ranked-choice voting used for federal offices and governor. In-person absentee voting available at town offices.",
  },
  {
    state: "Maryland",
    abbr: "MD",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://voterservices.elections.maryland.gov/OnlineVoterRegistration",
    registrationDeadline: "21 days before election (online/mail); same-day registration during early voting and on Election Day",
    sameDayRegistration: true,
    idRequirements:
      "Not required for most voters. First-time voters who registered by mail may need to show ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Automatic voter registration. Same-day registration available during early voting and on Election Day. Early voting begins 10 days before election.",
  },
  {
    state: "Massachusetts",
    abbr: "MA",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://www.sec.state.ma.us/ovr/",
    registrationDeadline: "10 days before election; same-day registration available",
    sameDayRegistration: true,
    idRequirements:
      "ID generally not required at the polls. First-time voters who registered by mail without ID verification may need to show identification.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Automatic voter registration. Same-day voter registration. Early voting available for general elections. All voters can vote by mail.",
  },
  {
    state: "Michigan",
    abbr: "MI",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://mvic.sos.state.mi.us/registervoter",
    registrationDeadline: "15 days before election (online/mail); same-day registration available with proof of residency",
    sameDayRegistration: true,
    idRequirements:
      "Photo ID requested at polls. If no photo ID, you can sign an affidavit affirming identity and vote a regular ballot.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Automatic voter registration. Nine days of in-person early voting (added via Proposal 2 in 2022). Same-day registration with proof of residency. No-excuse absentee voting.",
  },
  {
    state: "Minnesota",
    abbr: "MN",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://mnvotes.sos.mn.gov/VoterRegistration/",
    registrationDeadline: "21 days before election (online); same-day registration at polls",
    sameDayRegistration: true,
    idRequirements:
      "Proof of residence required for same-day registration (e.g., MN driver's license, utility bill, registered voter vouching). Regular voters: ID with current name and address.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Minnesota has one of the highest voter turnout rates in the nation. Same-day registration has been available since 1974. Early (absentee) voting begins 46 days before election.",
  },
  {
    state: "Mississippi",
    abbr: "MS",
    onlineRegistration: false,
    onlineRegistrationUrl: "https://vote.gov",
    registrationDeadline: "30 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required. Accepted forms include MS driver's license, state ID, US passport, government employee ID, firearms license, tribal ID, or student photo ID from MS university.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: false,
    noExcuseAbsenteeBallot: false,
    notes:
      "One of the most restrictive voting states. No online voter registration, no early voting, and no no-excuse absentee voting. Must register by mail or in person at the county circuit clerk's office.",
  },
  {
    state: "Missouri",
    abbr: "MO",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://www.sos.mo.gov/elections/goVoteMissouri/register",
    registrationDeadline: "27 days before election (4th Wednesday before)",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required. Accepted forms include MO driver's license, state ID, US passport, or military ID. Voters without photo ID may use non-photo ID and sign an affidavit.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: false,
    noExcuseAbsenteeBallot: false,
    notes:
      "No traditional early voting. In-person absentee voting available at local election offices during the two weeks before Election Day, but requires a valid excuse. Photo ID law in effect.",
  },
  {
    state: "Montana",
    abbr: "MT",
    onlineRegistration: false,
    onlineRegistrationUrl: "https://vote.gov",
    registrationDeadline: "30 days before election (regular); late registration at county election office through Election Day",
    sameDayRegistration: true,
    idRequirements:
      "ID required at polls. Accepted forms include MT driver's license, state ID, military ID, tribal ID, or other government-issued photo ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "No online voter registration — must register by mail or in person. Late registration available at county election office through Election Day. Any voter may request an absentee ballot.",
  },
  {
    state: "Nebraska",
    abbr: "NE",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://www.nebraska.gov/apps-sos-voter-registration/",
    registrationDeadline: "18 days before election (online/mail); 11 days before (in person)",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required (voter-approved requirement in 2022). Accepted forms include driver's license, state ID, US passport, or other government-issued photo ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Unique nonpartisan unicameral legislature. Photo ID requirement approved by voters in 2022. Early voting by mail or in person at county election office begins 30 days before election.",
  },
  {
    state: "Nevada",
    abbr: "NV",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://www.registertovotenv.gov/",
    registrationDeadline: "Same day — register and vote on Election Day",
    sameDayRegistration: true,
    idRequirements:
      "No photo ID required for most voters. First-time voters who registered by mail may need to show ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "All active registered voters automatically receive mail ballots. Same-day voter registration available at any polling location. Early voting begins about 14 days before election.",
  },
  {
    state: "New Hampshire",
    abbr: "NH",
    onlineRegistration: false,
    onlineRegistrationUrl: "https://vote.gov",
    registrationDeadline: "Same day — register at the polls on Election Day",
    sameDayRegistration: true,
    idRequirements:
      "Photo ID requested. Voters without acceptable photo ID may sign an affidavit and have their photo taken. Accepted forms include driver's license, passport, military ID, or other government-issued photo ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: false,
    noExcuseAbsenteeBallot: false,
    notes:
      "No online voter registration. Same-day registration at the polls on Election Day. No early voting. Absentee voting requires a valid excuse (absence, disability, or religious observance).",
  },
  {
    state: "New Jersey",
    abbr: "NJ",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://voter.svrs.nj.gov/register",
    registrationDeadline: "21 days before election; same-day registration available",
    sameDayRegistration: true,
    idRequirements:
      "ID generally not required for established voters. First-time voters who registered by mail may need to show ID (driver's license, bank statement, utility bill, etc.).",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "10 days of in-person early voting. Automatic voter registration. Same-day voter registration available. Any voter can request a mail-in ballot.",
  },
  {
    state: "New Mexico",
    abbr: "NM",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://portal.sos.state.nm.us/OVR/",
    registrationDeadline: "28 days before election (mail); same-day registration during early voting and on Election Day",
    sameDayRegistration: true,
    idRequirements:
      "Voter must state their name and address. First-time voters who registered by mail may need to show ID. No photo ID required.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Same-day registration available during early voting and on Election Day at any voting convenience center. Early voting begins 28 days before election.",
  },
  {
    state: "New York",
    abbr: "NY",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://voterreg.dmv.ny.gov/MotorVoter/",
    registrationDeadline: "25 days before election (mail/online); 10 days before (in person)",
    sameDayRegistration: false,
    idRequirements:
      "Generally not required for most voters. First-time voters who registered by mail without verification may need to show ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "10 days of early voting. No-excuse absentee voting. Online registration available through DMV portal (requires NY driver's license or ID).",
  },
  {
    state: "North Carolina",
    abbr: "NC",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://www.ncsbe.gov/registering/how-register",
    registrationDeadline: "25 days before election; same-day registration available during early voting only",
    sameDayRegistration: true,
    idRequirements:
      "Photo ID required. Accepted forms include NC driver's license, US passport, military/veteran ID, or tribal ID. Voters without ID can fill out an exception form and vote provisionally.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Same-day registration available during early voting period only — not on Election Day itself. Photo ID requirement in effect. Early voting runs for approximately 17 days.",
  },
  {
    state: "North Dakota",
    abbr: "ND",
    onlineRegistration: false,
    onlineRegistrationUrl: "https://vote.nd.gov/",
    registrationDeadline: "No voter registration required — the only state that does not require registration",
    sameDayRegistration: false,
    idRequirements:
      "Valid ID required to vote (no registration). Must show ID with name, current ND residential address, and date of birth. Accepted forms include ND driver's license, tribal ID, or other approved ID.",
    checkRegistrationUrl: "https://vip.sos.nd.gov/WhereToVote.aspx",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "North Dakota is the only state with no voter registration requirement. Simply bring valid ID to your polling place and vote. Early voting (in-person absentee) available at county auditor offices.",
  },
  {
    state: "Ohio",
    abbr: "OH",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://olvr.ohiosos.gov/",
    registrationDeadline: "30 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required. Accepted forms include OH driver's license, state ID, US passport, or military ID. Voters without acceptable photo ID may cast a provisional ballot.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "In-person early voting begins 29 days before election at county boards of elections. Photo ID copy required for absentee ballot applications. Ohio eliminated same-day registration.",
  },
  {
    state: "Oklahoma",
    abbr: "OK",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://oklahoma.gov/elections/voter-registration.html",
    registrationDeadline: "25 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Proof of identity required. Accepted forms include photo ID (driver's license, passport, military ID, tribal ID) or the voter ID card issued by the county election board.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: false,
    notes:
      "In-person absentee voting available Thursday through Saturday before election at county election board. Mail absentee requires a valid excuse or being a registered absentee voter.",
  },
  {
    state: "Oregon",
    abbr: "OR",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://sos.oregon.gov/voting/Pages/registration.aspx",
    registrationDeadline: "21 days before election",
    sameDayRegistration: false,
    idRequirements:
      "No photo ID required — Oregon votes entirely by mail. Registration requires OR driver's license number, state ID number, or last 4 of SSN.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "All-mail voting state since 1998. Ballots mailed approximately 14–18 days before election. Automatic voter registration through the Oregon Motor Voter program.",
  },
  {
    state: "Pennsylvania",
    abbr: "PA",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://www.vote.pa.gov/",
    registrationDeadline: "15 days before election",
    sameDayRegistration: false,
    idRequirements:
      "ID required for first-time voters at a new polling place. Accepted forms include PA driver's license, US passport, military ID, or non-photo ID with name and address.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: false,
    noExcuseAbsenteeBallot: true,
    notes:
      "No traditional early voting, but no-excuse mail-in voting available (apply at least 7 days before election). In-person mail-in voting possible at county election offices. Act 77 (2019) enabled mail-in voting.",
  },
  {
    state: "Rhode Island",
    abbr: "RI",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://vote.sos.ri.gov/",
    registrationDeadline: "30 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required. Accepted forms include RI driver's license, US passport, military ID, or other government-issued photo ID. Voters without photo ID may show non-photo ID and vote provisionally.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Early voting begins 20 days before election. Mail ballot available without excuse. Photo ID law in effect.",
  },
  {
    state: "South Carolina",
    abbr: "SC",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://www.scvotes.gov/",
    registrationDeadline: "30 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required. Accepted forms include SC driver's license, state ID, US passport, military ID, or voter registration card with photo. Free photo voter registration card available.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: false,
    notes:
      "In-person early voting added in 2022. Excuse still required for absentee mail ballots. Early voting runs for about 2 weeks before election.",
  },
  {
    state: "South Dakota",
    abbr: "SD",
    onlineRegistration: false,
    onlineRegistrationUrl: "https://vote.gov",
    registrationDeadline: "15 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required. Accepted forms include SD driver's license, US passport, or other government-issued photo ID. Voters without photo ID may sign a personal identification affidavit.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "No online voter registration — register by mail or in person at the county auditor's office. In-person absentee voting begins 46 days before election.",
  },
  {
    state: "Tennessee",
    abbr: "TN",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://ovr.govote.tn.gov/",
    registrationDeadline: "30 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Photo ID required. Accepted forms include TN driver's license, US passport, military ID, state-issued photo ID, or TN handgun carry permit. Free photo ID available from the state.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: false,
    notes:
      "Early voting period runs approximately 20 days (one of the longer periods nationally). Excuse required for absentee by mail.",
  },
  {
    state: "Texas",
    abbr: "TX",
    onlineRegistration: false,
    onlineRegistrationUrl: "https://vote.gov",
    registrationDeadline: "30 days before election",
    sameDayRegistration: false,
    idRequirements:
      "Strict photo ID required. Accepted forms include TX driver's license, TX personal ID, TX Election ID Certificate (free), TX handgun license, US passport, or military ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: false,
    notes:
      "No online voter registration — must register by mail or in person. One of the most restrictive absentee voting policies (must be 65+, disabled, away from county, or confined in jail). Early voting runs approximately 12 days.",
  },
  {
    state: "Utah",
    abbr: "UT",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://vote.utah.gov/",
    registrationDeadline: "11 days before election (online); same-day registration available in person",
    sameDayRegistration: true,
    idRequirements:
      "Valid ID required. Accepted forms include UT driver's license, state ID, US passport, military ID, tribal ID, or other government-issued ID.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "All-mail voting state — ballots mailed to all active registered voters. Same-day registration with valid ID. In-person voting also available.",
  },
  {
    state: "Vermont",
    abbr: "VT",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://olvr.vermont.gov/",
    registrationDeadline: "Same day — register and vote on Election Day",
    sameDayRegistration: true,
    idRequirements:
      "No photo ID required. Voters state their name and may be asked to sign an affidavit.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "All active voters automatically receive mail ballots. Same-day voter registration. Automatic voter registration through the DMV. One of the most accessible voting states.",
  },
  {
    state: "Virginia",
    abbr: "VA",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://vote.elections.virginia.gov/VoterInformation",
    registrationDeadline: "22 days before election (online/mail); same-day registration during early voting",
    sameDayRegistration: true,
    idRequirements:
      "Acceptable ID required. Forms include VA driver's license, US passport, any government-issued photo ID, student ID, utility bill, bank statement, or any government document with name and address.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "45-day early voting period (one of the longest in the country). Same-day registration available during early voting. Automatic voter registration. No-excuse absentee voting.",
  },
  {
    state: "Washington",
    abbr: "WA",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://voter.votewa.gov/",
    registrationDeadline: "8 days before election (online); same-day registration available in person",
    sameDayRegistration: true,
    idRequirements:
      "No photo ID required for mail voting. First-time voters who registered online may need to provide ID number (WA driver's license or last 4 of SSN).",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "All-mail voting state — ballots mailed to all registered voters approximately 18 days before election. Same-day registration available at voting centers.",
  },
  {
    state: "West Virginia",
    abbr: "WV",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://ovr.sos.wv.gov/Register",
    registrationDeadline: "21 days before election",
    sameDayRegistration: false,
    idRequirements:
      "ID required at polls. Accepted forms include WV driver's license, state ID, US passport, military ID, or other document with name and photo. Voters without ID may cast a provisional ballot.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: false,
    notes:
      "In-person early voting begins 13 days before election. Excuse required for absentee by mail (illness, disability, travel, etc.).",
  },
  {
    state: "Wisconsin",
    abbr: "WI",
    onlineRegistration: true,
    onlineRegistrationUrl: "https://myvote.wi.gov/",
    registrationDeadline: "20 days before election (online/mail); same-day registration at polls with proof of residence",
    sameDayRegistration: true,
    idRequirements:
      "Photo ID required. Accepted forms include WI driver's license, state ID, US passport, military ID, tribal ID, or certain student IDs. Free state ID available.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "Same-day registration at the polls with proof of residence. In-person absentee (early) voting begins 14 days before election at the municipal clerk's office. Photo ID required.",
  },
  {
    state: "Wyoming",
    abbr: "WY",
    onlineRegistration: false,
    onlineRegistrationUrl: "https://vote.gov",
    registrationDeadline: "14 days before election (by mail); same-day registration at polls",
    sameDayRegistration: true,
    idRequirements:
      "ID required at polls. Accepted forms include WY driver's license, US passport, military ID, or other government-issued ID. Voters can also be identified by a registered voter in the precinct.",
    checkRegistrationUrl: "https://www.vote.org/am-i-registered-to-vote/",
    earlyVoting: true,
    noExcuseAbsenteeBallot: true,
    notes:
      "No online voter registration — register by mail or in person. Same-day registration available at the polls on Election Day. In-person absentee voting available at the county clerk's office.",
  },
];
