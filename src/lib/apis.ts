import axios from "axios";
import { log } from "console";

const base = axios.create({
  baseURL: "http://192.168.43.36:5001/v1/server",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdF8xQGdtYWlsLmNvbSIsImV4cCI6IjIwMjQtMDItMDJUMTE6NDI6NTIuMDczMDYwKzAwOjAwIiwiaXNzdWVkYXQiOiIyMDIzLTEyLTE5VDExOjQyOjUyLjA3MzA2MCIsImFkbWluIjp0cnVlfQ.SxWiwXK4JIE5Fr2El6NOY4nuVI1dzRCTlwxt7CW-ljc",
  },
});

type UploadResponseType = [
  {
    mp3_fid: string | null;
    text_id: string | null;
    user: string;
    video_fid: string;
  },
  string,
  number,
];

export async function uploadFile(file: File): Promise<UploadResponseType> {
  const res = await base.postForm("/upload", { file });

  return res.data as UploadResponseType;
}

export async function getTextId(): Promise<string> {
  const res = await base.get(`/message`);

  const data = res.data as UploadResponseType["0"];

  return data.text_id!;
}

export async function getTextFromId(fid: string): Promise<string> {
  const res = await base.get(`/download?fid=${fid}`);

  const data = res.data as string;

  return data;
}
