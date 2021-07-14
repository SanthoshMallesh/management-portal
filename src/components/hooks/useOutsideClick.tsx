import { RefObject, useEffect } from 'react';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useOutsideClick(ref: RefObject<any>, callback: () => void): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
