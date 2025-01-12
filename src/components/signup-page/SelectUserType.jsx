import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SelectUserType({ handleChange, value }) {
  const { t } = useTranslation();

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 120,
        "& .MuiInputBase-root": {
          backgroundColor: "transparent",
          borderRadius: "8px",
        },
        "& .MuiInputLabel-root": {
          color: "gray",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "lightblue",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "gray",
          },
          "&:hover fieldset": {
            borderColor: "lightblue",
          },
          "&.Mui-focused fieldset": {
            borderColor: "lightblue",
          },
        },
        "& .MuiMenuItem-root": {
          "&:hover": {
            backgroundColor: "#e0f7fa",
          },
        },
        "& .MuiMenuItem-root.Mui-selected": {
          backgroundColor: "#e0f7fa !important",
          "&:hover": {
            backgroundColor: "#b2ebf2",
          },
        },
      }}
      size="small"
      className="!w-full dark:text-gray-200"
    >
      <InputLabel
        id="demo-select-small-label"
        className="dark:text-gray-400 text-gray-600"
      >
        {t("Type")}
      </InputLabel>
      <Select
        className="text-gray-400 dark:text-gray-200 dark:bg-gray-800"
        labelId="demo-select-small-label"
        id="demo-select-small"
        name="role"
        value={value}
        label="role"
        onChange={handleChange}
      >
        <MenuItem value={"disabled"}>{t("Disabled")}</MenuItem>
        <MenuItem value={"assistant"}>{t("Assistant")}</MenuItem>
        <MenuItem value={"donor"}>{t("Donor")}</MenuItem>
      </Select>
    </FormControl>
  );
}
