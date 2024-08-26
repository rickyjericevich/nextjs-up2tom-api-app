export default interface Job {
  id: string;
  filename: string;
  size: number; // bytes
  uploaded: string;
  progress: number; // 0.0 to 1.0
}