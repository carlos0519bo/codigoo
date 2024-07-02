export interface UploadData {
  autor:   string;
  ano:     string;
  titulo:  string;
  formato: string;
  image?:   FileType | null;
  ficha?:  FileType | null;
}

export interface FileType {
  uri:  string;
  type: string;
  name: string;
}
