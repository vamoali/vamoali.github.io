"use client";

import {
  CalendarBlank,
  ChatsCircle,
  House,
  Info,
  MagnifyingGlass,
  MapPin,
  ShieldCheck,
  SignOut,
  Star,
  SuitcaseRolling,
  FileText,
  UserCircle,
  Users
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const slides = [
    {
      city: "Machu Picchu",
      src: "/images/machu-picchu.jpg",
      credit: "Machu Picchu, Peru",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Machu_Picchu,_Peru.jpg",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/"
    },
    {
      city: "Cusco",
      src: "/images/cusco.jpg",
      credit: "City of Cusco, Peru",
      creditUrl: "https://commons.wikimedia.org/wiki/File:City_of_Cusco,_Peru.jpg",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/"
    },
    {
      city: "Santiago",
      src: "/images/santiago.jpg",
      credit: "Skyline of Santiago, Chile",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Skyline_of_Santiago,_Chile.jpg",
      license: "CC0 1.0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    {
      city: "Rio de Janeiro",
      src: "/images/rio.jpg",
      credit: "Rio de Janeiro panorama",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Rio-de-Janeiro-panorama.jpg",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
    }
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [pets, setPets] = useState(0);
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "help" | null>(null);
  const [activeSearchPanel, setActiveSearchPanel] = useState<"when" | "guests" | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const searchPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchPanelRef.current) return;
      if (!searchPanelRef.current.contains(event.target as Node)) {
        setActiveSearchPanel(null);
      }
    };

    if (activeSearchPanel) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeSearchPanel]);

  const totalGuests = adults + children + babies;

  const formatDate = (value: Date | null) =>
    value
      ? value.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
      : "";

  const handleDatePick = (date: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }

    if (checkIn && !checkOut) {
      if (date >= checkIn) {
        setCheckOut(date);
        setActiveSearchPanel(null);
      } else {
        setCheckIn(date);
        setCheckOut(null);
      }
    }
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isInRange = (date: Date) =>
    checkIn && checkOut ? date > checkIn && date < checkOut : false;

  const renderMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = (firstDay.getDay() + 6) % 7;
    const days = [];
    for (let i = 0; i < startWeekday; i += 1) {
      days.push(null);
    }
    for (let d = 1; d <= lastDay.getDate(); d += 1) {
      days.push(new Date(year, month, d));
    }
    return days;
  };

  return (
    <main className="min-h-screen bg-base-100">
      <section className="relative z-40 min-h-[360px] bg-cover bg-center md:min-h-[420px]">
        {slides.map((slide, index) => (
          <div
            key={slide.city}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${slide.src}')` }}
            aria-hidden={index !== activeSlide}
          />
        ))}
        <div className="absolute inset-0 bg-black/15" aria-hidden="true" />
        <div className="fixed left-0 right-0 top-0 z-20 bg-white/95 shadow-sm backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
            <Link href="/" className="flex h-8 items-center gap-2 md:h-10">
              <img
                src="/images/logo.svg"
                alt="VamoAli"
                className="h-9 w-auto max-h-full md:h-11"
              />
            </Link>
            <nav className="flex items-center gap-1 text-black">
              <button
                className="btn btn-ghost btn-circle tooltip tooltip-bottom bg-transparent hover:bg-black/5"
                data-tip="Home"
                aria-label="Home"
              >
                <House size={20} weight="bold" />
              </button>
              <button
                className="btn btn-ghost btn-circle tooltip tooltip-bottom bg-transparent hover:bg-black/5"
                data-tip="Minha conta"
                aria-label="Minha conta"
              >
                <UserCircle size={20} weight="bold" />
              </button>
              <button
                className="btn btn-ghost btn-circle tooltip tooltip-bottom bg-transparent hover:bg-black/5"
                data-tip="Minha viagem"
                aria-label="Minha viagem"
              >
                <SuitcaseRolling size={20} weight="bold" />
              </button>
              <button
                className="btn btn-ghost btn-circle tooltip tooltip-bottom bg-transparent hover:bg-black/5"
                data-tip="Sair"
                aria-label="Sair"
              >
                <SignOut size={20} weight="bold" />
              </button>
            </nav>
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 pb-0 pt-24 min-h-[360px] md:min-h-[420px]">
          <header className="flex flex-col gap-20">
            <div className="flex items-center justify-between gap-6">
              <div aria-hidden="true" />
            </div>
            <div className="mt-10 flex flex-col gap-2">
              <h1 className="text-center text-3xl font-bold text-white drop-shadow-sm md:text-5xl">
                Encontre experiências {" "}
                <span className="text-rotate align-baseline">
                  <span>
                    <span className="bg-teal-400 text-teal-800 px-2">impressionantes</span>
                    <span className="bg-red-400 text-red-800 px-2">acessíveis</span>
                    <span className="bg-blue-400 text-blue-800 px-2">inesquecíveis</span>
                  </span>
                </span>
              </h1>
            </div>
          </header>

          <div className="relative -mb-24" ref={searchPanelRef}>
            <form className="flex flex-col gap-4">
              <div className="flex w-full items-stretch overflow-hidden rounded-full bg-base-100 shadow-lg">
                <div className="flex flex-1 items-center gap-3 px-5 py-3">
                  <div className="text-primary">
                    <MapPin size={22} weight="bold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-base-content">Para onde?</p>
                    <p className="text-base text-base-content/70">São Paulo - Mundo</p>
                  </div>
                </div>
                <div className="hidden h-12 w-px bg-base-200 md:block" />
                <button
                  type="button"
                  className="flex flex-1 items-center gap-3 px-5 py-3 text-left"
                  onClick={() =>
                    setActiveSearchPanel(activeSearchPanel === "when" ? null : "when")
                  }
                >
                  <div className="text-primary">
                    <CalendarBlank size={22} weight="bold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-base-content">Quando?</p>
                    <p className="text-base text-base-content/70">
                      {checkIn && checkOut
                        ? `${formatDate(checkIn)} - ${formatDate(checkOut)}`
                        : "Selecione as datas"}
                    </p>
                  </div>
                </button>
                <div className="hidden h-12 w-px bg-base-200 md:block" />
                <button
                  type="button"
                  className="flex flex-1 items-center gap-3 px-5 py-3 text-left"
                  onClick={() =>
                    setActiveSearchPanel(activeSearchPanel === "guests" ? null : "guests")
                  }
                >
                  <div className="text-primary">
                    <Users size={22} weight="bold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-base-content">Viajantes</p>
                    <p className="text-base text-base-content/70">
                      {totalGuests} {totalGuests === 1 ? "Viajante" : "Viajantes"}
                    </p>
                  </div>
                </button>
                <div className="flex items-center px-3">
                  <button className="btn btn-primary rounded-full px-6 py-2 text-sm text-white">
                    <MagnifyingGlass size={18} weight="bold" />
                    Procurar
                  </button>
                </div>
              </div>
            </form>

            {activeSearchPanel === "when" ? (
              <div className="absolute left-1/2 top-full z-[100] mt-3 w-full max-w-4xl -translate-x-1/2 rounded-3xl bg-base-100 p-5 shadow-2xl">
                <div className="mt-3 flex items-center justify-between">
                  <button className="btn btn-ghost btn-circle btn-sm">◀</button>
                  <p className="text-sm font-semibold text-base-content">fevereiro 2026</p>
                  <button className="btn btn-ghost btn-circle btn-sm">▶</button>
                </div>
                <div className="mt-3 grid gap-6 md:grid-cols-2">
                  {[
                    { title: "fevereiro 2026", year: 2026, month: 1 },
                    { title: "março 2026", year: 2026, month: 2 }
                  ].map((monthData) => (
                    <div key={monthData.title}>
                      <p className="text-center text-sm font-semibold text-base-content">
                        {monthData.title}
                      </p>
                      <div className="mt-3 grid grid-cols-7 gap-1.5 text-center text-[11px] text-base-content/60">
                        {["seg", "ter", "qua", "qui", "sex", "sáb", "dom"].map((day) => (
                          <span key={day}>{day}</span>
                        ))}
                      </div>
                      <div className="mt-2 grid grid-cols-7 gap-1.5 text-center text-sm text-base-content/70">
                        {renderMonth(monthData.year, monthData.month).map((date, index) => {
                          if (!date) {
                            return <span key={`${monthData.title}-empty-${index}`} />;
                          }

                          const isStart = checkIn && isSameDay(date, checkIn);
                          const isEnd = checkOut && isSameDay(date, checkOut);
                          const inRange = isInRange(date);

                          return (
                            <button
                              key={date.toISOString()}
                              type="button"
                              className={`inline-flex h-8 items-center justify-center rounded-full transition ${
                                isStart || isEnd
                                  ? "bg-primary text-white"
                                  : inRange
                                  ? "bg-primary/20 text-base-content"
                                  : "hover:bg-base-200"
                              }`}
                              onClick={() => handleDatePick(date)}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {activeSearchPanel === "guests" ? (
              <div className="absolute right-0 top-full z-[100] mt-3 w-full max-w-2xl rounded-3xl bg-base-100 p-5 shadow-2xl">
                <div className="space-y-4">
                  {[
                    {
                      label: "Adultos",
                      note: null,
                      value: adults,
                      setValue: setAdults,
                      min: 1
                    },
                    {
                      label: "Crianças",
                      note: "Idades 2-11",
                      value: children,
                      setValue: setChildren,
                      min: 0
                    },
                    {
                      label: "Bebês",
                      note: "Menos de 2 anos",
                      value: babies,
                      setValue: setBabies,
                      min: 0
                    },
                    {
                      label: "Pets",
                      note: null,
                      value: pets,
                      setValue: setPets,
                      min: 0
                    }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-6 border-b border-base-200 pb-3 last:border-b-0">
                      <div>
                        <p className="text-base font-semibold text-base-content">{item.label}</p>
                        {item.note ? (
                          <p className="text-sm text-base-content/60">{item.note}</p>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="btn btn-circle btn-outline btn-sm"
                          aria-label={`Diminuir ${item.label}`}
                          onClick={() => item.setValue(Math.max(item.min, item.value - 1))}
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-base font-semibold">
                          {item.value}
                        </span>
                        <button
                          type="button"
                          className="btn btn-circle btn-outline btn-sm"
                          aria-label={`Aumentar ${item.label}`}
                          onClick={() => item.setValue(item.value + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <p className="text-xs text-base-content/60">
            Foto:{" "}
            <a
              className="link link-hover"
              href={slides[activeSlide].creditUrl}
            >
              {slides[activeSlide].credit}
            </a>{" "}
            —{" "}
            <a
              className="link link-hover"
              href={slides[activeSlide].licenseUrl}
            >
              {slides[activeSlide].license}
            </a>
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-base-content">
              <Star size={22} weight="fill" className="text-primary" />
              Destaques selecionados
            </h2>
            <p className="text-base text-base-content/70">
              Experiências com alta avaliação e cancelamento flexível.
            </p>
          </div>
          <button className="btn btn-ghost btn-sm">Ver todos</button>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Hotel Vista Mar",
              location: "Rio de Janeiro",
              price: "R$ 420",
              rating: "4,8"
            },
            {
              title: "Loft Centro Histórico",
              location: "Salvador",
              price: "R$ 280",
              rating: "4,7"
            },
            {
              title: "Resort Natureza",
              location: "Foz do Iguaçu",
              price: "R$ 610",
              rating: "4,9"
            }
          ].map((item) => (
            <article key={item.title} className="card bg-base-100 shadow-sm">
              <div className="h-40 w-full rounded-t-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h3 className="card-title text-lg">{item.title}</h3>
                  <span className="badge badge-outline flex items-center gap-1">
                    <Star size={12} weight="fill" />
                    {item.rating}
                  </span>
                </div>
                <p className="text-sm text-base-content/70">{item.location}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">{item.price}/noite</span>
                  <button className="btn btn-sm btn-outline">Reservar</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>


      <footer className="border-t border-base-200 bg-base-100">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
          <p className="text-sm text-base-content/60">© 2026 Vamoali</p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="btn btn-ghost btn-sm gap-2"
              type="button"
              onClick={() => setActiveModal("privacy")}
            >
              <ShieldCheck size={16} />
              Privacidade
            </button>
            <button
              className="btn btn-ghost btn-sm gap-2"
              type="button"
              onClick={() => setActiveModal("terms")}
            >
              <FileText size={16} />
              Termos e Condições
            </button>
            <button
              className="btn btn-ghost btn-sm gap-2"
              type="button"
              onClick={() => setActiveModal("help")}
            >
              <ChatsCircle size={16} />
              Centro de Ajuda
            </button>
          </div>
        </div>
      </footer>

      {activeModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
          <div className="relative w-full max-w-2xl rounded-3xl bg-base-100 p-6 shadow-2xl">
            <button
              className="btn btn-ghost btn-circle absolute right-4 top-4"
              type="button"
              onClick={() => setActiveModal(null)}
              aria-label="Fechar"
            >
              ✕
            </button>
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-base-200 md:h-36 md:w-36">
                <img src="/images/art.svg" alt="" className="h-20 w-20 opacity-80" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  {activeModal === "privacy" && <ShieldCheck size={24} className="text-primary" />}
                  {activeModal === "terms" && <FileText size={24} className="text-primary" />}
                  {activeModal === "help" && <ChatsCircle size={24} className="text-primary" />}
                  <h3 className="text-xl font-bold">
                    {activeModal === "privacy" && "Privacidade"}
                    {activeModal === "terms" && "Termos e Condições"}
                    {activeModal === "help" && "Centro de Ajuda"}
                  </h3>
                </div>
                <div className="mt-4 space-y-3 text-sm text-base-content/70">
                  {activeModal === "privacy" && (
                    <>
                      <p>
                        Sua privacidade é prioridade. Coletamos apenas dados essenciais para
                        personalizar buscas, facilitar reservas e garantir a segurança da sua conta.
                      </p>
                      <p>
                        Você pode acessar, corrigir ou excluir suas informações a qualquer momento,
                        além de ajustar preferências de comunicação.
                      </p>
                    </>
                  )}
                  {activeModal === "terms" && (
                    <>
                      <p>
                        Ao usar a VamoAli Trips, você concorda com as regras de uso, pagamento e
                        cancelamento exibidas durante a reserva.
                      </p>
                      <p>
                        Trabalhamos com parceiros confiáveis e garantimos transparência nas taxas e
                        políticas de cada acomodação.
                      </p>
                    </>
                  )}
                  {activeModal === "help" && (
                    <>
                      <p>
                        Precisa de ajuda? Estamos aqui 24/7 para resolver dúvidas sobre reservas,
                        pagamentos, alterações e reembolsos.
                      </p>
                      <p>
                        Envie uma mensagem pelo chat, consulte as perguntas frequentes ou fale com
                        um especialista.
                      </p>
                    </>
                  )}
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button className="btn btn-ghost" type="button" onClick={() => setActiveModal(null)}>
                    Fechar
                  </button>
                  <button className="btn btn-primary text-white" type="button">
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
