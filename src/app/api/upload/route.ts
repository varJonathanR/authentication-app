import { NextResponse } from "next/server";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const { S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

export async function POST(req: Request) {
  const data = await req.formData();
  const image = data.get("image");

  if (!image || !(image instanceof File))
    return NextResponse.json("No image uploaded", { status: 404 });

  if (image.type !== "image/webp")
    return NextResponse.json("Only .webp is allowed", { status: 404 });

  try {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const putObjectsParams = {
      Bucket: BUCKET_NAME,
      Key: image.name,
      Body: buffer,
      ContentType: image.type,
    };
    const postCommand = new PutObjectCommand(putObjectsParams);

    await s3Client.send(postCommand);

    const getObjectsParams = {
      Bucket: BUCKET_NAME,
      Key: image.name,
      ACL: "private",
    };

    const getCommand = new GetObjectCommand(getObjectsParams);
    const url = await getSignedUrl(s3Client, getCommand, {
      expiresIn: 50000,
    });

    return NextResponse.json({
      success: true,
      data: {
        url,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: null,
    });
  }
}
