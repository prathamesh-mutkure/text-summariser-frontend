import Head from "next/head";
import { useState } from "react";
import { FileUploaderDroppable } from "~/components/app/video-upload";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

export default function Home() {
  const [video, setVideo] = useState<File | null>(null);

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
            <FileUploaderDroppable file={video} onFilesSet={setVideo} />

            <div>
              <Card className="h-full">
                <CardHeader></CardHeader>
                <CardContent>knknkn</CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
