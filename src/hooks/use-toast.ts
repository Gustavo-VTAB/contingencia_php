import * as React from "react";
import type { ToastProps } from "../components/ui/toast";

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 3000;

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

const actionTypes = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  DISMISS: "DISMISS",
} as const;

type Action =
  | { type: typeof actionTypes.ADD; toast: ToasterToast }
  | { type: typeof actionTypes.REMOVE; id: string }
  | { type: typeof actionTypes.DISMISS; id: string };

interface State {
  toasts: ToasterToast[];
}

let listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };
let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((l) => l(memoryState));
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD":
      return {
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "DISMISS":
      return {
        toasts: state.toasts.map((t) =>
          t.id === action.id ? { ...t, open: false } : t
        ),
      };

    case "REMOVE":
      return {
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };

    default:
      return state;
  }
};

export function toast(props: Omit<ToasterToast, "id">) {
  const id = genId();

  const toastObj: ToasterToast = {
    id,
    open: true,
    onOpenChange: (open: boolean) => {
      if (!open) dismiss(id);
    },
    ...props,
  };

  dispatch({ type: "ADD", toast: toastObj });

  // Remove após delay
  setTimeout(() => {
    dispatch({ type: "DISMISS", id });
    setTimeout(() => dispatch({ type: "REMOVE", id }), 300);
  }, TOAST_REMOVE_DELAY);

  return {
    id,
    dismiss: () => dismiss(id),
  };
}

export function dismiss(id: string) {
  dispatch({ type: "DISMISS", id });
  setTimeout(() => dispatch({ type: "REMOVE", id }), 300);
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);

    return () => {
      listeners = listeners.filter((l) => l !== setState);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss,
  };
}
