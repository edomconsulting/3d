import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log a more informative and less alarming message to the console.
    console.warn(
        "CardioCare 3D Viewer: A 3D model loading error was caught.",
        "\n\nThis is expected if you haven't added the .glb model files to the `/public/models` directory.",
        "\nThe application will display a fallback placeholder instead of crashing.",
        "\n\nTo fix this, please download the GLTF pack and place the files in the correct folder.",
        "\nOriginal error:", error, errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;