import React, { Component, Fragment, PropsWithChildren, ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<PropsWithChildren<unknown>, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError(err: Error): { hasError: boolean } {
    console.log('Error Boundary', err);
    return { hasError: true };
  }

  onHomePageClick = (): void => {
    window.location.href = '/';
  };

  render(): ReactElement {
    if (this.state.hasError) {
      return (
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="d-flex flex-column text-center">
            <h1 className="mb-4" style={{ fontSize: 90 }}>
              OOPS
            </h1>
            <h4 className="m-0">Something went wrong here.</h4>
            <p className="m-0">You cam go back and try again or use our help center</p>
            <p className="mt-4">
              <Link to="/" onClick={this.onHomePageClick} className="btn btn-outline-dark">
                Contact Us
              </Link>
              <Link to="/" onClick={(): void => location.reload()} className="btn btn-outline-dark">
                Try again
              </Link>
            </p>
          </div>
        </div>
      );
    }

    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default ErrorBoundary;
