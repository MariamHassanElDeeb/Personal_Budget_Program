(function () {
  //data
  var budget = 0;
  var income = 0;
  var expeness = 0;
  var incomeId = 0;
  var expenessId = 0;
  //elemnts
  var type = document.querySelector(".add__type");
  var description = document.querySelector(".add__description");
  var value = document.querySelector(".add__value");
  var add = document.querySelector(".add__btn");
  //Date
  var monthElement = document.querySelector(".budget__title--month");
  var date = new Date();
  var currentMonth = date.toString().split(" ")[1];
  monthElement.textContent = currentMonth;
  //Delete
  function deleteItem(e) {
    var deletedvalue = e.target.parentElement.parentElement.parentElement
      .querySelector(".item__value")
      .textContent.split(" ")[1];
    if (Boolean(e.target.closest(".income"))) {
      budget = budget - deletedvalue;
      income = income - deletedvalue;
      console.log("income");
    } else {
      budget = budget + +deletedvalue;
      expeness = expeness - deletedvalue;
    }
    document.querySelector(".budget__income--value").textContent = income;
    document.querySelector(".budget__expenses--value").textContent = expeness;
    document.querySelector(".budget__value").textContent = budget;
    e.target.parentElement.parentElement.parentElement.parentElement.remove();
    changepercentage();
  }
  //precentage
  function changepercentage() {
    ////total exp
    var totalincome = document.querySelector(
      ".budget__income--value"
    ).textContent;
    var totalexpeness = document.querySelector(
      ".budget__expenses--value"
    ).textContent;
    document.querySelector(".budget__expenses--percentage").textContent =
      (totalexpeness / totalincome) * 100 + "%";
    ////entries of exp
    var entriespercentage = document.querySelectorAll(".item__percentage");
    for (var i = 0; i < entriespercentage.length; i++) {
      entriespercentage[i].textContent =
        (100 *
          Number(
            entriespercentage[i]
              .closest(".right")
              .querySelector(".item__value")
              .textContent.split(" ")[1]
          )) /
          totalincome +
        "%";
    }
  }
  ///start
  reset();
  description.focus();
  function handleTypeBtn() {
    if (description.value !== "" && value.value !== "" && value.value > 0) {
      if (type.value === "inc") {
        income += +value.value;
        var x =
          '<div class="item clearfix" id="expense-' +
          incomeId +
          '"><div class="item__description">' +
          description.value +
          "</div>" +
          '<div class="right clearfix">' +
          '<div class="item__value">+ ' +
          value.value +
          "</div>" +
          '<div class="item__percentage"> </div>' +
          '<div class="item__delete">' +
          '<button class="item__delete--btn">' +
          '<i class="ion-ios-close-outline"></i>' +
          "</button>" +
          "</div>" +
          "</div>" +
          "</div>";
        document
          .querySelector(".income__list")
          .insertAdjacentHTML("beforeend", x);
        value.value = null;
        description.value = null;
        document.querySelector(".budget__income--value").textContent = income;
        incomeId++;
        description.focus();
        console.log("hi");
      } else {
        expeness += +value.value;
        var y =
          '<div class="item clearfix" id="expense-' +
          expenessId +
          '"><div class="item__description">' +
          description.value +
          "</div>" +
          '<div class="right clearfix">' +
          '<div class="item__value">- ' +
          value.value +
          "</div>" +
          '<div class="item__percentage"> </div>' +
          '<div class="item__delete">' +
          '<button class="item__delete--btn">' +
          '<i class="ion-ios-close-outline"></i>' +
          "</button>" +
          "</div>" +
          "</div>" +
          "</div>";
        document
          .querySelector(".expenses__list")
          .insertAdjacentHTML("beforeend", y);
        value.value = null;
        description.value = null;
        document.querySelector(".budget__expenses--value").textContent =
          expeness;
        expenessId++;
        description.focus();
      }
      budget = income - expeness;
      document.querySelector(".budget__value").textContent = budget;
    } else {
      ////we can use popup or make it unaccessable
      alert("Please input all values in the right way");
    }
    ///delete btn
    var deleteBtns = document.querySelectorAll(".ion-ios-close-outline");
    for (var i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].addEventListener("click", deleteItem);
    }
    changepercentage();
  }
  function handleKeyboardPress(event) {
    if (event.key === "Enter") {
      handleTypeBtn();
    }
  }
  add.addEventListener("click", handleTypeBtn);
  document.addEventListener("keypress", handleKeyboardPress);

  function reset() {
    document.querySelector(".budget__income--value").textContent = "0";
    document.querySelector(".budget__expenses--value").textContent = "0";
    document.querySelector(".budget__value").textContent = "0";
  }
})();
