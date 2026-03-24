export type Source = {
  name: string;
  url: string;
  category: "power-money" | "conflicts" | "environment" | "labor" | "abroad" | "accountability";
  region?: string;
  bias?: "left" | "center" | "right" | "independent";
};

export const SOURCES: Source[] = [
  {
    name: "The Intercept",
    url: "https://theintercept.com/feed/?rss",
    category: "accountability",
    bias: "left",
  },
  {
    name: "ProPublica",
    url: "https://feeds.propublica.org/propublica/main",
    category: "accountability",
    bias: "independent",
  },
  {
    name: "ICIJ",
    url: "https://www.icij.org/feed/",
    category: "accountability",
    bias: "independent",
  },
  {
    name: "Al Jazeera English",
    url: "https://www.aljazeera.com/xml/rss/all.xml",
    category: "abroad",
    bias: "independent",
  },
  {
    name: "Al Jazeera Investigations",
    url: "https://www.aljazeera.com/xml/rss/investigations.xml",
    category: "accountability",
    bias: "independent",
  },
  {
    name: "BBC World",
    url: "https://feeds.bbci.co.uk/news/world/rss.xml",
    category: "abroad",
    bias: "center",
  },
  {
    name: "Reuters World",
    url: "https://feeds.reuters.com/reuters/worldNews",
    category: "abroad",
    bias: "center",
  },
  {
    name: "The Guardian World",
    url: "https://www.theguardian.com/world/rss",
    category: "abroad",
    bias: "left",
  },
  {
    name: "The Guardian Environment",
    url: "https://www.theguardian.com/environment/rss",
    category: "environment",
    bias: "left",
  },
  {
    name: "Inside Climate News",
    url: "https://insideclimatenews.org/feed/",
    category: "environment",
    bias: "independent",
  },
  {
    name: "Responsible Statecraft",
    url: "https://responsiblestatecraft.org/feed/",
    category: "conflicts",
    bias: "independent",
  },
  {
    name: "Quincy Institute",
    url: "https://quincyinst.org/feed/",
    category: "conflicts",
    bias: "independent",
  },
  {
    name: "Jacobin",
    url: "https://jacobin.com/feed/",
    category: "labor",
    bias: "left",
  },
  {
    name: "In These Times",
    url: "https://inthesetimes.com/feed",
    category: "labor",
    bias: "left",
  },
  {
    name: "Economic Policy Institute",
    url: "https://www.epi.org/feed/",
    category: "labor",
    bias: "left",
  },
  {
    name: "OpenSecrets",
    url: "https://www.opensecrets.org/news/feed/",
    category: "power-money",
    bias: "independent",
  },
  {
    name: "Democracy Now",
    url: "https://www.democracynow.org/democracynow.rss",
    category: "accountability",
    bias: "left",
  },
  {
    name: "Bellingcat",
    url: "https://www.bellingcat.com/feed/",
    category: "accountability",
    bias: "independent",
  },
  {
    name: "Common Dreams",
    url: "https://www.commondreams.org/rss.xml",
    category: "power-money",
    bias: "left",
  },
  {
    name: "Middle East Eye",
    url: "https://www.middleeasteye.net/rss",
    category: "conflicts",
    bias: "independent",
  },
  {
    name: "Mondoweiss",
    url: "https://mondoweiss.net/feed/",
    category: "conflicts",
    bias: "left",
  },
  {
    name: "TeleSUR English",
    url: "https://www.telesurenglish.net/rss/news.xml",
    category: "abroad",
    bias: "left",
  },
  {
    name: "Declassified UK",
    url: "https://www.declassifieduk.org/feed/",
    category: "accountability",
    bias: "independent",
  },
];
