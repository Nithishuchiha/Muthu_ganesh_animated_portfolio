// projects.js — Muthu Ganesh | MGP Tech Innovation
// Videos mapped from actual content analysis of uploaded files

// ─── Video Imports (from src/assets/) ────────────────────────────────────────
import promEepromVideo      from "../assets/videos/WhatsApp Video 2026-05-21 at 10.25.52 AM.mp4";     // PROM vs EEPROM side-by-side hardware
import sevenSegDisplayVideo from "../assets/videos/WhatsApp Video 2026-05-21 at 8.11.27 AM.mp4";      // 7-seg scrolling city names (live demo)
import sevenSegProgVideo    from "../assets/videos/WhatsApp Video 2026-05-21 at 10.20.57 AM.mp4";     // Laptop + 7-seg programming session
import a7076cMainVideo      from "../assets/videos/WhatsApp Video 2026-05-21 at 10.22.34 AM.mp4";     // Tera Term + MQTTBox main demo
import mqttPublishVideo     from "../assets/videos/3rd vidweo at 10.22.34 AM.mp4";                    // MQTT publish/subscribe demo
import atCommandsVideo      from "../assets/videos/WhatsApp Video 2026-05-21 at 10.24.53 AM.mp4";     // AT commands testing session
import mqttSessionVideo     from "../assets/videos/WhatsApp Video 2026-05-21 at 10.24.53 AM (1).mp4"; // Extra MQTT session variant

// ─── Thumbnail Imports ────────────────────────────────────────────────────────
// Place extracted JPGs inside src/assets/thumbnails/
// Run once to generate them:
//   ffmpeg -i <video> -ss 00:00:02 -vframes 1 src/assets/thumbnails/<name>.jpg
import thumbPromEeprom   from "../assets/thumbnails/prom-eeprom.jpg";
import thumbSevenSeg     from "../assets/thumbnails/seven-seg.jpg";
import thumbSevenSegProg from "../assets/thumbnails/seven-seg-prog.jpg";
import thumbA7076c       from "../assets/thumbnails/a7076c.jpg";
import thumbMqtt         from "../assets/thumbnails/mqtt-demo.jpg";

// ─────────────────────────────────────────────────────────────────────────────

