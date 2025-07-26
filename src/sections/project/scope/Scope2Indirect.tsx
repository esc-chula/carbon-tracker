import { Fragment } from "react";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { StyledAddButton, StyledStack } from "@/sections/project/styles";
import { SvgColor } from "@/components/svg/svg-color";
import RHFDateTimePicker from "@/components/hook-form/rhf-date-time-picker";
import { Field } from "@/components/hook-form/field";
import { equipmentOptions, energyUnitOptions, buildingOptions, roomOptions, type TRoom } from "@/sections/project/form/constant";
import type { UseFormWatch } from "react-hook-form";

interface Scope2IndirectProps {
  energies: any[];
  watch: UseFormWatch<any>;
  disableColor: string;
  redColor: string;
  greyColor: string;
  removeEnergy: (index: number) => void;
  appendEnergy: (value: any) => void;
}

export function Scope2Indirect({
  energies,
  watch,
  disableColor,
  redColor,
  greyColor,
  removeEnergy,
  appendEnergy,
}: Scope2IndirectProps) {
  return (
    <StyledStack>
      <Stack spacing={0.5}>
        <Typography variant="subtitle1" fontWeight={700}>
          Scope 2 : ข้อมูลการปลดปล่อยก๊าซเรือนกระจกทางอ้อมจากการใช้พลังงาน
        </Typography>
        <Typography variant="caption" color={greyColor}>
          สามารถประมาณได้จากบิลงบประมาณจบโครงการ
        </Typography>
      </Stack>
      {energies.map((field, index) => {
        const type = watch(`energies.${index}.type`);
        const building = watch(`energies.${index}.building`);
        return (
          <Fragment key={field.id}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body1" fontWeight={400}>
                การใช้พลังงาน
              </Typography>
              <Field.GroupRadio
                name={`energies.${index}.type`}
                options={[
                  { value: "building", label: "การใช้งานอาคาร." },
                  { value: "electric", label: "การใช้งานปั่นไฟ" },
                ]}
              />
            </Stack>
            <Grid container spacing={2} alignItems="center">
              {type === "electric" ? (
                <>
                  <Grid size={{ xs: 2 }}>
                    <Field.MultipleAutoComplete
                      name={`energies.${index}.equipment`}
                      label="อุปกรณ์ที่ใช้"
                      options={equipmentOptions}
                    />
                  </Grid>
                  <Grid size={{ xs: 7.5 }}>
                    <Field.Text
                      type="number"
                      name={`energies.${index}.quantity`}
                      label="ปริมาณพลังงานที่ใช้"
                      slotProps={{ htmlInput: { min: 0 } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <Field.CustomAutoComplete
                      name={`energies.${index}.unit`}
                      label="หน่วย"
                      options={energyUnitOptions}
                    />
                  </Grid>
                  <Grid size={{ xs: 0.5 }}>
                    <IconButton
                      onClick={() => removeEnergy(index)}
                      disabled={energies.length === 1}
                    >
                      <SvgColor
                        src="/assets/icons/ic-trash.svg"
                        color={energies.length === 1 ? disableColor : redColor}
                      />
                    </IconButton>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid size={{ xs: 2.3 }}>
                    <Field.CustomAutoComplete
                      name={`energies.${index}.building`}
                      label="อาคารที่ใช้"
                      options={buildingOptions}
                    />
                  </Grid>
                  <Grid size={{ xs: 2.3 }}>
                    {roomOptions[building as TRoom] ? (
                      <Field.CustomAutoComplete
                        name={`energies.${index}.room`}
                        label="ห้องที่ใช้"
                        options={roomOptions[building as TRoom]}
                      />
                    ) : (
                      <Field.Text
                        name={`energies.${index}.room`}
                        label="ห้องที่ใช้"
                      />
                    )}
                  </Grid>
                  <Grid size={{ xs: 2.3 }}>
                    <Field.MultipleAutoComplete
                      name={`energies.${index}.equipment`}
                      label="อุปกรณ์ที่ใช้"
                      options={equipmentOptions}
                    />
                  </Grid>
                  <Grid size={{ xs: 2.3 }}>
                    <RHFDateTimePicker
                      name={`energies.${index}.startDate`}
                      label="วันและเวลาเริ่มใช้"
                    />
                  </Grid>
                  <Grid size={{ xs: 2.3 }}>
                    <RHFDateTimePicker
                      name={`energies.${index}.endDate`}
                      label="วันและเวลาหยุดใช้"
                    />
                  </Grid>
                  <Grid size={{ xs: 0.5 }}>
                    <IconButton
                      onClick={() => removeEnergy(index)}
                      disabled={energies.length === 1}
                    >
                      <SvgColor
                        src="/assets/icons/ic-trash.svg"
                        color={energies.length === 1 ? disableColor : redColor}
                      />
                    </IconButton>
                  </Grid>
                </>
              )}
            </Grid>
          </Fragment>
        );
      })}
      <StyledAddButton
        variant="outlined"
        startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
        onClick={() =>
          appendEnergy({
            type: "building",
            building: "",
            room: "",
            equipment: [],
            startDate: undefined,
            endDate: undefined,
            quantity: undefined,
            unit: "",
          })
        }
      >
        เพิ่มการใช้พลังงาน
      </StyledAddButton>
    </StyledStack>
  );
}
