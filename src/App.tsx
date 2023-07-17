import React from "react";
import { Box, Button, Grid, Paper } from "@mui/material";

import "./App.css";
import { ManifestRadioGroupItem } from "./ManifestRadioGroupItem";
import { manifestItemsList } from "./ManifestItemsList";
import { ManifestItemLabel } from "./ManifestItemLabel";
import { ManifestTextItem } from "./ManifestTextItem";
import { ManifestCheckboxGroupItem } from "./ManifestCheckboxGroupItem";
import { ManifestType, emptyManifest, initManifest } from "./ManifestType";
import { setManifestLink } from "./PageManifestMediator";

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

  const iconChangeHandler = (name: string, newValue: Array<string>) => {
    console.log("icon changed", name, newValue);
    setManifestValue({ ...manifestValue, [name]: newValue });
    setShowResult(false);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    SubmitNewManifest(manifestValue);
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
              value={manifestValue.icons}
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
