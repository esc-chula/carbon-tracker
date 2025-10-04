"use client";

import ContainerWithOutlined from "@/components/container/container-with-outlined";
import {
  TableCustom,
  type DisplayColumn,
} from "@/components/table/table-custom";
import CSVUploadField from "@/components/hook-form/rhf-upload";
import { showError } from "@/components/toast/toast";
import { transFormDate } from "@/helper/formatter/date-formatter";
import { fetchGetProjectTransportationsCsv } from "@/services/project/query/project-query";
import type { TGetProjectResponse } from "@/types/project/get-project";
import type {
  Scope3Attendee,
  Scope3Overnight,
  Scope3Souvenir,
  Scope3Waste,
} from "@/types/project/project";
import { Stack, Typography } from "@mui/material";
import { useCallback, useMemo, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useForm } from "react-hook-form";
import { canModifyProject } from "@/helper/project-permissions";
import { ownersQueryKeys } from "@/services/user/query/user-query";

type TProjectThirdScopeInformationProps = {
  data: TGetProjectResponse["project"]["carbon_detail"]["scope3"] | undefined;
  projectId?: string;
  ownerId: string;
  attendeeChildren?: ReactNode;
  overnightChildren?: ReactNode;
  souvenirChildren?: ReactNode;
  wasteChildren?: ReactNode;
  children?: ReactNode;
};

type Scope3CsvFormValues = {
  transportations_csv_file: File | null;
};

