import { catInstance } from "./instances/catInstance";

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface CatsSearch {
  page: number;
  limit: number;
}

export const catApi = {
  getImages: async (data: CatsSearch): Promise<CatImage[]> => {
    const response = await catInstance.get<CatImage[]>(`/images/search`, {
      params: data,
    });
    return response.data;
  },

  getImageById: async (id: string): Promise<CatImage> => {
    const response = await catInstance.get<CatImage>(`/images/${id}`);
    return response.data;
  },
};
