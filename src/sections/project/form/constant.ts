type TRoom = "อาคาร 3" | "อาคารวิศวฯ 100 ปี" | "อาคารเจริญวิศวกรรม (อาคาร 4)";

const roomOptions = {
  "อาคาร 3": [
    { value: "Hall of Intania", label: "Hall of Intania" }, // TODO: meter only
    { value: "ห้องประชุมสวนรวมใจ 1", label: "ห้องประชุมสวนรวมใจ 1" },
    { value: "ห้องประชุมสวนรวมใจ 2", label: "ห้องประชุมสวนรวมใจ 2" },
    { value: "ห้องประชุม Truelab", label: "ห้องประชุม Truelab" },
    { value: "201", label: "201" },
    { value: "204", label: "204" },
    { value: "205", label: "205" },
    { value: "206", label: "206" },
    { value: "207", label: "207" },
    { value: "208", label: "208" },
    { value: "209", label: "209" },
    { value: "214", label: "214" },
    { value: "215", label: "215" },
    { value: "218", label: "218" },
    { value: "219", label: "219" },
    { value: "220", label: "220" },
    { value: "222", label: "222" },
    { value: "224", label: "224" },
    { value: "301", label: "301" },
    { value: "304", label: "304" },
    { value: "305", label: "305" },
    { value: "306", label: "306" },
    { value: "307", label: "307" },
    { value: "308", label: "308" },
    { value: "309", label: "309" },
    { value: "313", label: "313" },
    { value: "315", label: "315" },
    { value: "316", label: "316" },
    { value: "317", label: "317" },
    { value: "318", label: "318" },
    { value: "319", label: "319" },
    { value: "320", label: "320" },
    { value: "321", label: "321" },
    { value: "322", label: "322" },
    { value: "324", label: "324" },
    { value: "401", label: "401" },
    { value: "402", label: "402" },
    { value: "403", label: "403" },
    { value: "404", label: "404" },
    { value: "405", label: "405" },
    { value: "406", label: "406" },
    { value: "407", label: "407" },
    { value: "408", label: "408" },
    { value: "409", label: "409" },
    { value: "415", label: "415" },
    { value: "416", label: "416" },
    { value: "417", label: "417" },
    { value: "418", label: "418" },
    { value: "419", label: "419" },
    { value: "420", label: "420" },
    { value: "421", label: "421" },
    { value: "422", label: "422" },
    { value: "425", label: "425" },
    { value: "ห้องสมุดชั้น3", label: "ห้องสมุดชั้น3" },
    { value: "ห้้องสมุดชั้น4", label: "ห้้องสมุดชั้น4" },
  ],
  "อาคารเจริญวิศวกรรม (อาคาร 4)": [
    { value: "ห้องประชุมชั้น 2", label: "ห้องประชุมชั้น 2" }, // TODO: meter only
  ],
  "อาคารวิศวฯ 100 ปี": [
    { value: "ห้องอเนกประสงค์ ชั้น 12", label: "ห้องอเนกประสงค์ ชั้น 12" }, // TODO: meter only
    { value: "ชั้นลอย ห้องอเนกประสงค์", label: "ชั้นลอย ห้องอเนกประสงค์" }, // TODO: meter only

    { value: "201 A", label: "201 A" },
    { value: "201 B", label: "201 B" },
    { value: "301", label: "301" },
    { value: "302", label: "302" },
    { value: "303", label: "303" },
    { value: "304", label: "304" },
    { value: "305", label: "305" },
    { value: "306", label: "306" },
    { value: "401", label: "401" },
    { value: "402", label: "402" },
    { value: "403", label: "403" },
    { value: "404", label: "404" },
    { value: "405", label: "405" },
    { value: "501", label: "501" },
    { value: "502", label: "502" },
    { value: "503", label: "503" },
    { value: "504", label: "504" },
    { value: "505", label: "505" },
    { value: "601", label: "601" },
    { value: "602", label: "602" },
  ],
};

const fieldOptions = [
  { value: "ฝ่ายกิจการภายใน", label: "ฝ่ายกิจการภายใน" },
  { value: "ฝ่ายศิลปะและวัฒนธรรม", label: "ฝ่ายศิลปะและวัฒนธรรม" },
  { value: "ฝ่ายกีฬา", label: "ฝ่ายกีฬา" },
  {
    value: "ฝ่ายพัฒนาสังคมและบำเพ็ญประโยชน์",
    label: "ฝ่ายพัฒนาสังคมและบำเพ็ญประโยชน์",
  },
  {
    value: "ฝ่ายสวัสดิการนิสิตและสิ่งแวดล้อม",
    label: "ฝ่ายสวัสดิการนิสิตและสิ่งแวดล้อม",
  },
  { value: "ฝ่ายกิจการภายนอก", label: "ฝ่ายกิจการภายนอก" },
  { value: "ฝ่ายนิสิตสัมพันธ์", label: "ฝ่ายนิสิตสัมพันธ์" },
  { value: "ฝ่ายเทคโนโลยี", label: "ฝ่ายเทคโนโลยี" },
  { value: "ฝ่ายพัฒนาองค์กร", label: "ฝ่ายพัฒนาองค์กร" },
  {
    value: "ฝ่ายประชาสัมพันธ์และการตลาด",
    label: "ฝ่ายประชาสัมพันธ์และการตลาด",
  },
  { value: "ฝ่ายวิชาการ", label: "ฝ่ายวิชาการ" },
  { value: "ฝ่ายเลขานุการ", label: "ฝ่ายเลขานุการ" },
  { value: "โครงการอื่น ๆ ของกวศ.", label: "โครงการอื่น ๆ ของกวศ." },
];

