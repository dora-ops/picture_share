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

export const getRecommendPhoto = async () => {
  const { data: { data: photoArray } } = await api.getRecommendPhoto();
  return photoArray;
}

export const getHotPhotographer = async () => {
  const { data: { data: photoGrapherArray }} = await api.getHotPhotographer();
  return photoGrapherArray;
}