export interface FirestoreRecord {
    downloadURL: string;
    uuid:string;
    filename:string;
    year:number;
    awaitingTranscription?:boolean;
    text?:string;
    path:string;
    gsurl:string;

  }
  