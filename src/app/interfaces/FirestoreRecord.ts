export interface FirestoreRecord {
    created: object;
    downloadURL: string;
    uuid:string;
    filename:string;
    year:number;
    awaitingTranscription?:boolean;
    text?:string;
    path:string;
    gsurl:string;

  }
  