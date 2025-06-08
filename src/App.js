import { useState, useEffect, useRef} from 'react';


export default function App() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [activeTest, setActiveTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null); 

  const animals = [
  {
    id: 1,
    name: "Амурский тигр",
    description:
      "Редкий подвид тигра, обитающий в Приморском и Хабаровском краях. Охраняется законом, численность восстановилась до 500 особей. Его среда обитания включает смешанные леса Дальнего Востока, где он играет ключевую роль в экосистеме как верхний хищник. Амурский тигр — крупнейший представитель кошачьих, достигающий длины до 3,5 метров и веса до 300 кг. Он обладает уникальными полосами на шкуре, которые у каждого индивида имеют свой неповторимый рисунок, подобно отпечаткам пальцев у человека.",
    image: "/Tiger.jpg",
    status: "Находится под угрозой исчезновения",
    habitat: "Смешанные леса Дальнего Востока",
    population: "Около 500 особей в России",
    protection: "Запрещена охота, создание природных коридоров"
  },
  {
    id: 2,
    name: "Снежный барс",
    description:
      "Эндемик гор Центральной Азии. Очень редко встречается, охраняется на уровне международных соглашений. Его численность в России составляет около 100 особей, обитающих в Алтайских горах. Снежный барс — загадочный хищник с плотным белым мехом, покрытым черными пятнами. Его длинный пушистый хвост помогает сохранять равновесие при лазании по скалам и служит дополнительным утеплителем в холодные ночи.",
    image: "/snow.jpg ",
    status: "Уязвимый вид",
    habitat: "Алтайские горы",
    population: "Около 100 особей в России",
    protection: "Международные соглашения, мониторинг популяции"
  },
  {
    id: 3,
    name: "Белый медведь",
    description:
      "Обитает на архипелагах Арктики. Под угрозой исчезновения из-за изменения климата и разрушения среды обитания. В России насчитывается около 3000 особей, преимущественно на Шпицбергене и Земле Франца Иосифа. Белый медведь — символ Арктики и один из крупнейших хищников планеты. Несмотря на свой белый окрас, кожа у него черная, а шерсть состоит из полых волос, которые отражают солнечный свет. Эти медведи могут часами плавать в ледяной воде благодаря специальному подкожному слою жира.",
    image: "/polar.jpg ",
    status: "Под угрозой исчезновения",
    habitat: "Арктические архипелаги",
    population: "Около 3000 особей в России",
    protection: "Охраняемые территории, ограничение промышленной деятельности"
  },
  {
    id: 4,
    name: "Орлан-белохвост",
    description:
      "Крупная хищная птица, символ России. Восстановление популяции происходит благодаря экологическим программам. Летом гнездится в таежных зонах, зимой мигрирует в более теплые регионы. Орлан-белохвост — величественная птица с размахом крыльев до 2,5 метров. Его характерная белая квадратная хвостовая часть делает его легко узнаваемым в полете. Эти птицы строят одни из самых больших гнезд в мире, которые могут достигать диаметра 2 метров и весить более тонны.",
    image: "/eagle.jpg ",
    status: "Восстанавливающийся вид",
    habitat: "Таежные зоны России",
    population: "Растущая популяция благодаря охране",
    protection: "Программы восстановления, защита мест гнездования"
  },
];




  const tests = [
    {
      id: 1,
      title: "Основы экологии",
      description: "Проверьте свои знания об основах экологии и экологических терминах.",
      questions: [
        {
          type: "multiple-choice",
          text: "Что такое экосистема?",
          options: ["Совокупность живых организмов", "Совокупность живых организмов и среды их обитания", "Только растения", "Только животные"],
          correctAnswers: [1]
        },
        {
          type: "multiple-choice",
          text: "Какой газ преобладает в атмосфере Земли?",
          options: ["Кислород", "Азот", "Углекислый газ", "Гелий"],
          correctAnswers: [1]
        },
        {
          type: "multiple-select",
          text: "Выберите источники возобновляемой энергии",
          options: ["Солнечная энергия", "Ядерная энергия", "Энергия ветра", "Гидроэнергия"],
          correctAnswers: [0, 2, 3]
        },
        {
          type: "sequence",
          text: "Расставьте этапы круговорота воды в правильном порядке",
          options: ["Испарение", "Конденсация", "Осадки", "Сток"],
          correctSequence: [0, 1, 2, 3]
        },
        {
          type: "true-false",
          text: "Парниковый эффект - это естественное явление",
          correctAnswer: true
        },
        {
          type: "multiple-choice",
          text: "Что такое биоразнообразие?",
          options: [
            "Разнообразие технологий",
            "Разнообразие культур",
            "Разнообразие видов живых организмов",
            "Разнообразие минералов"
          ],
          correctAnswers: [2]
        },
        {
          type: "multiple-choice",
          text: "Какой заповедник был создан первым в России?",
          options: ["Баргузинский", "Долганско-Оленёкский", "Сохондинский", "Кроноцкий"],
          correctAnswers: [0]
        },
        {
          type: "multiple-select",
          text: "Выберите экологические проблемы современности",
          options: ["Загрязнение воздуха", "Парниковый эффект", "Рост населения", "Уничтожение лесов"],
          correctAnswers: [0, 1, 3]
        },
        {
          type: "true-false",
          text: "Озоновый слой защищает Землю от ультрафиолетового излучения",
          correctAnswer: true
        },
        {
          type: "multiple-choice",
          text: "Что такое Красная книга?",
          options: [
            "Книга рецептов",
            "Сборник стихов",
            "Перечень охраняемых видов",
            "Учебник по экологии"
          ],
          correctAnswers: [2]
        }
      ]
    },
    {
      id: 2,
      title: "Животные Красной книги",
      description: "Проверьте свои знания о животных, занесенных в Красную книгу России.",
      questions: [
        {
          type: "multiple-choice",
          text: "Какой из этих животных находится в Красной книге?",
          options: ["Обыкновенная лиса", "Амурский тигр", "Домашняя кошка", "Серый волк"],
          correctAnswers: [1]
        },
        {
          type: "multiple-choice",
          text: "Где обитает снежный барс в России?",
          options: ["Урал", "Алтай", "Кавказ", "Сахалин"],
          correctAnswers: [1]
        },
        {
          type: "multiple-select",
          text: "Выберите животных из Красной книги России",
          options: ["Белый медведь", "Полярная сова", "Орлан-белохвост", "Серый журавль"],
          correctAnswers: [0, 2, 3]
        },
        {
          type: "sequence",
          text: "Расставьте эти животных по порядку уменьшения их численности в России",
          options: ["Амурский тигр", "Белый медведь", "Снежный барс", "Орлан-белохвост"],
          correctSequence: [3, 1, 2, 0]
        },
        {
          type: "true-false",
          text: "Численность амурского тигра увеличивается благодаря охране",
          correctAnswer: true
        },
        {
          type: "multiple-choice",
          text: "Какой из этих зверей самый крупный?",
          options: ["Снежный барс", "Орлан-белохвост", "Белый медведь", "Амурский тигр"],
          correctAnswers: [2]
        },
        {
          type: "multiple-choice",
          text: "Какой из этих животных является птицей?",
          options: ["Амурский тигр", "Белый медведь", "Снежный барс", "Орлан-белохвост"],
          correctAnswers: [3]
        },
        {
          type: "multiple-select",
          text: "Выберите правильные утверждения об орлане-белохвосте",
          options: [
            "Символ России",
            "Размах крыльев до 2,5 метров",
            "Гнездится в пустынях",
            "Строит самые большие гнезда"
          ],
          correctAnswers: [0, 1, 3]
        },
        {
          type: "true-false",
          text: "Белые медведи не занесены в Красную книгу",
          correctAnswer: false
        },
        {
          type: "multiple-choice",
          text: "Какое животное из Красной книги имеет самую маленькую численность в России?",
          options: ["Амурский тигр", "Снежный барс", "Белый медведь", "Орлан-белохвост"],
          correctAnswers: [1]
        }
      ]
    },
    {
      id: 3,
      title: "Климат и климатические изменения",
      description: "Проверьте свои знания о климате, климатических изменениях и их влиянии на экосистему.",
      questions: [
        {
          type: "multiple-choice",
          text: "Что является основным парниковым газом?",
          options: ["Кислород", "Азот", "Углекислый газ", "Аргон"],
          correctAnswers: [2]
        },
        {
          type: "multiple-choice",
          text: "Какой регион наиболее уязвим к изменению климата?",
          options: ["Урал", "Арктика", "Украина", "Сахалин"],
          correctAnswers: [1]
        },
        {
          type: "multiple-select",
          text: "Выберите последствия потепления климата",
          options: ["Таяние ледников", "Подъем уровня океана", "Увеличение снежного покрова", "Частые наводнения"],
          correctAnswers: [0, 1, 3]
        },
        {
          type: "sequence",
          text: "Расставьте климатические пояса России с севера на юг",
          options: ["Арктический", "Субтропики", "Тайга", "Степь"],
          correctSequence: [0, 2, 3, 1]
        },
        {
          type: "true-false",
          text: "Потепление климата может привести к исчезновению некоторых видов животных",
          correctAnswer: true
        },
        {
          type: "multiple-choice",
          text: "Какой газ в наибольшей степени влияет на потепление климата?",
          options: ["Метан", "Углекислый газ", "Озон", "Азот"],
          correctAnswers: [1]
        },
        {
          type: "multiple-choice",
          text: "Что такое парниковый эффект?",
          options: ["Охлаждение атмосферы", "Удержание тепла в атмосфере", "Изменение течений", "Снижение уровня моря"],
          correctAnswers: [1]
        },
        {
          type: "multiple-select",
          text: "Выберите действия, которые могут замедлить изменение климата",
          options: ["Сокращение выбросов CO2", "Использование ископаемого топлива", "Рециклинг", "Создание новых заводов"],
          correctAnswers: [0, 2]
        },
        {
          type: "true-false",
          text: "Таяние вечной мерзлоты высвобождает парниковые газы",
          correctAnswer: true
        },
        {
          type: "multiple-choice",
          text: "Какой стране принадлежит больше всего ледников?",
          options: ["Россия", "США", "Канада", "Норвегия"],
          correctAnswers: [2]
        }
      ]
    },
    {
      id: 4,
      title: "Экологические термины",
      description: "Проверьте свои знания об экологических терминах и понятиях.",
      questions: [
        {
          type: "multiple-choice",
          text: "Что такое биоценоз?",
          options: ["Совокупность живых организмов", "Совокупность живых организмов и среды", "Только растения", "Только животные"],
          correctAnswers: [0]
        },
        {
          type: "multiple-choice",
          text: "Что такое биосфера?",
          options: ["Только океаны", "Только атмосфера", "Вся оболочка Земли", "Только леса"],
          correctAnswers: [2]
        },
        {
          type: "multiple-select",
          text: "Выберите антропогенные факторы воздействия на экосистемы",
          options: ["Вырубка лесов", "Природные катастрофы", "Загрязнение водоемов", "Деятельность человека"],
          correctAnswers: [0, 2, 3]
        },
        {
          type: "sequence",
          text: "Расставьте уровни организации жизни в правильном порядке",
          options: ["Биосферный", "Популяционный", "Молекулярный", "Организменный"],
          correctSequence: [2, 3, 1, 0]
        },
        {
          type: "true-false",
          text: "Экология - это наука о взаимодействии организма и среды",
          correctAnswer: true
        },
        {
          type: "multiple-choice",
          text: "Что такое экотип?",
          options: [
            "Тип экологической модели",
            "Группа организмов одного вида в определенной среде",
            "Тип экосистемы",
            "Тип климата"
          ],
          correctAnswers: [1]
        },
        {
          type: "multiple-choice",
          text: "Какой уровень организации жизни изучает популяции?",
          options: ["Молекулярный", "Организменный", "Популяционно-видовой", "Биосферный"],
          correctAnswers: [2]
        },
        {
          type: "multiple-select",
          text: "Выберите абиотические факторы среды",
          options: ["Температура", "Влажность", "Конкуренция между животными", "Свет"],
          correctAnswers: [0, 1, 3]
        },
        {
          type: "true-false",
          text: "Все живые организмы на Земле составляют биосферу",
          correctAnswer: false
        },
        {
          type: "multiple-choice",
          text: "Что изучает экология?",
          options: [
            "Только растения",
            "Только животных",
            "Взаимодействие организмов и среды",
            "Только человека"
          ],
          correctAnswers: [2]
        }
      ]
    },
    {
      id: 5,
      title: "Правила поведения в природе",
      description: "Проверьте свои знания о правильном поведении в природе и правилах охраны окружающей среды.",
      questions: [
        {
          type: "multiple-choice",
          text: "Что можно делать в лесу?",
          options: ["Рвать редкие цветы", "Разводить костер в неположенном месте", "Собирать мусор", "Стрелять в животных"],
          correctAnswers: [2]
        },
        {
          type: "multiple-choice",
          text: "Что запрещено в заповедниках?",
          options: ["Наблюдение за животными", "Фотографирование", "Сбор грибов", "Прогулки"],
          correctAnswers: [2]
        },
        {
          type: "multiple-select",
          text: "Выберите правила поведения в лесу",
          options: ["Не шуметь", "Не оставлять мусор", "Не собирать грибы", "Не ломать ветки"],
          correctAnswers: [0, 1, 3]
        },
        {
          type: "sequence",
          text: "Расставьте шаги при оказании помощи при лесных пожарах",
          options: ["Сообщить в МЧС", "Пытаться потушить небольшие очаги", "Не мешать профессионалам", "Участвовать в тушении крупных пожаров"],
          correctSequence: [0, 1, 2, 3]
        },
        {
          type: "true-false",
          text: "Можно ловить редких животных на селфи",
          correctAnswer: false
        },
        {
          type: "multiple-choice",
          text: "Как правильно утилизировать батарейки?",
          options: ["В мусорное ведро", "В почву", "Сдать в пункт приема", "Сжечь"],
          correctAnswers: [2]
        },
        {
          type: "multiple-choice",
          text: "Что делать с пластиковыми бутылками?",
          options: ["Оставлять в лесу", "Скапливать дома", "Сортировать и перерабатывать", "Выкидывать в водоемы"],
          correctAnswers: [2]
        },
        {
          type: "multiple-select",
          text: "Выберите правила поведения на природе",
          options: ["Не оставлять мусор", "Не трогать детенышей животных", "Собирать редкие растения", "Соблюдать тишину"],
          correctAnswers: [0, 1, 3]
        },
        {
          type: "true-false",
          text: "Можно вырубать деревья без разрешения",
          correctAnswer: false
        },
        {
          type: "multiple-choice",
          text: "Как правильно разжигать костер?",
          options: [
            "Где угодно",
            "В местах с сухой травой",
            "В специально отведенных местах",
            "Под деревьями"
          ],
          correctAnswers: [2]
        }
      ]
    },
    {
      id: 6,
      title: "Энергосбережение",
      description: "Проверьте свои знания об энергосберегающих технологиях и экологичном потреблении энергии.",
      questions: [
        {
          type: "multiple-choice",
          text: "Какой тип лампочек самый энергоэффективный?",
          options: ["Лампы накаливания", "Галогеновые", "Светодиодные", "Натриевые"],
          correctAnswers: [2]
        },
        {
          type: "multiple-choice",
          text: "Какой способ отопления самый экологичный?",
          options: ["Дровяная печь", "Электрические обогреватели", "Солнечные панели", "Твердотопливный котел"],
          correctAnswers: [2]
        },
        {
          type: "multiple-select",
          text: "Выберите способы экономии воды",
          options: ["Чистка зубов с открытым краном", "Полив растений в дождь", "Установка экономителей воды", "Сокращение времени душа"],
          correctAnswers: [1, 2, 3]
        },
        {
          type: "sequence",
          text: "Расставьте шаги энергосберегающего поведения в правильном порядке",
          options: ["Выключать свет", "Использовать энергосберегающие лампочки", "Не оставлять технику в режиме ожидания", "Утеплить дом"],
          correctSequence: [3, 1, 0, 2]
        },
        {
          type: "true-false",
          text: "Нужно выключать технику из розетки, если она не используется",
          correctAnswer: true
        },
        {
          type: "multiple-choice",
          text: "Что такое энергосберегающие технологии?",
          options: [
            "Технологии с низким уровнем потребления энергии",
            "Технологии, производящие больше энергии",
            "Технологии, использующие только ископаемое топливо",
            "Технологии, не влияющие на окружающую среду"
          ],
          correctAnswers: [0]
        },
        {
          type: "multiple-choice",
          text: "Какой транспорт самый экологичный?",
          options: ["Автомобиль", "Мотоцикл", "Велосипед", "Автобус"],
          correctAnswers: [2]
        },
        {
          type: "multiple-select",
          text: "Выберите способы сокращения углеродного следа",
          options: ["Пешие прогулки", "Использование одноразовой посуды", "Рециклинг", "Покупка местных продуктов"],
          correctAnswers: [0, 2, 3]
        },
        {
          type: "true-false",
          text: "Энергосберегающие лампочки вредны для экологии из-за ртути",
          correctAnswer: false
        },
        {
          type: "multiple-choice",
          text: "Что такое углеродный след?",
          options: [
            "След от углеродной бумаги",
            "Количество углерода, выбрасываемого в атмосферу",
            "Отпечаток пальца",
            "След от костра"
          ],
          correctAnswers: [1]
        }
      ]
    },
    {
      id: 7,
      title: "Охрана природы в России",
      description: "Проверьте свои знания о природоохранных мерах и законах в России.",
      questions: [
        {
          type: "multiple-choice",
          text: "Какой закон регулирует охрану природы в России?",
          options: ["Уголовный кодекс", "Конституция", "Земельный кодекс", "Федеральный закон об охране окружающей среды"],
          correctAnswers: [3]
        },
        {
          type: "multiple-choice",
          text: "Что такое ООПТ?",
          options: ["Объект охраны природы", "Особо охраняемая природная территория", "Общественная организация по защите природы", "Объединение охотников"],
          correctAnswers: [1]
        },
        {
          type: "multiple-select",
          text: "Выберите виды ООПТ в России",
          options: ["Заповедники", "Национальные парки", "Охотничьи угодья", "Заказники"],
          correctAnswers: [0, 1, 3]
        },
        {
          type: "sequence",
          text: "Расставьте статусы охраны видов в правильном порядке (от наивысшего к наименьшему)",
          options: ["Вымершие", "Виды под угрозой", "Редкие", "Массовые виды"],
          correctSequence: [0, 1, 2, 3]
        },
        {
          type: "true-false",
          text: "Все животные в Красной книге находятся под угрозой исчезновения",
          correctAnswer: false
        },
        {
          type: "multiple-choice",
          text: "Что такое Красная книга?",
          options: [
            "Книга рецептов",
            "Сборник стихов",
            "Перечень охраняемых видов",
            "Учебник по экологии"
          ],
          correctAnswers: [2]
        },
        {
          type: "multiple-choice",
          text: "Как часто обновляется Красная книга?",
          options: ["Ежегодно", "Каждые 10 лет", "Каждые 5 лет", "Никогда"],
          correctAnswers: [2]
        },
        {
          type: "multiple-select",
          text: "Выберите меры охраны животных",
          options: ["Создание заповедников", "Браконьерство", "Мониторинг популяций", "Сокращение охраны"],
          correctAnswers: [0, 2]
        },
        {
          type: "true-false",
          text: "Охрана природы в России регулируется государством",
          correctAnswer: true
        },
        {
          type: "multiple-choice",
          text: "Кто отвечает за охрану природы в России?",
          options: [
            "Министерство культуры",
            "Министерство образования",
            "Министерство природных ресурсов",
            "Министерство спорта"
          ],
          correctAnswers: [2]
        }
      ]
    },
    {
      id: 8,
      title: "Экология и здоровье",
      description: "Проверьте свои знания о взаимосвязи экологии и здоровья человека.",
      questions: [
        {
          type: "multiple-choice",
          text: "Как загрязнение воздуха влияет на здоровье?",
          options: ["Улучшает дыхание", "Вызывает болезни легких", "Укрепляет иммунитет", "Не влияет"],
          correctAnswers: [1]
        },
        {
          type: "multiple-choice",
          text: "Как загрязнение воды влияет на человека?",
          options: ["Улучшает вкус воды", "Вызывает болезни", "Увеличивает количество рыбы", "Не влияет"],
          correctAnswers: [1]
        },
        {
          type: "multiple-select",
          text: "Выберите источники загрязнения окружающей среды",
          options: ["Автомобили", "Заводы", "Парк с деревьями", "Свалки"],
          correctAnswers: [0, 1, 3]
        },
        {
          type: "sequence",
          text: "Расставьте стадии загрязнения среды обитания",
          options: ["Попадание загрязнителя", "Разрушение среды", "Сокращение численности", "Вымирание вида"],
          correctSequence: [0, 1, 2, 3]
        },
        {
          type: "true-false",
          text: "Загрязнение окружающей среды не влияет на здоровье человека",
          correctAnswer: false
        },
        {
          type: "multiple-choice",
          text: "Что такое экологический след?",
          options: [
            "След от обуви в лесу",
            "Влияние человека на окружающую среду",
            "Карта природных ресурсов",
            "Место обитания животных"
          ],
          correctAnswers: [1]
        },
        {
          type: "multiple-choice",
          text: "Какой вид загрязнения наиболее опасен для здоровья?",
          options: ["Шумовое", "Визуальное", "Химическое", "Тепловое"],
          correctAnswers: [2]
        },
        {
          type: "multiple-select",
          text: "Выберите способы защиты здоровья от загрязнения",
          options: ["Носить маску", "Пить загрязненную воду", "Использовать фильтры", "Игнорировать экологию"],
          correctAnswers: [0, 2]
        },
        {
          type: "true-false",
          text: "Здоровье человека напрямую зависит от состояния окружающей среды",
          correctAnswer: true
        },
        {
          type: "multiple-choice",
          text: "Какой орган больше страдает от загрязнения воздуха?",
          options: [
            "Печень",
            "Легкие",
            "Сердце",
            "Почки"
          ],
          correctAnswers: [1]
        }
      ]
    },
    {
      id: 9,
      title: "Охрана природы в повседневной жизни",
      description: "Проверьте свои знания о том, как каждый может внести вклад в охрану природы в повседневной жизни.",
      questions: [
        {
          type: "multiple-choice",
          text: "Что такое раздельный сбор мусора?",
          options: ["Сортировка отходов по цвету", "Сортировка отходов по типу", "Сортировка отходов по весу", "Сортировка отходов по размеру"],
          correctAnswers: [1]
        },
        {
          type: "multiple-choice",
          text: "Какой материал лучше перерабатывается?",
          options: ["Пластик", "Стекло", "Металл", "Композитные материалы"],
          correctAnswers: [1]
        },
        {
          type: "multiple-select",
          text: "Выберите экологичные привычки",
          options: ["Покупка одноразовой посуды", "Использование многоразовых мешков", "Выбрасывание аккумуляторов в мусор", "Энергосберегающее поведение"],
          correctAnswers: [1, 3]
        },
        {
          type: "sequence",
          text: "Расставьте шаги экологичного образа жизни в правильном порядке",
          options: ["Сортировка мусора", "Сокращение потребления", "Изучение экологии", "Создание мусора"],
          correctSequence: [1, 0, 2, 3]
        },
        {
          type: "true-false",
          text: "Покупка локальных продуктов уменьшает углеродный след",
          correctAnswer: true
        },
        {
          type: "multiple-choice",
          text: "Какой способ покупок самый экологичный?",
          options: [
            "Онлайн-заказ из разных стран",
            "Покупка у местных фермеров",
            "Покупка с упаковкой",
            "Покупка вдалеке от дома"
          ],
          correctAnswers: [1]
        },
        {
          type: "multiple-choice",
          text: "Что такое углеродный след?",
          options: [
            "След от обуви",
            "Влияние транспорта",
            "Общее количество выбрасываемого углерода",
            "След от животных"
          ],
          correctAnswers: [2]
        },
        {
          type: "multiple-select",
          text: "Выберите экологичные привычки",
          options: ["Использовать пластиковые пакеты", "Брать многоразовую бутылку", "Выключать свет", "Выбрасывать батарейки в обычный мусор"],
          correctAnswers: [1, 2]
        },
        {
          type: "true-false",
          text: "Экологичное поведение не влияет на окружающую среду",
          correctAnswer: false
        },
        {
          type: "multiple-choice",
          text: "Какой вид транспорта самый экологичный?",
          options: ["Автомобиль", "Мотоцикл", "Велосипед", "Автобус"],
          correctAnswers: [2]
        }
      ]
    }
  ];

