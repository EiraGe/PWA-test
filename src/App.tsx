import React from "react";
import { Box, Button, Grid, Paper } from "@mui/material";

import "./App.css";
import ManifestRadioGroup from "./ManifestRadioGroup";
import ManifestItemLabel from "./ManifestItemLabel";
import ManifestTextItem from "./ManifestTextItem";

type ManifestType = {
  name: string;
  short_name: string;
  start_url: string;
  scope: string;
  display: string;
  description?: string;
  icons?: Array<object> | null;
  background_color?: string;
  theme_color?: string;
};

function emptyManifest(): ManifestType {
  return {
    name: "",
    short_name: "",
    start_url: "",
    scope: "",
    display: "",
    icons: [],
  };
}

function initManifest(scope: string): ManifestType {
  return {
    name: "PWA-test",
    short_name: "",
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
    start_url: scope,
  };
}

function readLSManifest(): ManifestType | null {
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

function updateToLS(manifest: ManifestType) {
  localStorage.setItem("manifest", JSON.stringify(manifest));
}

function setManifestLink(manifest: ManifestType) {
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

function prepareManifest(): ManifestType {
  let manifest = readLSManifest();
  if (!manifest) {
    manifest = initManifest(window.location.origin);
  }
  return manifest;
}

function App() {
  const initialManifest = prepareManifest();
  React.useEffect(() => {
    setManifestLink(initialManifest);
  });

  const [showResult, setShowResult] = React.useState(false);

  const [manifestValue, setManifestValue] =
    React.useState<ManifestType>(initialManifest);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setManifestValue({ ...manifestValue, [name]: value });
    setShowResult(false);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Getting form data...");
    let manifest = {} as ManifestType;
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    formData.forEach((value, property: string) => {
      let key = property as keyof ManifestType;
      if (key && key !== "icons") {
        console.log(`Set manifest: ${key} as ${value}`);
        manifest[key] = value as string;
      } else {
        console.log(`Unable to set ${key} as ${value}`);
      }
    });
    //Form submission:
    SubmitNewManifest(manifest);
  };

  const SubmitNewManifest = (manifest: ManifestType) => {
    setShowResult(true);
    setManifestLink(manifest);
    updateToLS(manifest);
  };

  return (
    <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
      <Box
        component="form"
        id="manifest-form"
        onSubmit={onFormSubmit}
        sx={{ padding: 5 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="Name" />
          </Grid>
          <Grid item xs={6} sm={4}>
            <ManifestTextItem
              id="name"
              label="Name"
              value={manifestValue.name}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="Short Name" />
          </Grid>
          <Grid item xs={6} sm={4}>
            <ManifestTextItem
              id="short_name"
              label="ShortName"
              value={manifestValue.short_name}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="Start URL" />
          </Grid>
          <Grid item xs={8} sm={9}>
            <ManifestTextItem
              id="start_url"
              label="Start URL"
              value={manifestValue.start_url}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="Scope" />
          </Grid>
          <Grid item xs={8} sm={9}>
            <ManifestTextItem
              id="scope"
              label="Scope"
              value={manifestValue.scope}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="Display" />
          </Grid>
          <Grid item xs={10} sm={8}>
            <ManifestRadioGroup
              id="display"
              value={manifestValue.display}
              onChange={inputChangeHandler}
              items={["fullscreen", "standalone", "minimal-ui", "browser"]}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => {
                let newManifest = initManifest(window.location.origin);
                setManifestValue(newManifest);
                SubmitNewManifest(newManifest);
              }}
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => {
                let newManifest = emptyManifest();
                setManifestValue(newManifest);
                SubmitNewManifest(newManifest);
              }}
            >
              Clear
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} hidden={!showResult}>
            Done!
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default App;
