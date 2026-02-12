"use client";

import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { useRouter } from "next/navigation";

type Props = {
    onUpload: (url: string) => Promise<any>;
};

export default function UploadCareButton({ onUpload }: Props) {
    const router = useRouter();

    return (
        <FileUploaderRegular
            pubkey="db7bd274a31becb4027e"
            classNameUploader="uc-light uc-purple"
            sourceList="local, camera, gdrive, facebook"
            filesViewMode="grid"
            onFileUploadSuccess={async (file) => {
                const imageUrl = `${file.cdnUrl}-/format/auto/`;
                await onUpload(imageUrl);
                router.refresh();
            }}
        />
    );
}
