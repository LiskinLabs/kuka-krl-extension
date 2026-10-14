# Модуль EthernetKRL (EKI) — Валидатор XML и генератор кода

## 📋 Команды в этой группе

| Идентификатор команды (ID) | Название (RU) | Name (EN) |
| :--- | :--- | :--- |
| `krl.validateEkiXml` | **Валидатор XML-схем EthernetKRL (EKI)** | *Validate EthernetKRL (EKI) XML Schema* |
| `krl.generateEkiCode` | **Генератор KRL-обработчика EthernetKRL** | *Generate EthernetKRL Communication Handler* |

## 🎯 Цель демонстрации и визуальный фокус
Ускорение интеграции технического зрения (Cognex, Keyence) и SCADA по протоколу TCP/IP EthernetKRL.

## 📂 Демонстрационный файл / Окружение
- `demo-workspace/eki_demo.xml`
- `demo-workspace/eki_comm_demo.src`

## 🎬 Пошаговый сценарий записи (Скрипт действий)
1. Открыть `demo-workspace/eki_demo.xml`.
2. Вызвать `KRL: Валидатор XML-схем EthernetKRL (EKI)` -> расширение проверяет XML-структуру конфигурации сокетов KUKA и подтверждает корректность тегов `<INTERNAL>`, `<EXTERNAL>`.
3. Вызвать `KRL: Генератор KRL-обработчика EthernetKRL` -> автоматически создаётся готовый `.src` файл с вызовами `EKI_Init`, `EKI_Open`, циклами чтения буфера и обработкой таймаутов.

## 📹 Рекомендуемый формат захвата
- **Формат:** GIF (7-9 сек) или Видео
- **Рекомендуемые имена итоговых файлов в эту папку:**
  - `eki_xml_validator.gif`
  - `eki_code_generator.gif`

> *Примечание: После создания скриншота, GIF или видео сохраняйте готовые файлы прямо в эту папку. Они будут автоматически синхронизироваться с сайтом документации и витриной маркетплейса.*
