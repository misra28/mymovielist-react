import React from "react";
import { CRating } from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import {
  cilMeh,
  cilSmile,
  cilMoodBad,
  cilMoodGood,
  cilMoodVeryGood,
} from "@coreui/icons";

interface Props {
  simplified_rating: number; // 1–5
  width?: number;
  consolidated?: boolean;
}

export const MoodMeter = ({
  simplified_rating,
  width,
  consolidated = false,
}: Props) => {
  let icons = [cilMoodBad, cilMeh, cilSmile, cilMoodGood, cilMoodVeryGood];

  const activeColors = ["red", "yellow", "#00eeffff", "#09ff00ff", "purple"];

  if (consolidated) {
    return (
      <CIcon
        icon={icons[simplified_rating - 1]}
        width={width || 40}
        style={{
          color: activeColors[simplified_rating - 1],
          transition: "color 0.2s ease",
        }}
      />
    );
  }

  return (
    <div style={{ display: "flex", gap: "0.3rem" }}>
      {icons.map((icon, index) => {
        const isActive = simplified_rating === index + 1;

        return (
          <CIcon
            key={index}
            icon={icon}
            width={width || 40}
            style={{
              color: isActive ? activeColors[index] : "gray",
              transition: "color 0.2s ease",
            }}
          />
        );
      })}
    </div>
  );
};
