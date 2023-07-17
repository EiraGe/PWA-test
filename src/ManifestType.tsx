export type ManifestType = {
  name: string;
  short_name: string;
  start_url: string;
  scope: string;
  icons: Array<string>;
  display: string;
  orientation: string;
  theme_color: string;
  background_color: string;
};

export function emptyManifest(): ManifestType {
  return {
    name: "",
    short_name: "",
    start_url: "",
    scope: "",
    icons: ["192", "512"],
    display: "",
    orientation: "",
    theme_color: "",
    background_color: "",
  };
}

export function initManifest(scope: string): ManifestType {
  return {
    name: "PWA-test",
    short_name: "",
    start_url: scope,
    scope: scope,
    icons: ["192", "512"],
    theme_color: "white",
    background_color: "white",
    display: "standalone",
    orientation: "",
  };
}
