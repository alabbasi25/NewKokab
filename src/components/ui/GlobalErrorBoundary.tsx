'use client';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8 text-center bg-black">
          <h1 className="text-xl font-bold text-white">عذراً، حدث خطأ ما في الكوكب.</h1>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-white/10 text-white rounded-lg"
          >
            إعادة تحميل
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
