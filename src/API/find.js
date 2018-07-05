import api from '../plugin/axios';
import { coverTime  } from '../util/util'

export const getPhotoFromType = async (type) => {
  let { data: { data: photoList } } = await api.getTypePhotolist({
    params: { type }
  })
  photoList = photoList.map((photo) => {
    photo.createdTime = coverTime(photo.createdTime);
    return photo;
  })
  return photoList;
}