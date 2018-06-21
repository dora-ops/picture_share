import api from '../plugin/axios';

// 用户登陆
export const loginUser = async (userInfo) => {
  const data = await api.postLogin({ data: userInfo })
  const { data: { status, message } } = data;
  if(status === 466){
    return message;
  }else{
    const { data: { data: { token, id } } } = data;
    return { token, id };
  }
}