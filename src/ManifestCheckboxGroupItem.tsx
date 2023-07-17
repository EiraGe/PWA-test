import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

interface ManifestMultiSelectProps {
  id: string;
  value: Array<string>;
  selections: Array<string>;
  onChange: (name: string, value: Array<string>) => void;
}

export function ManifestCheckboxGroupItem(props: ManifestMultiSelectProps) {
  let selected = new Set(props.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      selected.add(event.target.name);
    } else {
      selected.delete(event.target.name);
    }
    props.onChange(props.id, Array.from(selected.values()));
  };

  return (
    <FormGroup id={props.id} row>
      {props.selections.map((item: string) => {
        return (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={selected.has(item)}
                onChange={handleChange}
                name={item}
              />
            }
            label={item}
          />
        );
      })}
    </FormGroup>
  );
}
