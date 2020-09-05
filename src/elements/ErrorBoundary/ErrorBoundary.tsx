import React, { PureComponent } from 'react'
import './ErrorBoundary.scss'

class ErrorBoundary extends PureComponent {
  static getDerivedStateFromError(error: Error) {
    console.log('error', error)
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('error', error)
    console.log('errorInfo', errorInfo)
  }

  render() {
    return this.props.children
  }
}

export default ErrorBoundary
