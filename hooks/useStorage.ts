// REACT 
import { useState, useEffect } from "react";
// UTILS
import { STATE_CHANGED, firebaseAuth, firebaseStorage } from "@/utils/firebase";
import { useAuthState } from "./useAuthState";
import { AuthActionTypes } from "@/types/AuthContextTypes";

export const useStorage = () => {
    // STATE && VARIABLES
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCancelled, setIsCancelled] = useState(false);
    const { dispatch } = useAuthState();

    const uploadFile = async (files: any, filePath: string) => {
        const file = Array.from(files)[0] as File;
        const extension = file.type.split("/")[1];

        const storageRef = firebaseStorage.ref(`${filePath}.${extension}`);

        setIsUploading(true);

        const task = storageRef.put(file);

        task.on(STATE_CHANGED, (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
            // if (!isCancelled) {
            // }
        }, (error) => {
            setError(error.message);
        })


        const url = await storageRef.getDownloadURL();

        await firebaseAuth.currentUser?.updateProfile({
            photoURL: url
        });
        
        dispatch({ type: AuthActionTypes.FETCH_UPDATED_USER, payload: firebaseAuth.currentUser })

        setDownloadURL(url);
        setIsUploading(false);
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { uploadFile, uploadProgress, downloadURL, isUploading, error };
}