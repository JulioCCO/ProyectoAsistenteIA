import { useEffect } from "react";
import { useState } from "react";
import { sendBlob, sendImage } from "../../client/api";
import { AnimatedGif } from "../components/AnimatedGif";
import { avocadoPredict } from "../../client/api";
import { heartPredict } from "../../client/api";
import { strokePredict } from "../../client/api";
import { winePredict } from "../../client/api";
import { recruitmentPredict } from "../../client/api";
import { bankPredict } from "../../client/api";
import { titanicPredict } from "../../client/api";
import { salaryPredict } from "../../client/api";
import { moodPredict } from "../../client/api";
import { flightPredict } from "../../client/api";

import Form from "../components/Form";
import { ResponseModal } from "./ResponseModal";

export const App = () => {
  /*Audio*/
  const [permissionsMicrophone, setPermissionsMicrophone] = useState("denied");
  const [avaibleAudioDevices, setAvaibleAudioDevices] = useState([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(undefined);
  const [isRecording, setIsRecording] = useState(false);
  const [savedAudios, setSavedAudios] = useState([]);

  /*general*/
  const [mediaRecorder, setMediaRecorder] = useState(undefined);
  const [taskTranscription, setTaskTranscription] = useState(undefined);

  const [model, setModel] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);

  /*result */
  const [responseResult, setResponseResult] = useState(undefined);
  const [resultFlag, setResultFlag] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  /*Animation*/
  const [isProcessing, setIsProcessing] = useState(false);

  /*input*/
  const [inputValue, setInputValue] = useState('');

  let globalMediaRecorder = undefined;

  const handleInputChange = (id, value) => {
    //Actualizar el estado formData con los datos ingresados en el formulario
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const onSubmitError = async () => {
    setShowForm(false);
    setFormData({});
  }
  const onSubmit = async () => {
    let data = null;
    switch (model) {
      case "vuelo":
        data = await flightPredict(formData);
        break;
      case "banco":
        data = await bankPredict(formData);
        break;
      case "humor":
        data = await moodPredict(formData);
        break;
      case "salario":
        data = await salaryPredict(formData);
        break;
      case "titanic":
        data = await titanicPredict(formData);
        break;
      case "corazón":
        data = await heartPredict(formData);
        break;
      case "cerebro":
        data = await strokePredict(formData);
        break;
      case "vino":
        data = await winePredict(formData);
        break;
      case "reclutamiento":
        data = await recruitmentPredict(formData);
        break;
      case "aguacate":
        data = await avocadoPredict(formData);
        break;
      case "emociones":
        console.log('formData.photo', formData.photo)
        if (formData.photo !== undefined) {
          data = await sendImage(formData.photo);
        }
        else {
          data = 'error';
        }
        break;
      default:
        data = 'error';
        break;
    }
    setShowForm(false);
    setFormData({});
    setResponseResult(data);
    console.log("data de la respuesta del modelo", data);
  };

  const sendBlobToBackend = async (blob) => {
    try {
      let data = await sendBlob(blob);
      setTaskTranscription(data);
    } catch (error) {
      console.error("Error al enviar el audio al backend:", error);
      throw new Error(`Error al enviar el audio al backend:: ${error.message}`);
    }
  };

  async function handlePermissionState(state) {
    setPermissionsMicrophone(state);
    if (state === "granted") {
      await getAvailableAudioDevices().then((devices) => {
        setAvaibleAudioDevices(devices);
        setSelectedAudioDevice(
          devices.find((device) => device.id === "default")?.id
        );
      });
    }
  }

  async function getAvailableAudioDevices() {
    return await new Promise((resolve) => {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const avaibleDevices = devices
          .filter((d) => d.kind === "audioinput")
          .map((d) => {
            return { id: d.deviceId, name: d.label };
          });
        resolve(avaibleDevices);
      });
    });
  }

  function handleClickStartRecord() {
    if (selectedAudioDevice) {
      setIsRecording(true);
      const audio =
        selectedAudioDevice.length > 0
          ? { deviceId: selectedAudioDevice }
          : true;

      navigator.mediaDevices
        .getUserMedia({ audio: audio, video: false })
        .then((stream) => {
          const options = { mimeType: "audio/webm" };
          let recordedChunks = [];
          globalMediaRecorder = new MediaRecorder(stream, options);

          globalMediaRecorder.addEventListener("dataavailable", function (e) {
            if (e.data.size > 0) recordedChunks.push(e.data);
          });

          globalMediaRecorder.addEventListener("stop", function () {
            setSavedAudios((prev) => [...prev, recordedChunks]);
            stream.getTracks().forEach(function (track) {
              track.stop();
            });
          });
          setMediaRecorder(globalMediaRecorder);
          globalMediaRecorder.start();
        });
    }
  }

  async function handleClickStopRecord() {
    setIsRecording(false);
    mediaRecorder.stop();
  }

  const handleTypeOfModel = () => {
    if (taskTranscription.toLowerCase().includes("toki")) {
      if (taskTranscription.toLowerCase().includes("emociones")) {
        setModel("emociones");
      } else if (taskTranscription.toLowerCase().includes("corazón")) {
        setModel("corazón");
      } else if (
        taskTranscription.toLowerCase().includes("cerebro") ||
        taskTranscription.toLowerCase().includes("serebro")
      ) {
        setModel("cerebro");
      } else if (taskTranscription.toLowerCase().includes("vino")) {
        setModel("vino");
      } else if (taskTranscription.toLowerCase().includes("reclutamiento")) {
        setModel("reclutamiento");
      } else if (taskTranscription.toLowerCase().includes("aguacate")) {
        setModel("aguacate");
      } else if (taskTranscription.toLowerCase().includes("banco")) {
        setModel("banco");
      } else if (taskTranscription.toLowerCase().includes("salario")) {
        setModel("salario");
      } else if (taskTranscription.toLowerCase().includes("humor")) {
        setModel("humor");
      } else if (
        taskTranscription.toLowerCase().includes("titanic") ||
        taskTranscription.toLowerCase().includes("titanik")
      ) {
        setModel("titanic");
      } else if (taskTranscription.toLowerCase().includes("vuelo")) {
        setModel("vuelo");
      }
      else {
        setModel('error');
      }
    } else {
      setModel('error');
    }
    setShowForm(true);
    setTaskTranscription(undefined);
    setIsProcessing(false);
  };

  const onClose = () => {
    setResultFlag(false);
    setModel(undefined);
    //setIsOpen(false);
    setResponseResult(undefined);
  };
  const handleInput = () => {
    console.log(inputValue);
    setTaskTranscription('toki' + inputValue);
    setInputValue('');
  }

  useEffect(() => {
    console.log("useEffect: responseResult", responseResult);
    if (responseResult !== undefined) {
      setResultFlag(true);
      setIsOpen(true);
    }
  }, [responseResult]);

  useEffect(() => {
    if (taskTranscription !== undefined) {
      console.log("useEffect: taskTranscription", taskTranscription);
      handleTypeOfModel();
    }
  }, [taskTranscription]);

  useEffect(() => {
    if (selectedAudioDevice !== undefined)
      console.log("useEffect: selectedAudioDevice", selectedAudioDevice);
  }, [selectedAudioDevice]);

  useEffect(() => {
    if (isRecording === false && savedAudios.length > 0) {
      let largo = savedAudios.length - 1;
      if (largo < 0) largo = 0;
      sendBlobToBackend(savedAudios[largo][0]);
      setIsProcessing(true);
    }
  }, [isRecording, savedAudios]);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("media devices supported..");
      navigator.mediaDevices.getUserMedia({ audio: true });
    }

    navigator.permissions
      .query({ name: "microphone" })
      .then(async function (queryResult) {
        await handlePermissionState(queryResult.state);
        queryResult.onchange = async function (onChangeResult) {
          await handlePermissionState(onChangeResult.target.state);
        };
      });
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="bg-[#31bbb4] py-4 px-6 flex items-center justify-center w-full">
        <h1 className="text-2xl font-bold text-white">
          Toki Asistente Inteligente
        </h1>
      </div>
      {permissionsMicrophone === "granted" && (
        <label className="text-lg text-center font-medium m-2 text-secondary">
          Dispositivos de audio:
          <select
            name="selectedDevice"
            value={selectedAudioDevice}
            onChange={(e) => setSelectedAudioDevice(e.target.value)} // ... and update the state variable on any change!
          >
            {avaibleAudioDevices.map((device) => (
              <option key={device.id} value={`${device.name}`}>
                {device.name}
              </option>
            ))}
          </select>
        </label>
      )}

      {permissionsMicrophone === "granted" && !isRecording && (
        <button
          onClick={handleClickStartRecord}
          className={`relative overflow-hidden ${isProcessing ? "animate-pulse" : ""
            }`}
          style={{ width: "fit-content" }}
        >
          <AnimatedGif
            src="https://media.tenor.com/CigpzapemsoAAAAi/hi-robot.gif"
            alt="Animated GIF"
          />
        </button>
      )}

      {permissionsMicrophone === "granted" && isRecording && (
        <>
          <button onClick={handleClickStopRecord} className="relative">
            <AnimatedGif
              src="https://media.tenor.com/CigpzapemsoAAAAi/hi-robot.gif"
              alt="Animated GIF"
            />
          </button>
          <span className="flex items-center justify-center text-blue-500 font-bold animate-pulse">
            Recording...
          </span>
        </>
      )}
      <div className="text-sm text-center font-medium m-2">
        {permissionsMicrophone === "denied" && (
          <p className="text-red-500">No tiene permiso de usar el micrófono</p>
        )}
        {permissionsMicrophone === "granted" && (
          <p className="text-green-500">Uso de micrófono permitido</p>
        )}
        {permissionsMicrophone === "prompt" && (
          <p className="text-yellow-500">Permiso sin asignar</p>
        )}
      </div>

      <span className="text-slate-400 font-mono mt-8 mb-2">-o intenta-</span>
      <div className="text-sm text-center font-medium m-2">
        <input
          type="text"
          placeholder="Ingrese clave del modelo"
          className="hover:border hover:border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button
          className="m-2 bg-secondary hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleInput}>
          Aceptar
        </button>
      </div>

      {showForm && (
        <Form
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          handleInputChange={handleInputChange}
        />
      )}

      {resultFlag === true && (
        <ResponseModal
          data={responseResult}
          model={model}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
    </div>
  );
};
