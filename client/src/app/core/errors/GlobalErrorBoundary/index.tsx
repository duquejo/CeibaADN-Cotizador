import * as React from 'react';
import { ErrorInfo } from 'react';

export class GlobalErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to metrics
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Algo salió mal.</h1>;
    }

    return this.props.children;
  }
}
