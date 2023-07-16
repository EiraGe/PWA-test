export interface ManifestItem {
  id: string;
  label: string;
  type: string;
  selections?: Array<string>;
  size: "sm" | "md";
}

export const manifestItemsList: Array<ManifestItem> = [
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
];
