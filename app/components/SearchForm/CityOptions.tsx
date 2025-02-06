import React from "react";
import { OptionItem, OptionList } from "./styled";
import cities from "~/constants/cities";

const CityOptions = () => {
  return (
    <OptionList>
      {cities.map((city) => (
        <OptionItem key={city.id}>{city.label}</OptionItem>
      ))}
    </OptionList>
  );
};

export default CityOptions;
