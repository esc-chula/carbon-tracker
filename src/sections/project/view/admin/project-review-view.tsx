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
import ProjectPolicyInformation from "../../detail/project-policy-information";

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
    passedPath: "detail.project_info.passed",
    notesPath: "detail.project_info.rejection_notes",
  },
  {
    passedPath: "detail.food_beverage.passed",
    notesPath: "detail.food_beverage.rejection_notes",
  },
  {
    passedPath: "detail.energy.passed",
    notesPath: "detail.energy.rejection_notes",
  },
  {
    passedPath: "detail.other.attendees.passed",
    notesPath: "detail.other.attendees.rejection_notes",
  },
  {
    passedPath: "detail.other.internal_vehicles.passed",
    notesPath: "detail.other.internal_vehicles.rejection_notes",
  },
  {
    passedPath: "detail.other.overnight_on_campus.passed",
    notesPath: "detail.other.overnight_on_campus.rejection_notes",
  },
  {
    passedPath: "detail.other.overnight_off_campus.passed",
    notesPath: "detail.other.overnight_off_campus.rejection_notes",
  },
  {
    passedPath: "detail.other.souvenirs.passed",
    notesPath: "detail.other.souvenirs.rejection_notes",
  },
  {
    passedPath: "detail.other.waste.passed",
    notesPath: "detail.other.waste.rejection_notes",
  },
  {
    passedPath: "detail.other.transportations.passed",
    notesPath: "detail.other.transportations.rejection_notes",
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
    fields: projectInfoRejectionNotes,
    append: appendProjectInfoRejectionNote,
    remove: removeProjectInfoRejectionNote,
  } = useFieldArray<ReviewFormValues, "detail.project_info.rejection_notes">({
    control,
    name: "detail.project_info.rejection_notes",
  });

  const {
    fields: foodBeverageRejectionNotes,
    append: appendFoodBeverageRejectionNote,
    remove: removeFoodBeverageRejectionNote,
  } = useFieldArray<ReviewFormValues, "detail.food_beverage.rejection_notes">({
    control,
    name: "detail.food_beverage.rejection_notes",
  });

  const {
    fields: energyRejectionNotes,
    append: appendEnergyRejectionNote,
    remove: removeEnergyRejectionNote,
  } = useFieldArray<ReviewFormValues, "detail.energy.rejection_notes">({
    control,
    name: "detail.energy.rejection_notes",
  });

  const {
    fields: otherAttendeesRejectionNotes,
    append: appendOtherAttendeesRejectionNote,
    remove: removeOtherAttendeesRejectionNote,
  } = useFieldArray<ReviewFormValues, "detail.other.attendees.rejection_notes">(
    {
      control,
      name: "detail.other.attendees.rejection_notes",
    },
  );

  const {
    fields: otherInternalVehiclesRejectionNotes,
    append: appendOtherInternalVehiclesRejectionNote,
    remove: removeOtherInternalVehiclesRejectionNote,
  } = useFieldArray<
    ReviewFormValues,
    "detail.other.internal_vehicles.rejection_notes"
  >({
    control,
    name: "detail.other.internal_vehicles.rejection_notes",
  });

  const {
    fields: otherOvernightOnCampusRejectionNotes,
    append: appendOtherOvernightOnCampusRejectionNote,
    remove: removeOtherOvernightOnCampusRejectionNote,
  } = useFieldArray<
    ReviewFormValues,
    "detail.other.overnight_on_campus.rejection_notes"
  >({
    control,
    name: "detail.other.overnight_on_campus.rejection_notes",
  });

  const {
    fields: otherOvernightOffCampusRejectionNotes,
    append: appendOtherOvernightOffCampusRejectionNote,
    remove: removeOtherOvernightOffCampusRejectionNote,
  } = useFieldArray<
    ReviewFormValues,
    "detail.other.overnight_off_campus.rejection_notes"
  >({
    control,
    name: "detail.other.overnight_off_campus.rejection_notes",
  });

  const {
    fields: otherSouvenirsRejectionNotes,
    append: appendOtherSouvenirsRejectionNote,
    remove: removeOtherSouvenirsRejectionNote,
  } = useFieldArray<ReviewFormValues, "detail.other.souvenirs.rejection_notes">(
    {
      control,
      name: "detail.other.souvenirs.rejection_notes",
    },
  );

  const {
    fields: otherWasteRejectionNotes,
    append: appendOtherWasteRejectionNote,
    remove: removeOtherWasteRejectionNote,
  } = useFieldArray<ReviewFormValues, "detail.other.waste.rejection_notes">({
    control,
    name: "detail.other.waste.rejection_notes",
  });

  const {
    fields: otherTransportationsRejectionNotes,
    append: appendOtherTransportationsRejectionNote,
    remove: removeOtherTransportationsRejectionNote,
  } = useFieldArray<
    ReviewFormValues,
    "detail.other.transportations.rejection_notes"
  >({
    control,
    name: "detail.other.transportations.rejection_notes",
  });

  const passedValues = useWatch({
    control,
    name: REJECTION_NOTE_CONFIGS.map((config) => config.passedPath),
  }) as Array<string | boolean | undefined>;

  const hasTransportationData =
    (project.data?.project.carbon_input.other.transportations?.length ?? 0) > 0;

  useEffect(() => {
    if (!project.isSuccess || hasTransportationData) {
      return;
    }

    setValue("detail.other.transportations.passed", true, {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue("detail.other.transportations.rejection_notes", [], {
      shouldDirty: false,
      shouldValidate: false,
    });
    clearErrors([
      "detail.other.transportations.passed",
      "detail.other.transportations.rejection_notes",
    ]);
  }, [project.isSuccess, hasTransportationData, clearErrors, setValue]);

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
  const projectInfo = project.data?.project.project_info;

  const isReject = passedValues.includes(false);

  const carbonResult = project.data?.project.carbon_result;
  const carbonUsageAll = carbonResult?.total ?? 0;
  const carbonUsageScope1 = carbonResult?.scope1 ?? 0;
  const carbonUsageScope2 = carbonResult?.scope2 ?? 0;
  const carbonUsageScope3 = carbonResult?.scope3 ?? 0;

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
                project.data?.project?.carbon_input?.food_beverage?.activities
              }
              carbon={carbonUsageScope1}
            >
              {renderReviewSection(
                "detail.food_beverage.passed",
                errors.detail?.food_beverage?.passed?.message,
                foodBeverageRejectionNotes,
                appendFoodBeverageRejectionNote,
                removeFoodBeverageRejectionNote,
              )}
            </ProjectFirstScopeInformation>

            <ProjectSecondScopeInformation
              data={project.data?.project.carbon_input.energy}
              carbon={carbonUsageScope2}
            >
              {renderReviewSection(
                "detail.energy.passed",
                errors.detail?.energy?.passed?.message,
                energyRejectionNotes,
                appendEnergyRejectionNote,
                removeEnergyRejectionNote,
              )}
            </ProjectSecondScopeInformation>

            <ProjectThirdScopeInformation
              data={project.data?.project?.carbon_input?.other}
              projectId={project.data?.project.id}
              ownerId={project.data.project.owner_id}
              carbon={carbonUsageScope3}
              transportationChildren={
                hasTransportationData
                  ? renderReviewSection(
                      "detail.other.transportations.passed",
                      errors.detail?.other?.transportations?.passed?.message,
                      otherTransportationsRejectionNotes,
                      appendOtherTransportationsRejectionNote,
                      removeOtherTransportationsRejectionNote,
                    )
                  : null
              }
              attendeeChildren={renderReviewSection(
                "detail.other.attendees.passed",
                errors.detail?.other?.attendees?.passed?.message,
                otherAttendeesRejectionNotes,
                appendOtherAttendeesRejectionNote,
                removeOtherAttendeesRejectionNote,
              )}
              internalVehicleChildren={renderReviewSection(
                "detail.other.internal_vehicles.passed",
                errors.detail?.other?.internal_vehicles?.passed?.message,
                otherInternalVehiclesRejectionNotes,
                appendOtherInternalVehiclesRejectionNote,
                removeOtherInternalVehiclesRejectionNote,
              )}
              overnightChildren={renderReviewSection(
                "detail.other.overnight_on_campus.passed",
                errors.detail?.other?.overnight_on_campus?.passed?.message,
                otherOvernightOnCampusRejectionNotes,
                appendOtherOvernightOnCampusRejectionNote,
                removeOtherOvernightOnCampusRejectionNote,
              )}
              overnightOffCampusChildren={renderReviewSection(
                "detail.other.overnight_off_campus.passed",
                errors.detail?.other?.overnight_off_campus?.passed?.message,
                otherOvernightOffCampusRejectionNotes,
                appendOtherOvernightOffCampusRejectionNote,
                removeOtherOvernightOffCampusRejectionNote,
              )}
              souvenirChildren={renderReviewSection(
                "detail.other.souvenirs.passed",
                errors.detail?.other?.souvenirs?.passed?.message,
                otherSouvenirsRejectionNotes,
                appendOtherSouvenirsRejectionNote,
                removeOtherSouvenirsRejectionNote,
              )}
              wasteChildren={renderReviewSection(
                "detail.other.waste.passed",
                errors.detail?.other?.waste?.passed?.message,
                otherWasteRejectionNotes,
                appendOtherWasteRejectionNote,
                removeOtherWasteRejectionNote,
              )}
            >
              {projectInfo && (
                <ProjectPolicyInformation data={projectInfo}>
                  {renderReviewSection(
                    "detail.project_info.passed",
                    errors.detail?.project_info?.passed?.message,
                    projectInfoRejectionNotes,
                    appendProjectInfoRejectionNote,
                    removeProjectInfoRejectionNote,
                  )}
                </ProjectPolicyInformation>
              )}

              <ProjectCarbonDetail
                carbon={carbonUsageAll}
                all
                scopes={{
                  scope1: carbonUsageScope1,
                  scope2: carbonUsageScope2,
                  scope3: carbonUsageScope3,
                }}
              />
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
