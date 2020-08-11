import React, { ErrorInfo, PureComponent, ReactNode } from 'react'
import { GraphQLError } from '@types'
import './ErrorBoundary.scss'

type UnionError = Error & { graphQLErrors?: GraphQLError[] }

class ErrorWithGraphQLErrors extends Error {
  graphQLErrors?: GraphQLError[]

  constructor(error: UnionError) {
    const { message, stack, graphQLErrors } = error
    super(message)

    this.message = message
    this.stack = stack
    this.graphQLErrors = graphQLErrors
  }
}

class LoadContentError extends Error {
  constructor(error: string) {
    super(error)
    this.name = 'LoadContentError'
  }
}

class LoadQueryContentError extends ErrorWithGraphQLErrors {
  constructor(error: UnionError) {
    super(error)
    this.name = 'LoadQueryContentError'
  }
}

class LoadMutationContentError extends ErrorWithGraphQLErrors {
  constructor(error: UnionError) {
    super(error)
    this.name = 'LoadMutationContentError'
  }
}

interface ErrorBoundaryProps {
  title?: string
  description?: string
  hint?: string
}

interface ErrorBoundaryState {
  error: UnionError | null
  errorInfo: string
  hasError: boolean
}

class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
    errorInfo: '',
    hasError: false
  }

  static getDerivedStateFromError(error: UnionError): Partial<ErrorBoundaryState> {
    return {
      error,
      hasError: true
    }
  }

  componentDidCatch(error: UnionError, errorInfo: ErrorInfo): void {
    this.setState({
      errorInfo: errorInfo.componentStack
    })
  }

  renderErrorDefault = (): JSX.Element => {
    const { error, errorInfo } = this.state

    return (
      <>
        <h2 className={'p__primary_sm error-name'}>{error?.name}</h2>
        <h3 className={'p__primary_sm error-message'}>{error?.message}</h3>
        <p className={'p__primary_sm error-info'}>{errorInfo}</p>
      </>
    )
  }

  renderErrorProps = (): JSX.Element => {
    const { title, description, hint } = this.props

    return (
      <>
        {title && <h2 className="error-boundary-title">Ooopps... {title}</h2>}
        {description && <h3 className="error-boundary-description">{description}</h3>}
        {hint && <p className="p__secondary-sm error-boundary-hint">{hint}</p>}
      </>
    )
  }

  renderGraphQLErrors = (graphQLErrors?: GraphQLError[]): JSX.Element | null => {
    if (!graphQLErrors || !graphQLErrors.length) return null

    return (
      <div className="error-boundary-graphQL">
        <h2>GraphQl errors</h2>
        <pre>
          {graphQLErrors.map((graphQLError, index) => {
            const { locations, message } = graphQLError

            return <div key={index}>{message}</div>
          })}
        </pre>
      </div>
    )
  }

  render(): ReactNode {
    const { error, hasError } = this.state

    if (hasError) {
      return (
        <section className="error-boundary">
          {this.renderErrorProps()}
          {this.renderErrorDefault()}
          {this.renderGraphQLErrors(error?.graphQLErrors)}
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
export { ErrorWithGraphQLErrors, LoadContentError, LoadQueryContentError, LoadMutationContentError }