export const projects = [
  {
    id: "prom-eeprom-explainer",
    title: "PROM vs EEPROM",
    tagline: "Side-by-side embedded memory comparison",
    category: "Embedded / Education",
    year: "2025",
    tech: ["PROM", "EEPROM", "Microcontrollers", "Non-Volatile Memory"],
    description:
      "A hardware demonstration comparing PROM and EEPROM side-by-side on breadboard — showing real 7-segment display modules wired to each memory type to illustrate one-time vs. re-programmable behavior.",
    longDescription:
      "This project physically demonstrates the core difference between PROM (one-time programmable) and EEPROM (electrically erasable & re-programmable) using live hardware on a breadboard. Two identical 7-segment display setups run in parallel — one driven from PROM, the other from EEPROM — making the distinction tangible. Key use cases covered include microcontrollers, BIOS chips, and non-volatile data logging systems. Essential viewing for anyone beginning embedded system design and needing to choose the right memory component.",
    video: promEepromVideo,
    thumbnail: thumbPromEeprom,
    links: { github: "#" },
    color: "#00ffc8",
    featured: true,
  },
  {
    id: "seven-seg-display-module",
    title: "3-Digit 7-Segment Display",
    tagline: "Custom PCB scrolling live data",
    category: "PCB Design / Hardware",
    year: "2025",
    tech: ["EAGLE CAD", "UDN2981A", "BC547", "PIC Microcontroller", "MPLAB"],
    description:
      "A custom-designed PCB driving a 3-digit 7-segment display that scrolls live data — demonstrated here showing Indian city names (Chennai, Coimbatore, Vellore) cycling in real time.",
    longDescription:
      "Designed under MGP Tech Innovation, this 76 x 69.5 mm single-layer PCB drives a SUNR056CC3D common-cathode 3-digit 7-segment display. The circuit uses a UDN2981A source driver IC (18-pin DIP) with BC547 NPN transistors handling digit multiplexing. BOM includes 22kΩ and 1.2kΩ resistors, 40x1 female berg strip connectors. The live demo video shows real scrolling text output — city names cycling across the display — validating the full firmware and hardware stack. Unit cost: Rs.603 per board.",
    video: sevenSegDisplayVideo,
    thumbnail: thumbSevenSeg,
    links: { github: "#" },
    color: "#ffd166",
    featured: true,
  },
  {
    id: "seven-seg-programming",
    title: "7-Seg Live Programming",
    tagline: "Firmware flashing with MPLAB X IDE",
    category: "Embedded / Firmware",
    year: "2025",
    tech: ["MPLAB X IDE", "XC8 Compiler", "PIC16F887", "7-Segment", "C"],
    description:
      "Programming the 3-digit 7-segment display module live — MPLAB X IDE open on a laptop while the display updates in real time as firmware changes are flashed.",
    longDescription:
      "This video captures the development workflow for the 7-segment display project: MPLAB X IDE with the XC8 C compiler running on a laptop, directly connected to the custom PCB via a PICkit programmer. As code changes are compiled and flashed, the 7-segment display updates live on the bench. Covers GPIO TRIS/PORT register configuration, digit multiplexing timing, and the full programmer/debugger workflow — a practical companion to the hardware design video.",
    video: sevenSegProgVideo,
    thumbnail: thumbSevenSegProg,
    links: { github: "#" },
    color: "#ff6b35",
    featured: false,
  },
  {
    id: "a7076c-serial-comm",
    title: "A7076C Serial Interface",
    tagline: "AT commands + MQTT over Tera Term",
    category: "IoT / Communication",
    year: "2025",
    tech: ["Tera Term", "MQTTBox", "AT Commands", "UART", "USB-to-TTL"],
    description:
      "Full serial communication demo with the A7076C module — Tera Term on COM7 sending AT commands while MQTTBox confirms publish/subscribe message delivery in real time.",
    longDescription:
      "This project establishes a complete IoT communication pipeline using the A7076C module. Tera Term (COM7) handles the low-level UART serial interface via a USB-to-TTL adapter, sending AT commands and reading back responses. MQTTBox runs alongside as the MQTT client, confirming that published payloads reach subscribers with correct topic routing. Key outcomes: verified AT handshake, baud rate config, MQTT topic subscription, and payload parsing — the full embedded-to-cloud data path validated end-to-end.",
    video: a7076cMainVideo,
    thumbnail: thumbA7076c,
    links: { github: "#" },
    color: "#4f9eff",
    featured: false,
  },
  {
    id: "mqtt-publish-demo",
    title: "MQTT Publish / Subscribe",
    tagline: "Live broker messaging with MQTTBox",
    category: "IoT / Networking",
    year: "2025",
    tech: ["MQTTBox", "Tera Term", "MQTT Protocol", "A7076C", "JSON"],
    description:
      "A focused demo of MQTT publish/subscribe messaging — JSON payload sent from MQTTBox, received and echoed back via the A7076C module with Tera Term confirming the full round-trip.",
    longDescription:
      "Building on the A7076C serial interface project, this demo isolates the MQTT messaging layer. A JSON payload is published from MQTTBox to a broker topic; the A7076C module subscribes and the response is verified in Tera Term, completing the round-trip. The session shows retain flag handling, QoS levels (At Most Once), and raw payload inspection — invaluable for debugging IoT data pipelines before connecting real sensors or actuators.",
    video: mqttPublishVideo,
    thumbnail: thumbMqtt,
    links: { github: "#" },
    color: "#c084fc",
    featured: false,
  },
  {
    id: "at-commands-session",
    title: "AT Command Testing",
    tagline: "Debugging embedded comms via serial terminal",
    category: "Embedded / Debugging",
    year: "2025",
    tech: ["AT Commands", "Tera Term", "UART", "A7076C", "Serial Debug"],
    description:
      "Raw AT command session over Tera Term — systematically sending commands to the A7076C module and verifying responses, covering connectivity, payload, and configuration commands.",
    longDescription:
      "This session documents the AT command workflow used to configure and debug the A7076C communication module over UART. Commands are sent sequentially through Tera Term on COM7: connectivity checks, parameter reads, payload sends, and error handling. Each response is logged and validated. Foundational technique for any engineer working with GSM, Wi-Fi, or BLE modules before writing higher-level firmware abstractions.",
    video: atCommandsVideo,
    thumbnail: thumbA7076c,
    links: { github: "#" },
    color: "#06d6a0",
    featured: false,
  },
];

export const getProjectById = (id) => projects.find((p) => p.id === id);