export interface LoginInfo {
  name: string;
  password: string;
}
export interface UserInfo {
  role: {
    id: number;
  };
}

export interface LoginState {
  token: string;
  userInfo: any;
  userMenu: any;
  permissions: any;
}
