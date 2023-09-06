import firebase from "firebase";

export type AuthContextState = {
  user: firebase.User | null;
  isLoading: boolean;
  error: string | null | Error;
  authStateHasChanged: boolean;
}

export enum AuthActionTypes {
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SING_IN_FAILED = 'SING_IN_FAILED',
  SIGN_IN_PENDING = 'SIGN_IN_PENDING',
  SING_IN_RESET = 'SIGN_IN_RESET',
  SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILED = 'SIGN_UP_FAILED',
  SIGN_UP_PENDING = 'SIGN_UP_PENDING',
  SIGN_UP_RESET = 'SIGN_UP_RESET',
}

export type SIGN_IN_SUCCESS_ACTION = {
  type: AuthActionTypes.SIGN_IN_SUCCESS;
  payload: firebase.User | null;
}

export type SIGN_IN_FAILED_ACTION = {
  type: AuthActionTypes.SING_IN_FAILED;
  payload: string | Error;
}

export type SIGN_IN_PENDING_ACTION = {
  type: AuthActionTypes.SIGN_IN_PENDING;
}

export type SIGN_IN_RESET_ACTION = {
  type: AuthActionTypes.SING_IN_RESET;
}

export type SIGN_UP_SUCCESS_ACTION = {
  type: AuthActionTypes.SIGN_UP_SUCCESS;
  payload: firebase.User | null;
}

export type SIGN_UP_FAILED_ACTION = {
  type: AuthActionTypes.SIGN_UP_FAILED;
  payload: string | Error;
}

export type SIGN_UP_PENDING_ACTION = {
  type: AuthActionTypes.SIGN_UP_PENDING;
}

export type SIGN_UP_RESET_ACTION = {
  type: AuthActionTypes.SIGN_UP_RESET;
}

export type AuthContextAction = 
  | SIGN_IN_SUCCESS_ACTION
  | SIGN_IN_FAILED_ACTION
  | SIGN_IN_PENDING_ACTION
  | SIGN_IN_RESET_ACTION
  | SIGN_UP_SUCCESS_ACTION
  | SIGN_UP_FAILED_ACTION
  | SIGN_UP_PENDING_ACTION
  | SIGN_UP_RESET_ACTION;

export type AuthContextType = {
  user: firebase.User | null,
  authStateHasChanged: boolean,
  dispatch: React.Dispatch<any>
}