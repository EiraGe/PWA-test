import React from "react";
import { Box, Button, Grid, Paper } from "@mui/material";

import "./App.css";
import { ManifestRadioGroupItem } from "./ManifestRadioGroupItem";
import { manifestItemsList } from "./ManifestItemsList";
import { ManifestItemLabel } from "./ManifestItemLabel";
import { ManifestTextItem } from "./ManifestTextItem";
import { ManifestCheckboxGroupItem } from "./ManifestCheckboxGroupItem";

type ManifestType = {
  name: string;
  short_name: string;
  scope: string;
  icons?: Array<object> | null;
  display: string;
  orientation: string;
  start_url: string;
  theme_color: string;
  background_color: string;
  description?: string;
};

function emptyManifest(): ManifestType {
  return {
    name: "",
    short_name: "",
    start_url: "",
    scope: "",
    display: "",
    orientation: "",
    theme_color: "",
    background_color: "",
    icons: [
      {
        src: window.location.origin + "/logo192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: window.location.origin + "/logo512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
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
    theme_color: "white",
    background_color: "white",
    display: "standalone",
    orientation: "",
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

  const iconChangeHandler = (name: string, newValue: any) => {
    console.log(name, newValue);
    setManifestValue({ ...manifestValue, [name]: newValue });
    setShowResult(false);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Getting form data...");
    let manifest = emptyManifest();
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
    <Paper elevation={3} sx={{ marginRight: "0%", marginLeft: "0%" }}>
      <Box
        component="form"
        id="manifest-form"
        onSubmit={onFormSubmit}
        sx={{ padding: 5 }}
      >
        <Grid container spacing={2}>
          {manifestItemsList.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <Grid item xs={4} sm={2}>
                  <ManifestItemLabel name={item.id} />
                </Grid>
                <Grid
                  item
                  xs={item.size === "sm" ? 6 : 8}
                  sm={item.size === "sm" ? 4 : 9}
                >
                  {item.type === "radio" ? (
                    <ManifestRadioGroupItem
                      id={item.id}
                      value={
                        manifestValue[item.id as keyof ManifestType] as string
                      }
                      selections={item.selections as Array<string>}
                      onChange={inputChangeHandler}
                    />
                  ) : (
                    <ManifestTextItem
                      id={item.id}
                      label={item.label}
                      value={manifestValue[item.id as keyof ManifestType]}
                      onChange={inputChangeHandler}
                    />
                  )}
                </Grid>
              </React.Fragment>
            );
          })}
          <Grid item xs={4} sm={2}>
            <ManifestItemLabel name="icons" />
          </Grid>
          <Grid item xs={8} sm={9}>
            <ManifestCheckboxGroupItem
              id="icons"
              value={[]}
              selections={["192", "256", "512"]}
              onChange={iconChangeHandler}
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
