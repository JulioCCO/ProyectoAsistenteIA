import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import PropTypes from 'prop-types';

export const ResponseModal = ({ data, model, onClose, isOpen }) => {
    const [textDisplay, setTextDisplay] = useState('');

    const selectText = () => {
        let dataText = ''
        switch (model) {
            case "corazón":
                dataText = `Con los datos ingresados se tiene que: ${data === true ? 'La persona es propensa a ataques al corazon.' : 'La persona es propensa a ataques al corazon.'}`
                break;
            case "cerebro":
                dataText = `Con los datos ingresados se tiene que: ${data === true ? 'La persona es propensa a ataques cerebrovasculares.' : 'La persona no es propensa a ataques cerebrovasculares.'}`
                break;
            case "vino":
                dataText = `La calidad del vino es: ${data}.`
                break;
            case "reclutamiento":
                dataText = `Segun el modelo el estudiante: ${data === true ? 'Va hacer contratado' : 'No va hacer contratado.'}`
                break;
            case "aguacate":
                dataText = `El precio del aguacate es: ${data}`
                break;
            case "banco":
                dataText = `Segun los datos el resultado es: ${data === true ? 'La persona va a dejar el banco' : 'La persona no va a dejar el banco'}`
                break;
            case "salario":
                dataText = `El salario del emplado es de: ${data}`
                break;
            case "humor":
                dataText = `La persona tiene: ${data}`
                break;
            case "titanic":
                dataText = `La persona: ${data === true ? 'va a sobrevivir al accidente del Titanic' : 'no va a sobrevivir al accidente del Titanic'}`
                break;
            case "vuelo":
                dataText = `El costo del tiquete de avion es de: ${data}`
                break;
            case "emociones":
                if (data === 'error') {
                    dataText = 'Error no se proporciono una imagen.'
                } else {
                    dataText = `La emocion dominante es: ${data.dominant_emotion}`
                }
                break;
            default:
                dataText = `Error al procesar el resultado, verifique los datos ingresados.`
                break;
        }
        setTextDisplay(dataText)
    }

    useEffect(() => {
        selectText()
    }, [])

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
                            <Dialog.Title
                                as="h3"
                                className="text-lg leading-6 font-medium text-gray-900"
                            >
                                {`Respuesta del modelo: ${model}`}
                            </Dialog.Title>
                            <div >
                                <p className="text-sm text-center font-medium m-2">{textDisplay}</p>
                                {(model === 'emociones' && data !== 'error') && (
                                    data.emotions.map((emotion) => (
                                        <p key={emotion[0]} className="text-sm text-center font-medium m-2">{`${emotion[0]}: ${emotion[1]}`}</p>
                                    ))
                                )}
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary hover:bg-teal-300  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                    onClick={onClose} // Función que se ejecuta cuando se hace click en el botón
                                >
                                    Aceptar
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

ResponseModal.propTypes = {
    data: PropTypes.any,
    model: PropTypes.string,
    onClose: PropTypes.func,
    isOpen: PropTypes.bool,
};