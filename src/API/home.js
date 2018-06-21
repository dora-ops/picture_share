import api from '../plugin/axios';
import { coverTime } from '../util/util';

export const getHomeCover = async () => {
  const { data: { data: homeCovers } } = await api.getHomeCover();
  const homeCoverAry = homeCovers.map(cover => {
    const normal = JSON.parse(cover.photoNormal);
    cover.photoNormal = normal.pop();
    cover.createdTime = coverTime(cover.createdTime);
    return cover;
  })
  return homeCoverAry;
}

export const getLimitPhoto = async (offset, limit) => {
  const { data: { data: photoArray } } = await api.getAllPhoto({ 
    params: { offset, limit }
  });
  return photoArray;
}