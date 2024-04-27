import { useEffect } from "react";
import { useState } from "react";
import { sendBlob } from "../../client/api";


export const App = () => {

  const [permissionsMicrophone, setPermissionsMicrophone] = useState('denied');
  const [avaibleAudioDevices, setAvaibleAudioDevices] = useState([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [savedAudios, setSavedAudios] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(undefined);
  //const audio = document.querySelector("audio");
  let globalMediaRecorder = undefined;

  const sendBlobToBackend = async (blob) => {

    try {
      console.log('sendBlobToBackend: blob', blob)
      await sendBlob(blob)
    } catch (error) {
      console.error('Error al enviar el audio al backend:', error);
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

  function handleClickSeletedAudioDevice(id) {
    setSelectedAudioDevice(id);
  }

  function handleClickStartRecord() {
    if (selectedAudioDevice) {
      setIsRecording(true);
      const audio = selectedAudioDevice.length > 0 ? { deviceId: selectedAudioDevice } : true;

      navigator.mediaDevices.getUserMedia({ audio: audio, video: false }).then((stream) => {
        const options = { mimeType: 'audio/webm' };
        MediaRecorder.isTypeSupported(options) ? console.log('mimeType supported ', options) : console.log('mimeType No supported ', options);
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
      console.log('\nsavedAudios', savedAudios)
      console.log('\nsavedAudios[0][0]', savedAudios[0][0])
      sendBlobToBackend(savedAudios[0][0]);
    }
  }, [isRecording, savedAudios])


  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('mediaDevices supported..')
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
    console.log('useEffect: selectedAudioDevice', selectedAudioDevice);
  }, [selectedAudioDevice]);

  useEffect(() => {
    console.log('useEffect: savedAudios', savedAudios);
  }, [savedAudios]);

  return (

    <div>

      {permissionsMicrophone === 'granted' && (
        <div>
          <p>Devices</p>
          {avaibleAudioDevices.map((device) => (
            <button style={{ width: '100%', margin: '4px' }} key={device.id} onClick={() => handleClickSeletedAudioDevice(device.id)} >
              <p>{`audio device name: ${device.name}`}</p>
              <p>{`audio device id: ${device.id}`}</p>
            </button>
          ))}
        </div>
      )}

      {permissionsMicrophone === 'denied' && <p>No tiene permiso de usar el microfono</p>}
      {permissionsMicrophone === 'granted' && <p>Uso de microfono permitido</p>}
      {permissionsMicrophone === 'prompt' && <p>Permiso sin asignar</p>}


      {permissionsMicrophone === 'granted' && !isRecording && (
        <button
          onClick={handleClickStartRecord}
        >
          Record
        </button>
      )}

      {permissionsMicrophone === 'granted' && isRecording && (
        <button
          onClick={handleClickStopRecord}
        >
          Stop
        </button>
      )}
      {savedAudios.length > 0 && (
        <div>
          <h3>Audios</h3>
          <ul>
            {savedAudios.map((data, index) => (
              <li key={index}>
                <div>
                  {console.log(`Data: ${data}`)}
                  <p>{`Audio: ${index + 1}`}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

  )
}
