import api from '../plugin/axios';
import { coverTime } from '../util/util';

export const getPhotoInfo = async (photoId, id) => {
  const { data: { data: { userId }, data: photoData } } = await api.getPhotoInfo({ 
    params: { photoId, id } 
  });
  photoData.createdTime = coverTime(photoData.createdTime);
  return {userId, photoData};
}