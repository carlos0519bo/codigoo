export interface RegisterResponse {
  email:        string;
  name:         string;
  phone:        string;
  nationality:  string;
  titular:      boolean;
  adult:        boolean;
  updated_at:   Date;
  created_at:   Date;
  id:           number;
  access_token: string;
}

export interface FormRegisterData {
  email:       string;
  name:        string;
  phone:       string;
  nationality: string;
  adult:       boolean;
  titular:     boolean;
}

export interface SendSMSData {
  phone:              string;
  phone_prefix:       string;
  verification_code?: string;
}

export interface FormValues {
  name:         string;
  email:        string;
  nationality:  string;
  phone:        string;
  adult:        boolean;
  titular:      boolean;
  terms:        boolean;
  phone_prefix: string;
}

export interface UserResponse {
  id:                number;
  name:              string;
  email:             string;
  email_verified_at: null;
  phone:             string;
  nationality:       string;
  titular:           number;
  adult:             number;
  created_at:        Date;
  updated_at:        Date;
  is_admin:          number;
}
