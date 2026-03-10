import type { EntityType, FlowType, LinkType } from "@/types";

export const ENTITY_COLORS: Record<EntityType, string> = {
  politician: "#2563eb",
  corporation: "#0a0a0a",
  pac: "#9333ea",
  super_pac: "#7c3aed",
  lobbyist: "#d97706",
  lobbying_firm: "#b45309",
  agency: "#059669",
  individual: "#6b7280",
  union: "#dc2626",
  nonprofit: "#0891b2",
  party_committee: "#4f46e5",
};

export const ENTITY_LABELS: Record<EntityType, string> = {
  politician: "Politician",
  corporation: "Corporation",
  pac: "PAC",
  super_pac: "Super PAC",
  lobbyist: "Lobbyist",
  lobbying_firm: "Lobbying Firm",
  agency: "Gov. Agency",
  individual: "Individual",
  union: "Union",
  nonprofit: "Nonprofit",
  party_committee: "Party Committee",
};

export const FLOW_TYPE_COLORS: Record<FlowType, string> = {
  donation: "#1a7a3a",
  lobbying: "#d97706",
  contract: "#2563eb",
  pac_transfer: "#9333ea",
  independent_expenditure: "#c41d1d",
};

export const FLOW_TYPE_LABELS: Record<FlowType, string> = {
  donation: "Donation",
  lobbying: "Lobbying",
  contract: "Gov. Contract",
  pac_transfer: "PAC Transfer",
  independent_expenditure: "Independent Expenditure",
};

export const LINK_TYPE_COLORS: Record<LinkType, string> = {
  donation: "#1a7a3a",
  lobbying: "#d97706",
  board_seat: "#6b7280",
  ownership: "#0a0a0a",
  contract: "#2563eb",
  employment: "#9ca3af",
};

export const LINK_TYPE_LABELS: Record<LinkType, string> = {
  donation: "Donation",
  lobbying: "Lobbying",
  board_seat: "Board Seat",
  ownership: "Ownership",
  contract: "Gov. Contract",
  employment: "Employment",
};

export const PARTY_COLORS: Record<string, string> = {
  democrat: "#2563eb",
  republican: "#dc2626",
  independent: "#6b7280",
  libertarian: "#f59e0b",
  green: "#16a34a",
};

export const DEFAULT_FLOW_FILTERS = {
  dateRange: { start: "2020-01-01", end: new Date().toISOString().split("T")[0] },
  minAmount: 1000,
  entityTypes: [] as EntityType[],
  flowTypes: [] as FlowType[],
  depth: 2,
};

export const DEFAULT_NETWORK_FILTERS = {
  entityTypes: [] as EntityType[],
  linkTypes: [] as LinkType[],
  depth: 2,
  minWeight: 0,
};
