import { useEffect } from "react";
import { useState } from "react";


export const App = () => {

  const [permissionsMicrophone, setPermissionsMicrophone] = useState('denied');
  const [avaibleAudioDevices, setAvaibleAudioDevices] = useState([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState('');


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
    setPermissionsMicrophone(state)
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

  useEffect(() => {
    navigator.permissions.query({ name: "microphone" })
      .then(async function (queryResult) {
        console.log('current:', queryResult.state);
        await handlePermissionState(queryResult.state);
        queryResult.onchange = async function (onChangeResult) {
          console.log('change', onChangeResult.target.state);
          await handlePermissionState(onChangeResult.target.state);
        }
      })

  }, [])

  useEffect(() => {
    console.log('selectedAudioDevice', selectedAudioDevice);
  }, [selectedAudioDevice]);

  return (

    <div>

      {permissionsMicrophone === 'granted' && (
        <div>
          <p>Devices</p>
          {avaibleAudioDevices.map((device) => (
            <button key={device.id} onClick={(event) => handleClickSeletedAudioDevice(device.id)} >
              <p>{`audio device name: ${device.name}`}</p>
              <p>{`audio device id: ${device.id}`}</p>
            </button>
          ))}
        </div>
      )}

      {permissionsMicrophone === 'denied' && <p>No tiene permiso de usar el microfono</p>}
      {permissionsMicrophone === 'granted' && <p>Uso de microfono permitido</p>}
      {permissionsMicrophone === 'prompt' && <p>Permiso sin asignar</p>}

    </div>

  )
}
