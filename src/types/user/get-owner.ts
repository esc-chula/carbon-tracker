export type TOwner = {
  id: string;
  email: string;
  fullname: string;
  line_id: string;
  nickname: string;
  phone_number: string;
  student_id: string;
  major: string;
  is_admin: boolean;
};

export type TGetOwnerResponse = {
  $schema?: string;
  owner: TOwner;
};
