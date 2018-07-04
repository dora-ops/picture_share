import api from '../plugin/axios';
import { coverTime } from '../util/util';

export const getPhotoInfo = async (photoId) => {
  const { data: { data: photoData } } = await api.getPhotoInfo({ 
    params: { photoId }
  });
  photoData.createdTime = coverTime(photoData.createdTime);
  photoData.photoNormal = JSON.parse(photoData.photoNormal);
  return photoData;
}

export const getMessageState = async (messageFromId, messageToId, photoId) => {
  const { data: { data } } = await api.getPhotoState({
    params: { messageFromId, messageToId, photoId }
  })
  return data;
}

export const postPhotoMessage = async (photoData) => {
  const { data: { data: messageState } } = await api.postPhotoMessage({ data: photoData });
  return messageState;
}

export const postComment = async (photoComment) => {
  const { data: { data } } = await api.postCommentCreate({ data: photoComment });
  return data;
}

export const getCommentList = async (photoId, offset, limit) => {
  let { data: { data: { commentList, total } } } = await api.getCommentList({
    params: { photoId, offset, limit }
  })
  commentList = commentList.map((comment) => { 
    comment.createdTime = coverTime(comment.createdTime);
    return comment;
  })
  return { commentList, total };
}