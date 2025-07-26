import { Button, Stack, Typography } from "@mui/material";
import type { FieldErrors, UseFormWatch } from "react-hook-form";
import type { ProjectFormValues, Activity, Energy, Participant, Accommodation, Gift, Waste } from "@/sections/project/form/type";
import { Scope1Direct } from "@/sections/project/scope/Scope1Direct";
import { Scope2Indirect } from "@/sections/project/scope/Scope2Indirect";
import { Scope3Other } from "@/sections/project/scope/Scope3Other";

interface ProjectFormStep2Props {
  step: number;
  activities: Activity[];
  energies: Energy[];
  participant: Participant[];
  accommodation: Accommodation[];
  gift: Gift[];
  waste: Waste[];
  errors: FieldErrors<ProjectFormValues>;
  projectCode: string;
  projectName: string;
  fullName: string;
  telText: string;
  greyColor: string;
  disableColor: string;
  redColor: string;
  watch: UseFormWatch<ProjectFormValues>;
  removeActivity: (index: number) => void;
  appendActivity: (value: Activity) => void;
  removeEnergy: (index: number) => void;
  appendEnergy: (value: Energy) => void;
  removeParticipant: (index: number) => void;
  appendParticipant: (value: Participant) => void;
  removeAccommodation: (index: number) => void;
  appendAccommodation: (value: Accommodation) => void;
  removeGift: (index: number) => void;
  appendGift: (value: Gift) => void;
  removeWaste: (index: number) => void;
  appendWaste: (value: Waste) => void;
  handleBack: () => void;
}

export function ProjectFormStep2(props: ProjectFormStep2Props) {
  const {
    step,
    activities,
    energies,
    participant,
    accommodation,
    gift,
    waste,
    errors,
    projectCode,
    projectName,
    fullName,
    telText,
    greyColor,
    disableColor,
    redColor,
    watch,
    removeActivity,
    appendActivity,
    removeEnergy,
    appendEnergy,
    removeParticipant,
    appendParticipant,
    removeAccommodation,
    appendAccommodation,
    removeGift,
    appendGift,
    removeWaste,
    appendWaste,
    handleBack,
  } = props;

  return (
    <>
      {step === 2 && (
        <>
          <Stack sx={{ padding: "16px 24px" }}>
            <Typography variant="h4">{`[${projectCode}] ${projectName}`}</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >{`ผู้กรอก: ${fullName} (${telText})`}</Typography>
          </Stack>

          <Stack sx={{ padding: 3, gap: 4, marginBottom: 10 }}>
            <Scope1Direct
              activities={activities}
              errors={errors}
              greyColor={greyColor}
              disableColor={disableColor}
              redColor={redColor}
              removeActivity={removeActivity}
              appendActivity={appendActivity}
            />
            <Scope2Indirect
              energies={energies}
              watch={watch}
              disableColor={disableColor}
              redColor={redColor}
              greyColor={greyColor}
              removeEnergy={removeEnergy}
              appendEnergy={appendEnergy}
            />
            <Scope3Other
              participant={participant}
              accommodation={accommodation}
              gift={gift}
              waste={waste}
              errors={errors}
              disableColor={disableColor}
              redColor={redColor}
              greyColor={greyColor}
              removeParticipant={removeParticipant}
              appendParticipant={appendParticipant}
              removeAccommodation={removeAccommodation}
              appendAccommodation={appendAccommodation}
              removeGift={removeGift}
              appendGift={appendGift}
              removeWaste={removeWaste}
              appendWaste={appendWaste}
            />
            <Stack
              direction="row"
              spacing={2}
              sx={{ padding: "16px 24px", justifyContent: "end" }}
            >
              <Button variant="text" onClick={handleBack}>
                ย้อนกลับ
              </Button>
              <Button variant="outlined">บันทึกแบบร่าง</Button>
              <Button variant="contained" type="submit">
                ส่งแบบฟอร์ม
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
}
