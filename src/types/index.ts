// === Entity Types ===

export type EntityType =
  | "politician"
  | "corporation"
  | "pac"
  | "super_pac"
  | "lobbyist"
  | "lobbying_firm"
  | "agency"
  | "individual"
  | "union"
  | "nonprofit"
  | "party_committee";

export type AppMode = "explore" | "research";

export type FlowType = "donation" | "lobbying" | "contract" | "pac_transfer" | "independent_expenditure";

export type LinkType = "donation" | "lobbying" | "board_seat" | "ownership" | "contract" | "employment";

// === Entity ===

export interface Entity {
  id: string;
  type: EntityType;
  name: string;
  shortName?: string;
  aliases?: string[];
  description?: string;
  photoUrl?: string;
  websiteUrl?: string;
  totalReceived: number;
  totalSpent: number;
  totalContributed: number;
  totalLobbying: number;
  totalContracts: number;
}

export interface PoliticianEntity extends Entity {
  type: "politician";
  party: string;
  state: string;
  office: string;
  district?: string;
  inOffice: boolean;
}

export interface CorporationEntity extends Entity {
  type: "corporation";
  industry: string;
  naicsCode?: string;
  ticker?: string;
  parentCompany?: string;
}

export interface PACEntity extends Entity {
  type: "pac" | "super_pac";
  committeeType: string;
  connectedOrg?: string;
  treasurerName?: string;
}

// === Money Flow (Sankey) ===

export interface MoneyFlowNode {
  id: string;
  entityId: string;
  entityType: EntityType;
  name: string;
  totalAmount: number;
}

export interface MoneyFlowLink {
  source: string;
  target: string;
  amount: number;
  transactionCount: number;
  dateRange: { start: string; end: string };
  flowType: FlowType;
}

export interface MoneyFlowData {
  nodes: MoneyFlowNode[];
  links: MoneyFlowLink[];
  meta: {
    totalAmount: number;
    dateRange: { start: string; end: string };
    truncated: boolean;
  };
}

// === Network Graph ===

export interface NetworkNode {
  id: string;
  entityId: string;
  entityType: EntityType;
  name: string;
  weight: number;
  expanded: boolean;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface NetworkLink {
  source: string | NetworkNode;
  target: string | NetworkNode;
  linkType: LinkType;
  weight: number;
  label?: string;
}

export interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
  centerNodeId: string;
}

// === Contracts ===

export interface GovernmentContract {
  id: string;
  recipientEntityId: string;
  recipientName: string;
  awardingAgency: string;
  description: string;
  amount: number;
  dateAwarded: string;
  dateCompleted?: string;
  naicsCode?: string;
  industry?: string;
}

export interface ContractROI {
  entityId: string;
  entityName: string;
  entityType: EntityType;
  totalDonated: number;
  totalContractsReceived: number;
  roi: number;
  donationPeriod: { start: string; end: string };
  contractPeriod: { start: string; end: string };
}

// === Search ===

export interface SearchResult {
  entity: Entity;
  matchField: string;
  matchHighlight: string;
  score: number;
}

// === Filters ===

export interface FlowFilters {
  dateRange: { start: string; end: string };
  minAmount: number;
  entityTypes: EntityType[];
  flowTypes: FlowType[];
  sourceEntityId?: string;
  depth: number;
}

export interface NetworkFilters {
  entityTypes: EntityType[];
  linkTypes: LinkType[];
  depth: number;
  minWeight: number;
}

// === Chart Config ===

export interface ChartMargins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ChartDimensions {
  width: number;
  height: number;
  margins: ChartMargins;
  innerWidth: number;
  innerHeight: number;
}
