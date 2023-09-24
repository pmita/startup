import firebase from "firebase";

export type AuthReducerInitialState = {
  user: firebase.User | null;
  authStateHasChanged: boolean;
}

export enum AuthActionTypes {
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
  AUTH_HAS_CHANGED_SUCCESS = 'AUTH_HAS_CHANGED_SUCCESS',
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

export type AuthReducerActionsType = 
  | SIGN_IN_SUCCESS_ACTION
  | SIGN_UP_SUCCESS_ACTION
  | AUTH_HAS_CHANGED_SUCCESS_ACTION
  

export type AuthReducerState = {
  user: firebase.User | null,
  authStateHasChanged: boolean,
  dispatch: React.Dispatch<any>
}