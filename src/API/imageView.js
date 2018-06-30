import api from '../plugin/axios';
import { coverTime } from '../util/util';

export const getPhotoInfo = async (photoId, id) => {
  const { data: { data: { userId }, data: photoData } } = await api.getPhotoInfo({ 
    params: { photoId, id } 
  });
  photoData.createdTime = coverTime(photoData.createdTime);
  photoData.photoNormal = JSON.parse(photoData.photoNormal);
  return { createId: userId, photoData };
}

export const getActionState = async (actionFromId, actionToId, photoId) => {
  const { data: { data } } = await api.getActionState({
    params: { actionFromId, actionToId, photoId }
  })
  return data;
}

export const postAction = async (actiondata) => {
  const { data: { data: { actionState } } } = await api.postUserAction({ data: actiondata });
  return actionState;
}