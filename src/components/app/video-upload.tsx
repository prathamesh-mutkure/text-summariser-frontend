import { cn, humanFileSize } from "@/lib/utils";
import { type ChangeEventHandler, useRef, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/app/icons";
import Image from "next/image";

export const FileInfo: React.FC<{
  file: File;
}> = ({ file }) => {
  let fileType: "other" | "pdf" | "image" | "video" = "other";

  console.log(file.type);

  if (file.type.includes("pdf")) fileType = "pdf";
  else if (file.type.includes("image")) fileType = "image";
  else if (file.type.includes("video")) fileType = "video";

  return (
    <div className="flex w-full flex-row gap-4">
      <div className="relative flex h-20 w-28 items-center justify-center rounded-lg bg-slate-100 dark:border dark:bg-card/30">
        {fileType === "pdf" && <Icons.fileIcon />}

        {fileType === "image" && (
          <Image
            src={URL.createObjectURL(file)}
            alt="Image"
            fill
            className="mx-auto max-w-[95%] rounded-lg object-contain"
          />
        )}

        {fileType === "other" && <Icons.fileTextIcon />}
        {fileType === "video" && <Icons.check />}
      </div>

      <div className="flex grow flex-col gap-1">
        <p className="text-md font-bold">{file.name}</p>
        <p>{humanFileSize(file.size)}</p>
      </div>
    </div>
  );
};

export const FileUploaderDroppable: React.FC<{
  className?: string;
  file: File | null;
  onFilesSet: React.Dispatch<React.SetStateAction<File | null>>;
  onSubmit: () => void;
  getMessage: () => void;
  videoUploading: boolean;
  textProcessing: boolean;
}> = ({
  className = "",
  file,
  onFilesSet,
  onSubmit,
  getMessage,
  videoUploading,
  textProcessing,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadClick = () => {
    inputRef.current?.click();
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      onFilesSet(files[0] ?? null);
    }
  };

  const onClear = () => {
    if (inputRef.current?.value) {
      inputRef.current.value = "";
      onFilesSet(null);
    }
  };

  return (
    <Card className={cn(className)}>
      {/* <CardHeader>
        <CardTitle className="text-md">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader> */}

      <CardContent>
        <div className="mt-5 flex h-48 w-full items-center justify-center rounded-lg border border-dashed bg-slate-50 dark:bg-card/30">
          <Button
            type="button"
            variant="link"
            className="h-16"
            onClick={onUploadClick}
          >
            Drag and drop or Choose your files
          </Button>
        </div>

        <Input
          type="file"
          multiple={false}
          className="hidden"
          ref={inputRef}
          onChange={onChange}
          accept="video/mp4,video/x-m4v,video/*"
        />

        {file && (
          <div>
            <div className="h-4"></div>
            <div className="h-auto max-h-[400px] w-auto max-w-[600px]">
              <video
                src={URL.createObjectURL(file)}
                className=""
                controls
              ></video>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-start gap-2">
        <Button
          variant="default"
          type="button"
          onClick={onSubmit}
          disabled={videoUploading}
        >
          Upload
        </Button>

        <Button
          variant="secondary"
          type="button"
          onClick={getMessage}
          disabled={textProcessing}
        >
          Get Text
        </Button>

        <Button variant="outline" type="button" onClick={onClear}>
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
};
