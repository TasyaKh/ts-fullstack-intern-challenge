import { serverInstance } from './instances/serverInstance';

export interface LikeResponse {
  id: string;
  catId: string;
  createdAt: string;
}

export const likesApi = {
  getAllLikes: async () => {
    const response = await serverInstance.get<{ data: LikeResponse[] }>('/api/likes');
  
    return response.data.data;
  },

  addLike: async (catId: string) => {
    const response = await serverInstance.post<LikeResponse>('/api/likes', {
      cat_id: catId,
    });
    return response.data;
  },

  removeLike: async (catId: string) => {
    await serverInstance.delete(`/api/likes/${catId}`);
  },
};
