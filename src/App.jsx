import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Carrusel from "./components/Carrusel"

import './App.css'

function App() {
  return (
    <div className="p-6 font-sans bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold">Misión 2 - SQL</h1>
        <h1 className="text-3xl font-bold">Gymboard-BD</h1>
        <p className="text-sm text-gray-500">Sector: Fitness / Tecnología</p>
        <h3 className="mt-4 font-bold">Integrantes</h3>
        <h2>Tania Fonseca</h2>
      </header>

      {/* Información del proyecto */}
      <section className="mb-8">
         
        <h2 className="text-2xl font-semibold mb-2 ">Información del Proyecto</h2>
        <p className="text-justify">
          Este proyecto consiste en el diseño de una base de datos en PostgreSQL
          para una aplicación web de rutinas de ejercicio. La aplicación permitirá
          a los usuarios crear rutinas personalizadas, asociarles ejercicios,
          recibir comentarios de la comunidad y llevar un registro del cumplimiento
          de sus entrenamientos en diferentes fechas.<br />
          El sistema incluye las siguientes funcionalidades principales:<br />
1.	Gestión de Usuarios
o	Registro de usuarios con datos básicos (nombre, correo, edad, peso y altura).
o	Almacenamiento seguro de credenciales.<br />
2.	Rutinas de Ejercicio
o	Los usuarios pueden crear y administrar sus propias rutinas.
o	Cada rutina puede contener varios ejercicios con detalle de series y repeticiones.<br />
3.	Ejercicios
o	Base de datos de ejercicios con descripción y grupo muscular objetivo.
o	Ejercicios reutilizables entre distintas rutinas.<br />
4.	Comentarios en Rutinas
o	Los usuarios pueden comentar en las rutinas de otros, dando feedback y sugerencias.<br />
5.	Cumplimiento de Rutinas
o	Registro histórico del avance de cada usuario por rutina y fecha.
o	Se utiliza un campo de tipo ENUM (pendiente, en_progreso, completado, omitido) para llevar el estado de cada rutina en cada sesión de entrenamiento.<br />

        </p>

      </section>

      {/* Modelo ER */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Modelo Entidad-Relación</h2>
        <p>
          Aquí se incluye el diagrama ER del sistema.
        </p>
        <img src="/Untitled.png" alt="Modelo ER" className="border rounded  width={100} height={50} " />
      </section>

      {/* tablas */}
      <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Base de Datos en PostgreSQL</h1>
      <p className="mb-6 text-center">
        Usar pgAdmin para crear la base de datos y las tablas.
      </p>
      <Carrusel />
      </section>


      {/* Scripts SQL */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Scripts SQL Usados</h2>

        <h3 className="font-semibold">Consultar (SELECT)</h3>
        <pre className="bg-gray-900 text-green-400 p-2 rounded text-sm overflow-x-auto">
{`Listar todos los usuarios:
SELECT * FROM usuarios;

Consultar rutinas de un usuario específico:
SELECT r.id_rutina, r.titulo, r.descripcion, r.fecha_creacion
FROM rutinas r
JOIN usuarios u ON r.id_usuario = u.id_usuario
WHERE u.id_usuario = 1;

Consultar cumplimientos con estado:
SELECT c.id_cumplimiento, u.nombre, r.titulo, c.fecha, c.estado, c.notas
FROM cumplimientos_rutinas c
JOIN usuarios u ON c.id_usuario = u.id_usuario
JOIN rutinas r ON c.id_rutina = r.id_rutina
ORDER BY c.fecha DESC;
`}
        </pre>

        <h3 className="font-semibold mt-4">Insertar (INSERT)</h3>
        <pre className="bg-gray-900 text-green-400 p-2 rounded text-sm overflow-x-auto">
{`Insertar un usuario nuevo:
INSERT INTO usuarios (nombre, email, password, edad, peso_kg, altura_cm)
VALUES ('Ana Torres', 'ana.torres@example.com', 'clave123', 28, 62.5, 165);

Insertar una rutina para un usuario existente (id_usuario = 1):
INSERT INTO rutinas (id_usuario, titulo, descripcion)
VALUES (1, 'Rutina Piernas', 'Enfocada en tren inferior: sentadillas, peso muerto, zancadas')
RETURNING id_rutina;

Insertar un cumplimiento de rutina (estado por defecto: pendiente):
INSERT INTO cumplimientos_rutinas (id_usuario, id_rutina, fecha, notas)
VALUES (1, 2, CURRENT_DATE, 'Primera vez que hago esta rutina');
`}
        </pre>

        <h3 className="font-semibold mt-4">Actualizar (UPDATE)</h3>
        <pre className="bg-gray-900 text-green-400 p-2 rounded text-sm overflow-x-auto">
{`Cambiar el estado de cumplimiento de una rutina:
UPDATE cumplimientos_rutinas
SET estado = 'completado', notas = 'Ejecutada con éxito, mejor resistencia'
WHERE id_cumplimiento = 3;

Actualizar datos de un usuario:
UPDATE usuarios
SET peso_kg = 68.4, altura_cm = 172
WHERE id_usuario = 2;
`}
        </pre>

        <h3 className="font-semibold mt-4">Eliminar (DELETE)</h3>
        <pre className="bg-gray-900 text-green-400 p-2 rounded text-sm overflow-x-auto">
{`Eliminar relaciones de un ejercicio antes de borrarlo:
DELETE FROM rutina_ejercicios
WHERE id_ejercicio = 5;

Eliminar un ejercicio que ya no se necesita:
DELETE FROM ejercicios
WHERE id_ejercicio = 5;

Eliminar una rutina y sus cumplimientos asociados:
DELETE FROM rutinas
WHERE id_rutina = 4;
`}
        </pre>
      </section>

      {/* Simulación de flujo */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Simulación de Flujo</h2>
        <ol className="list-decimal list-inside">
          <li>
            <b>Insert:</b> Agregar una rutina nueva asociada a un usuario.  
            <pre className="bg-gray-900 text-green-400 p-2 rounded text-sm">
{`INSERT INTO rutinas (id_usuario, titulo, descripcion)
VALUES (1, 'Rutina Full Body', 'Rutina general para todo el cuerpo')
RETURNING id_rutina;`}
            </pre>
          </li>
          <li className="mt-4">
            <b>Update:</b> Actualizar el estado de un cumplimiento de rutina.  
            <pre className="bg-gray-900 text-green-400 p-2 rounded text-sm">
{`UPDATE cumplimientos_rutinas
SET estado = 'completado'
WHERE id_cumplimiento = 5;`}
            </pre>
          </li>
          <li className="mt-4">
            <b>Delete:</b> Eliminar un ejercicio que no se necesita.  
            <pre className="bg-gray-900 text-green-400 p-2 rounded text-sm">
{`DELETE FROM rutina_ejercicios WHERE id_ejercicio = 7;
DELETE FROM ejercicios WHERE id_ejercicio = 7;`}
            </pre>
          </li>
        </ol>
      </section>

      {/* Observaciones */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Observaciones y Aprendizajes</h2>
        <ul className="list-disc list-inside">
          <li>Se logró construir un modelo relacional claro y funcional en PostgreSQL.</li>
          <li>Se insertaron registros de prueba para simular datos reales.</li>
          <li>Se practicaron operaciones CRUD básicas (SELECT, INSERT, UPDATE, DELETE).</li>
          <li>Se aprendió a validar relaciones entre tablas y restricciones de claves foráneas.</li>
          <li>El proyecto está listo para integrarse con un frontend en React.</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-10 text-sm text-gray-500">
        <p>Desplegado en Render: <a href="#" className="text-blue-600">[Link aquí]</a></p>
      </footer>
    </div>
  );
}

export default App;
