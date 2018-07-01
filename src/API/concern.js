import api from '../plugin/axios';

export const getUserFromConcern = async (id) => {
  const { data: { data: concernUsers } } = await api.getAllConcern({ 
    params: { id }
  })
  return concernUsers;
}

export const getConcerenPhotoList = async (id) => {
  const { data: { data: photoList } } = await api.getConcernPhotolist({
    params: { id }
  })
  return photoList;
}