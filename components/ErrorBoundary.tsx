
import * as React from 'react';
import { ShieldAlert, RefreshCcw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorInfo: string | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorInfo: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    (this as any).setState({ hasError: false, errorInfo: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      let friendlyMessage = "Se ha detectado una anomalía en el sistema.";
      let isFirebaseError = false;

      try {
        if (this.state.errorInfo) {
          const parsed = JSON.parse(this.state.errorInfo);
          if (parsed.error && parsed.operationType) {
            isFirebaseError = true;
            friendlyMessage = `Error de acceso a datos: ${parsed.error}`;
          }
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-zinc-900 border border-red-marvel/30 p-10 rounded-3xl shadow-2xl">
            <div className="w-20 h-20 bg-red-marvel/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-marvel/20">
              <ShieldAlert size={40} className="text-red-marvel" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4 uppercase italic tracking-tighter">
              Error de <span className="text-red-marvel">Protocolo</span>
            </h2>
            
            <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
              {friendlyMessage}
              {isFirebaseError && (
                <span className="block mt-2 text-[10px] text-zinc-600 font-mono">
                  Verifica tus permisos de agente o la conexión con la base de datos.
                </span>
              )}
            </p>

            <button
              onClick={this.handleReset}
              className="flex items-center justify-center gap-2 w-full bg-red-marvel text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-marvel/20 uppercase tracking-widest text-xs"
            >
              <RefreshCcw size={16} />
              Reiniciar Terminal
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

export default ErrorBoundary;
