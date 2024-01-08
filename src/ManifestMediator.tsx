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

function generateManifestText(manifestValue: ManifestType) {
  let e = document.getElementById("manifest-placeholder") as HTMLLinkElement;
  if (!e) {
    e = document.createElement<"link">("link");
    e.id = "manifest-placeholder";
    e.rel = "manifest";
  }

  let renderManifest: { [key: string]: any } = {};
  let key: keyof ManifestType;
  for (key in manifestValue) {
    if (key !== "icons" && manifestValue[key]) {
      renderManifest[key] = manifestValue[key];
      console.log(key, manifestValue[key]);
    }
  }
  if (manifestValue.icons.length > 0) {
    renderManifest["icons"] = manifestValue.icons.map((icon) =>
      iconIdToIconObject(icon)
    );
  }
  const stringManifest = JSON.stringify(renderManifest);
  return stringManifest;
}

export function setManifestLink(manifestValue: ManifestType) {
  let e = document.getElementById("manifest-placeholder") as HTMLLinkElement;
  if (!e) {
    e = document.createElement<"link">("link");
    e.id = "manifest-placeholder";
    e.rel = "manifest";
  }
  const stringManifest = generateManifestText(manifestValue);
  const blob = new Blob([stringManifest], { type: "application/json" });
  const manifestURL = URL.createObjectURL(blob);
  e.setAttribute("href", manifestURL);
}
