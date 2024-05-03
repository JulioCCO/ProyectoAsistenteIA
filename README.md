# ProyectoAsistenteIA
Welcome to our emotion recognition and audio processing virtual assistant repository! This project uses various AI models like KNN, Random Forest, etc., to analyze audio input from React JS frontend. Additionally, it processes real-time facial expressions to recognize emotions. Join us!

## Project dependencies
* `Python` 3.10.10
* Update `pip` using:
```
python.exe -m pip install --upgrade pip
```
* `Install PyTorch` 
```
Using: Before installing Pytorch, check which is the installation you should do according to your computer, You can do it on the official site: https://pytorch.org/
Here you can choose depending on the operating system, package, language and very important also if your computer has a graphic card or not.

For this project we used: pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```
* `Chocolatey` package manager (on Windows) and `ffmpeg` using chocolatey through this command:
Website: https://chocolatey.org/install
To install the Chocolatey library on Windows you have to run the PowerShell in administrator mode, and copy the command from the link,
having chosen the individual installation.  
```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```
```
Then in the same console run: choco install ffmpeg
```
* `Whisper AI`
To install Whisper run the windows CMD and type the command in the following line:
```
pip install -U openai-whisper
```

> [!WARNING]
> You also need to create the directories `images` and `audios` inside the `backend` folder for the correct operation of the assistant
> You also have to create a file called `key.txt`, where your key created in OpenAi will be, in your profile in the "API keys" section.
### Backend dependencies

For the execution of the backend of this project, the following complements must be installed:
```
$> pip install openai
$> pip install openai-whisper
$> pip install flask
$> pip install statsmodels
$> pip install scikit-learn==1.2.2
$> pip install pandas
$> pip install FER
$> pip install tensorflow
``` 
