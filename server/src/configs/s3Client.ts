import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_S3_PUBLIC_KEY as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

export default s3Client;
