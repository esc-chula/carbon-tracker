export type TGetCertificateRequest = { id: string };

export type TGetCertificateResponse = {
  blob: Blob;
  filename: string;
  contentType: string;
};
