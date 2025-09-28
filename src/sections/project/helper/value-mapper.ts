function ActivityNameMapper(value: string) {
  switch (value) {
    case "gas":
      return "ก๊าซหุงต้ม";
    case "normal_food":
      return "อาหารปกติ";
    case "vegan":
      return "อาหารมังสวิรัติ";

    default:
      return value;
  }
}

function ActivityUnitMapper(value: string) {
  switch (value) {
    case "box":
      return "กล่อง";
    case "kg":
      return "กิโลกรัม";
    case "g":
      return "กรัม";

    default:
      return value;
  }
}

function FacilityMapper(value: string) {
  switch (value) {
    case "tv":
      return "ทีวี";
    case "microphone":
      return "ไมโครโฟน";
    case "projector":
      return "Projector";

    default:
      return value;
  }
}

export { ActivityNameMapper, ActivityUnitMapper, FacilityMapper };
