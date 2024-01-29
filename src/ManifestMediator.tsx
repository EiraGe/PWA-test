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

function relatedApplication(platform: string) {
  return {
    platform: "play",
    url: "https://play.google.com/store/apps/details",
    id: "com.chrome.canary",
  };
}

export function generateManifestText(manifestValue: ManifestType) {
  let e = document.getElementById("manifest-placeholder") as HTMLLinkElement;
  if (!e) {
    e = document.createElement<"link">("link");
    e.id = "manifest-placeholder";
    e.rel = "manifest";
  }

  manifestValue.prefer_related_applications =
    manifestValue.related_applications.length > 0;

  const replacer = (key: string, value: any) => {
    if (key === "icons") {
      if (value.length > 0) {
        return value.map((icon: string) => iconIdToIconObject(icon));
      }
      return undefined;
    } else if (key === "related_applications") {
      if (value.length > 0) {
        return value.map((id: string) => relatedApplication(id));
      }
      return undefined;
    }
    return value || undefined;
  };

  const manifestString = JSON.stringify(manifestValue, replacer, 4);
  return manifestString;
}

export function setManifestLink(stringManifest: string | undefined) {
  let e = document.getElementById("manifest-placeholder") as HTMLLinkElement;
  if (!stringManifest) {
    if (e) e.remove();
    return;
  }
  if (!e) {
    e = document.createElement<"link">("link");
    e.id = "manifest-placeholder";
    e.rel = "manifest";
  }
  const blob = new Blob([stringManifest], { type: "application/json" });
  const manifestURL = URL.createObjectURL(blob);
  e.setAttribute("href", manifestURL);
}
