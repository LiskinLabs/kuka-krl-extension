# Виртуальный контроллер KSS и автомобильный стандарт VKRC / VASS

## 📋 Команды в этой группе

| Идентификатор команды (ID) | Название (RU) | Name (EN) |
| :--- | :--- | :--- |
| `krl.launchVirtualController` | **Запуск виртуального контроллера (VM)** | *Launch Virtual Controller (VM)* |
| `krl.checkVirtualControllerStatus` | **Проверить статус виртуального контроллера** | *Check Virtual Controller Status* |
| `krl.deployToVirtualController` | **Деплой активной программы в виртуальный контроллер** | *Deploy Active Program to Virtual Controller* |
| `krl.configureVirtualController` | **Настроить путь к виртуальному контроллеру...** | *Configure Virtual Controller Path...* |
| `krl.configureWorkVisualPath` | **Настроить путь к KUKA WorkVisual...** | *Configure KUKA WorkVisual Path...* |
| `krl.promptVkrcPro` | **Действия контроллера робота Volkswagen KUKA (VKRC)...** | *Volkswagen KUKA Robot Controller (VKRC) Actions...* |
| `krl.checkVkrcStatus` | **Проверить статус автомобильного окружения VKRC / VASS** | *Check VKRC / VASS Automotive Environment Status* |

## 🎯 Цель демонстрации и визуальный фокус
Полная бесшовная интеграция с заводскими симуляторами и немецким автопромом.

## 📂 Демонстрационный файл / Окружение
- `Любой проект VKRC / KSS`

## 🎬 Пошаговый сценарий записи (Скрипт действий)
1. Вызвать `KRL: Проверить статус виртуального контроллера` -> проверка доступности KSS рантайма.
2. Вызвать `KRL: Деплой активной программы в виртуальный контроллер` -> моментальная передача кода в симулятор KUKA.Sim / OfficeLite.
3. Вызвать `KRL: Проверить статус автомобильного окружения VKRC / VASS` -> валидация специфических стандартов Volkswagen (Folge, Makro, флаги ячейки).
4. Показать окно настроек интеграции с WorkVisual.

## 📹 Рекомендуемый формат захвата
- **Формат:** Видео (20-25 сек) или серия GIF
- **Рекомендуемые имена итоговых файлов в эту папку:**
  - `virtual_controller_deploy.gif`
  - `vkrc_vass_check.png`
  - `workvisual_path_config.png`

> *Примечание: После создания скриншота, GIF или видео сохраняйте готовые файлы прямо в эту папку. Они будут автоматически синхронизироваться с сайтом документации и витриной маркетплейса.*
