"use client";

import { projectsQueryKeys } from "@/services/project/query/project-query";
import {
  Button,
  FormHelperText,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ProjectHeader from "../../detail/project-header";
import ProjectInformation from "../../detail/project-information";
import ProjectOwnerInformation from "../../detail/project-owner-information";
import ProjectFirstScopeInformation from "../../detail/project-first-scope-information";
import ProjectSecondScopeInformation from "../../detail/project-second-scope-information";
import ProjectThirdScopeInformation from "../../detail/project-third-scope-information";
import { ReviewFormSchema } from "../../review-form/schema";

import type { ReviewFormValues } from "../../review-form/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import type { FieldArrayWithId } from "react-hook-form";
import { Form } from "@/components/hook-form/form-provider";
import { Field } from "@/components/hook-form/field";
import { StyledAddButton } from "../../styles";
import { SvgColor } from "@/components/svg/svg-color";

// ---------------------------------------------------------------------------------

const REJECTION_NOTE_CONFIGS = [
  {
    passedPath: "detail.owner.passed",
    notesPath: "detail.owner.rejection_notes",
  },
  {
    passedPath: "detail.project.passed",
    notesPath: "detail.project.rejection_notes",
  },
  {
    passedPath: "detail.scope1.passed",
    notesPath: "detail.scope1.rejection_notes",
  },
  {
    passedPath: "detail.scope2.passed",
    notesPath: "detail.scope2.rejection_notes",
  },
  {
    passedPath: "detail.scope3.attendee.passed",
    notesPath: "detail.scope3.attendee.rejection_notes",
  },
  {
    passedPath: "detail.scope3.overnight.passed",
    notesPath: "detail.scope3.overnight.rejection_notes",
  },
  {
    passedPath: "detail.scope3.souvenir.passed",
    notesPath: "detail.scope3.souvenir.rejection_notes",
  },
  {
    passedPath: "detail.scope3.waste.passed",
    notesPath: "detail.scope3.waste.rejection_notes",
  },
] as const;

type Params = {
  id: string;
};

function ProjectReviewView() {
  // --------------------------- Hook ---------------------------

  const params = useParams<Params>();
  const { id } = params;
  const theme = useTheme();

  // --------------------------- API ---------------------------

  const project = useQuery({
    ...projectsQueryKeys.projectOptions({
      id: id,
      include_transportations: true,
    }),
    enabled: !!id,
  });

  // --------------------------- Form ---------------------------

  const methods = useForm<ReviewFormValues>({
    resolver: zodResolver(ReviewFormSchema),
  });

  const {
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = methods;

  const {
    fields: ownerRejectionNotes,
    append: appendOwnerRejectionNote,
    remove: removeOwnerRejectionNote,
  } = useFieldArray<ReviewFormValues, "detail.owner.rejection_notes">({
    control,
    name: "detail.owner.rejection_notes",
  });

  const {
    fields: projectRejectionNotes,
    append: appendProjectRejectionNote,
    remove: removeProjectRejectionNote,
  } = useFieldArray<ReviewFormValues, "detail.project.rejection_notes">({
    control,
    name: "detail.project.rejection_notes",
  });

  const {
    fields: scope1RejectionNotes,
    append: appendScope1RejectionNote,
    remove: removeScope1RejectionNote,
  } = useFieldArray<ReviewFormValues, "detail.scope1.rejection_notes">({
    control,
    name: "detail.scope1.rejection_notes",
  });

  const {
    fields: scope2RejectionNotes,
    append: appendScope2RejectionNote,
    remove: removeScope2RejectionNote,
  } = useFieldArray<ReviewFormValues, "detail.scope2.rejection_notes">({
    control,
    name: "detail.scope2.rejection_notes",
  });

  const {
    fields: scope3AttendeeRejectionNotes,
    append: appendScope3AttendeeRejectionNote,
    remove: removeScope3AttendeeRejectionNote,
  } = useFieldArray<ReviewFormValues, "detail.scope3.attendee.rejection_notes">(
    {
      control,
      name: "detail.scope3.attendee.rejection_notes",
    },
  );

  const {
    fields: scope3OvernightRejectionNotes,
    append: appendScope3OvernightRejectionNote,
    remove: removeScope3OvernightRejectionNote,
  } = useFieldArray<
    ReviewFormValues,
    "detail.scope3.overnight.rejection_notes"
  >({
    control,
    name: "detail.scope3.overnight.rejection_notes",
  });

  const {
    fields: scope3SouvenirRejectionNotes,
    append: appendScope3SouvenirRejectionNote,
    remove: removeScope3SouvenirRejectionNote,
  } = useFieldArray<ReviewFormValues, "detail.scope3.souvenir.rejection_notes">(
    {
      control,
      name: "detail.scope3.souvenir.rejection_notes",
    },
  );

  const {
    fields: scope3WasteRejectionNotes,
    append: appendScope3WasteRejectionNote,
    remove: removeScope3WasteRejectionNote,
  } = useFieldArray<ReviewFormValues, "detail.scope3.waste.rejection_notes">({
    control,
    name: "detail.scope3.waste.rejection_notes",
  });

  const passedValues = useWatch({
    control,
    name: REJECTION_NOTE_CONFIGS.map((config) => config.passedPath),
  }) as Array<string | boolean | undefined>;

  useEffect(() => {
    REJECTION_NOTE_CONFIGS.forEach((config, index) => {
      const rawPassed = passedValues?.[index];
      const normalizedPassed =
        rawPassed === true || rawPassed === "true"
          ? true
          : rawPassed === false || rawPassed === "false"
            ? false
            : undefined;

      if (normalizedPassed === undefined) {
        return;
      }

      const notesPath = config.notesPath;
      const currentNotes = getValues(notesPath) ?? [];

      if (normalizedPassed) {
        if (currentNotes.length > 0) {
          setValue(notesPath, [], {
            shouldDirty: true,
            shouldValidate: false,
          });
          clearErrors(notesPath);
        }

        return;
      }

      if (!currentNotes.length) {
        setValue(notesPath, [{ note: "" }], {
          shouldDirty: true,
          shouldValidate: false,
        });
      }
    });
  }, [passedValues, clearErrors, getValues, setValue]);

  // --------------------------- Values ---------------------------

  const redColor = "#B71931";
  const disableColor = theme.palette.action.disabled;

  const renderReviewSection = (
    passedName: string,
    passedError: string | undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rejectionNotes: FieldArrayWithId<ReviewFormValues, any>[] = [],
    appendNote?: (value: { note: string }) => void,
    removeNote?: (index: number) => void,
  ) => {
    const notesBasePath = passedName.replace(/passed$/, "rejection_notes");

    return (
      <>
        <Stack direction="row" spacing={2}>
          <Field.Radio name={passedName} label="ผ่านการตรวจ" value={true} />

          <Field.Radio name={passedName} label="ต้องแก้ไข" value={false} />
        </Stack>

        {!!passedError && <FormHelperText error>{passedError}</FormHelperText>}

        {rejectionNotes.length > 0 && appendNote && removeNote && (
          <>
            {rejectionNotes.map((field, index) => (
              <Stack
                key={field.id}
                direction="row"
                spacing={1}
                alignItems="start"
              >
                <Field.Text
                  type="text"
                  name={`${notesBasePath}.${index}.note`}
                  label="สิ่งที่ต้องแก้ไข"
                  slotProps={{ htmlInput: { min: 0 } }}
                />

                <IconButton
                  sx={{ marginTop: "8px !important" }}
                  onClick={() => removeNote(index)}
                  disabled={rejectionNotes.length === 1}
                >
                  <SvgColor
                    src="/assets/icons/ic-trash.svg"
                    color={
                      rejectionNotes.length === 1 ? disableColor : redColor
                    }
                  />
                </IconButton>
              </Stack>
            ))}

            <StyledAddButton
              variant="outlined"
              startIcon={<SvgColor src="/assets/icons/ic-plus.svg" />}
              sx={{ height: 32 }}
              onClick={() => appendNote({ note: "" })}
            >
              เพิ่มสิ่งที่ต้องแก้ไข
            </StyledAddButton>
          </>
        )}
      </>
    );
  };

  const headerData = {
    custom_id: project.data?.project.custom_id ?? "",
    title: project.data?.project.title ?? "",
    status: project.data?.project.status ?? "",
    owner: project.data?.project?.owner,
  };

  const informationData = {
    custom_id: project.data?.project.custom_id ?? "",
    title: project.data?.project.title ?? "",
    org: project.data?.project.org ?? "",
    org_detail: project.data?.project?.org_detail ?? "",
  };

  const ownerData = project.data?.project.owner;

  console.log(errors);

  // --------------------------- Render ---------------------------

  return (
    <Form methods={methods} onSubmit={handleSubmit(() => console.log("hello"))}>
      <Stack sx={{ marginTop: 5, backgroundColor: "#ffffff", borderRadius: 3 }}>
        <ProjectHeader data={headerData} />

        <Stack spacing={4} sx={{ padding: 3 }}>
          <ProjectInformation data={informationData}>
            {renderReviewSection(
              "detail.project.passed",
              errors.detail?.project?.passed?.message,
              projectRejectionNotes,
              appendProjectRejectionNote,
              removeProjectRejectionNote,
            )}
          </ProjectInformation>

          <ProjectOwnerInformation data={ownerData}>
            {renderReviewSection(
              "detail.owner.passed",
              errors.detail?.owner?.passed?.message,
              ownerRejectionNotes,
              appendOwnerRejectionNote,
              removeOwnerRejectionNote,
            )}
          </ProjectOwnerInformation>

          <ProjectFirstScopeInformation
            data={
              project.data?.project?.carbon_detail?.scope1?.activities ?? []
            }
          >
            {renderReviewSection(
              "detail.scope1.passed",
              errors.detail?.scope1?.passed?.message,
              scope1RejectionNotes,
              appendScope1RejectionNote,
              removeScope1RejectionNote,
            )}
          </ProjectFirstScopeInformation>

          <ProjectSecondScopeInformation
            data={
              project.data?.project.carbon_detail.scope2 ?? {
                buildings: null,
                generators: null,
              }
            }
          >
            {renderReviewSection(
              "detail.scope2.passed",
              errors.detail?.scope2?.passed?.message,
              scope2RejectionNotes,
              appendScope2RejectionNote,
              removeScope2RejectionNote,
            )}
          </ProjectSecondScopeInformation>

          <ProjectThirdScopeInformation
            data={project.data?.project?.carbon_detail?.scope3}
            attendeeChildren={renderReviewSection(
              "detail.scope3.attendee.passed",
              errors.detail?.scope3?.attendee?.passed?.message,
              scope3AttendeeRejectionNotes,
              appendScope3AttendeeRejectionNote,
              removeScope3AttendeeRejectionNote,
            )}
            overnightChildren={renderReviewSection(
              "detail.scope3.overnight.passed",
              errors.detail?.scope3?.overnight?.passed?.message,
              scope3OvernightRejectionNotes,
              appendScope3OvernightRejectionNote,
              removeScope3OvernightRejectionNote,
            )}
            souvenirChildren={renderReviewSection(
              "detail.scope3.souvenir.passed",
              errors.detail?.scope3?.souvenir?.passed?.message,
              scope3SouvenirRejectionNotes,
              appendScope3SouvenirRejectionNote,
              removeScope3SouvenirRejectionNote,
            )}
            wasteChildren={renderReviewSection(
              "detail.scope3.waste.passed",
              errors.detail?.scope3?.waste?.passed?.message,
              scope3WasteRejectionNotes,
              appendScope3WasteRejectionNote,
              removeScope3WasteRejectionNote,
            )}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{ padding: "16px 24px", justifyContent: "end" }}
        >
          <Button variant="outlined" color="secondary">
            ย้อนกลับ
          </Button>

          <Button type="submit" variant="contained">
            อนุมัติ
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

export default ProjectReviewView;
