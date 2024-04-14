// REACT 
import { useState, useEffect } from "react";
// UTILS
import { STATE_CHANGED, firebaseStorage } from "@/utils/firebase";

export const useStorage = () => {
    // STATE && VARIABLES
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCancelled, setIsCancelled] = useState(false);

    const uploadFile = async (files: any, filePath: string) => {
        const file = Array.from(files)[0] as File;
        const extension = file.type.split("/")[1];

        const storageRef = firebaseStorage.ref(`${filePath}.${extension}`);

        setIsLoading(true);

        const task = storageRef.put(file);

        task.on(STATE_CHANGED, (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
        }, (error) => {
            setError(error.message);
        })

        setIsLoading(false);

        return storageRef;
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { uploadFile, uploadProgress, isLoading, error };
}