"use client";

import {
  AndroidLogo,
  AppleLogo,
  WindowsLogo
} from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function PwaInstaller() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);
  const platformInfo = useMemo(() => {
    if (typeof navigator === "undefined") {
      return { label: "Seu dispositivo", icon: null };
    }

    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.includes("android");
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isWindows = ua.includes("windows");
    const isMac = ua.includes("mac os") && !isIOS;

    if (isAndroid) {
      return { label: "Android", icon: AndroidLogo };
    }
    if (isIOS) {
      return { label: "iOS", icon: AppleLogo };
    }
    if (isWindows) {
      return { label: "Windows", icon: WindowsLogo };
    }
    if (isMac) {
      return { label: "macOS", icon: AppleLogo };
    }

    return { label: "Seu dispositivo", icon: null };
  }, []);

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

  const PlatformIcon = platformInfo.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] max-w-sm">
      <div
        role="dialog"
        aria-modal="true"
        className="rounded-2xl border border-base-200 bg-base-100 p-5 shadow-xl"
      >
        <h3 className="text-lg font-bold">Instalar VamoAli</h3>
        <div className="mt-2 flex items-center justify-between gap-3 text-sm text-base-content/70">
          <span>
            Tenha acesso rápido e uma experiência mais fluida instalando o app no seu
            dispositivo.
          </span>
          <span className="flex items-center gap-2 rounded-full bg-base-200 px-3 py-1 text-xs font-semibold text-base-content">
            {platformInfo.label}
            {PlatformIcon ? <PlatformIcon size={16} weight="bold" /> : null}
          </span>
        </div>
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
    </div>
  );
}
