import api from '../plugin/axios';

export const getUserDetail = async (id) => {
  const { data: { data: userData } } = await api.getUserhome({ params: { id } });
  return userData;
}

export const getUserPhoto = async (id) => {
  const { data: { data: photos } } = await api.getUserPhoto({ params: { id } });
  return photos;
}

export const getConcernState = async (concernFromId, userId) => {
  const { data: { data: concernState } } = await api.getConcernState({ 
    params: { concernFromId, userId }
  })
  return concernState;
}

export const toogleConcernState = async (concernFromId, userId) => {
  const { data: { data: concernState } } = await api.postConcernState({
    data: {concernFromId, userId}
  })
  return concernState;
}