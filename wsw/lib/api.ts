import { v4 as uuidv4 } from 'uuid';

// 模拟视频数据
interface Video {
  id: string;
  url: string;
  likes: number;
  comments: Comment[];
  avatar?: string; // 新增头像字段
}

interface Comment {
  id: string;
  text: string;
}

export const fetchVideos = async (count: number = 1): Promise<Video[]> => {
  try {
    const response = await fetch(`/api/videos?count=${count}`);
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    const data = await response.json();
    console.log('API response:', data);

    if (Array.isArray(data)) {
      return data.map((item) => ({
        id: uuidv4(),
        url: typeof item === 'string' ? item : item.link || item.url,
        likes: Math.floor(Math.random() * 1000),
        comments: [],
        avatar: item.avatar || '/default-avatar.png' // 添加这一行
      }));
    } else if (typeof data === 'object' && data !== null) {
      return [{
        id: uuidv4(),
        url: data.link || data.url,
        likes: Math.floor(Math.random() * 1000),
        comments: [],
        avatar: data.avatar || '/default-avatar.png' // 添加这一行
      }];
    } else {
      console.error('Unexpected data format:', data);
      return []; // 返回空数组而不是抛出错误
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    return []; // 返回空数组而不是重新抛出错误
  }
};
