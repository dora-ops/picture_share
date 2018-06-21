import api from '../plugin/axios';

export const getUserProfile = async (id) => {
  const { data: { data: userProfile } } = await api.getUserProfile({ params: { id }});
  return userProfile;
}

export const saveUserProfile = async (id, userProfile) => {
  const { data: { status, message } } = await api.postUserinfo({ 
    data: { userProfile, id },
  });
  return status === 466 ? { type: 'error', message, status } : { type: 'success', message };
}