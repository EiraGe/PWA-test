import React from 'react';
import Button from '@mui/material/Button';

import './App.css';

type Manifest = {
  name: string;
  description: string;
  icons: Array<object>;
  background_color: string;
  theme_color: string;
  display: string;
  scope: string;
  start_url: string;
}

function readLSManifest() : Manifest | null {
  let manifest = localStorage.getItem("manifest");
  if (!manifest) {
    return null
  }
  return JSON.parse(manifest);
}

function updateToLS(manifest: Manifest) {
  localStorage.setItem("manifest", JSON.stringify(manifest));
}

function initManifest(scope: string) : Manifest {
  return {
    name: "PWA-test",
    description: "A test PWA",
    icons: [
      {
        "src": scope + "/logo192.png",
        "type": "image/png",
        "sizes": "192x192"
      },
      {
        "src": scope + "/logo512.png",
        "type": "image/png",
        "sizes": "512x512"
      }
    ],
    background_color: "white",
    theme_color: "white",
    display: "standalone",
    scope: scope,
    start_url: scope + "/.",
  };
}

function setPageManifest(manifest: Manifest) {
  let e = document.getElementById("manifest-placeholder") as HTMLLinkElement;
  if (!e) {
    e = document.createElement<"link">("link");
    e.id = "manifest-placeholder";
    e.rel = "manifest";
  }

  const stringManifest = JSON.stringify(manifest);
  const blob = new Blob([stringManifest], { type: "application/json" });
  const manifestURL = URL.createObjectURL(blob);
  e.setAttribute("href", manifestURL);
}

function prepareManifest() : Manifest {
  let manifest = readLSManifest();
  if (!manifest) {
    manifest = initManifest(window.location.origin)
  }
  return manifest
}

function updateDisplayedForm(manifest: Manifest) {

}

function getManifestFromForm(): Manifest {
  return initManifest(window.location.origin);
}

function onFormChanged() {
  let newManifest = getManifestFromForm()
  updateToLS(newManifest)
  setPageManifest(newManifest)
}

function App() {
  let manifest = prepareManifest()
  setPageManifest(manifest)
  updateDisplayedForm(manifest)

  return (
    <div>
      <Button variant="contained">Hello World</Button>
    </div>
  );
}

export default App;
