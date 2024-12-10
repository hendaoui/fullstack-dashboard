import { StateCreator } from "zustand";

type Metric = {
  id: string;
  name: string;
  description: string;
  department: string;
};

type MetricDataEntry = {
  id: string;
  value: string;
  entry_date: string;
  last_update: string
  created_by: string;
  metric_id: string;
}

const InitialState = {
  metrics: [] as Metric[],
  metricEntries: [] as MetricDataEntry[]
};

export interface MetricsSlice {
  metrics: Metric[];
  metricEntries: MetricDataEntry[];
  setMetrics: (metrics: Metric[]) => void;
  setMetricEntries: (metricEntries: MetricDataEntry[]) => void;
  resetMetrics: () => void;
}

export const createMetricsSlice: StateCreator<
  MetricsSlice,
  [["zustand/devtools", never]],
  [],
  MetricsSlice
> = (set) => ({
  ...InitialState,
  setMetrics: (metrics) => set({ metrics }, false, "setMetrics"),
  setMetricEntries: (metricEntries) => set({ metricEntries }, false, "setMetricEntries"),
  resetMetrics: () => set(InitialState),
});