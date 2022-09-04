import {doc, getDoc} from "firebase/firestore"
import {database, storage} from "../../../utils/config"
import {ref, getDownloadURL} from "firebase/storage"

export interface IArtistData {
    name: string,
    image: string,
    id: string
}

const getFollowedArtists = (artistIds : Array<string>) : Promise<Array<IArtistData>> => {

    return artistIds.reduce((prevPromise : Promise<any>, artistId) => {
        return prevPromise.then((artistDataArray : Array<IArtistData>) => {
            return getFollowedArtist(artistId)
                    .then((artistData: IArtistData) => {
                        artistDataArray.push(artistData);
                        return Promise.resolve(artistDataArray);
                    })
        })
    }, Promise.resolve([]))
}

const getFollowedArtist = (artistId: string) : Promise<IArtistData> => {
    return getArtistName(artistId)
            .then((userData: any) => {
                return getArtistImage(userData.image)
                        .then((image: string) => {
                            return Promise.resolve({
                                name: userData.name,
                                image,
                                id: artistId
                            })
                        })
            })
}

const getArtistName = (artistId: string) => {
    return getDoc(doc(database, "users", artistId))
            .then((docSnap : any) => {
                return Promise.resolve({
                    name: docSnap.data().username,
                    image: docSnap.data().image
                });
            })
}

const getArtistImage = (imageURL: string) => {
    const imageRef = ref(storage, imageURL);

    return getDownloadURL(imageRef);
}

export default getFollowedArtists