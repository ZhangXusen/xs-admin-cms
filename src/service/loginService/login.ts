import type { LoginInfo } from "@/types";
import hyRequest from "..";

export function accountLogin(account: LoginInfo) {
  return hyRequest.post({
    url: "/login",
    data: account,
  });
}

export function getUserInfo(id: number) {
  return hyRequest.get({
    url: `/users/${id}`,
  });
}

export function getUserMenuByRoleID(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`,
  });
}
