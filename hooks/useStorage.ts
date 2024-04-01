// REACT 
import { useState, useEffect } from "react";
// UTILS
import { STATE_CHANGED, firebaseStorage } from "@/utils/firebase";

export const useStorage = () => {
    // STATE && VARIABLES
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);

    const uploadFile = async (files: any, filePath: string) => {
        const file = Array.from(files)[0] as File;
        const extension = file.type.split("/")[1];

        const storageRef = firebaseStorage.ref(`${filePath}.${extension}`);

        setIsUploading(true);

        const task = storageRef.put(file);

        task.on(STATE_CHANGED, (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (!isCancelled) {
                setUploadProgress(progress);
            }
        })

        task.then(async () => {
            const url = await storageRef.getDownloadURL();
            if (!isCancelled) {
                setDownloadURL(url);
                setIsUploading(false);
            }
        });
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { uploadFile, uploadProgress, downloadURL, isUploading };
}