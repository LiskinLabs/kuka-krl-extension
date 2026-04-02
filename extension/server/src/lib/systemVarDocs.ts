/**
 * Документация системных переменных KUKA KSS 8.7
 * Documentation for KUKA system variables with descriptions in multiple languages
 */

export interface SystemVarDoc {
  name: string;
  type: string;
  description: {
    en: string;
    ru: string;
    tr: string;
  };
  example?: string;
  range?: string;
  readOnly?: boolean;
  syntax?: string;
}

export const SYSTEM_VAR_DOCS: SystemVarDoc[] = [
  // --- COORDINATE SYSTEMS & POSITIONS ---
  {
    name: "$TOOL",
    type: "FRAME",
    description: {
      en: "Current tool coordinate system. Defines the TCP (Tool Center Point) relative to the flange coordinate system.",
      ru: "Текущая система координат инструмента. Определяет TCP относительно системы координат фланца.",
      tr: "Mevcut alet koordinat sistemi. TCP'yi flanş koordinat sistemine göre tanımlar.",
    },
    example: "$TOOL = TOOL_DATA[1]",
    syntax: "$TOOL = FRAME_VAR",
  },
  {
    name: "$BASE",
    type: "FRAME",
    description: {
      en: "Current base coordinate system. Defines the workpiece coordinate system relative to the WORLD coordinate system.",
      ru: "Текущая базовая система координат. Определяет систему координат заготовки относительно WORLD.",
      tr: "Mevcut taban koordinat sistemi. İş parçası koordinat sistemini WORLD sistemine göre tanımlar.",
    },
    example: "$BASE = BASE_DATA[1]",
    syntax: "$BASE = FRAME_VAR",
  },
  {
    name: "$POS_ACT",
    type: "E6POS",
    description: {
      en: "Current Cartesian setpoint position of the TCP relative to the currently set BASE coordinate system.",
      ru: "Текущая заданная декартова позиция TCP относительно активной базы (BASE).",
      tr: "Mevcut ayar noktası Kartezyen TCP konumu, aktif BASE koordinat sistemine göre.",
    },
    readOnly: true,
  },
  {
    name: "$POS_ACT_MES",
    type: "E6POS",
    description: {
      en: "Measured current Cartesian actual position of the TCP relative to the BASE coordinate system.",
      ru: "Измеренная текущая фактическая декартова позиция TCP относительно базы (BASE).",
      tr: "Ölçülen mevcut gerçek Kartezyen TCP konumu, BASE koordinat sistemine göre.",
    },
    readOnly: true,
  },
  {
    name: "$AXIS_ACT",
    type: "E6AXIS",
    description: {
      en: "Current axis-specific setpoint position of the robot (angles or positions). Triggers an advance run stop.",
      ru: "Текущая заданная поосная позиция робота (углы или координаты). Вызывает останов предварительного прогона.",
      tr: "Robotun mevcut eksene özgü ayar noktası konumu. Önceden çalışma durdurmasını (advance run stop) tetikler.",
    },
    readOnly: true,
  },
  {
    name: "$AXIS_ACT_MEAS",
    type: "E6AXIS",
    description: {
      en: "Current axis-specific actual position of the robot (measured motor angles).",
      ru: "Текущая фактическая поосная позиция робота (измеренные углы двигателей).",
      tr: "Robotun mevcut eksene özgü gerçek konumu (ölçülen motor açıları).",
    },
    readOnly: true,
  },
  {
    name: "$ROBROOT",
    type: "FRAME",
    description: {
      en: "Robot root coordinate system. Defines the position of the robot base relative to the WORLD system.",
      ru: "Система координат корня робота. Определяет положение основания робота относительно WORLD.",
      tr: "Robot kök koordinat sistemi. Robot tabanının WORLD sistemine göre konumunu tanımlar.",
    },
    readOnly: true,
  },
  {
    name: "$WORLD",
    type: "FRAME",
    description: {
      en: "Fixed reference coordinate system (World). All other systems relate back to this.",
      ru: "Фиксированная мировая система координат (World). Все остальные системы отсчитываются от неё.",
      tr: "Sabit referans koordinat sistemi (World). Diğer tüm sistemler buna bağlıdır.",
    },
    readOnly: true,
  },
  {
    name: "$NULLFRAME",
    type: "FRAME",
    description: {
      en: "A constant frame with all components (X, Y, Z, A, B, C) set to zero.",
      ru: "Постоянный фрейм, в котором все компоненты (X, Y, Z, A, B, C) равны нулю.",
      tr: "Tüm bileşenleri (X, Y, Z, A, B, C) sıfır olan sabit çerçeve.",
    },
    readOnly: true,
  },

  // --- MOTION PARAMETERS ---
  {
    name: "$ADVANCE",
    type: "INT",
    description: {
      en: "Maximum number of motion instructions that the robot controller can calculate and plan in advance.",
      ru: "Максимальное количество инструкций движения, которые контроллер может рассчитать и спланировать заранее.",
      tr: "Robot kontrolörünün önceden hesaplayıp planlayabileceği maksimum hareket komutu sayısı.",
    },
    range: "0 - 5 (Default: 3)",
    example: "$ADVANCE = 3",
  },
  {
    name: "$VEL",
    type: "STRUC CP",
    description: {
      en: "Cartesian velocity in the advance run. Components: CP (Path), ORI1 (Swivel), ORI2 (Rotation).",
      ru: "Декартова скорость в предварительном прогоне. Компоненты: CP (траектория), ORI1 (поворот), ORI2 (вращение).",
      tr: "Önceden çalışma sırasında Kartezyen hız. Bileşenler: CP (Yol), ORI1 (Dönme), ORI2 (Rotasyon).",
    },
    example: "$VEL = {CP 2.0, ORI1 200.0, ORI2 200.0}",
  },
  {
    name: "$VEL_AXIS",
    type: "INT[12]",
    description: {
      en: "Planned axis velocity as a percentage of the maximum axis speed ($VEL_AXIS_MA).",
      ru: "Запланированная скорость оси в процентах от максимальной ($VEL_AXIS_MA).",
      tr: "Maksimum eksen hızının ($VEL_AXIS_MA) yüzdesi olarak planlanan eksen hızı.",
    },
    range: "1 - 100%",
    example: "$VEL_AXIS[1] = 100",
  },
  {
    name: "$ACC",
    type: "STRUC CP",
    description: {
      en: "Cartesian acceleration in the advance run. Components: CP (Path), ORI1 (Swivel), ORI2 (Rotation).",
      ru: "Декартово ускорение в предварительном прогоне. Компоненты: CP (траектория), ORI1 (поворот), ORI2 (вращение).",
      tr: "Önceden çalışma sırasında Kartezyen ivme. Bileşenler: CP (Yol), ORI1 (Dönme), ORI2 (Rotasyon).",
    },
    example: "$ACC = {CP 2.0, ORI1 100.0, ORI2 100.0}",
  },
  {
    name: "$ACC_AXIS",
    type: "INT[12]",
    description: {
      en: "Planned axis acceleration as a percentage. Refers to available torque or ramp-up time.",
      ru: "Запланированное ускорение осей в процентах. Относится к доступному моменту или времени разгона.",
      tr: "Yüzde olarak planlanan eksen ivmesi. Mevcut torka veya hızlanma süresine bağlıdır.",
    },
    range: "1 - 100%",
    example: "$ACC_AXIS[1] = 50",
  },
  {
    name: "$APO",
    type: "STRUC APO",
    description: {
      en: "Approximation (blending) parameters in the advance run. Fields: CVEL, CPTP, CDIS, CORI.",
      ru: "Параметры аппроксимации (сглаживания) в предварительном прогоне. Поля: CVEL, CPTP, CDIS, CORI.",
      tr: "Önceden çalışma sırasında yaklaşım (blending) parametreleri. Alanlar: CVEL, CPTP, CDIS, CORI.",
    },
    example: "$APO = {CDIS 50.0, CORI 5.0}",
  },

  // --- SYSTEM STATUS & MODES ---
  {
    name: "$MODE_OP",
    type: "ENUM MODE_OP",
    description: {
      en: "Current operating mode of the robot: #T1, #T2, #AUT, #EX.",
      ru: "Текущий режим работы робота: #T1 (ручной), #T2 (ручной на полной скорости), #AUT (автомат), #EX (внешний автомат).",
      tr: "Robotun mevcut çalışma modu: #T1, #T2, #AUT, #EX.",
    },
    readOnly: true,
  },
  {
    name: "$PRO_STATE",
    type: "ENUM PRO_STATE",
    description: {
      en: "Program status of the interpreter: #P_ACTIVE, #P_FREE, #P_END, #P_RESET, #P_STOP.",
      ru: "Статус выполнения программы: #P_ACTIVE (выполняется), #P_FREE (не выбрана), #P_RESET (сброшена) и др.",
      tr: "Yorumlayıcının program durumu: #P_ACTIVE, #P_FREE, #P_END, #P_RESET, #P_STOP.",
    },
    readOnly: true,
  },
  {
    name: "$PRO_MOVE",
    type: "BOOL",
    description: {
      en: "Indicates active program motion. TRUE when a synchronous axis moves.",
      ru: "Указывает на активное движение программы. TRUE, когда движется синхронная ось.",
      tr: "Aktif program hareketini belirtir. Senkronize bir eksen hareket ettiğinde TRUE.",
    },
    readOnly: true,
  },
  {
    name: "$STOPMESS",
    type: "BOOL",
    description: {
      en: "Indicates the occurrence of any message that requires the robot to be stopped (e.g. Emergency Stop).",
      ru: "Указывает на наличие сообщения, требующего остановки робота (например, аварийный останов).",
      tr: "Robotun durdurulmasını gerektiren herhangi bir mesajın (örneğin Acil Durdurma) oluştuğunu belirtir.",
    },
    readOnly: true,
  },

  // --- I/O & SIGNALS ---
  {
    name: "$IN",
    type: "BOOL[8192]",
    description: {
      en: "Value of a digital input. Range depends on $NUM_IN.",
      ru: "Значение цифрового входа. Диапазон зависит от $NUM_IN.",
      tr: "Dijital giriş değeri. Aralık $NUM_IN'e bağlıdır.",
    },
    readOnly: true,
    syntax: "state = $IN[index]",
  },
  {
    name: "$OUT",
    type: "BOOL[8192]",
    description: {
      en: "Value of a digital output. Can be set or read.",
      ru: "Значение цифрового выхода. Может быть установлено или прочитано.",
      tr: "Dijital çıkış değeri. Ayarlanabilir veya okunabilir.",
    },
    syntax: "$OUT[index] = state",
  },
  {
    name: "$ANIN",
    type: "REAL[32]",
    description: {
      en: "Voltage at the analog inputs, standardized to range -1.0 to +1.0.",
      ru: "Напряжение на аналоговых входах, нормализованное в диапазоне от -1.0 до +1.0.",
      tr: "Analog girişlerdeki voltaj, -1.0 ile +1.0 aralığında standartlaştırılmış.",
    },
    readOnly: true,
    syntax: "voltage = $ANIN[index]",
  },
  {
    name: "$ANOUT",
    type: "REAL[32]",
    description: {
      en: "Voltage at the analog outputs, range -1.0 to +1.0.",
      ru: "Напряжение на аналоговых выходах, диапазон от -1.0 до +1.0.",
      tr: "Analog çıkışlardaki voltaj, -1.0 ile +1.0 aralığında.",
    },
    syntax: "$ANOUT[index] = voltage",
  },

  // --- TIMERS & COUNTERS ---
  {
    name: "$TIMER",
    type: "INT[64]",
    description: {
      en: "System timers. Count in increments of 1 ms. Can be set forwards or backwards.",
      ru: "Системные таймеры. Считают с шагом 1 мс. Могут быть установлены на любое значение.",
      tr: "Sistem zamanlayıcıları. 1 ms'lik artışlarla sayar. İleri veya geri ayarlanabilir.",
    },
    example: "$TIMER[1] = -500",
    syntax: "$TIMER[index] = time",
  },
  {
    name: "$TIMER_STOP",
    type: "BOOL[64]",
    description: {
      en: "Starting and stopping of the timer. TRUE: Timer stopped, FALSE: Timer started.",
      ru: "Запуск и остановка таймера. TRUE: остановлен, FALSE: запущен.",
      tr: "Zamanlayıcının başlatılması ve durdurulması. TRUE: Durduruldu, FALSE: Başlatıldı.",
    },
    example: "$TIMER_STOP[1] = FALSE",
  },
  {
    name: "$TIMER_FLAG",
    type: "BOOL[64]",
    description: {
      en: "Indicates whether the timer value is greater than or equal to zero.",
      ru: "Указывает, является ли значение таймера больше или равным нулю.",
      tr: "Zamanlayıcı değerinin sıfıra eşit veya büyük olup olmadığını belirtir.",
    },
    readOnly: true,
  },
  {
    name: "$FLAG",
    type: "BOOL[1024]",
    description: {
      en: "Global boolean flags for general use in robot and submit programs.",
      ru: "Глобальные булевы флаги для общего использования в программах робота и Submit.",
      tr: "Robot ve Submit programlarında genel kullanım için global boolean bayraklar.",
    },
    example: "$FLAG[1] = TRUE",
  },
  {
    name: "$CYCFLAG",
    type: "BOOL[256]",
    description: {
      en: "Activation of cyclical flags. Evaluated cyclically in the background.",
      ru: "Активация циклических флагов. Вычисляются циклически в фоновом режиме.",
      tr: "Döngüsel bayrakların etkinleştirilmesi. Arka planda döngüsel olarak değerlendirilir.",
    },
    syntax: "$CYCFLAG[index] = Boolean_expression",
  },

  // --- VARIOUS ---
  {
    name: "$DATE",
    type: "STRUC DATE",
    description: {
      en: "Date and time of the real-time operating system (VxWorks). Components: YEAR, MONTH, DAY, HOUR, MIN, SEC.",
      ru: "Дата и время операционной системы реального времени (VxWorks). Компоненты: YEAR, MONTH, DAY, HOUR, MIN, SEC.",
      tr: "Gerçek zamanlı işletim sisteminin (VxWorks) tarih ve saati. Bileşenler: YEAR, MONTH, DAY, HOUR, MIN, SEC.",
    },
    readOnly: true,
  },
  {
    name: "$ERR",
    type: "STRUC Error_T",
    description: {
      en: "Structure with information about the current program and errors.",
      ru: "Структура с информацией о текущей программе и ошибках.",
      tr: "Mevcut program ve hatalar hakkında bilgi içeren yapı.",
    },
    readOnly: true,
  },
  {
    name: "$ACT_BASE_C",
    type: "INT",
    description: {
      en: "Number of the current BASE coordinate system in the main run. Value -1 when program is reset.",
      ru: "Номер текущей базовой системы координат в основном прогоне. Значение -1 при сбросе программы.",
      tr: "Ana çalışma sırasındaki mevcut BASE koordinat sisteminin numarası. Program sıfırlandığında değer -1 olur.",
    },
    readOnly: true,
  },
  {
    name: "$ACT_TOOL_C",
    type: "INT",
    description: {
      en: "Number of the current TOOL coordinate system in the main run. Value -1 when program is reset.",
      ru: "Номер текущей системы координат инструмента в основном прогоне. Значение -1 при сбросе программы.",
      tr: "Ana çalışma sırasındaki mevcut TOOL koordinat sisteminin numarası. Program sıfırlandığında değer -1 olur.",
    },
    readOnly: true,
  },
  {
    name: "$ECO_LEVEL",
    type: "ENUM ECO_LEVEL",
    description: {
      en: "Energy saving mode. Levels: #OFF, #LOW, #MIDDLE, #HIGH. Affects PTP and spline motions.",
      ru: "Режим энергосбережения. Уровни: #OFF, #LOW, #MIDDLE, #HIGH. Влияет на PTP и сплайновые движения.",
      tr: "Enerji tasarrufu modu. Seviyeler: #OFF, #LOW, #MIDDLE, #HIGH. PTP ve spline hareketlerini etkiler.",
    },
    example: "$ECO_LEVEL = #MIDDLE",
  },
  {
    name: "$ENERGY_TOTAL",
    type: "STRUC Energy_Data_Struc",
    description: {
      en: "Energy consumption since the last cold start. Fields: time, energy, lostenergy.",
      ru: "Потребление энергии с момента последнего холодного старта. Поля: time, energy, lostenergy.",
      tr: "Son soğuk önyüklemeden itibaren enerji tüketimi. Alanlar: time, energy, lostenergy.",
    },
    readOnly: true,
  },
  {
    name: "$ENERGY_PERIOD",
    type: "STRUC Energy_Data_Struc",
    description: {
      en: "Energy consumption of the last 60 minutes.",
      ru: "Потребление энергии за последние 60 минут.",
      tr: "Son 60 dakikanın enerji tüketimi.",
    },
    readOnly: true,
  },
  {
    name: "$TORQUE_AXIS_ACT",
    type: "REAL",
    description: {
      en: "Current torque of an axis in torque mode (Nm). Only relevant if brakes are released.",
      ru: "Текущий крутящий момент оси в режиме управления моментом (Нм). Актуально только при отпущенных тормозах.",
      tr: "Tork modunda bir eksenin mevcut torku (Nm). Sadece frenler bırakıldığında geçerlidir.",
    },
    readOnly: true,
    syntax: "torque = $TORQUE_AXIS_ACT[axis_index]",
  },
  {
    name: "$TORQUE_AXIS_LIMITS",
    type: "STRUC TORQLIMITPARAM",
    description: {
      en: "Currently active motor torque limitation for an axis (LOWER, UPPER, MONITOR).",
      ru: "Текущие активные ограничения крутящего момента двигателя для оси (LOWER, UPPER, MONITOR).",
      tr: "Bir eksen için halihazırda aktif motor torku sınırlaması (LOWER, UPPER, MONITOR).",
    },
    readOnly: true,
  },
  {
    name: "$CIRC_MODE",
    type: "STRUC CIRC_MODE",
    description: {
      en: "Behavior of the orientation control at the auxiliary and end point of a SCIRC circle.",
      ru: "Поведение контроля ориентации в вспомогательной и конечной точках дуги SCIRC.",
      tr: "Bir SCIRC dairesinin yardımcı ve bitiş noktasındaki yönelim kontrolünün davranışı.",
    },
    syntax: "$CIRC_MODE.AUX_PT.ORI = #CONSIDER",
  },
  {
    name: "$BRAKE_SIG",
    type: "Bit array",
    description: {
      en: "Bit array for reading the state of the axis brakes (0: closed, 1: open).",
      ru: "Битовый массив для чтения состояния тормозов осей (0: закрыты, 1: открыты).",
      tr: "Eksen frenlerinin durumunu okumak için bit dizisi (0: kapalı, 1: açık).",
    },
    readOnly: true,
  },
  {
    name: "$COLLMON_STARTUP_MAX",
    type: "INT",
    description: {
      en: "Limits the inactive collision detection phase at the start of motion (ms).",
      ru: "Ограничивает фазу неактивного контроля столкновений в начале движения (мс).",
      tr: "Hareket başlangıcındaki inaktif çarpışma algılama aşamasını sınırlar (ms).",
    },
    example: "$COLLMON_STARTUP_MAX = 200",
  },
  {
    name: "$GEAR_JERK",
    type: "INT[12]",
    description: {
      en: "Gear jerk of the axes in the advance run as a percentage of machine data.",
      ru: "Рывок редуктора осей в предварительном прогоне в процентах от машинных данных.",
      tr: "Makine verilerinin yüzdesi olarak önceden çalışma sırasındaki eksenlerin dişli sarsıntısı.",
    },
    range: "1 - 100%",
  },
  {
    name: "$PRO_IP1",
    type: "STRUC PRO_IP",
    description: {
      en: "Process pointer information of the robot interpreter (can be read from submit program).",
      ru: "Информация об указателе процесса интерпретатора робота (можно читать из программ Submit).",
      tr: "Robot yorumlayıcısının işlem işaretçisi bilgisi (Submit programından okunabilir).",
    },
    readOnly: true,
  },
  {
    name: "$OV_APPL",
    type: "REAL",
    description: {
      en: "Application override. Can be used to reduce the effective override in the main run (e.g. for sensors).",
      ru: "Прикладной оверрайд. Может использоваться для снижения эффективной скорости в основном прогоне (например, для сенсоров).",
      tr: "Uygulama geçersiz kılma (override). Ana çalışma sırasında etkin hızı azaltmak için kullanılabilir (örn. sensörler için).",
    },
    example: "$OV_APPL = 50",
    range: "0 - 100%",
  },
  {
    name: "$OV_PRO",
    type: "INT",
    description: {
      en: "Program override (speed) in %. Affects all programmed motions.",
      ru: "Программный оверрайд (скорость) в %. Влияет на все программные движения.",
      tr: "Program geçersiz kılma (hız) %. Tüm programlı hareketleri etkiler.",
    },
    range: "0 - 100%",
    example: "$OV_PRO = 50",
  },
  {
    name: "$WAIT_FOR",
    type: "CHAR[]",
    description: {
      en: "The WAIT FOR statement at which the interpreter is currently waiting.",
      ru: "Инструкция WAIT FOR, на которой в данный момент остановился интерпретатор.",
      tr: "Yorumlayıcının şu anda beklediği WAIT FOR komutu.",
    },
    readOnly: true,
  },
  {
    name: "$IS_OFFICE_LITE",
    type: "BOOL",
    description: {
      en: "Indicates whether the installation is an OfficeLite system (simulation).",
      ru: "Указывает, является ли система средой OfficeLite (симуляция).",
      tr: "Kurulumun bir OfficeLite sistemi (simülasyon) olup olmadığını belirtir.",
    },
    readOnly: true,
  },
  {
    name: "$ALARM_STOP_INTERN",
    type: "BOOL",
    description: {
      en: "Signal declaration for the internal EMERGENCY STOP. TRUE: No internal emergency stop is active.",
      ru: "Объявление сигнала для внутреннего аварийного останова. TRUE: внутренний аварийный останов не активен.",
      tr: "Dahili ACİL DURDURMA sinyali bildirimi. TRUE: Dahili acil durdurma etkin değil.",
    },
    syntax: "SIGNAL $ALARM_STOP_INTERN $OUT[number]",
  },
  {
    name: "$APO_C",
    type: "STRUC APO",
    description: {
      en: "Approximation parameters in the main run. Contains the current approximation distance.",
      ru: "Параметры аппроксимации в основном прогоне. Содержит текущее расстояние сглаживания.",
      tr: "Ana çalışma sırasındaki yaklaşım (blending) parametreleri. Mevcut yaklaşım mesafesini içerir.",
    },
    readOnly: true,
  },
  {
    name: "$AUX_POWER",
    type: "BOOL",
    description: {
      en: "Signal declaration for external power supply. TRUE: External power supply is active.",
      ru: "Объявление сигнала для внешнего источника питания. TRUE: внешний источник питания активен.",
      tr: "Harici güç kaynağı sinyal bildirimi. TRUE: Harici güç kaynağı etkin.",
    },
    syntax: "SIGNAL $AUX_POWER $IN[number]",
  },
  {
    name: "$AXIS_BACK",
    type: "E6AXIS",
    description: {
      en: "Axis-specific start position of the current motion block. Used to return to an interrupted motion.",
      ru: "Поосная начальная позиция текущего блока движения. Используется для возврата к прерванному движению.",
      tr: "Mevcut hareket bloğunun eksene özgü başlangıç konumu. Kesilen bir harekete geri dönmek için kullanılır.",
    },
    readOnly: true,
  },
  {
    name: "$AXIS_FOR",
    type: "E6AXIS",
    description: {
      en: "Axis-specific target position of the current motion block. Corresponds to the end of the window for an interruption.",
      ru: "Поосная целевая позиция текущего блока движения. Соответствует концу окна прерывания.",
      tr: "Mevcut hareket bloğunun eksene özgü hedef konumu. Kesinti penceresinin sonuna karşılık gelir.",
    },
    readOnly: true,
  },
  {
    name: "$AXIS_INT",
    type: "E6AXIS",
    description: {
      en: "Axis-specific robot position at the time an interrupt was triggered.",
      ru: "Поосная позиция робота в момент срабатывания прерывания (Interrupt).",
      tr: "Bir kesintinin (interrupt) tetiklendiği andaki eksene özgü robot konumu.",
    },
    readOnly: true,
  },
  {
    name: "$AXIS_MOT",
    type: "E6AXIS",
    description: {
      en: "Current motor-specific robot position (motor angles).",
      ru: "Текущая специфическая позиция двигателей робота (углы двигателей).",
      tr: "Motor spesifik mevcut robot konumu (motor açıları).",
    },
    readOnly: true,
  },
  {
    name: "$AXIS_RET",
    type: "E6AXIS",
    description: {
      en: "Axis-specific robot position when leaving the path. Can be used to return to the path.",
      ru: "Поосная позиция робота в момент ухода с траектории. Может использоваться для возврата на путь.",
      tr: "Yoldan ayrılırken robotun eksene özgü konumu. Yola geri dönmek için kullanılabilir.",
    },
    readOnly: true,
  },
  {
    name: "$AXIS_HOME",
    type: "E6AXIS[5]",
    description: {
      en: "Coordinates of 5 additional HOME positions.",
      ru: "Координаты 5 дополнительных домашних позиций (HOME).",
      tr: "5 ek HOME konumu koordinatları.",
    },
    syntax: "$AXIS_HOME[index] = {A1 0, A2 -90, ...}",
  },
  {
    name: "$AXWORKSTATE",
    type: "INT",
    description: {
      en: "Signal status for monitoring up to 8 axis-specific workspaces.",
      ru: "Статус сигнала для мониторинга до 8 поосных рабочих зон.",
      tr: "8 eksene özgü çalışma alanının izlenmesi için sinyal durumu.",
    },
    syntax: "SIGNAL $AXWORKSTATE[index] $OUT[number]",
  },
  {
    name: "$B_IN",
    type: "INT",
    description: {
      en: "Value of a binary input. Range depends on the configuration of $BIN_IN[x].",
      ru: "Значение двоичного входа. Диапазон зависит от конфигурации $BIN_IN[x].",
      tr: "Dijital giriş değeri. Aralık $BIN_IN[x] konfigürasyonuna bağlıdır.",
    },
    readOnly: true,
    syntax: "Value = $B_IN[index]",
  },
  {
    name: "$B_OUT",
    type: "INT",
    description: {
      en: "Value of a binary output. Range depends on the configuration of $BIN_OUT[x].",
      ru: "Значение двоичного выхода. Диапазон зависит от конфигурации $BIN_OUT[x].",
      tr: "Dijital çıkış değeri. Aralık $BIN_OUT[x] konfigürasyonuna bağlıdır.",
    },
    syntax: "$B_OUT[index] = Value",
  },
  {
    name: "$BASE_KIN",
    type: "CHAR[29]",
    description: {
      en: "Information about the external BASE kinematic system (name and external axes).",
      ru: "Информация о внешней кинематической системе BASE (имя и внешние оси).",
      tr: "Harici BASE kinematik sistemi hakkında bilgi (ad ve harici eksenler).",
    },
    readOnly: true,
  },
  {
    name: "$BIN_IN",
    type: "STRUC BIN_IN",
    description: {
      en: "Configuration of binary inputs. Fields: F_BIT (first bit), LEN (length), PARITY.",
      ru: "Конфигурация двоичных входов. Поля: F_BIT (первый бит), LEN (длина), PARITY (четность).",
      tr: "Dijital girişlerin konfigürasyonu. Alanlar: F_BIT, LEN, PARITY.",
    },
    syntax: "$BIN_IN[index] = {F_BIT 1, LEN 8, PARITY #NONE}",
  },
  {
    name: "$BOOTTYPE",
    type: "ENUM BOOTTYPE_T",
    description: {
      en: "Most recent system boot type (#INVALID, #HIBERNATE, #INITCOLDSTART, #COLDSTART, #RECONFIG).",
      ru: "Тип последней загрузки системы (#INVALID, #HIBERNATE, #INITCOLDSTART, #COLDSTART, #RECONFIG).",
      tr: "En son sistem önyükleme türü (#INVALID, #HIBERNATE, #INITCOLDSTART, #COLDSTART, #RECONFIG).",
    },
    readOnly: true,
  },
  {
    name: "$CIRC_TYPE",
    type: "ENUM CIRC_TYPE",
    description: {
      en: "Orientation control of CIRC in the advance run (#BASE or #PATH).",
      ru: "Контроль ориентации движения CIRC в предварительном прогоне (#BASE или #PATH).",
      tr: "Önceden çalışma sırasında CIRC yönelim kontrolü (#BASE veya #PATH).",
    },
  },
  {
    name: "$CIRC_TYPE_C",
    type: "ENUM CIRC_TYPE",
    description: {
      en: "Orientation control of CIRC in the main run (#BASE or #PATH).",
      ru: "Контроль ориентации движения CIRC в основном прогоне (#BASE или #PATH).",
      tr: "Ana çalışma sırasında CIRC yönelim kontrolü (#BASE veya #PATH).",
    },
    readOnly: true,
  },
  {
    name: "$CUR_MEMORY",
    type: "STRUC MEMORY_INFO",
    description: {
      en: "Current memory allocation of the real-time system (VxWorks).",
      ru: "Текущее распределение памяти системы реального времени (VxWorks).",
      tr: "Gerçek zamanlı sistemin (VxWorks) mevcut bellek ayırması.",
    },
    readOnly: true,
  },
  {
    name: "$CYCFLAG",
    type: "BOOL[256]",
    description: {
      en: "Cyclical flags. Evaluated in the background cycle. Up to 64 can be active simultaneously.",
      ru: "Циклические флаги. Вычисляются в фоновом цикле. До 64 могут быть активны одновременно.",
      tr: "Döngüsel bayraklar. Arka plan döngüsünde değerlendirilir. Aynı anda 64 tanesi aktif olabilir.",
    },
    syntax: "$CYCFLAG[index] = Boolean_expression",
  },
  {
    name: "$DATA_INTEGRITY",
    type: "BOOL",
    description: {
      en: "Check of data consistency for input and output signals. TRUE: check is activated.",
      ru: "Проверка целостности данных для входных и выходных сигналов. TRUE: проверка активирована.",
      tr: "Giriş ve çıkış sinyalleri için veri tutarlılığı kontrolü. TRUE: kontrol etkinleştirildi.",
    },
    readOnly: true,
  },
  {
    name: "$DATAPATH",
    type: "CHAR[]",
    description: {
      en: "Defines the module in which variables are visible for display. Default: automatically set to current module.",
      ru: "Определяет модуль, переменные которого видимы для отображения. По умолчанию: текущий модуль.",
      tr: "Değişkenlerin görüntülenmesi için görünür olduğu modülü tanımlar. Varsayılan: otomatik olarak mevcut modüle ayarlanır.",
    },
    syntax: '$DATAPATH[]="/R1/modulename"',
  },
  {
    name: "$DEACTIVATE_ABS_ACCUR",
    type: "BOOL",
    description: {
      en: "Temporary deactivation of the positionally accurate robot model (test purposes only).",
      ru: "Временная деактивация абсолютно точной модели робота (только для тестовых целей).",
      tr: "Konumsal olarak doğru robot modelinin geçici olarak devre dışı bırakılması (yalnızca test amaçlı).",
    },
  },
  {
    name: "$DELTA_WORKSPACE",
    type: "STRUC DELTA_WORKSPACE",
    description: {
      en: "Dimensions of a Cartesian workspace for delta robots.",
      ru: "Размеры декартовой рабочей зоны для дельта-роботов.",
      tr: "Delta robotlar için Kartezyen çalışma alanının boyutları.",
    },
  },
  {
    name: "$DEVICE",
    type: "ENUM DEVICE",
    description: {
      en: "Operating state of the connected teach pendant (#ACTIVE, #BLOCK, #PASSIVE).",
      ru: "Состояние подключенного пульта (KCP): #ACTIVE, #BLOCK (заблокирован), #PASSIVE (пассивен).",
      tr: "Bağlı öğretme panelinin (teach pendant) çalışma durumu (#ACTIVE, #BLOCK, #PASSIVE).",
    },
    readOnly: true,
  },
  {
    name: "$DIR_CAL",
    type: "Bit array",
    description: {
      en: "Mastering direction for each axis. 0: Positive direction, 1: Negative direction.",
      ru: "Направление калибровки для каждой оси. 0: положительное, 1: отрицательное.",
      tr: "Her eksen için kalibrasyon (mastering) yönü. 0: Pozitif yön, 1: Negatif yön.",
    },
    readOnly: true,
  },
  {
    name: "$DRIVES_ENABLE",
    type: "BOOL",
    description: {
      en: "Switching drives on/off. TRUE: Switches drives on.",
      ru: "Включение/выключение приводов. TRUE: включает приводы.",
      tr: "Sürücüleri açma/kapama. TRUE: Sürücüleri açar.",
    },
  },
  {
    name: "$DRIVES_FANSPEED",
    type: "INT[20]",
    description: {
      en: "Current fan speed of the inverters (rpm).",
      ru: "Текущая скорость вращения вентиляторов инверторов (об/мин).",
      tr: "İnvertörlerin mevcut fan hızı (rpm).",
    },
    readOnly: true,
  },
  {
    name: "$EMSTOP_PATH",
    type: "ENUM EMSTOP",
    description: {
      en: "Path-maintaining EMERGENCY STOP for various operating modes.",
      ru: "Аварийный останов с сохранением траектории для различных режимов работы.",
      tr: "Çeşitli çalışma modları için yolu koruyan ACİL DURDURMA.",
    },
    syntax: "$EMSTOP_PATH = {T1 #ON, T2 #ON, AUT #ON, EX #ON}",
  },
  {
    name: "$EMSTOP_TIME",
    type: "INT",
    description: {
      en: "Timeout monitoring for path-maintaining EMERGENCY STOP (ms). After this period, drives are switched off.",
      ru: "Тайм-аут мониторинга аварийного останова с сохранением траектории (мс). По истечении приводы отключаются.",
      tr: "Yolu koruyan ACİL DURDURMA için zaman aşımı izlemesi (ms). Bu süreden sonra sürücüler kapatılır.",
    },
  },
  {
    name: "$ENERGY_CONFIG_STATE",
    type: "ENUM Energy_Config_State_T",
    description: {
      en: "Status of the energy model for each axis (#OK, #IRRELEVANT, #APPROXIMATED, #IGNORED).",
      ru: "Статус энергетической модели для каждой оси (#OK, #IRRELEVANT, #APPROXIMATED, #IGNORED).",
      tr: "Her eksen için enerji modeli durumu (#OK, #IRRELEVANT, #APPROXIMATED, #IGNORED).",
    },
    readOnly: true,
  },
  {
    name: "$IOSYS_IN_FALSE",
    type: "INT",
    description: {
      en: "Number of the system input that is always FALSE. Default: 1026.",
      ru: "Номер системного входа, который всегда имеет значение FALSE. По умолчанию: 1026.",
      tr: "Daima FALSE olan sistem girişi numarası. Varsayılan: 1026.",
    },
    readOnly: true,
  },
  {
    name: "$IOSYS_IN_TRUE",
    type: "INT",
    description: {
      en: "Number of the system input that is always TRUE. Default: 1025.",
      ru: "Номер системного входа, который всегда имеет значение TRUE. По умолчанию: 1025.",
      tr: "Daima TRUE olan sistem girişi numarası. Varsayılan: 1025.",
    },
    readOnly: true,
  },
  {
    name: "$MAMES",
    type: "REAL[12]",
    description: {
      en: "Mastering position for each axis. Offset between mechanical and electronic zero position.",
      ru: "Позиция калибровки для каждой оси. Смещение между механическим и электронным нулем.",
      tr: "Her eksen için kalibrasyon konumu. Mekanik ve elektronik sıfır noktası arasındaki ofset.",
    },
  },
  {
    name: "$MEAS_PULSE",
    type: "BOOL[8]",
    description: {
      en: "Input for activating fast measurement via interrupt (bus clock rate 125 microseconds).",
      ru: "Вход для активации быстрого измерения через прерывание (частота шины 125 мкс).",
      tr: "Kesinti (interrupt) yoluyla hızlı ölçümü etkinleştirmek için giriş (veri yolu hızı 125 mikrosaniye).",
    },
  },
  {
    name: "$MOT_TEMP",
    type: "INT[12]",
    description: {
      en: "Current motor temperature of an axis (Kelvin).",
      ru: "Текущая температура двигателя оси (в Кельвинах).",
      tr: "Bir eksenin mevcut motor sıcaklığı (Kelvin).",
    },
    readOnly: true,
  },
  {
    name: "$ON_PATH",
    type: "BOOL",
    description: {
      en: "Signal indicating the robot is located on the programmed path after BCO run.",
      ru: "Сигнал, указывающий, что робот находится на заданной траектории после выполнения BCO.",
      tr: "BCO çalışmasından sonra robotun programlanan yol üzerinde olduğunu gösteren sinyal.",
    },
    readOnly: true,
  },
  {
    name: "$PAL_MODE",
    type: "BOOL",
    description: {
      en: "Activation of palletizing mode. In this mode, axis A4 may be locked at 0°.",
      ru: "Активация режима паллетирования. В этом режиме ось A4 может быть заблокирована на 0°.",
      tr: "Paletleme modunun etkinleştirilmesi. Bu modda A4 ekseni 0°'de kilitlenebilir.",
    },
  },
  {
    name: "$PERI_RDY",
    type: "BOOL",
    description: {
      en: "Signal declaration for 'Drives ON'. TRUE when the intermediate circuit is charged.",
      ru: "Объявление сигнала 'Приводы ВКЛ'. TRUE, когда промежуточный контур заряжен.",
      tr: "'Sürücüler AÇIK' sinyal bildirimi. Ara devre şarj edildiğinde TRUE olur.",
    },
    readOnly: true,
  },
  {
    name: "$REVO_NUM",
    type: "INT[12]",
    description: {
      en: "Counter for infinitely rotating axes. Number of revolutions.",
      ru: "Счетчик для бесконечно вращающихся осей. Количество оборотов.",
      tr: "Sonsuz dönen eksenler için sayaç. Devir sayısı.",
    },
    readOnly: true,
  },
  {
    name: "$ROB_TIMER",
    type: "INT",
    description: {
      en: "Clock generator for measuring program runtimes (ms cycle).",
      ru: "Генератор тактов для измерения времени выполнения программы (цикл в мс).",
      tr: "Program çalışma sürelerini ölçmek için saat üreteci (ms döngüsü).",
    },
    readOnly: true,
  },
  {
    name: "$USER_SAF",
    type: "BOOL",
    description: {
      en: "Signal for safety fence monitoring. TRUE: Safety fence is closed.",
      ru: "Сигнал для мониторинга защитного ограждения. TRUE: ограждение закрыто.",
      tr: "Güvenlik çiti izleme sinyali. TRUE: Güvenlik çiti kapalı.",
    },
    readOnly: true,
  },
];

/**
 * Get documentation for a system variable
 */
export function getSystemVarDoc(
  varName: string,
  lang: "en" | "ru" | "tr" = "en",
): string | undefined {
  const normalized = varName.toUpperCase().startsWith("$")
    ? varName.toUpperCase()
    : `$${varName.toUpperCase()}`;

  const doc = SYSTEM_VAR_DOCS.find((d) => d.name.toUpperCase() === normalized);

  if (!doc) return undefined;

  let result = `**${doc.name}**\n\n`;
  result += `**Type**: \`${doc.type}\`  \n`;
  result += `**Writability**: \`${doc.readOnly ? "Read-Only" : "Read/Write"}\`  \n`;

  result += `\n${doc.description[lang] || doc.description.en}\n\n`;

  if (doc.syntax) {
    result += `**Syntax**:\n\`\`\`krl\n${doc.syntax}\n\`\`\`\n`;
  }

  if (doc.range) {
    result += `**Range**: ${doc.range}\n\n`;
  }

  if (doc.example) {
    result += `**Example**:\n\`\`\`krl\n${doc.example}\n\`\`\``;
  }

  return result;
}
