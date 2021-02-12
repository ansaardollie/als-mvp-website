export interface CloudinaryResource {
  public_id: string;
  version: number;
  format: string;
  width: number;
  height: number;
  type: string;
  created_at: string;
  context?: {
    custom: {
      [key: string]: string;
    };
  };
}

export interface AssetList {
  resources: CloudinaryResource[];
  updated_at: string;
}
