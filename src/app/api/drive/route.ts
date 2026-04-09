import { google } from 'googleapis'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.OAUTH2_REDIRECT_URI
    )

    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ message: 'User not found' }, { status: 401 })
    }

    // clerkClient is now a function
    const client = await clerkClient()

    // remove "oauth_" prefix
    const clerkResponse = await client.users.getUserOauthAccessToken(
      userId,
      'google'
    )

    // use .data instead of [0]
    if (!clerkResponse.data || clerkResponse.data.length === 0) {
      return NextResponse.json(
        { message: 'Google account not connected' },
        { status: 400 }
      )
    }

    const accessToken = clerkResponse.data[0].token

    oauth2Client.setCredentials({
      access_token: accessToken,
    })

    const drive = google.drive({
      version: 'v3',
      auth: oauth2Client,
    })

    const response = await drive.files.list({
      pageSize: 10, // optional limit
      fields: 'files(id, name, mimeType)',
    })

    if (!response.data.files || response.data.files.length === 0) {
      return NextResponse.json(
        { message: 'No files found' },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        message: {
          files: response.data.files,
        },
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error('Drive API Error:', error)

    return NextResponse.json(
      {
        message: 'Something went wrong',
      },
      {
        status: 500,
      }
    )
  }
}