const departmentOptions = [
  { value: "วิศวกรรมภาครวม", label: "วิศวกรรมภาครวม" },
  { value: "วิศวกรรมโยธา", label: "วิศวกรรมโยธา" },
  { value: "วิศวกรรมไฟฟ้า", label: "วิศวกรรมไฟฟ้า" },
  { value: "วิศวกรรมเครื่องกล", label: "วิศวกรรมเครื่องกล" },
  { value: "วิศวกรรมยานยนต์", label: "วิศวกรรมยานยนต์" },
  { value: "วิศวกรรมอุตสาหการ", label: "วิศวกรรมอุตสาหการ" },
  { value: "วิศวกรรมเคมี", label: "วิศวกรรมเคมี" },
  { value: "วิศวกรรมทรัพยากรธรณี", label: "วิศวกรรมทรัพยากรธรณี" },
  { value: "วิศวกรรมปิโตรเลียม", label: "วิศวกรรมปิโตรเลียม" },
  { value: "วิศวกรรมสิ่งแวดล้อม", label: "วิศวกรรมสิ่งแวดล้อม" },
  { value: "วิศวกรรมสำรวจ", label: "วิศวกรรมสำรวจ" },
  { value: "วิศวกรรมโลหการและวัสดุ", label: "วิศวกรรมโลหการและวัสดุ" },
  { value: "วิศวกรรมคอมพิวเตอร์", label: "วิศวกรรมคอมพิวเตอร์" },
  {
    value: "วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล (CEDT)",
    label: "วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล (CEDT)",
  },
  {
    value: "วิศวกรรมนิวเคลียร์และรังสี",
    label: "วิศวกรรมนิวเคลียร์และรังสี",
  },
  {
    value: "วิศวกรรมการออกแบบและการผลิตยานยนต์ (ADME)",
    label: "วิศวกรรมการออกแบบและการผลิตยานยนต์ (ADME)",
  },
  { value: "วิศวกรรมนาโน (NANO)", label: "วิศวกรรมนาโน (NANO)" },
  {
    value: "วิศวกรรมสารสนเทศและการสื่อสาร (ICE)",
    label: "วิศวกรรมสารสนเทศและการสื่อสาร (ICE)",
  },
  { value: "วิศวกรรมอากาศยาน (ADME)", label: "วิศวกรรมอากาศยาน (ADME)" },
  {
    value: "วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์ (AI)",
    label: "วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์ (AI)",
  },
  {
    value: "วิศวกรรมเคมีและกระบวนการ (ChPE)",
    label: "วิศวกรรมเคมีและกระบวนการ (ChPE)",
  },
  {
    value: "วิศวกรรมเซมิคอนดักเตอร์ (SEMI)",
    label: "วิศวกรรมเซมิคอนดักเตอร์ (SEMI)",
  },
];

const activityOptions = [
  { value: "gas", label: "ก๊าซหุงต้ม" },
  { value: "normal_food", label: "อาหารปกติ" },
  { value: "vegan", label: "อาหารมังสวิรัติ" },
  {
    value: "normal_food_with_drink",
    label: "อาหารว่างและเครื่องดื่ม",
  },
  {
    value: "vegan_with_drink",
    label: "อาหารว่างมังสวิรัติและเครื่องดื่ม",
  },
];

const activityUnitOptions = [
  { value: "box", label: "กล่อง" },
  { value: "kg", label: "กิโลกรัม" },
  { value: "g", label: "กรัม" },
];

const buildingOptions = [
  { value: "อาคาร 3", label: "อาคาร 3" },
  { value: "อาคารวิศวฯ 100 ปี", label: "อาคารวิศวฯ 100 ปี" },
  {
    value: "อาคารเจริญวิศวกรรม (อาคาร 4)",
    label: "อาคารเจริญวิศวกรรม (อาคาร 4)",
  },
];

const equipmentOptions = [
  { label: "ทีวี", value: "tv" },
  { label: "โปรเจกเตอร์", value: "projector" },
  { label: "คอมพิวเตอร์", value: "computer" },
  { label: "เครื่องเสียง", value: "audio_equipment" },
];

const energyUnitOptions = [
  { label: "ยูนิตไฟฟ้า", value: "ยูนิตไฟฟ้า" },
  { label: "ปริมาณน้ำมันที่ใช้ (ลิตร)", value: "ปริมาณน้ำมันที่ใช้ (ลิตร)" },
];

const giftUnitOptions = [
  { value: "กระดาษ", label: "กระดาษ" },
  { value: "พลาสติก", label: "พลาสติก" },
  { value: "โลหะ", label: "โลหะ" },
  { value: "ผ้า", label: "ผ้า" },
  { value: "ไม้", label: "ไม้" },
  { value: "อื่นๆ", label: "อื่นๆ" },
];

const wasteOptions = [
  { value: "ขวดพลาสติก (PET)", label: "ขวดพลาสติก (PET)" },
  { value: "ขวดพลาสติก (HDPE)", label: "ขวดพลาสติก (HDPE) [ขวดขุ่น]" },
  { value: "อะลูมิเนียม (กระป๋อง)", label: "อะลูมิเนียม (กระป๋อง)" },
  { value: "เศษอาหาร", label: "เศษอาหาร" },
  { value: "ขยะรีไซเคิลพลัส", label: "ขยะรีไซเคิลพลัส" },
  { value: "ทั่วไป", label: "ทั่วไป" },
];

export type { TRoom };
export {
  activityOptions,
  activityUnitOptions,
  buildingOptions,
  departmentOptions,
  energyUnitOptions,
  equipmentOptions,
  fieldOptions,
  giftUnitOptions,
  roomOptions,
  wasteOptions,
};
