import React from 'react';
import { Box, Grid, InputLabel, TextField, Paper } from "@mui/material";

import "./App.css";

type Manifest = {
  name: string;
  description: string;
  icons: Array<object>;
  background_color: string;
  theme_color: string;
  display: string;
  scope: string;
  start_url: string;
};

function readLSManifest(): Manifest | null {
  let manifest = localStorage.getItem("manifest");
  if (!manifest) {
    return null;
  }
  return JSON.parse(manifest);
}

function updateToLS(manifest: Manifest) {
  localStorage.setItem("manifest", JSON.stringify(manifest));
}

function initManifest(scope: string): Manifest {
  return {
    name: "PWA-test",
    description: "A test PWA",
    icons: [
      {
        src: scope + "/logo192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: scope + "/logo512.png",
        type: "image/png",
        sizes: "512x512",
      },
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

function prepareManifest(): Manifest {
  let manifest = readLSManifest();
  if (!manifest) {
    manifest = initManifest(window.location.origin);
  }
  return manifest;
}

function updateDisplayedForm(manifest: Manifest) {}

function getManifestFromForm(): Manifest {
  return initManifest(window.location.origin);
}

function onFormChanged() {
  let newManifest = getManifestFromForm();
  updateToLS(newManifest);
  setPageManifest(newManifest);
}

function ManifestItemLabel(props: any) {
  return (
    <InputLabel
      sx={{
        display: "flex",
        justifyContent: "center",
        fontWeight: 700,
      }}
    >
      {props.name}
    </InputLabel>
  );
}
function ManifestItem(props: any) {
  return (
    <TextField
      id={props.id}
      type={props.type || "text"}
      label={props.name}
      fullWidth
      size="small"
      autoComplete="off"
      variant="outlined"
    />
  );
}

function App() {
  let manifest = prepareManifest();
  setPageManifest(manifest);
  updateDisplayedForm(manifest);

  return (
    <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
      <Box sx={{ padding: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="Name" />
          </Grid>
          <Grid item xs={6} sm={4}>
            <ManifestItem id="manifest-name" label="Name" />
          </Grid>
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="Short Name" />
          </Grid>
          <Grid item xs={6} sm={4}>
            <ManifestItem id="manifest-short-name" label="ShortName" />
          </Grid>
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="Start URL" />
          </Grid>
          <Grid item xs={8} sm={9}>
            <ManifestItem
              id="manifest-start-url"
              label="Start URL"
              type="url"
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="Scope" />
          </Grid>
          <Grid item xs={8} sm={9}>
            <ManifestItem id="manifest-scope" label="Scope" type="url" />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default App;