function ProjectThirdScopeInformation({
  data,
  projectId,
  ownerId,
  attendeeChildren,
  overnightChildren,
  souvenirChildren,
  wasteChildren,
  children,
}: TProjectThirdScopeInformationProps) {
  // --------------------------- API ---------------------------

  const hasTransportationData = useMemo(() => {
    return (data?.transportations?.length ?? 0) > 0;
  }, [data?.transportations?.length]);

  const owner = useQuery({ ...ownersQueryKeys.meOptions() });
  const currentOwner = owner.data?.owner ?? null;
  const canManage = canModifyProject(currentOwner, ownerId);

  const shouldFetchCsv =
    hasTransportationData && Boolean(projectId) && canManage;

  const transportationsCsvQuery = useQuery<File | null>({
    queryKey: ["project-transportations-csv", projectId ?? ""],
    enabled: shouldFetchCsv,
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!projectId) return null;

      try {
        const { blob, filename, contentType } =
          await fetchGetProjectTransportationsCsv({ id: projectId });

        return new File([blob], filename, {
          type: contentType || blob.type || "text/csv",
          lastModified: Date.now(),
        });
      } catch (error) {
        if (error instanceof HTTPError && error.response.status === 404) {
          return null;
        }

        console.error(error);
        return null;
      }
    },
  });

  // --------------------------- Form ---------------------------

  const csvFieldValues = useMemo(() => {
    if (shouldFetchCsv) {
      if (transportationsCsvQuery.data !== undefined) {
        return { transportations_csv_file: transportationsCsvQuery.data };
      }
      return undefined;
    }

    return { transportations_csv_file: null };
  }, [shouldFetchCsv, transportationsCsvQuery.data]);

  const { control } = useForm<Scope3CsvFormValues>({
    defaultValues: { transportations_csv_file: null },
    values: csvFieldValues,
  });

  const canDownloadCsv =
    hasTransportationData && Boolean(projectId) && canManage;

  console.log(currentOwner, ownerId);
  // --------------------------- Function ---------------------------

  const handleDownloadCsv = useCallback(async () => {
    if (!projectId) return;

    try {
      const { blob, filename } = await fetchGetProjectTransportationsCsv({
        id: projectId,
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      showError("ไม่สามารถดาวน์โหลดไฟล์ CSV ได้");
    }
  }, [projectId]);

  // --------------------------- Values ---------------------------

  const attendeeColumns: DisplayColumn<Scope3Attendee>[] = [
    { id: "date", label: "วันที่", width: 250 },
    { id: "value", label: "จำนวนคน", width: 250 },
  ];

  const attendeeRows: Scope3Attendee[] =
    data?.attendee?.map((attendee) => ({
      date: transFormDate(attendee.date),
      value: attendee.value,
    })) ?? [];

  const overnightColumns: DisplayColumn<Scope3Overnight>[] = [
    { id: "date", label: "วันที่", width: 250 },
    { id: "value", label: "จำนวนคน", width: 250 },
  ];

  const overnightRows: Scope3Overnight[] =
    data?.overnight?.map((overnight) => ({
      date: transFormDate(overnight.date),
      value: overnight.value,
    })) ?? [];

  const souvenirColumns: DisplayColumn<Scope3Souvenir>[] = [
    { id: "type", label: "ประเภทเอกสาร", width: 410 },
    { id: "value", label: "ปริมาณ", width: 220 },
    { id: "unit", label: "หน่วย", width: 250 },
  ];

  const souvenirRows: Scope3Souvenir[] =
    data?.souvenir?.map((souvenir) => ({
      type: souvenir.type,
      unit: souvenir.unit === "kg" ? "กิโลกรัม" : souvenir.unit,
      value: souvenir.value,
    })) ?? [];

  const wasteColumns: DisplayColumn<Scope3Waste>[] = [
    { id: "type", label: "ประเภทของเสีย", width: 410 },
    { id: "value", label: "ปริมาณ", width: 220 },
    { id: "unit", label: "หน่วย", width: 250 },
  ];

  const wasteRows: Scope3Waste[] =
    data?.waste?.map((waste) => ({
      type: waste.type,
      unit: waste.unit === "kg" ? "กิโลกรัม" : waste.unit,
      value: waste.value,
    })) ?? [];

  return (
    <ContainerWithOutlined>
      <Stack>
        <Typography variant="h5" fontSize={16}>
          Scope 3 : อื่นๆ
        </Typography>
        <Typography variant="caption" color="text.secondary">
          การเดินทางของผู้เข้าร่วมและ staff
        </Typography>
      </Stack>

      {canDownloadCsv && (
        <CSVUploadField
          name="transportations_csv_file"
          control={control}
          disabled
          onDownload={handleDownloadCsv}
        />
      )}

      <ContainerWithOutlined borderRadius={2}>
        <Typography variant="h5" fontSize={14}>
          จำนวนผู้เข้าร่วมรวมกับ staff ตลอดทั้งโครงการ
          <Typography component="span" color="#FF3333">
            *
          </Typography>
        </Typography>

        <TableCustom
          rows={attendeeRows}
          columns={attendeeColumns}
          showIndex
          indexHeader="รายการที่"
        />

        {attendeeChildren}
      </ContainerWithOutlined>

      <ContainerWithOutlined borderRadius={2}>
        <Typography variant="h5" fontSize={14}>
          การพักแรมของผู้เข้าร่วมและ staff ตลอดทั้งโครงการ
        </Typography>

        <TableCustom
          rows={overnightRows}
          columns={overnightColumns}
          showIndex
          indexHeader="รายการที่"
        />

        {overnightChildren}
      </ContainerWithOutlined>

      <ContainerWithOutlined borderRadius={2}>
        <Typography variant="h5" fontSize={14}>
          ของแจกผู้เข้าร่วมและ staff
        </Typography>

        <TableCustom
          rows={souvenirRows}
          columns={souvenirColumns}
          showIndex
          indexHeader="รายการที่"
        />

        {souvenirChildren}
      </ContainerWithOutlined>

      <ContainerWithOutlined borderRadius={2}>
        <Typography variant="h5" fontSize={14}>
          ของเสียหลังการจัดงาน
        </Typography>

        <TableCustom
          rows={wasteRows}
          columns={wasteColumns}
          showIndex
          indexHeader="รายการที่"
        />

        {wasteChildren}
      </ContainerWithOutlined>

      {children}
    </ContainerWithOutlined>
  );
}

export default ProjectThirdScopeInformation;
