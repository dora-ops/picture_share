import api from '../plugin/axios';
import { coverTime } from '../util/util';
import { actionType, state } from '../config/config';

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
  photoList.forEach(photo=>{
    let photoNormal = JSON.parse(photo.photoNormal);
    photo.photoShow = photoNormal[0];
    photo.photoNormal = photoNormal;
    photo.createdTime = coverTime(photo.createdTime);
    let { photoLikes, photoCollections } = getPhotoInfo(photo.actions);
    photo.photoLikes = photoLikes;
    photo.photoCollections = photoCollections;
  })
  return photoList;
}

function getPhotoInfo(actions){
  let photoLikes = 0;
  let photoCollections = 0;
  actions.forEach((action)=>{
    if(action.actionType === actionType.praise.state && action.actionState === state.scuess){
      photoLikes++;
    }
    if(action.actionType === actionType.collection.state && action.actionState === state.scuess){
      photoCollections++;
    }
  })
  return { photoLikes, photoCollections }
}