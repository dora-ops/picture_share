import api from '../plugin/axios';

export const getUserInfo = async (id) => {
  const data = await api.getUserinfo({ params: { id } });
  const { data: { data: { userName, userAvatar } } } = data;
  return { userName, userAvatar };
}