import api from '../plugin/axios';
import { coverTime } from '../util/util';

export const getCountMessage = async (id) => {
  const { data: { data }} = await api.getCountList({ params: { id }})
  return data;
}

export const getMessageList = async (type, id) => {
  const { data: { data: messagelist } } = await api.getMessageList({ params: { type, id } });
  messagelist.forEach(message => {
    message.createdTime = coverTime(message.createdTime);
  });
  return messagelist;
}