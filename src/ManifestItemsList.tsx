import React from "react";

import { Grid } from "@mui/material";

import { ManifestFormControlItem } from "./ManifestItem";
import { ManifestItemLabel } from "./ManifestItemLabel";

export interface ManifestItemProps {
  id: string;
  label: string;
  type: "text" | "radio" | "checkbox";
  selections?: Array<string>;
  size: "sm" | "md";
}

export const manifestItemsList: Array<ManifestItemProps> = [
  {
    id: "name",
    label: "Name",
    type: "text",
    size: "sm",
  },
  {
    id: "short_name",
    label: "ShortName",
    type: "text",
    size: "sm",
  },
  {
    id: "start_url",
    label: "Start URL",
    type: "text",
    size: "md",
  },
  {
    id: "scope",
    label: "Scope",
    type: "text",
    size: "md",
  },
  {
    id: "display",
    label: "Display",
    type: "radio",
    selections: ["fullscreen", "standalone", "minimal-ui", "browser"],
    size: "md",
  },
  {
    id: "orientation",
    label: "Orientation",
    type: "radio",
    selections: [
      "any",
      "natural",
      "landscape",
      "portrait",
      "portrait-primary",
      "portrait-secondary",
      "landscape-primary",
      "landscape-secondary",
    ],
    size: "md",
  },
  {
    id: "theme_color",
    label: "Theme color",
    type: "text",
    size: "sm",
  },
  {
    id: "background_color",
    label: "Background color",
    type: "text",
    size: "sm",
  },
  {
    id: "icons",
    label: "Icons",
    type: "checkbox",
    selections: ["128", "192", "256", "512"],
    size: "md",
  },
];

export function ManifestItemsList(props: any) {
  return (
    <Grid container spacing={2} sx={{ padding: 5 }}>
      {manifestItemsList.map((item) => {
        return (
          <React.Fragment key={item.id}>
            <Grid item xs={4} sm={2}>
              <ManifestItemLabel name={item.id} />
            </Grid>
            <Grid
              item
              xs={item.size === "sm" ? 6 : 8}
              sm={item.size === "sm" ? 4 : 9}>
              <ManifestFormControlItem
                id={item.id}
                label={item.label}
                type={item.type}
                selections={item.selections}
                manifest={props.manifest}
                onChange={props.onChange}
              />
            </Grid>
          </React.Fragment>
        );
      })}
    </Grid>
  );
}
