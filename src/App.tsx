import React from "react";
import { Box, Button, Grid, InputLabel, TextField, Paper } from "@mui/material";

import "./App.css";
import ManifestRadioGroup from "./ManifestRadioGroup";

type Manifest = {
  name?: string;
  description?: string;
  icons?: Array<object> | null;
  background_color?: string;
  theme_color?: string;
  display?: string;
  scope?: string;
  start_url?: string;
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
    start_url: scope,
  };
}

function setManifestLink(manifest: Manifest) {
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

function updatePageManafest(manifest: Manifest): boolean {
  populateDisplayedForm(manifest);
  updateToLS(manifest);
  setManifestLink(manifest);
  return true;
}

function prepareManifest(): Manifest {
  let manifest = readLSManifest();
  if (!manifest) {
    manifest = initManifest(window.location.origin);
  }
  return manifest;
}

function populateDisplayedForm(manifest: Manifest) {
  let form = document.getElementById("manifest-form") as HTMLFormElement;
  form.reset();

  let property: keyof typeof manifest;
  for (property in manifest) {
    let e = document.getElementById(property) as HTMLInputElement;
    if (!e) {
      console.log("Unable to find display Element for property:" + property);
      continue;
    }
    e.value = `${manifest[property]}`;
  }
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
      name={props.id}
      type={props.type || "text"}
      label={props.label}
      fullWidth
      size="small"
      autoComplete="off"
      variant="outlined"
    />
  );
}

function App() {
  let manifest = prepareManifest();
  React.useEffect(() => {
    updatePageManafest(manifest);
  }, [manifest]);

  const [showResult, setShowResult] = React.useState(false);
  const [display, setDisplay] = React.useState("browser");

  const onFormSubmit = (
    manifest: Manifest,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    formData.forEach((value, property: string) => {
      let key = property as keyof Manifest;
      if (key && key !== "icons") {
        console.log(`Set manifest: ${key} as ${value}`);
        manifest[key] = value as string;
      } else {
        console.log(`Unable to set ${key} as ${value}`);
      }
    });
    //Form submission:
    // setDisplay("standalone");
    setShowResult(updatePageManafest(manifest));
  };

  return (
    <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
      <Box
        component="form"
        id="manifest-form"
        onSubmit={(e) => onFormSubmit(manifest, e)}
        sx={{ padding: 5 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="Name" />
          </Grid>
          <Grid item xs={6} sm={4}>
            <ManifestItem id="name" label="Name" />
          </Grid>
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="Short Name" />
          </Grid>
          <Grid item xs={6} sm={4}>
            <ManifestItem id="short_name" label="ShortName" />
          </Grid>
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="Start URL" />
          </Grid>
          <Grid item xs={8} sm={9}>
            <ManifestItem id="start_url" label="Start URL" type="url" />
          </Grid>
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="Scope" />
          </Grid>
          <Grid item xs={8} sm={9}>
            <ManifestItem id="scope" label="Scope" type="url" />
          </Grid>
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="Display" />
          </Grid>
          <Grid item xs={10} sm={8}>
            <ManifestRadioGroup
              id="display"
              value={display}
              items={["fullscreen", "standalone", "minimal-ui", "browser"]}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => {
                manifest = initManifest(window.location.origin);
                setShowResult(updatePageManafest(manifest));
              }}
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => {
                manifest = { name: "" };
                setShowResult(updatePageManafest(manifest));
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
