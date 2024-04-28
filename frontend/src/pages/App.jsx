import { useEffect } from "react";
import { useState } from "react";
import { sendBlob } from "../../client/api";


export const App = () => {

  const [permissionsMicrophone, setPermissionsMicrophone] = useState('denied');
  const [avaibleAudioDevices, setAvaibleAudioDevices] = useState([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(undefined);
  const [isRecording, setIsRecording] = useState(false);
  const [savedAudios, setSavedAudios] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(undefined);
  const [taskTranscription, setTaskTranscription] = useState(undefined); 

  let globalMediaRecorder = undefined;

  const sendBlobToBackend = async (blob) => {

    try {

      let data = await sendBlob(blob);
      setTaskTranscription(data);
    } catch (error) {
      console.error('Error al enviar el audio al backend:', error);
      throw new Error(`Error al enviar el audio al backend:: ${error.message}`);
    }

  }

  async function getAvailableAudioDevices() {
    return await new Promise((resolve) => {
      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          const avaibleDevices = devices
            .filter((d) => d.kind === 'audioinput')
            .map((d) => {
              return { id: d.deviceId, name: d.label }
            })
          resolve(avaibleDevices)
        })
    })
  }

  async function handlePermissionState(state) {
    setPermissionsMicrophone(state);
    if (state === 'granted') {
      await getAvailableAudioDevices()
        .then((devices) => {
          setAvaibleAudioDevices(devices);
          setSelectedAudioDevice(devices.find((device) => device.id === 'default')?.id);
        })
    }
  }

  function handleClickStartRecord() {
    if (selectedAudioDevice) {
      setIsRecording(true);
      const audio = selectedAudioDevice.length > 0 ? { deviceId: selectedAudioDevice } : true;

      navigator.mediaDevices.getUserMedia({ audio: audio, video: false }).then((stream) => {
        const options = { mimeType: 'audio/webm' };
        let recordedChunks = [];
        globalMediaRecorder = new MediaRecorder(stream, options)

        globalMediaRecorder.addEventListener('dataavailable', function (e) {
          if (e.data.size > 0) recordedChunks.push(e.data);
        })

        globalMediaRecorder.addEventListener('stop', function () {

          setSavedAudios((prev) => [...prev, recordedChunks]);
          stream.getTracks().forEach(function (track) {
            track.stop();
          })
        })
        setMediaRecorder(globalMediaRecorder);
        globalMediaRecorder.start();
      })
    }
  }

  async function handleClickStopRecord() {
    setIsRecording(false);
    mediaRecorder.stop();
  }


  useEffect(() => {
    if (isRecording === false && savedAudios.length > 0) {
      let largo = savedAudios.length - 1;
      if (largo < 0) largo = 0;
      sendBlobToBackend(savedAudios[largo][0]);
    }
  }, [isRecording, savedAudios])


  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('media devices supported..')
      navigator.mediaDevices
        .getUserMedia({ audio: true })
    }

    navigator.permissions.query({ name: "microphone" })
      .then(async function (queryResult) {
        await handlePermissionState(queryResult.state);
        queryResult.onchange = async function (onChangeResult) {
          await handlePermissionState(onChangeResult.target.state);
        }
      })

  }, [])

  useEffect(() => {
    if (taskTranscription !== undefined) console.log('useEffect: taskTranscription', taskTranscription);
  }, [taskTranscription]);


  useEffect(() => {
    if (selectedAudioDevice !== undefined) console.log('useEffect: selectedAudioDevice', selectedAudioDevice);
  }, [selectedAudioDevice]);
  /*
    useEffect(() => {
      console.log('useEffect: savedAudios', savedAudios);
    }, [savedAudios]);
  */
  return (

    <div>
      {permissionsMicrophone === 'granted' && (
        <label>
          Seleccione un dispositivo de audio:
          <select name="selectedDevice"
            value={selectedAudioDevice}
            onChange={e => setSelectedAudioDevice(e.target.value)} // ... and update the state variable on any change!
          >
            {avaibleAudioDevices.map((device) => (
              <option key={device.id} value={`${device.name}`}>{device.name}</option>
            ))}
          </select>
        </label>
      )}
      {permissionsMicrophone === 'denied' && <p>No tiene permiso de usar el microfono</p>}
      {permissionsMicrophone === 'granted' && <p>Uso de microfono permitido</p>}
      {permissionsMicrophone === 'prompt' && <p>Permiso sin asignar</p>}

      {permissionsMicrophone === 'granted' && !isRecording && (
        <button
          onClick={handleClickStartRecord}
        >
          <img src='microStartRecord.svg' alt="Stop icon" />
        </button>
      )}

      {permissionsMicrophone === 'granted' && isRecording && (
        <button
          onClick={handleClickStopRecord}
        >
          <img src='microStopRecord.svg' alt="Stop icon" />
        </button>
      )}

    </div>

  )
}
