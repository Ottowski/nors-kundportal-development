/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_ENABLE_EDIT_DELETE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
