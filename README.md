# Findr - a prototype telescope finder

**⚠️ Warning: This project is a work in progress and a prototype. It is not fully functional or robust and should not be used in production environments. ⚠️**

This project provides a web-based interface to control a Raspberry Pi camera remotely. It runs a Flask web server on the Pi, allowing you to view a live stream and adjust camera settings from any web browser on the same network.

**⚠️ When I first started developing this, I noticed that there was a 
substantial amount of noise, which took the appearance of many horizontal lines
in the captured imagery, especially when the gain was set to be values greater
than one.   A bit of digging around revealed that it was likely caused
by power supply noise on the 3.3v rail, but that there was an option I could
add to `/boot/firmware/config.txt` that would fix it, and for once, it 
actually did work.  You probably want to add this line to `/boot/config.txt':

```
power_force_3v3_pwm=1
```

## Features

- **Web-Based Interface:** Control your camera from a simple web page.
- **Live Video Stream:** View a real-time MJPEG stream from the camera.
- **Camera Controls:** Adjust settings like gain, exposure, and white balance.
- **Headless Operation:** Runs on a Raspberry Pi without a monitor or keyboard.
- **Development Mode:** Includes a dummy camera interface for development on non-Pi machines.
- **GPS Integration:** Displays real-time GPS data (time, location, altitude) on the web interface.

## GPS Setup

To use the GPS functionality, you need to connect a GPS receiver to your Raspberry Pi's GPIO pins. The application reads GPS data from the serial port `/dev/ttyAMA0`.

1.  **Enable the serial port:**
    - Run `sudo raspi-config`.
    - Go to `Interface Options` -> `Serial Port`.
    - When asked "Would you like a login shell to be accessible over serial?", select **No**.
    - When asked "Would you like the serial port hardware to be enabled?", select **Yes**.
    - Reboot your Raspberry Pi.

2.  **Connect the GPS receiver:**
    - **GPS TX** to **Raspberry Pi RX (GPIO 15)**
    - **GPS RX** to **Raspberry Pi TX (GPIO 14)**
    - **GPS VCC** to **Raspberry Pi 3.3V or 5V** (check your GPS module's requirements)
    - **GPS GND** to **Raspberry Pi GND**
    - **GPS PPS** to **Raspberry Pi GPIO 4 (optional)**. The application does not currently use the PPS signal, but it can be used for precise time synchronization.

Once connected and enabled, the application will automatically detect the GPS and display the data on the web page.

## Project Structure

```
.
├── app.py                  # Main Flask application
├── camera_dummy.py         # Dummy camera for development
├── requirements.txt        # Python dependencies
├── static
│   ├── main.js             # Client-side JavaScript
│   └── style.css           # Stylesheet
└── templates
    └── index.html          # Main HTML page
```

## Installation and Usage

There are two ways to run this project: on a development machine (like a laptop) or on a Raspberry Pi.

### On a Development Machine (Non-Pi)

This setup uses a dummy camera feed, allowing you to work on the web interface without a Raspberry Pi.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Create and activate a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the application:**
    ```bash
    python app.py
    ```

5.  Open your web browser and go to `http://127.0.0.1:8080` to see the interface with the dummy camera feed.

### On a Raspberry Pi

This setup uses the actual Raspberry Pi camera.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Create and activate a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

3.  **Install the dependencies from `requirements.txt`:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Install the `picamera2` library:**
    ```bash
    pip install picamera2
    ```

5.  **Run the application:**
    ```bash
    python app.py
    ```

6.  Find your Raspberry Pi's IP address (e.g., by running `hostname -I`) and open a web browser on another device on the same network. Go to `http://<your-pi-ip-address>:8080`.
