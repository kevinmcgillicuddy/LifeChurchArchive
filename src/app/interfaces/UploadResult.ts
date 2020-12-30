import { Observable } from "rxjs/internal/Observable";

export interface UploadResult {
    uploadPercent?: Observable<number>;
    downloadURL?: Observable<string>;
    feedback?:string;
    metadata:object;
    fileName:string;
  }