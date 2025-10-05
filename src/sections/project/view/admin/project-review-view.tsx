"use client";

import { projectsQueryKeys } from "@/services/project/query/project-query";
import { ownersQueryKeys } from "@/services/user/query/user-query";
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import ProjectFirstScopeInformation from "../../detail/project-first-scope-information";
import ProjectHeader from "../../detail/project-header";
import ProjectInformation from "../../detail/project-information";
import ProjectOwnerInformation from "../../detail/project-owner-information";
import ProjectSecondScopeInformation from "../../detail/project-second-scope-information";
import ProjectThirdScopeInformation from "../../detail/project-third-scope-information";
import { ReviewFormSchema } from "../../review-form/schema";

import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { Field } from "@/components/hook-form/field";
import { Form } from "@/components/hook-form/form-provider";
import { SvgColor } from "@/components/svg/svg-color";
import { showError, showSuccess } from "@/components/toast/toast";
import { useBoolean } from "@/hooks/use-boolean";
import { useReviewProjectMutation } from "@/services/project/mutation";
import type { TReviewProjectRequest } from "@/types/project/review-project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import type { FieldArrayWithId } from "react-hook-form";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { buildReviewProjectPayload } from "../../helper/review-formatter";
import type { ReviewFormValues } from "../../review-form/type";
import { StyledAddButton } from "../../styles";
import ProjectCarbonDetail from "../../project-carbon-detail";
import { totalCarbonResult } from "@/types/project/get-project";

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
  const router = useRouter();

  const openDialog = useBoolean(false);
  const [pendingValues, setPendingValues] = useState<ReviewFormValues | null>(
    null,
  );

  // --------------------------- API ---------------------------

  const queryClient = useQueryClient();

  const owner = useQuery({ ...ownersQueryKeys.meOptions() });

  useEffect(() => {
    if (owner.isLoading || owner.isFetching) return;
    if (owner.data?.owner?.is_admin === false) {
      router.replace("/");
    }
  }, [owner.data?.owner?.is_admin, owner.isFetching, owner.isLoading, router]);

  const project = useQuery({
    ...projectsQueryKeys.projectOptions({
      id: id,
      include_transportations: true,
      include_review: true,
    }),
    enabled: !!id,
  });

  const reviewProject = useReviewProjectMutation();

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

  const isReject = passedValues.includes(false);

  const carbonResult = project.data?.project.carbon_result;
  const carbonUsageAll = carbonResult ? totalCarbonResult(carbonResult) : 0;

  // --------------------------- Function ---------------------------

  const handleCloseDialog = () => {
    if (!reviewProject.isPending) {
      setPendingValues(null);
      openDialog.onFalse();
    }
  };

  const handleConfirm = () => {
    if (!pendingValues || !id) {
      return;
    }

    const toastSuccessMessage = !isReject
      ? "อนุมัติแบบฟอร์มสำเร็จ"
      : "ตีกลับแบบฟอร์มสำเร็จ";

    const toastErrorMessage = !isReject
      ? "อนุมัติแบบฟอร์มไม่สำเร็จ"
      : "ตีกลับแบบฟอร์มไม่สำเร็จ";

    const payload: TReviewProjectRequest = buildReviewProjectPayload({
      id,
      values: pendingValues,
    });

    reviewProject.mutate(payload, {
      onSuccess: () => {
        setPendingValues(null);
        openDialog.onFalse();
        void queryClient.invalidateQueries({
          queryKey: projectsQueryKeys.project({
            id,
            include_transportations: true,
            include_review: true,
          }),
        });

        showSuccess(toastSuccessMessage);

        router.push("/");
      },
      onError: () => {
        setPendingValues(null);
        openDialog.onFalse();

        showError(toastErrorMessage);
      },
    });
  };

  const handleFormSubmit = (values: ReviewFormValues) => {
    setPendingValues(values);
    openDialog.onTrue();
  };

  // --------------------------- Render ---------------------------

  if (!owner.data?.owner?.is_admin) {
    return null;
  }

  if (project.isLoading || !project.isSuccess) {
    return (
      <Stack
        sx={{
          height: "calc(100vh - 100px)",
          width: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={50} />
      </Stack>
    );
  }

  return (
    <>
      <Form methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack
          sx={{ marginTop: 5, backgroundColor: "#ffffff", borderRadius: 3 }}
        >
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
              carbon={project.data?.project.carbon_result.scope1}
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
              carbon={project.data?.project.carbon_result.scope2}
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
              projectId={project.data?.project.id}
              ownerId={project.data?.project.owner_id}
              carbon={project.data?.project.carbon_result.scope3}
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
            >
              <ProjectCarbonDetail carbon={carbonUsageAll} all />
            </ProjectThirdScopeInformation>
          </Stack>

          <Stack sx={{ padding: "0px 24px" }}>
            <Field.Text
              type="text"
              name="note"
              label="รายละเอียดเพิ่มเติม"
              slotProps={{ htmlInput: { min: 0 } }}
              rows={3}
              multiline
            />
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{ padding: "40px 24px 16px 24px", justifyContent: "end" }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => router.push("/")}
            >
              ย้อนกลับ
            </Button>

            {!isReject ? (
              <Button type="submit" variant="contained">
                อนุมัติ
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="error">
                ตีกลับ
              </Button>
            )}
          </Stack>
        </Stack>
      </Form>

      <ConfirmDialog
        key={`${isReject}-${project.data?.project.id}-${openDialog.value}`}
        open={openDialog.value}
        title={
          <Box
            component="img"
            src={
              isReject
                ? "/assets/icons/ic-reject-dialog.svg"
                : "/assets/icons/ic-approve-dialog.svg"
            }
          />
        }
        content={
          <Stack spacing={1}>
            <Typography variant="h3">
              {isReject
                ? "คุณต้องการตีกลับแบบฟอร์มโครงการหรือไม่?"
                : "คุณต้องการอนุมัติแบบฟอร์มโครงการหรือไม่?"}
            </Typography>
            <Typography variant="h5" fontWeight={500} color="#637381">
              {isReject
                ? "หลังจากตีกลับ ผู้กรอกแบบฟอร์มจะสามารถแก้ไขและส่งแบบฟอร์มใหม่อีกครั้ง"
                : "หลังจากอนุมัติแบบฟอร์มโครงการแล้ว ผู้กรอกแบบฟอร์มจะสามารถพิมพ์ใบรับรองได้"}
            </Typography>
          </Stack>
        }
        action={
          <Button
            variant="contained"
            color={isReject ? "error" : "primary"}
            onClick={handleConfirm}
            disabled={!pendingValues || reviewProject.isPending}
          >
            {isReject ? "ตีกลับ" : "อนุมัติ"}
          </Button>
        }
        onClose={handleCloseDialog}
      />
    </>
  );
}

export default ProjectReviewView;
