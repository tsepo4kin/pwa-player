export type AudioName = string;

export interface IAudio {
  file: StoregedAudio;
  name: AudioName;
  auidoId: UniqueId;
}

// TODO: audiometadata, причесать интерфесы
// export type AudioMetadata = {}

export interface ISearchedAudio {
  duration: number;
  title: string;
  isShort: boolean;
  shortDescription: string;
  desription: string;
  name: string;
  subscribers: number;
  thumbnail: string;
  type: string;
  url: string;
  verified: boolean
  videos: number;
  uploaded: number;
  uploadedDate: string;
  uploaderAvatar: string;
  uploaderName: string;
  uploaderUrl: string;
  uloaderVerified: boolean;
}

export interface ISearchedAudiosResult {
  corrected: boolean;
  items: Array<ISearchedAudio>;
  nextpage: string;
  suggestion: string;
}

export interface IAudioMetadataResponse {
  status: string;
  url: string;
}