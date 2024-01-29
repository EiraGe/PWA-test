import React from "react";

import { ManifestCheckboxGroupItem } from "./ManifestCheckboxGroupItem";
import { ManifestRadioGroupItem } from "./ManifestRadioGroupItem";
import { ManifestTextItem } from "./ManifestTextItem";
import { ManifestType } from "./ManifestType";

interface ManifestFormControlItemProps {
  id: string;
  label: string;
  type: "text" | "radio" | "checkbox";
  selections: Array<string> | undefined;
  manifest: ManifestType;
  onChange: (manifest: ManifestType) => void;
}

export function ManifestFormControlItem(props: ManifestFormControlItemProps) {
  const { manifest } = props;

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    props.onChange({ ...manifest, [name]: value });
  };

  const selectionChangeHandler = (name: string, value: Array<string>) => {
    console.log(name, value);
    props.onChange({ ...manifest, [name]: value });
  };

  switch (props.type) {
    case "radio":
      return (
        <ManifestRadioGroupItem
          id={props.id}
          value={manifest[props.id as keyof ManifestType] as string}
          selections={props.selections as Array<string>}
          onChange={inputChangeHandler}
        />
      );
    case "checkbox":
      return (
        <ManifestCheckboxGroupItem
          id={props.id}
          value={manifest[props.id as keyof ManifestType] as []}
          selections={props.selections as Array<string>}
          onChange={selectionChangeHandler}
        />
      );
    default:
      return (
        <ManifestTextItem
          id={props.id}
          label={props.label}
          value={manifest[props.id as keyof ManifestType]}
          onChange={inputChangeHandler}
        />
      );
  }
}
