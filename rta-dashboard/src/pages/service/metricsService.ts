/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "./index";

interface Metric {
    id: string;
    name: string;
    description: string;
    department: string;
}

export interface MetricDataEntry {
    id: any;
    value: string;
    entry_date: string;
    last_update: string
    created_by: string;
    metric_id: string;
}

export const fetchMetrics = async (): Promise<Metric[]> => {
    const response = await apiClient.get<Metric[]>("/metrics");
    return response.data;
};

export const addMetric = async (metric: Metric): Promise<Metric> => {
    const response = await apiClient.post<Metric>("/metrics/add", metric);
    return response.data;
};

export const fetchMetricEntries = async (metricId: string): Promise<MetricDataEntry[]> => {
    const response = await apiClient.get<MetricDataEntry[]>(`/metrics/${metricId}/data-entries`);
    return response.data;
};

export const addMetricEntry = async (entryData: MetricDataEntry) => {
    const response = await apiClient.post<MetricDataEntry>(`/metrics/${entryData?.id}/data-entries/add`, entryData);
    return response.data;
};

export const updateMetricEntry = async ( entryData: MetricDataEntry) => {
    const response = await apiClient.post<MetricDataEntry>(`/metrics/${entryData?.metric_id}/data-entries/update/${entryData?.id}`, entryData);
    return response.data;
};

export const deleteMetricEntry = async ( entryData: MetricDataEntry) => {
    const response = await apiClient.delete<MetricDataEntry>(`/metrics/${entryData?.metric_id}/data-entries/delete/${entryData?.id}`);
    return response.data;
};