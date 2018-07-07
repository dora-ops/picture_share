import api from '../plugin/axios';
import { coverTime  } from '../util/util'

export const getPhotoFromType = async (id, type, start, length ) => {
  let { data: { data: { resData, photoTotal } } } = await api.getTypePhotolist({
    params: { id, type, start, length }
  })
  resData = resData.map((photo) => {
    photo.createdTime = coverTime(photo.createdTime);
    return photo;
  })
  return { resData, photoTotal };
}