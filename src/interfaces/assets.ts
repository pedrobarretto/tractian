export default interface Assets {
  id: string;
  sensors: string[];
  status: string;
  healthscore: number;
  model: string;
  name: string;
  image: string;
  metrics: Metrics;
  specifications: Specifications;
  unitId: number;
  companyId: number;
};

interface Metrics {
  totalCollectsUptime: number;
  totalUptime: number;
  lastUptimeAt: string;
};

interface Specifications {
  rpm: number;
  maxTemp: number;
  power: string;
};