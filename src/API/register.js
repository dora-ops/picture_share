import api from '../plugin/axios';

// 验证用户名是否唯一
export const uniqueName = async (userName) => { 
  const data = await api.getRegisterUnique({ params: { name: userName }});
  const { data: { status, message } } = data;
  return status === 466 ? message : '';
};

// 注册用户
export const registerUser = async (userInfo) => { 
  const data = await api.postRegister({ data: userInfo }) 
  const { data: { status, message } } = data;
  return status === 466 ? message : '';
}


