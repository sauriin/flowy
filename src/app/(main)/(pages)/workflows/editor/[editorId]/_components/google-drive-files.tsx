import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
type Props = {}

const googleDriveFile = (props: Props) => {
    const [loading, setLoading] = useState(false)
    const [isListening, setIsListening] = useState(false)

    const reqGoogle = async () => {
        setLoading(true)
        const response = await axios.get('/api/drive-activity')
        if (response) {
            toast.message(response.data)
            setLoading(false)
            setIsListening(true)
        }
    }

    const onListener = async () => {
        const listener = await getGoogleListener()
        if (listener?.googleResouceId !== null) {
            setIsListening(true)
        }
    }
    return (
        <div>googleFileConnection</div>
    )
}

export default googleDriveFile
//  4 34 31