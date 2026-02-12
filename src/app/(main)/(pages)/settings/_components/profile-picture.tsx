"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import UploadCareButton from "./uploadcare-button";

type Props = {
    userImage: string | null;
    onDelete: () => Promise<any>;
    onUpload: (url: string) => Promise<any>;
};

export default function ProfilePicture({
    userImage,
    onDelete,
    onUpload,
}: Props) {
    const router = useRouter();

    // useEffect(() => {
    //     console.log("PROFILE IMAGE URL:", userImage);
    // }, [userImage]);

    const onRemoveProfileImage = async () => {
        await onDelete();
        router.refresh();
    };

    const imageSrc =
        userImage && userImage.startsWith("http") ? userImage : null;

    return (
        <div className="flex flex-col gap-4">
            <p className="text-lg text-white">Profile Picture</p>

            <div className="flex min-h-50 flex-col items-center justify-center gap-4">
                {imageSrc ? (
                    <>
                        <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/20">
                            <img
                                src={imageSrc}
                                alt="User Image"
                                className="h-40 w-40 rounded-full object-cover"
                            />
                        </div>

                        <Button
                            onClick={onRemoveProfileImage}
                            variant="ghost"
                            className=" hover:text-gray-900 hover:bg-gray-900  dark:text-white/70 dark:hover:text-white"
                        >
                            Remove Picture
                        </Button>
                    </>
                ) : (
                    <UploadCareButton onUpload={onUpload} />
                )}
            </div>
        </div>
    );
}
