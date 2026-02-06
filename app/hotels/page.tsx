"use client";

import {
  CurrencyDollarSimple,
  FunnelSimple,
  House,
  MapPin,
  SignOut,
  Star,
  SuitcaseRolling,
  UserCircle
} from "@phosphor-icons/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HOTELS } from "./data";

const PAGE_SIZE = 6;

export default function SearchPage() {
  const [minPrice, setMinPrice] = useState(200);
  const [maxPrice, setMaxPrice] = useState(650);
  const [priceRange, setPriceRange] = useState(650);
  const [freeCancellation, setFreeCancellation] = useState(false);
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const normalizedDestination = destination.trim().toLowerCase();
    return HOTELS.filter((hotel) => {
      if (hotel.price < minPrice || hotel.price > priceRange) return false;
      if (rating && hotel.rating < rating) return false;
      if (freeCancellation && !hotel.tags.some((tag) => tag.toLowerCase().includes("cancelamento"))) {
        return false;
      }
      if (normalizedDestination) {
        const cityMatch = hotel.city.toLowerCase().includes(normalizedDestination);
        const nameMatch = hotel.name.toLowerCase().includes(normalizedDestination);
        if (!cityMatch && !nameMatch) return false;
      }
      if (propertyTypes.length) {
        const typeMatch = propertyTypes.some((type) =>
          hotel.tags.some((tag) => tag.toLowerCase().includes(type.toLowerCase()))
        );
        if (!typeMatch) return false;
      }
      if (amenities.length) {
        const amenityMatch = amenities.some((amenity) =>
          hotel.tags.some((tag) => tag.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!amenityMatch) return false;
      }
      return true;
    });
  }, [amenities, destination, freeCancellation, minPrice, priceRange, propertyTypes, rating]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const toggleValue = (value: string, list: string[], setter: (next: string[]) => void) => {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  const handleSearchUpdate = () => {
    setPage(1);
  };

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

      <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-24">
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-base-content">Hotéis disponíveis</h1>
              <p className="text-sm text-base-content/60">
                {filtered.length} opções encontradas
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/70">
              <MapPin size={16} />
              São Paulo → Mundo
              <button className="btn btn-outline btn-sm">Ordenar</button>
              <button
                className="btn btn-primary btn-sm text-white"
                type="button"
                onClick={() => setFiltersOpen(true)}
              >
                <FunnelSimple size={16} />
                Filtros
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((hotel) => (
              <article key={hotel.id} className="card bg-base-100 shadow-sm">
                <div className="h-28 w-full rounded-t-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
                <div className="card-body gap-2 p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="card-title text-base">{hotel.name}</h2>
                    <span className="badge badge-outline flex items-center gap-1">
                      <Star size={12} weight="fill" />
                      {hotel.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-base-content/70">{hotel.city}</p>
                  <div className="flex flex-wrap gap-2">
                    {hotel.tags.map((tag) => (
                      <span key={tag} className="badge badge-ghost">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-lg font-semibold text-primary">
                      <CurrencyDollarSimple size={16} />
                      {hotel.price.toFixed(0)}
                      <span className="text-xs font-normal text-base-content/60">/noite</span>
                    </span>
                    <Link
                      href={`/hotels/${hotel.id}`}
                      className="btn btn-sm btn-primary text-white"
                    >
                      Ver detalhes
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              className="btn btn-sm"
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageIndex = index + 1;
              return (
                <button
                  key={pageIndex}
                  className={`btn btn-sm ${pageIndex === currentPage ? "btn-primary text-white" : "btn-ghost"}`}
                  type="button"
                  onClick={() => setPage(pageIndex)}
                >
                  {pageIndex}
                </button>
              );
            })}
            <button
              className="btn btn-sm"
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            >
              Próxima
            </button>
          </div>
        </section>
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="relative w-full max-w-2xl rounded-3xl bg-base-100 p-6 shadow-2xl">
            <button
              className="btn btn-ghost btn-circle absolute right-4 top-4"
              type="button"
              onClick={() => setFiltersOpen(false)}
              aria-label="Fechar"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 text-sm font-semibold text-base-content">
              <FunnelSimple size={18} />
              Filtros
            </div>
            <div className="mt-5 space-y-5">
              <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
                <p className="text-sm font-semibold text-base-content">Nova busca</p>
                <div className="mt-3 space-y-3">
                  <label className="form-control">
                    <span className="label-text text-xs">Destino</span>
                    <input
                      className="input input-bordered"
                      placeholder="Para onde?"
                      type="text"
                      value={destination}
                      onChange={(event) => setDestination(event.target.value)}
                    />
                  </label>
                  <label className="form-control">
                    <span className="label-text text-xs">Quando</span>
                    <input
                      className="input input-bordered"
                      placeholder="Selecione datas"
                      type="text"
                      value={dates}
                      onChange={(event) => setDates(event.target.value)}
                    />
                  </label>
                  <label className="form-control">
                    <span className="label-text text-xs">Hóspedes</span>
                    <input
                      className="input input-bordered"
                      placeholder="Quantidade de pessoas"
                      type="text"
                      value={guests}
                      onChange={(event) => setGuests(event.target.value)}
                    />
                  </label>
                  <button className="btn btn-primary w-full text-white" type="button" onClick={handleSearchUpdate}>
                    Atualizar busca
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-base-content">Preço por noite</p>
                <div className="mt-3 space-y-3">
                  <input
                    className="range range-primary"
                    max={maxPrice}
                    min={minPrice}
                    type="range"
                    value={priceRange}
                    onChange={(event) => setPriceRange(Number(event.target.value))}
                  />
                  <div className="flex items-center justify-between text-xs text-base-content/60">
                    <span>R$ {minPrice}</span>
                    <span>Até R$ {priceRange}</span>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-base-200" />
              <div>
                <p className="text-sm font-semibold text-base-content">Pontuação</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[0, 3, 4, 4.5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={`btn btn-sm ${
                        rating === value ? "btn-primary text-white" : "btn-ghost"
                      }`}
                      onClick={() => setRating(value)}
                    >
                      {value === 0 ? "Todas" : `${value}+`}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-px w-full bg-base-200" />
              <div>
                <p className="text-sm font-semibold text-base-content">Tipo de hospedagem</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Hotel", "Resort", "Apartamento", "Pousada"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`btn btn-sm ${
                        propertyTypes.includes(type) ? "btn-primary text-white" : "btn-ghost"
                      }`}
                      onClick={() => toggleValue(type, propertyTypes, setPropertyTypes)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-px w-full bg-base-200" />
              <div>
                <p className="text-sm font-semibold text-base-content">Comodidades</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Wi-Fi", "Piscina", "Pet", "Spa", "Café"].map((amenity) => (
                    <button
                      key={amenity}
                      type="button"
                      className={`btn btn-sm ${
                        amenities.includes(amenity) ? "btn-primary text-white" : "btn-ghost"
                      }`}
                      onClick={() => toggleValue(amenity, amenities, setAmenities)}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-px w-full bg-base-200" />
              <label className="flex items-center justify-between text-sm font-semibold text-base-content">
                Cancelamento grátis
                <input
                  className="toggle toggle-primary"
                  type="checkbox"
                  checked={freeCancellation}
                  onChange={(event) => setFreeCancellation(event.target.checked)}
                />
              </label>
              <div className="h-px w-full bg-base-200" />
              <div className="rounded-xl bg-base-200 p-3 text-xs text-base-content/60">
                Resultados mockados para demonstração. Em breve conectaremos ao endpoint real.
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
