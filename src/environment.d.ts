/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly VITE_PUBLIC_URL: string;
    readonly VITE_BASE_URL: string;
    readonly [key: string]: string | undefined;
  };
}