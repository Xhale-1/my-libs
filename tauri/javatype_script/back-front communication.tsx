import { useState, useEffect } from "react"
import { listen, UnlistenFn } from '@tauri-apps/api/event';


//функция для прослушивания бэкенда

const listen_backend = <T,>(
    eventName: string,
    callback: (payload: T) => void,
    dependencies: any[] = []
  ) => {
    useEffect(() => {
      let unlisten: UnlistenFn | undefined;

      listen<T>(eventName, (event) => {
        callback(event.payload);
      }).then((unlistenFn) => {
        unlisten = unlistenFn;
      });
      return () => {
        unlisten?.();
      };
    }, dependencies);
  };

  //listen_backend<number>('dev', (payload) => {
  //  setDevcount(payload.toString());
  //});