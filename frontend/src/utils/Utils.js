// Esta función toma un Blob de audio y lo convierte en un archivo .wav

export function blobToWav(blob) {
    return new Promise((resolve, reject) => {
        // Crea un nuevo contexto de audio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Lee el Blob de audio
        const reader = new FileReader();
        reader.onload = function () {
            const arrayBuffer = reader.result;

            // Decodifica el array de bytes en datos de audio
            audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                // Crea un AudioBufferSourceNode
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;

                // Crea un AudioBufferSourceNode para la conversión
                const destination = audioContext.createMediaStreamDestination();
                source.connect(destination);

                // Exporta el audio como Blob en formato WAV
                const audioBlob = encodeWAV(audioBuffer);
                resolve(audioBlob);
            });
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
    });
}

// Esta función codifica un AudioBuffer en formato WAV
function encodeWAV(audioBuffer) {
    const interleaved = interleave(audioBuffer.getChannelData(0));
    const buffer = new ArrayBuffer(44 + interleaved.length * 2);
    const view = new DataView(buffer);

    // Escribir la cabecera del archivo WAV
    writeString(view, 0, 'RIFF'); // RIFF identifier
    view.setUint32(4, 36 + interleaved.length * 2, true); // file length
    writeString(view, 8, 'WAVE'); // RIFF type
    writeString(view, 12, 'fmt '); // format chunk identifier
    view.setUint32(16, 16, true); // format chunk length
    view.setUint16(20, 1, true); // sample format (raw)
    view.setUint16(22, 1, true); // channel count
    view.setUint32(24, audioBuffer.sampleRate, true); // sample rate
    view.setUint32(28, audioBuffer.sampleRate * 2, true); // byte rate (sample rate * block align)
    view.setUint16(32, 2, true); // block align (channel count * bytes per sample)
    view.setUint16(34, 16, true); // bits per sample
    writeString(view, 36, 'data'); // data chunk identifier
    view.setUint32(40, interleaved.length * 2, true); // data chunk length

    // Escribir los datos PCM como enteros de 16 bits
    let offset = 44;
    for (let i = 0; i < interleaved.length; i++, offset += 2) {
        const sample = Math.max(-1, Math.min(1, interleaved[i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
    }

    return new Blob([view], { type: 'audio/wav' });
}

// Esta función intercala los canales de audio para el formato WAV
function interleave(input) {
    const length = input.length;
    const result = new Float32Array(length * 2);
    let index = 0;
    let inputIndex = 0;

    while (index < length) {
        result[index++] = input[inputIndex];
        result[index++] = input[inputIndex];
        inputIndex++;
    }

    return result;
}

// Esta función escribe una cadena en un DataView
function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}


