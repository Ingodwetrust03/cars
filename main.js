"use strict";

const getData = () => {
  const select = document.querySelector("select");
  const options = select.querySelectorAll("options");
  const carBlock = document.querySelector(".car-block");
  console.log(options);

  const getCarsData = () => {
    fetch("https://cars-test-831eb-default-rtdb.firebaseio.com/db.json")
      .then((response) => response.json())
      .then((json) => {
        let jsonFormat = json;

        jsonFormat.forEach((option) => {
          const createOption = document.createElement("option");
          createOption.setAttribute("value", option["model"]);
          createOption.textContent = option["model"];
          select.append(createOption);
        });
      });
  };

  getCarsData();

  const getDataCar = () => {
    let selectedOption = select.options[select.selectedIndex];
    let selectedOptionValue = selectedOption.getAttribute("value");

    if (selectedOptionValue) {
      fetch(
        `https://cars-test-831eb-default-rtdb.firebaseio.com/db/${
          select.selectedIndex - 1
        }.json`
      )
        .then((response) => response.json())
        .then((json) => {
          let result = json;
          for (let key in result) {
            carBlock.innerHTML = `Модель: ${result["model"]}<br>Цена: ${result["price"]}  `;
          }
        });
    }
  };

  select.addEventListener("change", () => getDataCar());
};

getData();
