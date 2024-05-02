import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
// eslint-disable-next-line react/prop-types
const MoodForm = ({ isOpen, onClose, handleInputChange }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-5 inset-0 overflow-y-auto"
        onClose={onClose} // Función que se ejecuta cuando se cierra el modal
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/*Elemento que se muestra detrás del modal */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* Este elemento sirve para engañar al navegador para que centre el contenido modal. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          {/* Contenido principal del modal */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4   text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-1/3 sm:p-6">
              <div className="absolute top-0 right-0 mt-4 mr-4">
                {/* Botón para cerrar el modal */}
                <button type="button" onClick={onClose}>
                  {/* Alinear el botón en la esquina superior derecha */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
              {/* Título del modal */}
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                {"Predicción de cambios de humor"}
              </Dialog.Title>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="days_indoors"
              >
                Dias bajo techo
              </label>
              <select
                id="days_indoors" // Identificador del elemento
                name="days_indoors" // Nombre del elemento
                onChange={(e) => {
                  handleInputChange("days_indoors", e.target.value);
                }} // Función que se ejecuta cuando el valor del elemento cambia
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
              >
                {/* opción por defecto del select */}
                <option value="">Seleccionar</option>
                {/* Opciones del select */}
                <option value="0">1-14 Días</option>
                <option value="1">15-30 Días</option>
                <option value="2">31-60 Días</option>
                <option value="3">Sale todos los días</option>
                <option value="4">Más de 2 meses</option>
              </select>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="social_weakness"
              >
                Debilidad social
              </label>
              <select
                id="social_weakness" // Identificador del elemento
                name="social_weakness" // Nombre del elemento
                onChange={(e) => {
                  handleInputChange("social_weakness", e.target.value);
                }} // Función que se ejecuta cuando el valor del elemento cambia
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
              >
                {/* opción por defecto del select */}
                <option value="">Seleccionar</option>
                {/* Opciones del select */}
                <option value="0">Tal vez</option>
                <option value="1">No</option>
                <option value="2">Si</option>
              </select>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="mental_health_history"
              >
                Historial de salud mental
              </label>
              <select
                id="mental_health_history" // Identificador del elemento
                name="mental_health_history" // Nombre del elemento
                onChange={(e) => {
                  handleInputChange("mental_health_history", e.target.value);
                }} // Función que se ejecuta cuando el valor del elemento cambia
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
              >
                {/* opción por defecto del select */}
                <option value="">Seleccionar</option>
                {/* Opciones del select */}
                <option value="0">Tal vez</option>
                <option value="1">No</option>
                <option value="2">Si</option>
              </select>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="work_interest"
              >
                Interes en el trabajo
              </label>
              <select
                id="work_interest" // Identificador del elemento
                name="work_interest" // Nombre del elemento
                onChange={(e) => {
                  handleInputChange("work_interest", e.target.value);
                }} // Función que se ejecuta cuando el valor del elemento cambia
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
              >
                {/* opción por defecto del select */}
                <option value="">Seleccionar</option>
                {/* Opciones del select */}
                <option value="0">Tal vez</option>
                <option value="1">No</option>
                <option value="2">Si</option>
              </select>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="growing_stress"
              >
                Estres creciente
              </label>
              <select
                id="growing_stress" // Identificador del elemento
                name="growing_stress" // Nombre del elemento
                onChange={(e) => {
                  handleInputChange("growing_stress", e.target.value);
                }} // Función que se ejecuta cuando el valor del elemento cambia
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
              >
                {/* opción por defecto del select */}
                <option value="">Seleccionar</option>
                {/* Opciones del select */}
                <option value="0">Tal vez</option>
                <option value="1">No</option>
                <option value="2">Si</option>
              </select>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="occupation"
              >
                Profesión
              </label>
              <select
                id="occupation" // Identificador del elemento
                name="occupation" // Nombre del elemento
                onChange={(e) => {
                  handleInputChange("occupation", e.target.value);
                }} // Función que se ejecuta cuando el valor del elemento cambia
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
              >
                {/* opción por defecto del select */}
                <option value="">Seleccionar</option>
                {/* Opciones del select */}
                <option value="0">Negocios</option>
                <option value="1">Corporativo</option>
                <option value="2">Ama(o) de casa</option>
                <option value="3">Otros</option>
                <option value="4">Estudiante</option>
              </select>
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="changes_habits"
              >
                Cambio de hábitos
              </label>
              <select
                id="changes_habits" // Identificador del elemento
                name="changes_habits" // Nombre del elemento
                onChange={(e) => {
                  handleInputChange("changes_habits", e.target.value);
                }} // Función que se ejecuta cuando el valor del elemento cambia
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
              >
                {/* opción por defecto del select */}
                <option value="">Seleccionar</option>
                {/* Opciones del select */}
                <option value="0">Tal vez</option>
                <option value="1">No</option>
                <option value="2">Si</option>
              </select>
              
              <div className="mt-5 sm:mt-6">
                {/* Botón para guardar la tarea */}
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary hover:bg-teal-300  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={onClose} // Función que se ejecuta cuando se hace click en el botón
                >
                  Guardar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default MoodForm;
