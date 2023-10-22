import firebase from "firebase";

export type AuthReducerInitialState = {
  user: firebase.User | null;
  authStateHasChanged: boolean;
  userProgress: any;
}

export type userProgressType = {
  [key: string]: boolean
}

export enum AuthActionTypes {
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
  SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS',
  AUTH_HAS_CHANGED_SUCCESS = 'AUTH_HAS_CHANGED_SUCCESS',
  FETCH_USER_PROGRESS="FETCH_USER_PROGRESS"
}

export type AUTH_HAS_CHANGED_SUCCESS_ACTION = {
  type: AuthActionTypes.AUTH_HAS_CHANGED_SUCCESS;
  payload: firebase.User | null;
}

export type SIGN_IN_SUCCESS_ACTION = {
  type: AuthActionTypes.SIGN_IN_SUCCESS;
  payload: firebase.User | null;
}

export type SIGN_UP_SUCCESS_ACTION = {
  type: AuthActionTypes.SIGN_UP_SUCCESS;
  payload: firebase.User | null;
}

export type SIGN_OUT_SUCCESS_ACTION = {
  type: AuthActionTypes.SIGN_OUT_SUCCESS;
}

export type FETCH_USER_PROGRESS_ACTION = {
  type: AuthActionTypes.FETCH_USER_PROGRESS;
  payload: any;
}

export type AuthReducerActionsType = 
  | SIGN_IN_SUCCESS_ACTION
  | SIGN_UP_SUCCESS_ACTION
  | SIGN_OUT_SUCCESS_ACTION
  | AUTH_HAS_CHANGED_SUCCESS_ACTION
  | FETCH_USER_PROGRESS_ACTION
  

export type AuthReducerState = {
  user: firebase.User | null,
  authStateHasChanged: boolean,
  userProgress: userProgressType
  dispatch: React.Dispatch<any>
}