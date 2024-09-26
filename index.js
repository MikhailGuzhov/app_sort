document.getElementById("sortButton").addEventListener("click", function () {
  const input = document.getElementById("numberInput").value;
  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = ""; // Очистить предыдущий результат

  // Разделение строки по пробелам и запятым
  const numbersArray = input
    .split(/[\s,]+/)
    .map((num) => num.trim())
    .filter((num) => num !== "");

  // Удалить дубликаты и отсортировать
  const uniqueNumbers = [...new Set(numbersArray)];
  const sortedNumbers = uniqueNumbers.map(Number).sort((a, b) => a - b);

  // Определим количество дубликатов
  const duplicateNumbers = numbersArray.filter(
    (item, index) => numbersArray.indexOf(item) !== index
  );
  const duplicates = duplicateNumbers.filter(
    (item, index) => duplicateNumbers.indexOf(item) === index
  );

  sortedNumbers.forEach((number) => {
    const numberElement = document.createElement("div");
    numberElement.classList.add("number");

    // Проверка на дубликаты
    if (duplicates.includes(number.toString())) {
      numberElement.classList.add("red");

      // добавляем надпись что это дубликат
      const duplicateLabel = document.createElement("span");
      duplicateLabel.textContent = "(дубликат)";

      // Также добавляем текст с номером
      numberElement.textContent = number; // Сначала добавляем номер
      numberElement.appendChild(duplicateLabel); // Затем добавляем элемент с "(дубликат)"
    } else {
      numberElement.classList.add(
        sortedNumbers.indexOf(number) % 2 === 0 ? "orange" : "green"
      );
      numberElement.textContent = number; // Добавляем текст с номером
    }

    resultContainer.appendChild(numberElement);
  });

  // Количество уникальных номеров
  const countContainer = document.getElementById("countContainer");
  countContainer.textContent = `Общее количество уникальных номеров: ${sortedNumbers.length}`; // из них колличество дубликатов
  countContainer.textContent += ` из них дубликатов: ${duplicates.length}`;
});

document.getElementById("resetButton").addEventListener("click", function () {
  document.getElementById("numberInput").value = "";
  document.getElementById("resultContainer").innerHTML = "";
  document.getElementById("countContainer").textContent = "";
});
