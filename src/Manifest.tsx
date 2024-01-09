import * as React from "react";
import {
  Collapse,
  Divider,
  FormControlLabel,
  Paper,
  Switch,
} from "@mui/material";
import { ManifestControl } from "./ManifestControl";
import { ManifestContent } from "./ManifestContent";
import { ManifestType } from "./ManifestType";
import { generateManifestText, setManifestLink } from "./ManifestMediator";
import { updateToLS } from "./ManifestLocalStorageMediator";

export function Manifest() {
  const [hasManifest, setHasManifest] = React.useState(true);
  const [stringManifest, setStringManifest] = React.useState<string>("");

  const handleShowManifestChange = () => {
    setHasManifest((prev) => !prev);
    if (!hasManifest) {
      updateToLS(undefined);
      setManifestLink(undefined);
    }
  };

  const handleSetManifest = (newManifest: ManifestType) => {
    setHasManifest(true);
    const stringManifest = generateManifestText(newManifest);
    setStringManifest(stringManifest);
  };

  const onStringManifestChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setStringManifest(e.target.value);
  };

  const onStringManifestCommit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setManifestLink(stringManifest);
  };

  return (
    <Paper elevation={3} sx={{ marginRight: "0%", marginLeft: "0%" }}>
      <FormControlLabel
        control={
          <Switch checked={hasManifest} onChange={handleShowManifestChange} />
        }
        label="Add Manifest"
      />
      <Collapse in={hasManifest}>
        <ManifestControl
          setManifestHandler={handleSetManifest}></ManifestControl>
        <Divider />
        <ManifestContent
          stringManifest={stringManifest}
          onStringManifestChange={onStringManifestChange}
          onStringManifestCommit={onStringManifestCommit}></ManifestContent>
      </Collapse>
    </Paper>
  );
}
