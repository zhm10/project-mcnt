import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Обновите состояние, чтобы следующий рендеринг показал запасной UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Вы можете также отправить отчеты об ошибках в серверные журналы.
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Можно отрендерить любой запасной UI
      return <h1>Что-то пошло не так.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
