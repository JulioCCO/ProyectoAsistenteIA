import { useEffect } from "react";
import { useState } from "react";
import { sendBlob } from "../../client/api";
import { AnimatedGif } from "../components/AnimatedGif";
import { avocadoPredict } from "../../client/api";
import { heartPredict } from "../../client/api";
import { strokePredict } from "../../client/api";
import { winePredict } from "../../client/api";
import { recruitmentPredict } from "../../client/api";

import Form from "../components/Form";

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


  let globalMediaRecorder = undefined;

  const handleInputChange = (id, value) => {
    //Actualizar el estado formData con los datos ingresados en el formulario
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const onSubmit = async () => {
    let data = null;
    switch (model) {
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
        console.log('emociones');
        //data = await avocadoPredict(formData);
        break;
    }
    console.log('data de la respuesta del modelo', data);
    setModel(undefined)
    setShowForm(false);
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
    if (taskTranscription.toLowerCase().includes('emociones')) {
      setModel('emociones')
    }
    else if (taskTranscription.toLowerCase().includes('corazón')) {
      setModel('corazón');
    }
    else if (taskTranscription.toLowerCase().includes('cerebro')) {
      setModel('cerebro');
    }
    else if (taskTranscription.toLowerCase().includes('vino')) {
      setModel('vino');
    }
    else if (taskTranscription.toLowerCase().includes('reclutamiento')) {
      setModel('reclutamiento');
    }
    else if (taskTranscription.toLowerCase().includes('aguacate')) {
      setModel('aguacate');
    }
    setShowForm(true);
    setTaskTranscription(undefined);
    /*
    1-  Predice la posiblidad de que una persona sobreviva al accidente del Titanic: true o false
    2-  Prediccion del salario de un empleado: float
    3-  Predice si un estudiante llega a ser contratado por una empresa: true o false
    4-  Predice el costo de un tiquete de un avion: float
    5-  Predice el estado emocional de una persona: low, medium, high
    6-  Predice si una persona es propensa a recibir ataque cardiacos: true o false
    7-  Predice si una persona es propensa a recibir ataque cerebrovasculares: true o false
    8-  Predice si una persona va dejar su banco: true o false
    9-  Predice el precio del Aguacate: float
    10- Predice la calidad del vino: bad, regular, good
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

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {permissionsMicrophone === "granted" && (
        <label>
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
        <button onClick={handleClickStartRecord}>
          <AnimatedGif src="https://media.tenor.com/CigpzapemsoAAAAi/hi-robot.gif" alt="Animated GIF" />

        </button>
      )}

      {permissionsMicrophone === "granted" && isRecording && (
        <button onClick={handleClickStopRecord}>
          <AnimatedGif src="https://media.tenor.com/CigpzapemsoAAAAi/hi-robot.gif" alt="Animated GIF" />
          Recording...
        </button>
      )}

      {permissionsMicrophone === 'denied' && <p>No tiene permiso de usar el microfono</p>}
      {permissionsMicrophone === 'granted' && <p>Uso de microfono permitido</p>}
      {permissionsMicrophone === 'prompt' && <p>Permiso sin asignar</p>}

      {showForm &&
        (<Form
          model={model}
          onSubmit={onSubmit}
          handleInputChange={handleInputChange}
        />)}

    </div>

  );
};
