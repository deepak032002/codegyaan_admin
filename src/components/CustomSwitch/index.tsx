import React, { useState } from "react";
import { CustomSwitchProps } from "./interface";
import { Switch } from "@material-tailwind/react";

const CustomSwitch: React.FC<CustomSwitchProps> = ({ checked, onChange }) => {
  const [isChecked, setIsChecked] = useState<number>(checked as boolean ? 1 : 0);

  return <Switch value={isChecked} onChange={(e) => onChange(e, setIsChecked)} />;
};

export default CustomSwitch;
