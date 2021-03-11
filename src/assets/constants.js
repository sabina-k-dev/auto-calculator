import * as Yup from "yup";

export const schema = (page) =>
  Yup.object().shape({
    brand: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required("Brand is required."),
    fuelСonsumption: Yup.number()
      .typeError("Вы используете некорректное значение")
      .min(1, "Значение должно быть больше 0")
      .required("Это поле обязательно для вычислений"),
    fuelPrice: Yup.number()
      .typeError("Вы используете некорректное значение")
      .min(1, "Значение должно быть больше 0")
      .required("Это поле обязательно для вычислений"),
    gasСonsumption: Yup.number()
      .typeError("Вы используете некорректное значение")
      .min(1, "Значение должно быть больше 0")
      .required("Это поле обязательно для вычислений"),
    gasPrice: Yup.number()
      .typeError("Вы используете некорректное значение")
      .min(1, "Значение должно быть больше 0")
      .required("Это поле обязательно для вычислений"),
    fuelGasСonsumption: Yup.number()
      .typeError("Вы используете некорректное значение")
      .min(1, "Значение должно быть больше 0")
      .required("Это поле обязательно для вычислений"),
    distance: Yup.number()
      .typeError("Вы используете некорректное значение")
      .min(1, "Значение должно быть больше 0")
      .required("Это поле обязательно для вычислений"),
    //saveData: Yup.bool().oneOf([true], "Must agree to something"),
  });

// автобус
const bus = [
  '"Витязь"',
  '"Лидер"',
  '"Стайер"',
  "Chevrolet",
  "Fiat",
  "Ford",
  "Hyundai",
  "Ikarus",
  "Iveco",
  "Karosa",
  "MAN",
  "Mercedes-Benz",
  "Mitsubishi",
  "Nissan",
  "Nusa",
  "Ssang Yong",
  "Toyota",
  "Volkswagen",
  "АКА",
  "АТС",
  "Волжанин",
  "ГАЗ",
  "ГолАЗ",
  "ЗИЛ",
  "КАВЗ",
  "ЛАЗ",
  "ЛиАЗ",
  "МАЗ",
  "МАРЗ",
  "НефАЗ",
  "ПАЗ",
  "Псковавто",
  "РАФ",
  "САРЗ",
  "СЕМАР",
  "ТАМ",
  "УАЗ",
  "ЯАЗ",
];
// автокран
const truckСrane = ["ГАЗ", "ЗИЛ", "КамАЗ", "КрАЗ", "МАЗ", "МЗКТ", "Урал"];
// эвакуаторы
const towTrucks = ["ГАЗ", "ЗИЛ", "МАЗ", "РК"];
// заправщики
const carTanker = ["ГАЗ", "ЗИЛ", "КамАЗ", "КрАЗ", "МАЗ", "Урал"];
// грузовой автомобиль
const truck = [
  "Avia",
  "DAF",
  "Ford",
  "IFA",
  "Iveco",
  "Magirus",
  "Mercedes-Benz",
  "Scania",
  "Tatra",
  "Volvo",
  "ГАЗ",
  "ЗИЛ",
  "КамАЗ",
  "КрАЗ",
  "МАЗ",
  "УАЗ",
  "Урал",
];
// легковой автомобиль
const car = [
  "Alfa Romeo",
  "Audi",
  "BMW",
  "Cadillac",
  "Chery",
  "Chevrolet",
  "Chrysler",
  "Citroen",
  "Daewoo",
  "Dodge",
  "Fiat",
  "Ford",
  "GMC",
  "Great Wall",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Isuzu",
  "Jaguar",
  "Kia",
  "Land Rover",
  "Lexus",
  "Lifan",
  "Lincoln",
  "Mazda",
  "Mercedes-Benz",
  "Mitsubishi",
  "Nissan",
  "Opel",
  "Peugeot",
  "Pontiac",
  "Porsche",
  "Range Rover",
  "Rover",
  "Saab",
  "Seat",
  "Skoda",
  "Ssang Yong",
  "Subaru",
  "Suzuki",
  "TAGAZ",
  "Toyota",
  "Volvo",
  "Vortex",
  "Богдан",
  "ВАЗ",
  "Волга",
  "ГАЗ",
  "Донинвест",
  "ЗАЗ",
  "ЗИЛ",
  "ИЖ",
  "ЛуАЗ",
  "Москвич",
  "СеАЗ",
];
//самосвал
const dumpTruck = [
  "Avia",
  "IFA",
  "Iveco",
  "Magirus",
  "Scania",
  "Tatra",
  "Volvo",
  "БелАЗ",
  "ГАЗ",
  "ГАЗ-САЗ",
  "ЗИЛ-ММЗ",
  "КАЗ",
  "КамАЗ",
  "КрАЗ",
  "МАЗ",
  "МоАЗ",
  "САЗ",
];
// спецтехника на шосси
const onChassis = [
  "-",
  "Jeep",
  "MAN",
  "Mercedes-Benz",
  "Volkswagen",
  "Volvo",
  "Бронто",
  "Бронто (SISU)",
  "ВАЗ",
  "ГАЗ",
  "ЗИЛ",
  "КамАЗ",
  "КрАЗ",
  "Магирус- Дойц",
  "Магирус-Дойц",
  "Мерседес-Бенц",
  "Москвич",
  "ПАЗ",
  "РАФ",
  "САЗ",
  "УАЗ",
  "Урал",
];
// тягач
const tractor = [
  "Avstro-Fiat",
  "Chepel",
  "DAF",
  "Faun",
  "International",
  "Iveco",
  "KNVF",
  "LIAZ",
  "MAN",
  "Mercedes-Benz",
  "Praga",
  "Renault",
  "Scania",
  "Scod",
  "Tatra",
  "Volvo",
  "БелАЗ",
  "ГАЗ",
  "ЗИЛ",
  "КАЗ",
  "КамАЗ",
  "КрАЗ",
  "МАЗ",
  "МАЗ-MAN",
  "Урал",
  "Урал-Ивеко",
];
// фургон
const van = [
  "Avia",
  "Ford",
  "IFA-Robur",
  "Isuzu",
  "Iveco",
  "MAN",
  "Mercedes-Benz",
  "Mitsubishi",
  "Renault",
  "TA",
  "Volkswagen",
  "Volvo",
  "Zuk",
  "БАГЕМ",
  "ГАЗ",
  "ДИСА",
  "ЕрАЗ",
  "ЗИЛ",
  "ИМЯ-M",
  "КавЗ",
  "Кубанец",
  "Кубань",
  "МАЗ",
  "Мод. (ГЗСА)",
  "Мод. (КозМЗ)",
  "Москвич",
  "НЗАС",
  "ПАЗ",
  "Ратник",
  "РАФ",
  "РИДА",
  "УАЗ",
  "Урал",
];

