import { ManifestType, emptyManifest } from "./ManifestType";

export function readLSManifest(): ManifestType | null {
  let manifestString = localStorage.getItem("manifest");
  if (!manifestString) {
    return null;
  }
  let manifestJson = JSON.parse(manifestString);
  let loadedManifest = emptyManifest();
  let property: keyof typeof loadedManifest;
  for (property in loadedManifest) {
    loadedManifest[property] = manifestJson[property];
  }
  return loadedManifest;
}

export function updateToLS(manifest: ManifestType | undefined) {
  if (!manifest) {
    localStorage.removeItem("manifest");
    return;
  }
  localStorage.setItem("manifest", JSON.stringify(manifest));
}
