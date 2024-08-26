export default interface BatchFile {
  id: string;
  filename: string;
  size: number; // bytes
  timestamp: string;
  errors?: {
    type: "error";
    message: string;
    value: string;
  }[];
}