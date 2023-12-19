import Head from "next/head";
import { useState } from "react";
import { FileUploaderDroppable } from "~/components/app/video-upload";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { toast } from "~/components/ui/use-toast";
import { getTextFromId, getTextId, uploadFile } from "~/lib/apis";

export default function Home() {
  const [video, setVideo] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(``);

  const [videoUploading, setVideoUploading] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);

  async function onSubmit() {
    if (!video) return;

    try {
      setVideoUploaded(false);
      setVideoUploading(true);
      const result = await uploadFile(video);

      toast({
        title: result[1] ?? "Failed, please try again",
        description: "Now try getting text in few mins",
      });
    } catch (e) {
      console.log("Error uploading: ", e);

      toast({
        title: "Error",
        description: "Failed to upload video",
      });
    } finally {
      setVideoUploading(false);
      setVideoUploaded(true);
    }
  }

  async function getMessage() {
    try {
      const textId = await getTextId();
      const summary = await getTextFromId(textId);

      setSummary(summary);
    } catch (e) {
      toast({
        title: "Processing....",
        description: "The video is still processing, try again in few mins",
      });
    }
  }

  return (
    <>
      <Head>
        <title>Video2Text</title>
        <meta name="description" content="Video to Text" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="bg-gradient-to-r from-blue-400 to-destructive bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-[5rem]">
            Video to Text
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <FileUploaderDroppable
              file={video}
              onFilesSet={setVideo}
              onSubmit={onSubmit}
              getMessage={getMessage}
              videoUploading={videoUploading}
              textProcessing={!videoUploaded}
            />

            <div>
              <Card className="max-h-full overflow-auto">
                <CardHeader></CardHeader>
                <CardContent className="">
                  <p>{summary}</p>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
