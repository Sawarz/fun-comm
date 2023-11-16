"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import styles from "./FileUploader.module.scss";
import { storage } from "@/src/firebase/FirebaseCore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function FileUploader(props: { uuid: string }) {
    const { uuid } = props;

    const [imageUrl, setImageUrl] = useState("/placeholders/placeholder.jpg");

    const onImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;

        if (!fileInput.files) {
            console.warn("no file was chosen");
            return;
        }

        if (!fileInput.files || fileInput.files.length === 0) {
            console.warn("files list is empty");
            return;
        }

        const file = fileInput.files[0];

        try {
            const storageRef = ref(storage, uuid);

            uploadBytes(storageRef, file).then((snapshot) => {
                console.log(snapshot);
                console.log('Uploaded a blob or file!');
            });

            const gsReference = ref(storage, `gs://fun-comm.appspot.com/${uuid}`);

            const downloadURL = await getDownloadURL(gsReference);
            setImageUrl(downloadURL);

        } catch (error) {
            console.error("something went wrong, check your console.");
        }

        /** Reset file input */
        e.target.type = "text";
        e.target.type = "file";
    };

    return (
        <label
            className={styles["file-uploader"]}
            style={{ paddingTop: `calc(100% * (${446} / ${720}))` }}
        >
            <Image
                src={imageUrl}
                alt="uploaded image"
                width={720}
                height={446}
                priority={true}
            />
            <input
                style={{ display: "none" }}
                type="file"
                onChange={onImageFileChange}
            />
        </label>
    );
}
