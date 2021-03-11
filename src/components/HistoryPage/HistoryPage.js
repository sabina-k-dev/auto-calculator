import React, { useState } from "react";
import { Grid, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import car5 from "../../assets/images/car5www.png";
import "./HistoryPage.css";
import store from "../../modules/store";

const HistoryPage = () => {
  // полный массив
  const data = store.getState().form.data;
  console.log(data);
  //отбираем id для фильтра по id
  const idData = data["formikData"].reduce((acc, val) => {
    acc.push(val.id);
    return acc;
  }, []);

  const [result, setResult] = useState(data["formikData"]); // отфильрованные данные для таблицы
  const [searchWord, setSearchWord] = useState(""); // поиск
  const [checkFilter, setCheckFilter] = useState([]); // фильтры по типу
  const [dateSort, setDateSort] = useState("asc"); // фильтры asc/desc по колонкам
  const [sortById, setsortById] = useState(idData); // фильтры по id

  //Удаление пункта
  const deleteFunction = (id) => {
    data["formikData"] = data["formikData"].filter((item) => item.id !== id);
    localStorage.setItem("formikData", JSON.stringify(data));
    setResult(data["formikData"]); // новый вывод данных в таблице
    setSearchWord(""); // очищение поиска
  };

  //Поиск по имени(бренд)
  const searchChange = (event) => {
    const { value } = event.target;
    data["formikData"] = data["formikData"].filter(
      (item) => item.brand.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    setResult(data["formikData"]); // новый вывод данных в таблице
    setSearchWord(value); // поле поиска
  };

  // фильтрация по верхним чекбоксам (бензин, газ, газ\бензин)
  // и по чекбоксам с id
  const checkFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "filters") {
      // общий фильтр
      let newFilter;
      let newResult;
      if (event.target.checked) {
        newFilter = [value];
        newResult = data["formikData"].filter((item) =>
          newFilter.includes(item.filters[0])
        );
      } else {
        newFilter = [];
        newResult = data["formikData"];
      }
      setCheckFilter(newFilter);
      setResult(newResult);
    } else {
      // фильтр по id
      let newArr;
      if (name === "all-id-checkbox") {
        if (event.target.checked) {
          console.log("HI");
          console.log(sortById); // меняется
          console.log(idData); // стабильное
          newArr = idData.reduce((acc, v) => {
            acc.push(Number(v));
            return acc;
          }, []);
        } else {
          newArr = [];
        }
      } else {
        if (event.target.checked) {
          if (!sortById.includes(value)) {
            newArr = sortById.reduce(
              (acc, v) => {
                acc.push(Number(v));
                return acc;
              },
              [Number(value)]
            );
          }
        } else {
          newArr = sortById.filter((val) => val !== Number(value));
        }
      }

      setsortById(newArr);
    }
  };

  //Сортировка по колонкам
  const sortChange = (name) => {
    if (name === "sum") {
      if (dateSort === "asc") {
        setDateSort("desc");
        data["formikData"] = result.sort((a, b) =>
          Number(a["gasSum"]) + Number(a["fuelSum"]) <
          Number(b["gasSum"]) + Number(b["fuelSum"])
            ? 1
            : -1
        );
      } else {
        setDateSort("asc");
        data["formikData"] = result.sort((a, b) =>
          Number(a["gasSum"]) + Number(a["fuelSum"]) >
          Number(b["gasSum"]) + Number(b["fuelSum"])
            ? 1
            : -1
        );
      }
    } else {
      if (dateSort === "asc") {
        setDateSort("desc");
        data["formikData"] = result.sort((a, b) =>
          Number(a[name]) < Number(b[name]) ? 1 : -1
        );
      } else {
        setDateSort("asc");
        data["formikData"] = result.sort((a, b) =>
          Number(a[name]) > Number(b[name]) ? 1 : -1
        );
      }
    }
    setResult(data["formikData"]);
  };

  // Общие подсчеты по колонкам
  const resSum = result.reduce(
    (acc, item) =>
      sortById.includes(item.id)
        ? acc + Number(item.fuelSum) + Number(item.gasSum)
        : acc,
    0
  );
  const resDist = result.reduce(
    (acc, item) =>
      sortById.includes(item.id) ? acc + Number(item.distance) : acc,
    0
  );
  const resFuel = result.reduce((acc, item) => {
    return sortById.includes(item.id)
      ? item.filters.includes("Бензин") || item.filters.includes("Газ/Бензин")
        ? acc + Number(item.fuelLiters)
        : acc
      : acc;
  }, 0);
  const resGas = result.reduce((acc, item) => {
    return sortById.includes(item.id)
      ? item.filters.includes("Газ") || item.filters.includes("Газ/Бензин")
        ? acc + Number(item.gasLiters)
        : acc
      : acc;
  }, 0);
  /*const allConsumption = result.reduce((acc, item) => {
    return sortById.includes(item.id)
      ? item.filters[0] === "Газ"
        ? acc + Number(item.gasСonsumption)
        : item.filters[0] === "Бензин"
        ? acc + Number(item.fuelСonsumption)
        : acc + Number(item.fuelGasСonsumption)
      : acc;
  }, 0);*/
  const allConsumption = resFuel + resGas;
  const advanceConsumption = (allConsumption / resDist) * 100;

  const advanceConsumptionFuel = (resFuel / resDist) * 100;
  const advanceConsumptionGas = (resGas / resDist) * 100;
  //Вывод компонента
  return (
    <div className="main-content">
      <Card className="container table-history">
        <Grid container>
          {!data["formikData"].length && (
            <div className="not-history text-center">
              <h3>У Вас пока нет данных</h3>
              <p>
                Данная страница отображает сохраненные вами результаты расчетов
                по расходу топлева.
                <br />
                Чтобы воспользоваться возможностями таблицы, перейдите по ссылке
                ниже и нажмите чекбокс "сохранить" когда получите результат.
              </p>
            </div>
          )}

          {data["formikData"].length !== 0 && (
            <div className="top-panel-history">
              <input
                className="form-control form-control-lg"
                id="search"
                name="search"
                type="text"
                placeholder="Поиск по имени"
                value={searchWord}
                onChange={searchChange}
              />
              <div className="filterSection">
                {["Бензин", "Газ", "Газ/Бензин"].map((val) => {
                  return (
                    <div className="form-check" key={val}>
                      <input
                        type="checkbox"
                        className="form-control"
                        name="filters"
                        id={val}
                        value={val}
                        onChange={checkFilterChange}
                        checked={checkFilter.includes(val) ? "checked" : ""}
                      />
                      <label className="form-check-label" htmlFor={val}>
                        {val}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <table className="table calculator__oils">
            <thead>
              <tr>
                <th scope="col">
                  <input
                    type="checkbox"
                    className=""
                    name="all-id-checkbox"
                    value={true}
                    onChange={checkFilterChange}
                    checked={sortById.length === idData.length ? "checked" : ""}
                  />{" "}
                  &nbsp;&nbsp;&nbsp;
                </th>
                <th
                  scope="col"
                  className="sort-point"
                  onClick={() => sortChange("id")}
                >
                  Дата <i className="fa fa-fw fa-sort"></i>
                </th>
                <th scope="col">Марка</th>
                <th
                  scope="col"
                  className="sort-point"
                  onClick={() => sortChange("distance")}
                >
                  Расстояние<i className="fa fa-fw fa-sort"></i>
                </th>
                <th scope="col">Бензин</th>
                <th scope="col">Газ</th>
                <th
                  scope="col"
                  className="sort-point"
                  onClick={() => sortChange("sum")}
                >
                  Итого<i className="fa fa-fw fa-sort"></i>
                </th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {result.map((val, i) => {
                const saveTime = new Date(val.id);

                return (
                  <tr
                    key={i}
                    className={!sortById.includes(val.id) ? "not-active" : ""}
                  >
                    <th scope="row">
                      <input
                        type="checkbox"
                        className=""
                        name="id"
                        value={val.id}
                        onChange={checkFilterChange}
                        checked={sortById.includes(val.id) ? "checked" : ""}
                      />
                      {i + 1}
                    </th>
                    <td>
                      {saveTime.toLocaleDateString()}
                      <br />
                      {saveTime.getHours()}:{saveTime.getMinutes()}:
                      {saveTime.getSeconds()}
                    </td>
                    <td>{val.brand}</td>
                    <td>{val.distance}км</td>
                    <td>
                      {val.filters.includes("Бензин")
                        ? `${val.fuelLiters} л`
                        : val.filters.includes("Газ/Бензин")
                        ? `${val.fuelLiters} л`
                        : "-"}
                    </td>
                    <td>
                      {val.filters.includes("Газ")
                        ? `${val.gasLiters} л`
                        : val.filters.includes("Газ/Бензин")
                        ? `${val.gasLiters} л`
                        : "-"}
                    </td>
                    <td>{Number(val.gasSum) + Number(val.fuelSum)} грн</td>
                    <td>
                      <Link to={`/edit/${val.id}`}>Редактировать</Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-step front"
                        value={val.id}
                        onClick={() => deleteFunction(val.id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th scope="row">Итого</th>
                <td></td>
                <td></td>
                <td>
                  <b>{resDist} км</b>
                </td>
                <td>
                  <b>{resFuel} л</b>
                </td>
                <td>
                  <b>{resGas} л</b>
                </td>
                <td>
                  <b>{resSum} грн</b>
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>

          {data["formikData"].length !== 0 && (
            <div>
              {(checkFilter.includes("Бензин") ||
                checkFilter.includes("Газ/Бензин") ||
                checkFilter.length === 0) && (
                <p>
                  Общий средний расход бензина {resFuel} / {resDist} * 100 ={" "}
                  <b>
                    {advanceConsumptionFuel
                      ? advanceConsumptionFuel.toFixed(2)
                      : 0}{" "}
                    л / на 100км
                  </b>
                </p>
              )}
              {(checkFilter.includes("Газ") ||
                checkFilter.includes("Газ/Бензин") ||
                checkFilter.length === 0) && (
                <p>
                  Общий средний расход газа {resGas} / {resDist} * 100 ={" "}
                  <b>
                    {advanceConsumptionGas
                      ? advanceConsumptionGas.toFixed(2)
                      : 0}{" "}
                    л / на 100км
                  </b>
                </p>
              )}
              <br />
              Для вычисления были использованы только данные с учетом настроек
              таблицы.
            </div>
          )}

          {!data["formikData"].length && (
            <div className="not-history text-center">
              <div className="car-img">
                <img src={car5} alt={"car"} />
              </div>
              <div className="line-button-cube">
                <div className="inner">
                  <Link to={`/`} className="btn btn-step front">
                    Вернуться на главную
                  </Link>
                  <Link to={`/`} className="btn btn-step back">
                    Вернуться на главную
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Grid>
      </Card>
    </div>
  );
};

export default HistoryPage;
