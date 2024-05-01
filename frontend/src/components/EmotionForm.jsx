import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';

export const EmotionForm = ({ isOpen, onClose, handleInputChange }) => {

    const videoRef = useRef(null);
    const photoRef = useRef(null);
    /*Video*/
    const [permissionsCamera, setPermissionsCamera] = useState("denied");
    const [avaibleVideoDevices, setAvaibleVideoDevices] = useState([]);
    const [selectedVideoDevice, setSelectedVideoDevice] = useState(undefined);

    async function handleCameraPermissionState(state) {
        setPermissionsCamera(state);
        if (state === "granted") {
            await getAvailableVideoDevices().then((devices) => {
                setAvaibleVideoDevices(devices);
                setSelectedVideoDevice(
                    devices.find((device) => device.id === "default")?.id
                );
            });
        }
    }

    async function getAvailableVideoDevices() {
        return await new Promise((resolve) => {
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                const avaibleDevices = devices
                    .filter((d) => d.kind === "videoinput")
                    .map((d) => {
                        return { id: d.deviceId, name: d.label };
                    });
                resolve(avaibleDevices);
            });
        });
    }
    const videoSettings = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("media devices supported..");
            navigator.mediaDevices.getUserMedia({ video: { width: 450, height: 450 } })
                .then((stream) => {
                    let video = videoRef.current;
                    video.srcObject = stream;
                    video.play();
                })
                .catch((err) => {
                    console.error(err);
                })
        }

        navigator.permissions
            .query({ name: "camera" })
            .then(async function (queryResult) {
                await handleCameraPermissionState(queryResult.state);
                queryResult.onchange = async function (onChangeResult) {
                    await handleCameraPermissionState(onChangeResult.target.state);
                };
            });
    }
    useEffect(() => {
        videoSettings()
    }, [])

    useEffect(() => {
        if (permissionsCamera === 'granted') videoSettings()
    }, [permissionsCamera])

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
                                {"Deteccion de emociones"}
                            </Dialog.Title>
                            <div>
                                {permissionsCamera === "granted" && (
                                    <label>
                                        Dispositivos de video:
                                        <select
                                            name="selectedDevice"
                                            value={selectedVideoDevice}
                                            onChange={(e) => setSelectedVideoDevice(e.target.value)} // ... and update the state variable on any change!
                                        >
                                            {avaibleVideoDevices.map((device) => (
                                                <option key={device.id} value={`${device.name}`}>
                                                    {device.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                )}
                                {/* FALTA MOSTRAR LA CAMARA Y TOMAR FOTO */}
                                <video ref={videoRef}></video>
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary hover:bg-teal-300  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                    onClick={onClose} // Función que se ejecuta cuando se hace click en el botón
                                >
                                    Tomar foto
                                </button>
                                <canvas className="m-2" ref={photoRef}></canvas>
                                {permissionsCamera === 'denied' && <p>No tiene permiso de usar la camara</p>}
                                {permissionsCamera === 'granted' && <p>Uso de camara permitido</p>}
                                {permissionsCamera === 'prompt' && <p>Permiso sin asignar</p>}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>


    )
}

EmotionForm.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    handleInputChange: PropTypes.func,
};