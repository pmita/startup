import firebase from "firebase";

export type AuthReducerInitialState = {
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
  AUTH_HAS_CHANGED_PENDING = 'AUTH_HAS_CHANGED_PENDING',
  AUTH_HAS_CHANGED_SUCCESS = 'AUTH_HAS_CHANGED_SUCCESS',
  AUTH_HAS_CHANGED_FAILED = 'AUTH_HAS_CHANGED_FAILED',
  AUTH_HAS_CHANGED_RESET = 'AUTH_HAS_CHANGED_RESET',
}

export type AUTH_HAS_CHANGED_PENDING_ACTION = {
  type: AuthActionTypes.AUTH_HAS_CHANGED_PENDING;
}

export type AUTH_HAS_CHANGED_RESET_ACTION = {
  type: AuthActionTypes.AUTH_HAS_CHANGED_RESET;
}
export type AUTH_HAS_CHANGED_SUCCESS_ACTION = {
  type: AuthActionTypes.AUTH_HAS_CHANGED_SUCCESS;
  payload: firebase.User | null;
}
export type AUTH_HAS_CHANGED_FAILED_ACTION = {
  type: AuthActionTypes.AUTH_HAS_CHANGED_FAILED;
  payload: string | Error;
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

export type AuthReducerActionsType = 
  | SIGN_IN_SUCCESS_ACTION
  | SIGN_IN_FAILED_ACTION
  | SIGN_IN_PENDING_ACTION
  | SIGN_IN_RESET_ACTION
  | SIGN_UP_SUCCESS_ACTION
  | SIGN_UP_FAILED_ACTION
  | SIGN_UP_PENDING_ACTION
  | SIGN_UP_RESET_ACTION
  | AUTH_HAS_CHANGED_RESET_ACTION
  | AUTH_HAS_CHANGED_PENDING_ACTION
  | AUTH_HAS_CHANGED_SUCCESS_ACTION
  | AUTH_HAS_CHANGED_FAILED_ACTION;
  

export type AuthReducerState = {
  user: firebase.User | null,
  authStateHasChanged: boolean,
  dispatch: React.Dispatch<any>
}