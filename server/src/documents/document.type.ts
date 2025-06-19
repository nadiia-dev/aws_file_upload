export type Document = {
  id: number;
  userEmail: string;
  filename: string;
  objectKey: string;
  uploadedAt: Date;
  s3Url: string;
};
