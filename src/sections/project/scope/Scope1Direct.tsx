import { Fragment } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { StyledAddButton, StyledStack } from "@/sections/project/styles";
import { SvgColor } from "@/components/svg/svg-color";
import { Field } from "@/components/hook-form/field";

interface Scope1DirectProps {
  activities: any[];
  errors: any;
  greyColor: string;
  disableColor: string;
  redColor: string;
  removeActivity: (index: number) => void;
  appendActivity: (value: any) => void;
}

export function Scope1Direct({
  activities,
  errors,
  greyColor,
  disableColor,
  redColor,
  removeActivity,
  appendActivity,
}: Scope1DirectProps) {
  return (
    <StyledStack>
      <Typography variant="subtitle1" fontWeight={700}>
        Scope 1 : ข้อมูลการปลดปล่อยก๊าซเรือนกระจกทางตรง
      </Typography>
      <Typography variant="caption" color={greyColor}>
        สามารถประมาณได้จากบิลงบประมาณจบโครงการ
      </Typography>
      <Grid container spacing={2} alignItems="center">
        {activities.map((field, index) => (
          <Fragment key={field.id}>
            <Grid size={{ xs: 7.5 }}>
              <Field.CustomAutoComplete
                name={`activities.${index}.type`}
                label="ประเภทกิจกรรม"
                options={[
                  { value: "gas", label: "ก๊าซหุงต้ม" },
                  { value: "normal_food", label: "อาหารปกติ" },
                  { value: "vegan", label: "อาหารมังสวิรัติ" },
                ]}
              />
            </Grid>
            <Grid size={{ xs: 2 }}>
              <Field.Text
                type="number"
                name={`activities.${index}.amount`}
                label="ปริมาณพลังงานที่ใช้"
                slotProps={{ htmlInput: { min: 0 } }}
              />
            </Grid>
            <Grid size={{ xs: 2 }}>
              <Field.CustomAutoComplete
                name={`activities.${index}.unit`}
                label="หน่วย"
                options={[
                  { value: "box", label: "กล่อง" },
                  { value: "kg", label: "กิโลกรัม" },
                  { value: "g", label: "กรัม" },
                  { value: "other", label: "อื่นๆ (โปรดระบุ)" },
                ]}
              />
            </Grid>
            <Grid size={{ xs: 0.5 }}>
              <IconButton
                onClick={() => removeActivity(index)}
                disabled={activities.length === 1}
              >
                <SvgColor
                  src="/assets/icons/ic-trash.svg"
                  color={activities.length === 1 ? disableColor : redColor}
                />
              </IconButton>
            </Grid>
          </Fragment>
        ))}
      </Grid>
      <StyledAddButton
        variant="outlined"
        startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
        onClick={() => appendActivity({ type: "", amount: "", unit: "" })}
      >
        เพิ่มกิจกรรม
      </StyledAddButton>
    </StyledStack>
  );
}
