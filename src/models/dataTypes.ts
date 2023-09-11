export interface ServerResponse 
 {
    id: string;
    url: string;
    ttlInSeconds: number;
    expiration: string;
    createdDate: string;
    modifiedDate: string;
  };



  export interface RequestBody  {
    url: string;
    ttlInSeconds?: number | null;
  };