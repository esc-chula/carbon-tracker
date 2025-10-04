function ActivityNameMapper(value: string) {
  switch (value) {
    case "gas":
      return "ก๊าซหุงต้ม";
    case "normal_food":
      return "อาหารปกติ";
    case "vegan":
      return "อาหารมังสวิรัติ";
    case "normal_food_with_drink":
      return "อาหารว่างและเครื่องดื่ม";
    case "vegan_with_drink":
      return "อาหารว่างมังสวิรัติและเครื่องดื่ม";

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
    case "projector":
      return "โปรเจกเตอร์";
    case "computer":
      return "คอมพิวเตอร์";
    case "audio_equipment":
      return "เครื่องเสียง";

    default:
      return value;
  }
}

export { ActivityNameMapper, ActivityUnitMapper, FacilityMapper };
