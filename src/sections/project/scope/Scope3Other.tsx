import { Fragment } from "react";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { StyledAddButton, StyledStack } from "@/sections/project/styles";
import { SvgColor } from "@/components/svg/svg-color";
import RHFDateTimePicker from "@/components/hook-form/rhf-date-time-picker";
import CSVUploadComponent from "@/components/hook-form/rhf-upload";
import { Field } from "@/components/hook-form/field";
import { giftUnitOptions, wasteOptions } from "@/sections/project/form/constant";

interface Scope3OtherProps {
  participant: any[];
  accommodation: any[];
  gift: any[];
  waste: any[];
  errors: any;
  disableColor: string;
  redColor: string;
  greyColor: string;
  removeParticipant: (index: number) => void;
  appendParticipant: (value: any) => void;
  removeAccommodation: (index: number) => void;
  appendAccommodation: (value: any) => void;
  removeGift: (index: number) => void;
  appendGift: (value: any) => void;
  removeWaste: (index: number) => void;
  appendWaste: (value: any) => void;
}

export function Scope3Other({
  participant,
  accommodation,
  gift,
  waste,
  errors,
  disableColor,
  redColor,
  greyColor,
  removeParticipant,
  appendParticipant,
  removeAccommodation,
  appendAccommodation,
  removeGift,
  appendGift,
  removeWaste,
  appendWaste,
}: Scope3OtherProps) {
  return (
    <StyledStack>
      <Stack spacing={0.5}>
        <Typography variant="subtitle1" fontWeight={700}>
          Scope 3 : ข้อมูลการปลดปล่อยก๊าซเรือนกระจกทางอ้อม
        </Typography>
        <Typography variant="caption" color={greyColor}>
          การเดินทางของผู้เข้าร่วมและ staff
        </Typography>
      </Stack>
      <CSVUploadComponent />
      <StyledStack sx={{ borderRadius: 2 }}>
        <Typography variant="body2" fontWeight={700}>
          จำนวนผู้เข้าร่วมรวมกับ staff ตลอดทั้งโครงการ
          <Typography component="span" color="red">*</Typography>
        </Typography>
        <Grid container spacing={2} alignItems="center">
          {participant.map((field, index) => (
            <Fragment key={field.id}>
              <Grid size={{ xs: 3 }}>
                <RHFDateTimePicker
                  name={`participant.${index}.date`}
                  label="เลือกวันที่"
                  helperText={errors.participant?.[index]?.date?.message}
                  required
                />
              </Grid>
              <Grid size={{ xs: 8.5 }}>
                <Field.Text
                  type="number"
                  name={`participant.${index}.participant_amount`}
                  label="จำนวนคน"
                  slotProps={{ htmlInput: { min: 0 } }}
                  error={!!errors.participant?.[index]?.participant_amount}
                  helperText={errors.participant?.[index]?.participant_amount?.message}
                  required
                />
              </Grid>
              <Grid size={{ xs: 0.5 }}>
                <IconButton
                  onClick={() => removeParticipant(index)}
                  disabled={participant.length === 1}
                >
                  <SvgColor
                    src="/assets/icons/ic-trash.svg"
                    color={participant.length === 1 ? disableColor : redColor}
                  />
                </IconButton>
              </Grid>
            </Fragment>
          ))}
        </Grid>
        <StyledAddButton
          variant="outlined"
          startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
          onClick={() => appendParticipant({ date: undefined, participant_amount: undefined })}
        >
          เพิ่มวันที่
        </StyledAddButton>
      </StyledStack>
      <StyledStack sx={{ borderRadius: 2 }}>
        <Typography variant="body2" fontWeight={700}>
          การพักแรมของผู้เข้าร่วมและ staff ตลอดทั้งโครงการ
        </Typography>
        <Grid container spacing={2} alignItems="center">
          {accommodation.map((field, index) => (
            <Fragment key={field.id}>
              <Grid size={{ xs: 3 }}>
                <RHFDateTimePicker
                  name={`accommodation.${index}.date`}
                  label="เลือกวันที่พักแรม"
                />
              </Grid>
              <Grid size={{ xs: 8.5 }}>
                <Field.Text
                  type="number"
                  name={`accommodation.${index}.participant_amount`}
                  label="จำนวนคน"
                  slotProps={{ htmlInput: { min: 0 } }}
                />
              </Grid>
              <Grid size={{ xs: 0.5 }}>
                <IconButton
                  onClick={() => removeAccommodation(index)}
                  disabled={accommodation.length === 1}
                >
                  <SvgColor
                    src="/assets/icons/ic-trash.svg"
                    color={accommodation.length === 1 ? disableColor : redColor}
                  />
                </IconButton>
              </Grid>
            </Fragment>
          ))}
        </Grid>
        <StyledAddButton
          variant="outlined"
          startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
          onClick={() => appendAccommodation({ date: undefined, participant_amount: undefined })}
        >
          เพิ่มวันที่พักแรม
        </StyledAddButton>
      </StyledStack>
      <StyledStack sx={{ borderRadius: 2 }}>
        <Typography variant="body2" fontWeight={700}>
          ของแจกผู้เข้าร่วมและ staff
        </Typography>
        <Grid container spacing={2} alignItems="center">
          {gift.map((field, index) => (
            <Fragment key={field.id}>
              <Grid size={{ xs: 7.5 }}>
                <Field.CustomAutoComplete
                  name={`gift.${index}.type`}
                  label="เลือกประเภทของแจก"
                  options={giftUnitOptions}
                />
              </Grid>
              <Grid size={{ xs: 2 }}>
                <Field.Text
                  type="number"
                  name={`gift.${index}.amount`}
                  label="ปริมาณของแจก"
                  slotProps={{ htmlInput: { min: 0 } }}
                />
              </Grid>
              <Grid size={{ xs: 2 }}>
                <Field.CustomAutoComplete
                  name={`gift.${index}.unit`}
                  label="หน่วย"
                  options={[
                    { value: "kg", label: "กิโลกรัม" },
                    { value: "g", label: "กรัม" },
                    { value: "other", label: "อื่นๆ (โปรดระบุ)" },
                  ]}
                />
              </Grid>
              <Grid size={{ xs: 0.5 }}>
                <IconButton
                  onClick={() => removeGift(index)}
                  disabled={gift.length === 1}
                >
                  <SvgColor
                    src="/assets/icons/ic-trash.svg"
                    color={gift.length === 1 ? disableColor : redColor}
                  />
                </IconButton>
              </Grid>
            </Fragment>
          ))}
        </Grid>
        <StyledAddButton
          variant="outlined"
          startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
          onClick={() => appendGift({ type: "", amount: "", unit: "" })}
        >
          เพิ่มกิจกรรม
        </StyledAddButton>
      </StyledStack>
      <StyledStack sx={{ borderRadius: 2 }}>
        <Typography variant="body2" fontWeight={700}>
          ของเสียหลังการจัดงาน
        </Typography>
        <Grid container spacing={2} alignItems="center">
          {waste.map((field, index) => (
            <Fragment key={field.id}>
              <Grid size={{ xs: 7.5 }}>
                <Field.CustomAutoComplete
                  name={`waste.${index}.type`}
                  label="เลือกประเภทของเสีย"
                  options={wasteOptions}
                />
              </Grid>
              <Grid size={{ xs: 2 }}>
                <Field.Text
                  type="number"
                  name={`waste.${index}.amount`}
                  label="ปริมาณของเสีย"
                  slotProps={{ htmlInput: { min: 0 } }}
                />
              </Grid>
              <Grid size={{ xs: 2 }}>
                <Field.CustomAutoComplete
                  name={`waste.${index}.unit`}
                  label="หน่วย"
                  options={[{ value: "kg", label: "กิโลกรัม" }]}
                />
              </Grid>
              <Grid size={{ xs: 0.5 }}>
                <IconButton
                  onClick={() => removeWaste(index)}
                  disabled={waste.length === 1}
                >
                  <SvgColor
                    src="/assets/icons/ic-trash.svg"
                    color={waste.length === 1 ? disableColor : redColor}
                  />
                </IconButton>
              </Grid>
            </Fragment>
          ))}
        </Grid>
        <StyledAddButton
          variant="outlined"
          startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
          onClick={() => appendWaste({ type: "", amount: "", unit: "" })}
        >
          เพิ่มของเสีย
        </StyledAddButton>
      </StyledStack>
    </StyledStack>
  );
}
