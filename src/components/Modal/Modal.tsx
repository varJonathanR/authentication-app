"use client";

import axios from "axios";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import DropImage from "@/assets/image.svg"

interface Props {
  setProfilePhoto: Dispatch<SetStateAction<string>>;
}

export default function Modal({ setProfilePhoto }: Props) {
  const dialog = document.querySelector("dialog");
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const dropFile = acceptedFiles[0];
    if (!dropFile || !(dropFile instanceof File))
      return setError("No image uploaded");
    if (dropFile) {
      setFile(dropFile);
      setError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleImageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      if (!file || !(file instanceof File))
        return setError("No image uploaded");
      if (file.type !== "image/webp") return setError("Only .webp is allowed");
      if (file.size > 1000000) return setError("File must be less than 1MB");

      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post("/api/upload", formData);
      const data = await res.data;

      if (data.success) setProfilePhoto(data.data.url);
      setLoading(false);
      dialog?.close();
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileSelected = e.target.files && e.target.files[0];

    if (!fileSelected || !(fileSelected instanceof File))
      return setError("No image uploaded");
    if (fileSelected) {
      setFile(fileSelected);
      setError("");
    }
  };

  return (
    <dialog className="w-[350px] backdrop:bg-black/50 bg-gray-50 dark:bg-[#252329] border rounded-lg border-gray-100 m-auto p-4">
      <h1 className="dark:text-gray-400 text-xl text-center">
        Upload your image
      </h1>
      <p className="dark:text-gray-500 text-center">File should be .webp</p>
      <form onSubmit={handleImageSubmit}>
        <div className="flex flex-col items-center justify-center w-full my-2 py-2 bg-gray-200 dark:bg-zinc-900 rounded-lg border border-dashed border-sky-700" {...getRootProps()}>
          <Image src={file && file.type === "image/webp" ? URL.createObjectURL(file) : DropImage} alt="Drop Image" width={150} height={150} />
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-600 dark:text-gray-400">Drop the files here ...</p>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Drag &apos;n&apos; drop some files here</p>
          )}
        </div>
        <p className="mb-2 dark:text-gray-500 text-center">or</p>
        <input
          type="file"
          onChange={handleChange}
          className="dark:text-gray-400"
        />
        <div className="mt-2 flex items-center justify-center gap-4">
          <button
            type="button"
            className="bg-red-500 text-white rounded-md px-4 py-1"
            onClick={() => dialog?.close()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-sky-600 text-white rounded-md px-4 py-1"
          >
            Upload
          </button>
        </div>
      </form>
      <div className="h-6 m-0 mt-2 p-0 flex items-center justify-center">
        {error && <p className="text-sm text-center text-red-600">{error}</p>}
        {loading && <div id="loader"></div>}
      </div>
    </dialog>
  );
}
