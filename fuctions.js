document.addEventListener("DOMContentLoaded", function () {
  let expElement = document.getElementById("expected");
  let actualEl = document.getElementById("actual");
  let compareBtn = document.getElementById("compare-btn");
  let clearBtn = document.getElementById("clear-btn");
  let resultContainer = document.getElementById("result");

  function clearResults() {
    resultContainer.innerHTML = "";
    resultContainer.classList.remove("nochange");
    let existingDiffList = document.getElementById("differences");
    if (existingDiffList) {
      existingDiffList.remove();
    }
  }

  function differenceList() {
    let ol = document.createElement("ol");
    ol.id = "differences";
    ol.className = "change";
    let header = document.createElement("li");
    header.textContent = "Texts are different";
    ol.appendChild(header);
    return ol;
  }

  function showNoDifference() {
    clearResults();
    resultContainer.classList.add("nochange");
    let li = document.createElement("li");
    li.textContent = "No differences found";
    resultContainer.appendChild(li);
  }

  compareBtn.addEventListener("click", function () {
    clearResults();

    let expectedText = expElement.value;
    let actualText = actualEl.value;
    let expectedLines = expectedText.split("\n");
    let actualLines = actualText.split("\n");
    let maxLines = Math.max(expectedLines.length, actualLines.length);

    let differencesFound = false;

    let diffList = differenceList();

    // if (expectedLines.length !== actualLines.length) {
    //   differencesFound = true;
    //   let lineCountItem = document.createElement("li");
    //   lineCountItem.textContent = `The  input differs bro. Expected: ${expectedLines.length}, Actual: ${actualLines.length}`;
    //   diffList.appendChild(lineCountItem);
    // }

    for (let i = 0; i < maxLines; i++) {
      let expectedLine = expectedLines[i] === undefined ? "" : expectedLines[i];
      let actualLine = actualLines[i] === undefined ? "" : actualLines[i];

      if (expectedLine !== actualLine) {
        differencesFound = true;
        let lineDiffItem = document.createElement("li");
        lineDiffItem.textContent = `Line ${i + 1}: \n >"${expectedLine}" \n >"${actualLine}"`;
        diffList.appendChild(lineDiffItem);
      }
    }

    if (differencesFound) {
      resultContainer.appendChild(diffList);
    } else {
      showNoDifference();
    }
  });

  clearBtn.addEventListener("click", function () {
    expElement.value = "";
    actualEl.value = "";
    clearResults();
  });
});
