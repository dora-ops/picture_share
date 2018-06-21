import api from '../plugin/axios';

export const getUserConcern = async (id) => {
  const { data: { data: concernUsers } } = await api.getAllConcern({ 
    params: { id }
  })
  return concernUsers;
}