export const brands = {
  Автобус: bus,
  Автокран: truckСrane,
  "Автомобили-эвакуаторы": towTrucks,
  "Автомобиль-топливозаправщик и маслозаправщик": carTanker,
  Грузовой: truck,
  Легковой: car,
  Самосвал: dumpTruck,
  "Спецтехника на шасси": onChassis,
  Тягач: tractor,
  Фургон: van,
};

export const ratioFuelGasArr = [
  "95/5",
  "90/10",
  "85/15",
  "80/20",
  "75/25",
  "70/30",
  "65/35",
  "60/40",
  "55/45",
  "50/50",
  "45/55",
  "40/60",
  "35/65",
  "30/70",
];
export const types = [
  "Автобус",
  "Автокран",
  "Автомобили-эвакуаторы",
  "Автомобиль-топливозаправщик и маслозаправщик",
  "Грузовой",
  "Легковой",
  "Самосвал",
  "Спецтехника на шасси",
  "Тягач",
  "Фургон",
];

export const reducer = (state, action) => {
  switch (action.type) {
    case "currentStep": {
      return { ...state, currentStep: action.payload };
    }
    case "type": {
      return { ...state, type: action.payload };
    }
    case "brand": {
      return { ...state, brand: action.payload };
    }
    case "filters": {
      return { ...state, filters: action.payload };
    }
    case "fuelСonsumption": {
      return { ...state, fuelСonsumption: action.payload };
    }
    case "fuelPrice": {
      return { ...state, fuelPrice: action.payload };
    }
    case "gasСonsumption": {
      return { ...state, gasСonsumption: action.payload };
    }
    case "gasPrice": {
      return { ...state, gasPrice: action.payload };
    }
    case "ratioFuelGas": {
      return { ...state, ratioFuelGas: action.payload };
    }
    case "fuelGasСonsumption": {
      return { ...state, fuelGasСonsumption: action.payload };
    }
    case "distance": {
      return { ...state, distance: action.payload };
    }
    case "liters": {
      return { ...state, liters: action.payload };
    }
    case "sum": {
      return { ...state, sum: action.payload };
    }
    case "disabledButton": {
      return { ...state, disabledButton: action.payload };
    }
    case "saveData": {
      return { ...state, saveData: action.payload };
    }
    case "id": {
      return { ...state, id: action.payload };
    }
    default:
      return state;
  }
};
