import { httpClient } from "../http";

export interface AssetsRequest {
  name: string;
  category: string;
  serialNumber: string;
  acquisitionDate: Date;
  status: string;
}

export interface AssetsResponse {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  acquisitionDate: string;
  status: string;
}

export async function create(params: AssetsRequest) {
  const { data } = await httpClient.post<AssetsResponse>("/assets", params);

  return data;
}

export async function findAll() {
  const { data } = await httpClient.get<AssetsResponse[] | null>("/assets");

  return data;
}

export async function edit(params: Partial<AssetsRequest>) {
  const { data } = await httpClient.put<AssetsResponse>("/assets", params);

  return data;
}

export async function deleteAsset(id: string) {
  const { data } = await httpClient.delete(`/assets?id=${id}`);

  return data;
}
