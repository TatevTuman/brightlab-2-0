import React, { memo, ErrorInfo, Component } from 'react'
import styles from './ErrorBoundary.module.scss'

export interface ErrorBoundaryProps {}

export interface ErrorBoundaryState {
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
    errorInfo: null
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    })
  }

  render() {
    const { error, errorInfo } = this.state

    if (errorInfo) {
      // Error path
      return (
        <div className={styles.errorBoundary}>
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

export default memo(ErrorBoundary)
