export default interface BatchFile {
  id: string;
  filename: string;
  size: number;
  timestamp: Date;
  errors: {
    message: string;
    value: string;
  }[];
}