import { Component } from 'react';

export default class RootErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('RootErrorBoundary:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ fontFamily: 'system-ui', padding: '2rem', color: '#725C3F' }}>
          <h2>Error al cargar la aplicación</h2>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#fff', padding: '1rem' }}>
            {this.state.error?.message ?? String(this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
