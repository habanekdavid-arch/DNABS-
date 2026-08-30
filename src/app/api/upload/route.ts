import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          access: "private",
          addRandomSuffix: true,
          allowedContentTypes: [
            "image/png",
            "image/jpeg",
            "image/webp",
            "image/gif",
            "application/pdf",
          ],
          maximumSizeInBytes: 10 * 1024 * 1024, // 10 MB
          tokenPayload: JSON.stringify({ pathname }),
        };
      },
      onUploadCompleted: async () => {
        // No-op — the resulting blob URL is sent back to the client and
        // stored on the lead when the contact form itself is submitted.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
