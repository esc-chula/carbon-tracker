type Activity = {
  activity_type?: string;
  amount?: number;
  unit?: string;
};

type Energy = {
  type?: string;

  building?: string;
  room?: string;
  equipment?: Array<string>;
  startDate?: string;
  endDate?: string;

  quantity?: number;
  unit?: string;
};

type Participant = {
  date: string | undefined;
  participant_amount: number | undefined;
};
type Accommodation = {
  date?: string | undefined;
  participant_amount?: number | undefined;
};

type Gift = {
  gift_type?: string;
  amount?: number;
  unit?: string;
};

type Waste = {
  waste_type?: string;
  amount?: number;
  unit?: string;
};

type ProjectFormValues = {
  projectCode: string;
  projectName: string;
  underProject: string;
  field?: string;
  clubName?: string;
  otherUnderProject?: string;
  fullName: string;
  nickname: string;
  year: string;
  department: string;
  tel: string;
  activities?: Array<Activity>;
  energies?: Array<Energy>;
  participant: Array<Participant>;
  accommodation?: Array<Accommodation>;
  gift?: Array<Gift>;
  waste?: Array<Waste>;
};

export type {
  Accommodation,
  Activity,
  Energy,
  Gift,
  Participant,
  ProjectFormValues,
  Waste,
};
