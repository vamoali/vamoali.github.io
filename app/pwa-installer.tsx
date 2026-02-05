"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function PwaInstaller() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    if (!("serviceWorker" in navigator)) {
      return;
    }

    const onLoad = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
      setOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!promptEvent) {
      setOpen(false);
      return;
    }

    await promptEvent.prompt();
    await promptEvent.userChoice;
    setPromptEvent(null);
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <dialog className="modal" open>
      <div className="modal-box">
        <h3 className="text-lg font-bold">Instalar VamoAli</h3>
        <p className="mt-2 text-sm text-base-content/70">
          Tenha acesso rápido e uma experiência mais fluida instalando o app no seu
          dispositivo.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => setOpen(false)}
          >
            Agora não
          </button>
          <button className="btn btn-primary text-white" type="button" onClick={handleInstall}>
            Instalar
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={() => setOpen(false)}>
          close
        </button>
      </form>
    </dialog>
  );
}
