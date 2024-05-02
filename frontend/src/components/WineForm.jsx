import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
// eslint-disable-next-line react/prop-types
const WineForm = ({ isOpen, onClose, handleInputChange}) => {
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
                {"predicción de calidad del vino"}
              </Dialog.Title>
              {/* Elemento input para la fecha de inicio */}
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="density"
              >
                Densidad del vino (g/cm³).
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="density"
                type="number"
                placeholder="density"
                onChange={(e) => {
                  handleInputChange("density", e.target.value)
                }} // Función que se ejecuta cuando se cambia el valor del input
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="alcohol"
              >
                alcohol (porcentaje de alcohol por volumen en el vino)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="alcohol"
                type="number"
                placeholder="alcohol"
                onChange={(e) => {
                  handleInputChange("alcohol", e.target.value);
                }} // Función que se ejecuta cuando se cambia el valor del input
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="volatile_acidity"
              >
                Acidez volátil del vino, cantidad de ácido acético en forma de ácido acético (g/dm³)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="volatile_acidity"
                type="number"
                placeholder="volatile acidity"
                onChange={(e) => {
                  handleInputChange("volatile_acidity", e.target.value);
                }} // Función que se ejecuta cuando se cambia el valor del input
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                htmlFor="free_sulfur_dioxide"
              >
                Dióxido de azufre libre en vino (mg/dm³).
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="free_sulfur_dioxide"
                type="number"
                min={1}
                max={289}
                placeholder="free sulfur dioxide 1-289"
                onChange={(e) => {
                  handleInputChange("free_sulfur_dioxide", e.target.value);
                }} // Función que se ejecuta cuando se cambia el valor del input
              />

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
export default WineForm;
