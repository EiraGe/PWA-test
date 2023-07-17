import { ManifestType } from "./ManifestType";

const iconUrls: { [size: string]: string } = {
  "128": window.location.origin + "/logo128.png",
  "192": window.location.origin + "/logo192.png",
  "256": window.location.origin + "/logo256.png",
  "512": window.location.origin + "/logo512.png",
};

function iconIdToIconObject(id: string) {
  return {
    src: iconUrls[id],
    type: "image/png",
    sizes: `${id}x${id}`,
  };
}

export function setManifestLink(manifestValue: ManifestType) {
  let e = document.getElementById("manifest-placeholder") as HTMLLinkElement;
  if (!e) {
    e = document.createElement<"link">("link");
    e.id = "manifest-placeholder";
    e.rel = "manifest";
  }

  let manifestIcons: Array<object> = [];
  if (manifestValue.icons.length > 0) {
    manifestIcons = manifestValue.icons.map((icon) => iconIdToIconObject(icon));
  }
  let renderManifest = {
    ...manifestValue,
    icons: manifestIcons,
  };
  const stringManifest = JSON.stringify(renderManifest);
  const blob = new Blob([stringManifest], { type: "application/json" });
  const manifestURL = URL.createObjectURL(blob);
  e.setAttribute("href", manifestURL);
}
