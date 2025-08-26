import { useState } from "react";

const slides = [
  { src: "/Tabla1.png", text: "Tabla Usuarios" },
  { src: "/Tabla2.png", text: "Tabla Rutinas" },
  { src: "/Tabla3.png", text: "Tabla Rutina-Ejercicios" },
  { src: "/Tabla4.png", text: "Tabla Ejercicios" },
  { src: "/Tabla5.png", text: "Tabla Cumplimiento rutinas" },
  { src: "/Tabla6.png", text: "Tabla Comentarios" },
];

export default function Carrusel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((current - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src={slides[current].src}
          alt={`Slide ${current}`}
          className="w-full h-96 object-contain"
        />
      </div>
      <p className="mt-2 text-center text-sm">{slides[current].text}</p>

      {/* Botones */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        ▶
      </button>
    </div>
  );
}
