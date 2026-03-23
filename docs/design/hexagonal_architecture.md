# Hexagonal Architecture (Ports and Adapters) for Enigma Machine

This document outlines how the Hexagonal Architecture (also known as Ports and Adapters) pattern is applied to the Enigma Machine TypeScript project.

## Core Philosophy

The primary goal of Hexagonal Architecture is to isolate the **Core Domain** (the business logic, or in our case, the cryptographic rules of the Enigma machine) from all external concerns (UI, databases, file systems, network requests). 

This isolation allows the core logic to be tested independently and adapted to different interfaces (CLI, API, Web UI) without any changes to the underlying algorithm.

## Layers

Our application is structured into three main areas:

### 1. The Core Domain (The "Hexagon")

**Location:** `src/domain/`

This is the heart of the application. It contains pure TypeScript code and has **zero dependencies** on external libraries or frameworks (no Express, no CLI parsers, no file system access).

*   **Entities & Models:** Classes representing the physical components of the machine (`Rotor`, `Reflector`, `Plugboard`, `EnigmaMachine`).
*   **Types & Value Objects:** Strict type definitions defining concepts like valid characters (`A-Z`), wiring configurations, and machine states.

*Rule: Nothing inside `src/domain` can import anything from `src/ports` or `src/adapters`.*

### 2. Ports (Interfaces)

**Location:** `src/ports/`

Ports define the boundaries of the Core Domain. They act as contracts specifying how the outside world can interact with the core, or how the core can request things from the outside world.

*   **Inbound Ports (Primary Ports):** Interfaces that dictate how external clients can use the Enigma machine. 
    *   *Example:* `IEnigmaService` (methods: `encrypt(text)`, `configure(settings)`).
*   **Outbound Ports (Secondary Ports):** Interfaces that the core uses to talk to external systems (e.g., if it needs to save its state).
    *   *Example:* `IMachineStateRepository` (methods: `saveState(state)`, `loadState()`).

*Rule: Ports are just TypeScript `interface` or abstract class definitions. They contain no implementation.*

### 3. Adapters

**Location:** `src/adapters/`

Adapters are the concrete implementations that bridge the gap between external systems and the Ports. 

*   **Inbound Adapters (Primary Adapters):** These "drive" the application. They translate external requests (like a CLI command or an HTTP request) into method calls on the Inbound Ports.
    *   *Example:* A `CliAdapter` reads command-line arguments and calls `enigmaService.encrypt()`.
    *   *Example:* An `ApiAdapter` (Express route) receives a JSON payload and calls `enigmaService.encrypt()`.
*   **Outbound Adapters (Secondary Adapters):** These are "driven" by the application. They implement the Outbound Ports to interact with external systems.
    *   *Example:* A `FileStateRepository` implements `IMachineStateRepository` by writing JSON to the local filesystem using Node's `fs` module.

*Rule: Adapters depend on Ports. Inbound adapters depend on the Core Domain (via Inbound Ports). Outbound Adapters implement Outbound Ports.*

## Visual Representation

```text
[ External World (CLI, API, Files) ]
           |
           v
+---------------------------------------------------+
|                  ADAPTERS LAYER                   |
|  [ CLI Adapter ]     [ Persistence Adapter ]      |
+--------|------------------------^-----------------+
         | implements             | implements
         v                        |
+--------|------------------------|-----------------+
|                  PORTS LAYER                      |
|  [ IEnigmaService ]  [ IMachineStateRepository ]  |
+--------|------------------------^-----------------+
         | used by                | used by
         v                        |
+---------------------------------------------------+
|                  DOMAIN LAYER (Core)              |
|  [ EnigmaMachine ] [ Rotor ] [ Plugboard ]        |
+---------------------------------------------------+
```
