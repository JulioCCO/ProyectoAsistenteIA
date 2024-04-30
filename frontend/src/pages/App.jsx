import { useEffect } from "react";
import { useState } from "react";
import { sendBlob } from "../../client/api";
import { avocadoPredict } from "../../client/api";
import { heartPredict } from "../../client/api";
import { strokePredict } from "../../client/api";
import { winePredict } from "../../client/api";
import { recruitmentPredict } from "../../client/api";


import Form from "../components/Form";
export const App = () => {
  const [permissionsMicrophone, setPermissionsMicrophone] = useState("denied");
  const [avaibleAudioDevices, setAvaibleAudioDevices] = useState([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(undefined);
  const [isRecording, setIsRecording] = useState(false);
  const [savedAudios, setSavedAudios] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(undefined);
  const [taskTranscription, setTaskTranscription] = useState(undefined);
  const [model, setModel] = useState("corazon");
  const [formData, setFormData] = useState({});

  let globalMediaRecorder = undefined;
  const handleInputChange = (id, value) => {
    //Actualizar el estado formData con los datos ingresados en el formulario
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const onSubmit = async() => {
    if (model === "corazon") {
      let data = await heartPredict(formData);
      console.log("data", data);
      setModel("corazon");
    }else if (model === "cerebro") {
      let data = await strokePredict(formData);
      console.log("data", data);
      setModel("cerebro");
    }else if (model === "vino") {
      let data = await winePredict(formData);
      console.log("data", data);
      setModel("vino");
    }
    else if (model === "reclutamiento") {
      let data = await recruitmentPredict(formData);
      console.log("data", data);
      setModel("reclutamiento");
    }
    else if (model === "aguacate") {
      let data = await avocadoPredict(formData);
      console.log("data", data);
      setModel("aguacate");
    }
    setFormData({});
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
    console.log("handleTypeOfModel", taskTranscription);
    /*
    1-  Predice la posiblidad de que una persona sobreviva al accidente del Titanic
    2-  Prediccion del salario de un empleado
    3-  Predice si un estudiante llega a ser contratado por una empresa
    4-  Predice el costo de un tiquete de un avion 
    5-  Predice el estado emocional de una persona
    6-  Predice si una persona es propensa a recibir ataque cardiacos
    7-  Predice si una persona es propensa a recibir ataque cerebrovasculares
    8-  Predice si una persona va dejar su banco
    9-  Predice el precio del Aguacate
    10- Predice la calidad del vino
    */
  };

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

  /*
    useEffect(() => {
      console.log('useEffect: savedAudios', savedAudios);
    }, [savedAudios]);
  */

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {permissionsMicrophone === "granted" && (
        <label>
          Seleccione un dispositivo de audio:
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
      {permissionsMicrophone === "denied" && (
        <p>No tiene permiso de usar el microfono</p>
      )}
      {permissionsMicrophone === "granted" && <p>Uso de microfono permitido</p>}
      {permissionsMicrophone === "prompt" && <p>Permiso sin asignar</p>}

      {permissionsMicrophone === "granted" && !isRecording && (
        <button onClick={handleClickStartRecord}>
          <img src="microStartRecord.svg" alt="Stop icon" />
        </button>
      )}

      {permissionsMicrophone === "granted" && isRecording && (
        <button onClick={handleClickStopRecord}>
          <img src="microStopRecord.svg" alt="Stop icon" />
        </button>
      )}
      <Form
        model={model}
        onSubmit={onSubmit}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};
