const DEPARTMENT_MAPPING: Record<string, string> = {
  ฝ่ายพัฒนาองค์กร: "OD",
  ฝ่ายการเงิน: "FIN",
  ฝ่ายเลขานุการ: "SEC",
  ฝ่ายเทคโนโลยี: "TECH",
  ฝ่ายประชาสัมพันธ์และการตลาด: "MARCOM",
  ฝ่ายวิชาการ: "AC",
  ฝ่ายกิจการภายใน: "IN",
  ฝ่ายกิจการภายนอก: "EA",
  ฝ่ายนิสิตสัมพันธ์: "NS3K",
  ฝ่ายพัฒนาสังคมและบำเพ็ญประโยชน์: "CSR",
  ฝ่ายศิลปะและวัฒนธรรม: "ART",
  ฝ่ายกีฬา: "SPORT",
  ฝ่ายสวัสดิการนิสิตและสิ่งแวดล้อม: "WE",
  "โครงการอื่น ๆ ของกวศ.": "OTHER",
};

export const getOrganizationText = (org: string, orgDetail: string): string => {
  if (org === "ชมรม") {
    return orgDetail;
  }
  if (org === "กวศ.") {
    return DEPARTMENT_MAPPING[orgDetail] ?? orgDetail;
  }
  return orgDetail;
};

export const getMajorAbbr = (major = ""): string => {
  const clean = major.replace("วิศวกรรม", "");
  const map: Record<string, string> = {
    ภาครวม: "รวม",
    โยธา: "โยธา",
    ไฟฟ้า: "ไฟฟ้า",
    เครื่องกล: "เครื่องกล",
    ยานยนต์: "ยานยนต์",
    อุตสาหการ: "อุตสาหการ",
    เคมี: "เคมี",
    ทรัพยากรธรณี: "ธรณี",
    ปิโตรเลียม: "ปิโตรเลียม",
    สิ่งแวดล้อม: "สิ่งแวดล้อม",
    สำรวจ: "สำรวจ",
    โลหการและวัสดุ: "โลหการ",
    คอมพิวเตอร์: "คอม",
    "คอมพิวเตอร์และเทคโนโลยีดิจิทัล (CEDT)": "CEDT",
    นิวเคลียร์และรังสี: "นิวเคลียร์",
    "การออกแบบและการผลิตยานยนต์ (ADME)": "ADME",
    "นาโน (NANO)": "NANO",
    "สารสนเทศและการสื่อสาร (ICE)": "ICE",
    "อากาศยาน (AERO)": "AERO",
    "หุ่นยนต์และปัญญาประดิษฐ์ (AI)": "AI",
    "เคมีและกระบวนการ (ChPE)": "ChPE",
    "เซมิคอนดักเตอร์ (SEMI)": "SEMI",
  };
  return map[clean] ?? clean;
};

export const getStudentYear = (studentId = ""): string | number => {
  if (!studentId || studentId.length < 2) return "";
  const prefix = parseInt(studentId.substring(0, 2));
  if (Number.isNaN(prefix)) return "";
  const currentYear = (new Date().getFullYear() + 543) % 100;
  return currentYear - prefix;
};
