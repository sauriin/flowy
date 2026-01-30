'use client'

import React from 'react'
import * as UC from '@uploadcare/file-uploader';

type Props = {
    onUpload?: any
}

UC.defineComponents(UC);


function UploadCareButton(props: Props) {
    return (
        <div>UploadCareButton</div>
    )
}

export default UploadCareButton