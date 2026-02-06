"use client";

import {
  House,
  MapPin,
  SignOut,
  Star,
  SuitcaseRolling,
  UserCircle
} from "@phosphor-icons/react";
import Link from "next/link";

type Hotel = {
  id: string;
  name: string;
  city: string;
  rating: number;
  price: number;
  description: string;
};

export default function HotelDetailsClient({ hotel }: { hotel?: Hotel }) {
  return (
    <main className="min-h-screen bg-base-100">
      <div className="fixed left-0 right-0 top-0 z-20 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex h-8 items-center gap-2 md:h-10">
            <img
              src="/images/logo.svg"
              alt="VamoAli"
              className="h-8 w-auto max-h-full md:h-10"
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

      <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-24">
        <Link href="/hotels" className="btn btn-ghost btn-sm mb-4">
          ← Voltar
        </Link>
        {hotel ? (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <section className="space-y-6">
              <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
                <div className="h-64 w-full rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
                <div className="grid gap-3">
                  <div className="h-[124px] w-full rounded-3xl bg-gradient-to-br from-primary/15 via-secondary/15 to-accent/15" />
                  <div className="h-[124px] w-full rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold text-base-content">{hotel.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-base-content/70">
                  <span className="flex items-center gap-2">
                    <MapPin size={16} />
                    {hotel.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} weight="fill" />
                    {hotel.rating} · Excelente
                  </span>
                  <span>Cancelamento grátis</span>
                </div>
              </div>

              <p className="text-base text-base-content/70">{hotel.description}</p>

              <div className="sticky top-20 z-10 -mt-2 bg-base-100/90 py-2 backdrop-blur">
                <div className="tabs tabs-boxed">
                  <a href="#visao-geral" className="tab tab-active">
                    Visão geral
                  </a>
                  <a href="#quartos" className="tab">
                    Quartos
                  </a>
                  <a href="#localizacao" className="tab">
                    Localização
                  </a>
                  <a href="#avaliacoes" className="tab">
                    Avaliações
                  </a>
                  <a href="#politicas" className="tab">
                    Políticas
                  </a>
                </div>
              </div>

              <div id="visao-geral" className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-base-200 bg-base-100 p-5">
                  <h2 className="text-lg font-semibold text-base-content">Comodidades</h2>
                  <ul className="mt-3 grid gap-2 text-sm text-base-content/70">
                    <li>Wi-Fi gratuito</li>
                    <li>Recepção 24h</li>
                    <li>Piscina e spa</li>
                    <li>Estacionamento</li>
                    <li>Ar-condicionado</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-base-200 bg-base-100 p-5">
                  <h2 className="text-lg font-semibold text-base-content">Eat · Restaurante</h2>
                  <p className="mt-2 text-sm text-base-content/70">
                    Gastronomia autoral com menu variado, café da manhã completo e bar com
                    coquetelaria local.
                  </p>
                  <ul className="mt-3 grid gap-2 text-sm text-base-content/70">
                    <li>Café da manhã servido diariamente</li>
                    <li>Menu à la carte no almoço e jantar</li>
                    <li>Bar com drinks e snacks</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-base-200 bg-base-100 p-5">
                <h2 id="quartos" className="text-lg font-semibold text-base-content">
                  Sleep · Quartos
                </h2>
                <p className="mt-2 text-sm text-base-content/70">
                  Quartos com design contemporâneo, enxoval premium e conforto pensado para uma
                  noite de descanso completa.
                </p>
                <div className="mt-4 grid gap-3">
                  {[
                    { name: "Standard", bed: "1 cama queen", price: 420 },
                    { name: "Superior", bed: "1 cama king", price: 520 },
                    { name: "Família", bed: "2 camas + sofá", price: 610 }
                  ].map((room) => (
                    <div
                      key={room.name}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-base-200 p-4"
                    >
                      <div>
                        <p className="font-semibold text-base-content">{room.name}</p>
                        <p className="text-sm text-base-content/60">{room.bed}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-base font-semibold text-primary">
                          R$ {room.price}
                          <span className="text-xs font-normal text-base-content/60">/noite</span>
                        </span>
                        <button className="btn btn-sm btn-primary text-white">Reservar</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-base-200 bg-base-100 p-5">
                  <h2 id="localizacao" className="text-lg font-semibold text-base-content">
                    Localização
                  </h2>
                  <div className="mt-3 h-40 w-full rounded-2xl bg-base-200" />
                  <p className="mt-3 text-sm text-base-content/60">
                    Centro histórico, a 5 min da praia e 8 min do metrô.
                  </p>
                  <div className="mt-3 text-sm text-base-content/70">
                    <p>Endereço: Rua Central, 123</p>
                    <p>Telefone: (11) 4000-1234</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-base-200 bg-base-100 p-5">
                  <h2 id="politicas" className="text-lg font-semibold text-base-content">
                    Políticas
                  </h2>
                  <ul className="mt-3 grid gap-2 text-sm text-base-content/70">
                    <li>Check-in: 14:00</li>
                    <li>Check-out: 12:00</li>
                    <li>Idiomas: português, inglês, espanhol</li>
                    <li>Política pet: sob consulta</li>
                    <li>Cancelamento grátis até 48h antes</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-base-200 bg-base-100 p-5">
                <h2 id="avaliacoes" className="text-lg font-semibold text-base-content">
                  Avaliações
                </h2>
                <div className="mt-3 flex items-center gap-3">
                  <span className="badge badge-primary badge-lg text-white">9.2</span>
                  <div>
                    <p className="font-semibold text-base-content">Excelente</p>
                    <p className="text-sm text-base-content/60">1.248 avaliações</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-base-content/70">
                  <div className="flex items-center justify-between">
                    <span>Limpeza</span>
                    <span>9.1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Conforto</span>
                    <span>9.3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Localização</span>
                    <span>9.4</span>
                  </div>
                </div>
              </div>
            </section>

            <aside className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm">
              <p className="text-sm text-base-content/60">Preço por noite</p>
              <p className="mt-2 text-3xl font-bold text-primary">R$ {hotel.price}</p>
              <button className="btn btn-primary mt-6 w-full text-white">Reservar</button>
              <div className="mt-4 text-xs text-base-content/60">
                Cancelamento grátis disponível para algumas tarifas.
              </div>
              <div className="mt-6 rounded-2xl bg-base-200 p-4 text-xs text-base-content/70">
                Pague em até 6x sem juros. Sem taxas ocultas.
              </div>
            </aside>
          </div>
        ) : (
          <div className="rounded-2xl border border-base-200 bg-base-100 p-6 text-base-content/70">
            Hotel não encontrado.
          </div>
        )}
      </div>
    </main>
  );
}
