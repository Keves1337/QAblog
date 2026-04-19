import { Component, type ReactNode } from "react";

/** Check if WebGL is available in this browser context */
export function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { caught: boolean }

/** Error boundary so a WebGL crash doesn't take down the page */
export class WebGLGuard extends Component<Props, State> {
  state: State = { caught: false };

  static getDerivedStateFromError(): State {
    return { caught: true };
  }

  render() {
    if (this.state.caught) return this.props.fallback ?? null;
    return this.props.children;
  }
}
