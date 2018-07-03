import api from '../plugin/axios';

export const getUserInfo = async (id) => {
  const data = await api.getUserinfo({ params: { id } });
  const { data: { data: { userNickName, userAvatar } } } = data;
  return { userNickName, userAvatar };
}

export const releasePhoto = async (photoData) => {
  const { data: { status, message, data: id } } = await api.postRelease({ data: photoData})
  if(status === 200){
    return { message, id }
  }
}