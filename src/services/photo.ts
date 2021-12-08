import { Photo } from '../types/photo'
import { storage } from '../libs/firebase'
import {ref, listAll, getDownloadURL} from 'firebase/storage'
import { url } from 'inspector'

export const getAll =  async () => {
    let list: Photo[] = []

    const imagesFolder = ref(storage, "images");
    const photolist = await listAll(imagesFolder);

    for(let i in photolist.items){

        let photoURL = await getDownloadURL(photolist.items[i])

        list.push({
            name: photolist.items[i].name,
            url: photoURL
        })
    }

    return list;
}