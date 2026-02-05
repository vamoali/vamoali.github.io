"use client";

import {
  CalendarBlank,
  House,
  MagnifyingGlass,
  MapPin,
  SignOut,
  Star,
  SuitcaseRolling,
  UserCircle,
  Users
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const totalGuests = adults + children + babies;

  return (
    <main className="min-h-screen bg-base-100">
      <section
        className="relative min-h-[560px] overflow-hidden bg-cover bg-center"
      >
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
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20">
          <header className="flex flex-col gap-16">
            <div className="flex items-center justify-between gap-6">
              <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-primary">
                <img
                  src="/images/logo.svg"
                  alt="VamoAli Trips"
                  className="h-12 w-auto md:h-16"
                />
              </Link>
              <div className="bg-[#1a1a1aff] px-2 py-1">
                <nav className="flex items-center gap-1 text-white">
                  <button className="btn btn-ghost btn-circle tooltip" data-tip="Home" aria-label="Home">
                    <House size={20} />
                  </button>
                  <button className="btn btn-ghost btn-circle tooltip" data-tip="Minha conta" aria-label="Minha conta">
                    <UserCircle size={20} />
                  </button>
                  <button className="btn btn-ghost btn-circle tooltip" data-tip="Minha viagem" aria-label="Minha viagem">
                    <SuitcaseRolling size={20} />
                  </button>
                  <button className="btn btn-ghost btn-circle tooltip" data-tip="Sair" aria-label="Sair">
                    <SignOut size={20} />
                  </button>
                </nav>
              </div>
            </div>
            <div className="flex flex-col gap-2">
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

          <form className="grid gap-4 rounded-2xl bg-base-100/90 p-5 shadow-md backdrop-blur md:grid-cols-[2fr_1.2fr_1.2fr_1fr_0.8fr]">
            <label className="form-control w-full">
              <span className="label-text flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-base-content/60">
                <MapPin size={14} />
                Destino
              </span>
              <input
                className="input input-bordered w-full"
                placeholder="Para onde?"
                type="text"
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-base-content/60">
                <CalendarBlank size={14} />
                Check-in
              </span>
              <input className="input input-bordered w-full" type="date" />
            </label>
            <label className="form-control w-full">
              <span className="label-text flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-base-content/60">
                <CalendarBlank size={14} />
                Check-out
              </span>
              <input className="input input-bordered w-full" type="date" />
            </label>
            <div className="form-control w-full">
              <span className="label-text flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-base-content/60">
                <Users size={14} />
                Hóspedes
              </span>
              <div className="dropdown dropdown-bottom w-full">
                <label
                  tabIndex={0}
                  className="input input-bordered flex w-full cursor-pointer items-center justify-between gap-3"
                >
                  <span className="text-sm">
                    {totalGuests} {totalGuests === 1 ? "pessoa" : "pessoas"}
                    {pets > 0 ? `, ${pets} pet${pets > 1 ? "s" : ""}` : ""}
                  </span>
                  <Users size={16} />
                </label>
                <div
                  tabIndex={0}
                  className="dropdown-content z-10 mt-2 w-full rounded-2xl bg-base-100 p-4 shadow-lg"
                >
                  <div className="grid gap-3">
                    {[
                      { label: "Adultos", value: adults, setValue: setAdults, min: 1 },
                      { label: "Crianças", value: children, setValue: setChildren, min: 0 },
                      { label: "Bebês", value: babies, setValue: setBabies, min: 0 },
                      { label: "Pets", value: pets, setValue: setPets, min: 0 }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold text-base-content">
                          {item.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="btn btn-ghost btn-circle btn-sm"
                            aria-label={`Diminuir ${item.label}`}
                            onClick={() => item.setValue(Math.max(item.min, item.value - 1))}
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {item.value}
                          </span>
                          <button
                            type="button"
                            className="btn btn-ghost btn-circle btn-sm"
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
              </div>
            </div>
            <button className="btn btn-primary h-[48px] self-end text-white">
              <MagnifyingGlass size={18} weight="bold" />
              Buscar
            </button>
          </form>
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

      <section className="bg-base-200">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-base-content">Destinos populares</h2>
              <p className="text-base text-base-content/70">
                Inspire-se com os lugares mais buscados da semana.
              </p>
            </div>
            <button className="btn btn-ghost btn-sm">Explorar</button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              "São Paulo",
              "Lisboa",
              "Buenos Aires",
              "Florianópolis",
              "Paris",
              "Cidade do México",
              "Santiago",
              "Recife"
            ].map((destino) => (
              <div key={destino} className="card bg-base-100 shadow-sm">
                <div className="card-body gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30" />
                  <div>
                    <h3 className="font-semibold">{destino}</h3>
                    <p className="text-sm text-base-content/60">A partir de R$ 210</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
