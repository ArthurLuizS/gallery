import { Photo } from '../types/photo'
import { storage } from '../libs/firebase'
import {ref, listAll, getDownloadURL, uploadBytes} from 'firebase/storage'
import {v4 as CreateId} from 'uuid'

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

export const insert = async (file:File) => {
    if(['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)){

        let randomName = CreateId();
        let newFile = ref(storage, `images/${randomName}`);

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return {name: upload.ref.name, url: photoUrl} as Photo;

    }else{
        return new Error ('Tipo de Arquivo não suportado')
    }
}