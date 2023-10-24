import { ReactNode } from 'react';

export function Modal({ children }: { children: ReactNode }) {
  return (
    <div
      id="modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-4/6 overflow-x-hidden overflow-y-auto bg-white max-w-2xl border rounded-lg shadow dark:bg-gray-700"
    >
      {children}
    </div>
  );
}
