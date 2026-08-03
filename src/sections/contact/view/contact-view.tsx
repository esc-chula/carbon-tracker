import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";

type Contact = {
  role: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  lineId: string;
};

const CONTACTS: Contact[] = [
  {
    role: "ประธานฝ่ายความยั่งยืน",
    name: "นายศุภากร ขจรเกียรตินุกูล",
    nickname: "ต้อม #3 สิ่ง",
    phoneNumber: "092-419-5262",
    lineId: "tomsszaza",
  },
  {
    role: "รองประธานฝ่ายความยั่งยืน",
    name: "นายอภิชัย เมืองแก้ว",
    nickname: "แบงค์ #3 สิ่ง",
    phoneNumber: "094-323-1184",
    lineId: "bank161147",
  },
  {
    role: "รองประธานฝ่ายความยั่งยืน",
    name: "นางสาวณัฐนันท์ ตัณฑะเตมีย์",
    nickname: "น้อยหน่า #3 สิ่ง",
    phoneNumber: "062-263-6369",
    lineId: "noinanattanan",
  },
];

function ContactView() {
  return (
    <Stack spacing={6} sx={{ py: 4 }}>
      <Typography variant="h1" fontWeight={700} sx={{ mb: 16 }}>
        ข้อมูลติดต่อ
      </Typography>

      <Grid container spacing={4}>
        {CONTACTS.map((contact, index) => (
          <Grid key={`${contact.role}-${index}`} size={{ xs: 10, md: "auto" }}>
            <ContactCard contact={contact} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

function ContactCard({ contact }: ContactCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        height: 1,
        width: 410,
        p: 3,
        borderRadius: 1.5,
        boxShadow: "0 3px 6px rgba(33, 43, 54, 0.25)",
      }}
    >
      <Stack spacing={2}>
        <Typography
          sx={{
            color: "#036846",
            fontSize: 32,
            fontWeight: 700,
            lineHeight: "40px",
          }}
        >
          {contact.role}
        </Typography>

        <Divider sx={{ borderColor: "lightGray.300", borderBottomWidth: 2 }} />

        <Stack spacing={1}>
          <ContactItem label="ชื่อ: " value={contact.name} />
          <ContactItem label="ชื่อเล่น: " value={contact.nickname} />
          <ContactItem label="โทรศัพท์: " value={contact.phoneNumber} />
          <ContactItem label="Line ID: " value={contact.lineId} />
        </Stack>
      </Stack>
    </Paper>
  );
}

function ContactItem({ label, value }: ContactItemProps) {
  return (
    <Stack direction="row" spacing={1.5}>
      <Typography
        color="text.secondary"
        fontSize={18}
        fontWeight={500}
        sx={{ flexShrink: 0, width: 120 }}
      >
        {label}
      </Typography>
      <Typography fontSize={18} fontWeight={600}>
        {value}
      </Typography>
    </Stack>
  );
}

interface ContactCardProps {
  contact: Contact;
}

interface ContactItemProps {
  label: string;
  value: string;
}

export default ContactView;