useEffect(() => {
  console.log('Текущая страница:', activePage);
}, [activePage]);

// Анимация появления при прокрутке
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    document.querySelectorAll('.scroll-animation').forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.scroll-animation').forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, [activePage]);

  // Обработка нажатия Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (activeTest) {
          if (showResult) {
            setActiveTest(null);
            setShowResult(false);
            setCurrentQuestion(0);
            setAnswers([]);
          } else {
            setCurrentQuestion(0);
            setActiveTest(null);
          }
        } else {
          setSelectedAnimal(null);
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeTest, showResult]);

  // Обработка скролла для анимации
  useEffect(() => {
    if (selectedAnimal || activeTest) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedAnimal, activeTest]);

  // Пример данных для других страниц
  const pages = {
    home: (
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {animals.map((animal) => (
          <div
            key={animal.id}
            onClick={() => setSelectedAnimal(animal)}
            className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
              selectedAnimal?.id === animal.id ? "ring-4 ring-green-700" : ""
            }`}
          >
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent flex items-end justify-center pb-6">
              <h2 className="text-2xl font-semibold text-stroke-shadow ">{animal.name}</h2>
            </div>
          </div>
        ))}
      </section>
    ),
    volunteering: (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="relative bg-green-800 text-white rounded-2xl overflow-hidden mb-16 h-[400px] flex items-center scroll-animation">
            <div className="absolute inset-0 bg-[url('https://placehold.co/1200x400?text=Eco+Volunteers')] bg-cover bg-fixed bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-800 to-green-900"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 animate-slideIn">Стань частью экологического движения</h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slideIn delay-100">
                Твои действия могут изменить будущее планеты. Начни с малого — стань волонтером и помоги сохранить природу.
              </p>
              <a className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105" href = "https://ecowiki.ru/about/">
                Присоединиться
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Контентная секция */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center scroll-animation">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Малые шаги с большими последствиями</h3>
              <p className="text-green-700 mb-4">
                Каждый школьник может внести свой вклад...
              </p>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Сортировка мусора в школе и дома
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Участие в экологических акциях
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -top-4 -left-0 w-24 h-24 bg-green-200 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-100 rounded-full opacity-20 animate-pulse delay-300"></div>
                <img 
                  src="/Волонтёр.png" 
                  alt="Волонтеры" 
                  className="relative z-10 rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        
          {/* Карточки с идеями */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 scroll-animation">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">Очистка территорий</h4>
              <p className="text-green-700">Участвуй в субботниках, организуй уборку во дворе или у реки</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 scroll-animation">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">Посадка деревьев</h4>
              <p className="text-green-700">Прими участие в акциях по озеленению, создай мини-сад в школе</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 scroll-animation">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 00-1.414-1.414L5 5m14 0l-1.414-1.414M5 5v14a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-.586-1.414L5 5z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-green-800 mb-2">Создание проектов</h4>
              <p className="text-green-700">Разработай свой экопроект: от переработки до наблюдения за животными</p>
            </div>
          </div>

          {/* Анимированный раздел */}
          <div className="bg-green-50 rounded-2xl p-8 md:p-12 my-12 relative overflow-hidden scroll-animation">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -mt-16 -mr-16 opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-200 rounded-full -mb-16 -ml-16 opacity-30"></div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center">Ты тоже можешь изменить мир</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="flex flex-col items-center text-center animate-float">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016a9 9 0 01-14.236 0m14.236 0a9 9 0 00-14.236 0m14.236 0l-2 2m-2-2l-2-2m-2 2l-2 2m-2-2l-2-2m14.236 0L12 14.236M5 12l2-2 4 4 8-8 2 2" />
                  </svg>
                </div>
                <h4 className="font-semibold text-green-700 mb-2">Шаг 1</h4>
                <p className="text-green-800">Начни с малого — внеси изменения в свою повседневную жизнь</p>
              </div>
              
              <div className="flex flex-col items-center text-center animate-float delay-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h4 className="font-semibold text-green-700 mb-2">Шаг 2</h4>
                <p className="text-green-800">Присоединяйся к локальным проектам или инициируй свои</p>
              </div>
            </div>
          </div>

          {/* Как начать */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 relative scroll-animation">
            <div className="absolute top-0 -left-4 w-32 h-32 bg-green-100 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 -right-4 w-40 h-40 bg-green-200 rounded-full opacity-20 animate-pulse delay-700"></div>
            
            <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">Как начать?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-3">Школьные экопроекты</h4>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Систему раздельного сбора мусора
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-3">Городские инициативы</h4>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Участвуй в городских субботниках
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-3">Ресурсы для вдохновения</h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-2">#ЭкоГерой</span> 
                <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-2">#ЮныйЭкоАктивист</span>
              </div>
              <a className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105" href = "https://ecowiki.ru/about/">
                Найти локальные проекты
              </a>
            </div>
          </div>
          
          {/* Истории успеха */}
          <div className="bg-green-50 rounded-2xl p-6 md:p-10 relative overflow-hidden mt-12 scroll-animation">
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-200 rounded-full opacity-30 -mt-10 -mr-10 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-200 rounded-full opacity-30 -mb-10 -ml-10 animate-blob delay-2000"></div>
            
      
          </div>
        </div>
      </section>
    ),


    about: (
      <section className="max-w-3xl mx-auto py-8">
        <h2 className="text-3xl font-bold text-green-800 mb-6">О проекте</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-green-900 mb-4">
            "EcoMind" - это интерактивная образовательная платформа, разработанная специально для школьников. 
            Наша цель - помочь молодому поколению понять важность сохранения биоразнообразия и познакомить с редкими видами животных, занесенными в Красную книгу России.
          </p>
          <p className="text-green-900 mb-4">
            Проект разработан в рамках экологического образования и направлен на формирование экологического мышления у детей. 
            Мы используем современные интерактивные методы для максимального вовлечения и запоминания информации.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <img src="https://placehold.co/600x400?text=Students+Eco+Project" alt="Образовательный процесс" className="rounded-lg w-full md:w-1/2 object-cover" />
            <img src="https://placehold.co/600x400?text=Eco+Education" alt="Экологическое образование" className="rounded-lg w-full md:w-1/2 object-cover" />
          </div>
        </div>
      </section>
    ),

     tests: (
      <section className="py-8">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Экологические тесты</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((test) => (
            <div 
              key={test.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 testi"
            >
              <div className="bg-green-700 h-2"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-800 mb-2">{test.title}</h3>
                <p className="text-green-900 mb-4">{test.description}</p>
                <button
                  onClick={() => {
                    setActiveTest(test);
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setShowResult(false);
                  }}
                  className="mt-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
                >
                  Перейти к тесту
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
    
    contacts: (
      <section className="max-w-3xl mx-auto py-8">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Контакты</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-green-900 mb-4">
            Если у вас есть вопросы или предложения по улучшению проекта, вы можете связаться с нами:
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-green-700 mr-2">📧</span>
              <span>ugl-school2@yandex.ru,https://ugl-school2.sakhalinschool.ru ugo.mbouooshu.2@sakhalin.gov.ru</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-700 mr-2">📱</span>
              <span>+74243237-302</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-700 mr-2">📍</span>
              <span>694923, Сахалинская обл, Углегорский р-н, Углегорск г., Приморская ул, дом № 35</span>
            </li>
          </ul>
          <div className="mt-6">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A1a9d6047e451120ffd5d001e86f5357c9874f4d67e16a94c09fa578589993f56&amp;source=constructorStatic" 
              width="100%" 
              height="300" 
              frameborder="0"
              className="rounded-lg"
              title="Карта с офисом проекта"
            ></iframe>
          </div>
        </div>
      </section>
    )
  };

  // Вычисление результата теста
  const calculateResult = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      const question = activeTest?.questions?.[index];
      if (!question) return;
      
      if (question.type === "multiple-choice") {
        if (answer === question.correctAnswers?.[0]) score++;
      } else if (question.type === "multiple-select") {
        if (Array.isArray(answer) && 
            Array.isArray(question.correctAnswers) && 
            answer.sort().join(',') === question.correctAnswers.sort().join(',')) score++;
      } else if (question.type === "sequence") {
        if (Array.isArray(answer) && 
            Array.isArray(question.correctSequence) && 
            answer.join(',') === question.correctSequence.join(',')) score++;
      } else if (question.type === "true-false") {
        if (answer === question.correctAnswer) score++;
      }
    });
    return score;
  };

  // Обработка ответов
  const handleAnswerChange = (index) => {
    const newAnswers = [...answers];
    const currentQuestionData = activeTest?.questions?.[currentQuestion];
    if (!currentQuestionData) return;
    
    if (currentQuestionData.type === "multiple-choice") {
      newAnswers[currentQuestion] = index;
    } else if (currentQuestionData.type === "multiple-select") {
      const currentSelection = newAnswers[currentQuestion] || [];
      if (currentSelection.includes(index)) {
        newAnswers[currentQuestion] = currentSelection.filter(i => i !== index);
      } else {
        newAnswers[currentQuestion] = [...currentSelection, index];
      }
    } else if (currentQuestionData.type === "sequence") {
      const currentSelection = newAnswers[currentQuestion] || [];
      if (currentSelection.includes(index)) {
        newAnswers[currentQuestion] = currentSelection.filter(i => i !== index);
      } else {
        newAnswers[currentQuestion] = [...currentSelection, index];
      }
    } else if (currentQuestionData.type === "true-false") {
      newAnswers[currentQuestion] = index === 0;
    }
    
    setAnswers(newAnswers);
  };

  // Перетаскивание для последовательности
  const handleDragStart = (event, index) => {
    setDraggedIndex(index);
    event.currentTarget.style.opacity = '0.4';
  };

  const handleDragEnd = (event) => {
    event.currentTarget.style.opacity = '1';
    setDraggedIndex(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();
    if (draggedIndex === null) return;
    
    const newAnswers = [...answers];
    const currentSelection = [...newAnswers[currentQuestion]];
    const movedItem = currentSelection[draggedIndex];
    currentSelection.splice(draggedIndex, 1);
    currentSelection.splice(targetIndex, 0, movedItem);
    newAnswers[currentQuestion] = currentSelection;
    setAnswers(newAnswers);
    setDraggedIndex(null);
  };

  return (
    <div className="bg-green-50 min-h-screen font-sans antialiased">
      {/* Навигационное меню */}
      <header className="bg-green-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center menu">
              <a href="#" className="flex items-center space-x-2"> 
                 <img 
    src="/logo.png" 
    alt="Логотип EcoMind" 
  />
              </a>
            </div>
            
            {/* Мобильное меню бургер */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Десктоп меню */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => {setActivePage('home'); setIsMenuOpen(false);}}
                className={`font-medium py-2 px-1 ${activePage === 'home' ? 'text-green-300 border-b-2 border-green-300' : 'hover:text-green-300'}`}
              >
                Главная
              </button>
               <button 
                onClick={() => {setActivePage('volunteering'); setIsMenuOpen(false);}} 
                className={`font-medium py-2 px-1 ${activePage === 'volunteering' ? 'text-green-300 border-b-2 border-green-300' : 'hover:text-green-300'}`} 
                >Волонтерство
              </button> 
              <button 
              onClick={() => {setActivePage('tests'); setIsMenuOpen(false);}}
              className={`font-medium py-2 px-1 ${activePage === 'tests' ? 'text-green-300 border-b-2 border-green-300' : 'hover:text-green-300'}`}
              >
                Тесты
              </button>
              <button 
                onClick={() => {setActivePage('about'); setIsMenuOpen(false);}}
                className={`font-medium py-2 px-1 ${activePage === 'about' ? 'text-green-300 border-b-2 border-green-300' : 'hover:text-green-300'}`}
              >
                О проекте
              </button>
              <button 
                onClick={() => {setActivePage('contacts'); setIsMenuOpen(false);}}
                className={`font-medium py-2 px-1 ${activePage === 'contacts' ? 'text-green-300 border-b-2 border-green-300' : 'hover:text-green-300'}`}
              >
                Контакты
              </button>
            </nav>
          </div>
          


          {/* Мобильное меню */}
          {isMenuOpen && (
            <div className="md:hidden py-4 animate-fadeIn">
              <button 
                onClick={() => {setActivePage('home'); setIsMenuOpen(false);}}
                className={`block w-full text-left py-2 px-4 ${activePage === 'home' ? 'bg-green-800' : ''}`}
              >
                Главная
              </button>
              <button 
      onClick={() => {setActivePage('volunteering'); setIsMenuOpen(false);}} 
      className={`block w-full text-left py-2 px-4 ${activePage === 'volunteering' ? 'bg-green-800' : ''}`} 
    >
      Волонтерство
    </button>
              <button 
                onClick={() => {setActivePage('tests'); setIsMenuOpen(false);}}
                className={`block w-full text-left py-2 px-4 ${activePage === 'tests' ? 'bg-green-800' : ''}`}
              >
                Тесты
              </button>
              <button 
                onClick={() => {setActivePage('about'); setIsMenuOpen(false);}}
                className={`block w-full text-left py-2 px-4 ${activePage === 'about' ? 'bg-green-800' : ''}`}
              >
                О проекте
              </button>
              <button 
                onClick={() => {setActivePage('contacts'); setIsMenuOpen(false);}}
                className={`block w-full text-left py-2 px-4 ${activePage === 'contacts' ? 'bg-green-800' : ''}`}
              >
                Контакты
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Основное содержимое */}
      <main className="container mx-auto px-4 py-8">
        {pages[activePage]}
      </main>

      {/* Модальное окно с деталями животного */}
      {selectedAnimal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 animate-fadeIn" onClick={() => setSelectedAnimal(null)}>
          <div 
            className="relative bg-white rounded-lg overflow-hidden w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Изображение животного */}
            <div className="md:w-1/2 w-full">
              <img
                src={selectedAnimal.image}
                alt={selectedAnimal.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Описание животного */}
            <div className="md:w-2/3 w-full p-8 overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-green-800">{selectedAnimal.name}</h2>
                <button 
                  onClick={() => setSelectedAnimal(null)}
                  className="text-green-700 hover:text-green-900"
                  aria-label="Закрыть"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-green-900 leading-relaxed mb-6">
                {selectedAnimal.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Статус:</h3>
                  <p className="text-green-900">{selectedAnimal.status}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Среда обитания:</h3>
                  <p className="text-green-900">{selectedAnimal.habitat}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Численность:</h3>
                  <p className="text-green-900">{selectedAnimal.population}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Меры охраны:</h3>
                  <p className="text-green-900">{selectedAnimal.protection}</p>
                </div>
              </div>
              
              <div className="mt-4 border-t border-green-200 pt-4">
                <h3 className="font-semibold text-green-800 mb-3">Интересные факты:</h3>
                <ul className="list-disc pl-5 space-y-1 text-green-900">
                  <li>Амурский тигр может прокормить семью в течение двух недель одной добычей</li>
                  <li>Снежный барс может прыгать на расстояние до 15 метров</li>
                  <li>Белые медведи могут плавать на расстояние до 100 км без остановки</li>
                  <li>Орлан-белохвост может развивать скорость до 80 км/ч в пикировании</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => setSelectedAnimal(null)}
                  className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно с тестом */}
      {activeTest && !showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
          <div className="relative bg-white rounded-lg overflow-hidden w-full max-w-3xl max-h-[90vh] flex flex-col">
    
            <div className="bg-green-700 p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">{activeTest.title}</h2>
                <p className="text-green-100 text-sm">Вопрос {currentQuestion + 1} из {activeTest.questions.length}</p>
              </div>
              <button 
                onClick={() => {
                  setActiveTest(null);
                  setShowResult(false);
                  setCurrentQuestion(0);
                  setAnswers([]);
                }}
                className="text-white hover:text-green-200"
                aria-label="Закрыть тест"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Вопрос */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {activeTest.questions[currentQuestion] && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">{activeTest.questions[currentQuestion].text}</h3>
                  
                  {/* Типы вопросов */}
                  {activeTest.questions[currentQuestion].type === "multiple-choice" && (
                    <div className="space-y-2">
                      {activeTest.questions[currentQuestion].options.map((option, index) => (
                        <label 
                          key={index} 
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition ${
                            answers[currentQuestion] === index 
                              ? 'bg-green-100 border-l-4 border-green-700' 
                              : 'hover:bg-green-50'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name={`question-${currentQuestion}`}
                            checked={answers[currentQuestion] === index}
                            onChange={() => handleAnswerChange(index)}
                            className="w-4 h-4 text-green-600"
                          />
                          <span className="ml-3">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {activeTest.questions[currentQuestion].type === "multiple-select" && (
                    <div className="space-y-2">
                      {activeTest.questions[currentQuestion].options.map((option, index) => (
                        <label 
                          key={index} 
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition ${
                            answers[currentQuestion]?.includes(index)
                              ? 'bg-green-100 border-l-4 border-green-700' 
                              : 'hover:bg-green-50'
                          }`}
                        >
                          <input 
                            type="checkbox" 
                            checked={answers[currentQuestion]?.includes(index)}
                            onChange={() => handleAnswerChange(index)}
                            className="w-4 h-4 text-green-600"
                          />
                          <span className="ml-3">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {activeTest.questions[currentQuestion].type === "sequence" && (
                    <div className="space-y-2">
                      <p className="text-sm text-green-700 mb-2">Расставьте варианты в правильном порядке:</p>
                      {activeTest.questions[currentQuestion].options.map((option, index) => {
                        const isSelected = answers[currentQuestion]?.includes(index);
                        const position = isSelected ? answers[currentQuestion].indexOf(index) + 1 : '';
                        
                        return (
                          <div 
                            key={index}
                            onClick={() => handleAnswerChange(index)}
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            className={`p-3 rounded-lg cursor-pointer transition relative ${
                              isSelected
                                ? 'bg-green-100 border-l-4 border-green-700' 
                                : 'hover:bg-green-50'
                            }`}
                          >
                            {isSelected && (
                              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-green-700 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                {position}
                              </span>
                            )}
                            <span className={isSelected ? "ml-8" : ""}>{option}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {activeTest.questions[currentQuestion].type === "true-false" && (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleAnswerChange(0)}
                        className={`flex-1 p-3 rounded-lg text-center transition ${
                          answers[currentQuestion] === true
                            ? 'bg-green-700 text-white' 
                            : 'bg-green-100 hover:bg-green-200'
                        }`}
                      >
                        Верно
                      </button>
                      <button
                        onClick={() => handleAnswerChange(1)}
                        className={`flex-1 p-3 rounded-lg text-center transition ${
                          answers[currentQuestion] === false
                            ? 'bg-green-700 text-white' 
                            : 'bg-green-100 hover:bg-green-200'
                        }`}
                      >
                        Неверно
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Навигация по тесту */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
                  className={`px-4 py-2 rounded transition ${
                    currentQuestion > 0 
                      ? 'bg-green-700 text-white hover:bg-green-800' 
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                  disabled={currentQuestion === 0}
                >
                  Назад
                </button>
                
                {currentQuestion < activeTest.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
                  >
                    Далее
                  </button>
                ) : (
                  <button
                    onClick={() => setShowResult(true)}
                    className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
                  >
                    Завершить тест
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно с результатом теста */}
      {activeTest && showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
          <div className="relative bg-white rounded-lg overflow-hidden w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="bg-green-700 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Результаты теста</h2>
              <button 
                onClick={() => {
                  setActiveTest(null);
                  setShowResult(false);
                  setCurrentQuestion(0);
                  setAnswers([]);
                }}
                className="text-white hover:text-green-200"
                aria-label="Закрыть"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-700 text-3xl font-bold mb-4">
                  {calculateResult()}
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  {calculateResult()} из {activeTest.questions.length} правильных ответов
                </h3>
                <p className="text-green-700">
                  {calculateResult() === activeTest.questions.length ? "Отлично! Вы отлично разбираетесь в экологии!" :
                   calculateResult() > activeTest.questions.length / 2 ? "Хорошо! У вас хорошие знания в области экологии." :
                   "Можно еще потренироваться. Попробуйте пройти тест еще раз!"}
                </p>
              </div>
              
              <div className="border-t border-green-200 pt-4 mt-4">
                <h4 className="font-semibold text-green-800 mb-3">Анализ ответов:</h4>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {activeTest.questions.map((question, index) => {
                    const answer = answers[index];
                    let isCorrect = false;
                    let userAnswerText = "";
                    let correctAnswerText = "";

                    if (question.type === "multiple-choice" || question.type === "true-false") {
                      userAnswerText = question.options?.[answer] || "Не выбран";
                      correctAnswerText = question.options?.[question.correctAnswers?.[0]] || "Не указан";
                      isCorrect = answer === (question.correctAnswers?.[0]);
                    } else if (question.type === "multiple-select") {
                      userAnswerText = Array.isArray(answer) 
                        ? answer.map(i => question.options?.[i]).join(', ') || "Не выбрано"
                        : "Не выбрано";
                      correctAnswerText = Array.isArray(question.correctAnswers)
                        ? question.correctAnswers.map(i => question.options?.[i]).join(', ')
                        : "Не указано";
                      isCorrect = Array.isArray(answer) && 
                                  Array.isArray(question.correctAnswers) && 
                                  answer.sort().join(',') === question.correctAnswers.sort().join(',');
                    } else if (question.type === "sequence") {
                      userAnswerText = Array.isArray(answer) 
                        ? answer.map(i => `${question.options?.[i]}`).join(', ') || "Не выбрано"
                        : "Не выбрано";
                      correctAnswerText = Array.isArray(question.correctSequence)
                        ? question.correctSequence.map(i => question.options?.[i]).join(', ')
                        : "Не указано";
                      isCorrect = Array.isArray(answer) && 
                                  Array.isArray(question.correctSequence) && 
                                  answer.join(',') === question.correctSequence.join(',');
                    } else if (question.type === "true-false") {
                      userAnswerText = answer === true ? "Верно" : answer === false ? "Неверно" : "Не выбрано";
                      correctAnswerText = question.correctAnswer ? "Верно" : "Неверно";
                      isCorrect = answer === question.correctAnswer;
                    }
                    
                    return (
                      <div key={index} className="border-b border-green-100 pb-3">
                        <p className="font-medium text-green-800 mb-2">Вопрос {index + 1}: {question.text}</p>
                        <p className="text-sm text-green-900 mb-1">
                          Ваш ответ: {userAnswerText || "Не выбран"}
                        </p>
                        <p className="text-sm text-green-900">
                          Правильный ответ: {correctAnswerText || "Не указан"}
                        </p>
                        <div className={`mt-1 text-sm font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {isCorrect ? "Правильно" : "Неправильно"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-green-900 text-white p-0 mt-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center menu">
               <img 
                src="/logo.png" 
                alt="Логотип EcoMind" 
                />
              <p className="text-sm opacity-80 mt-1"></p>
            </div>
            <div className="text-sm text-center">
              <p>© {new Date().getFullYear()} ЭкоЗнайка</p>
              <p className="opacity-80">Образовательный проект по защите Красной книги животных России</p>
            </div>
          </div>
        </div>
      </footer>

      
      {/* Стили для анимации */}
      <style jsx>{`
       @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-2000 {
          animation-delay: 2000ms;
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}