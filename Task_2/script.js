var nodes = {
  appendDiv: function(parentId, childId) {
    var parentDiv = document.getElementById(parentId);
    var newDiv = nodes.createElement("div", childId);
    parentDiv.appendChild(newDiv);
  },

  createElement: function(tag, id) {
    var newElement = document.createElement(tag);
    newElement.setAttribute("id", id);
    return newElement;
  },

  appendDisabledOption: function(parentId) {
    var option = document.createElement("option");
    option.disabled = "disabled";
    option.selected = "true";
    var parent = document.getElementById(parentId);
    parent.appendChild(option);
  },

  addDropdownItem: function(id, item) {
    var option = document.createElement("option");
    option.text = item;
    document.getElementById(id).add(option);
  },

  append: function(parent, child) {
    parent.appendChild(child);
  },

  clearDropdown: function() {
    document.getElementById("dropdown").options.length = 0;
  },

  dropdownSelectedValue: function(id) {
    var element = document.getElementById(id);
    var value = element.options[element.selectedIndex].text;
    return value;
  },

  appendTextArea: function(number) {
    var div = document.getElementById("home");
    var textarea = nodes.createElement("textarea", "textarea-" + number);
    div.appendChild(textarea);
  },

  appendElementInParent: function(parentId, childTag, childId) {
    var parent = document.getElementById(parentId);
    var child = nodes.createElement(childTag, childId);
    parent.appendChild(child);
  },

  appendForm: function(parentId, formId) {
    var form = nodes.createElement("form", formId);
    var parent = document.getElementById(parentId, formId);
    parent.appendChild(form);
  },

  appendSelect: function(parentId, selectId) {
    var select = nodes.createElement("select", selectId)
    var parent = document.getElementById(parentId, selectId);
    parent.appendChild(select);
  },

  addTextArea: function(parent, textAreaNumber) {
    var textArea = document.createElement("textarea");
    textArea.placeholder = "Text Area " + textAreaNumber;
    textArea.id = "textarea" + textAreaNumber;
    parent.appendChild(textArea);
  },

  addCreateTableButton: function(parent) {
    var button = nodes.createElement("button", "createTable");
    button.onclick = nodes.createTable;
    button.innerHTML = "Create Table";
    parent.appendChild(button);
  },

  isEmpty: function(map) {
    for (var key in map) {
      return !map.hasOwnProperty(key);
    }
    return true;
  },

  createTable: function() {
    var parent;
    var numberOfTextAreas = document.getElementById("textareas").childElementCount - 1;
    var tableDiv = document.getElementById("table-section");
    if (tableDiv == null) { 
      nodes.appendDiv("home", "table-section");
      tableDiv = document.getElementById("table-section");
    } else { 
      tableDiv.innerHTML = "";
    }

    parent = document.getElementById("table-section");
    var table = nodes.createElement("table", "mainTable");
    parent.appendChild(table);
    var tr = nodes.createElement("tr", "first-row");
    table.appendChild(tr);
    tr = nodes.createElement("tr", "second-row");
    table.appendChild(tr);
    var th;
    var td;
    for (var textArea = 1; textArea <= numberOfTextAreas; textArea++) {
      th = nodes.createElement("th");
      th.innerHTML = "Text Area " + textArea;
      tr = document.getElementById("first-row");
      tr.appendChild(th);
      tr = document.getElementById("second-row");
      td = nodes.createElement("td", "textAreaCell" + textArea);
      tr.appendChild(td);
      logic.wordCounter(textArea);
    } //for
  }, //createTable()

  wordCounterTable: function(textAreaNumber, words) {
    var parent = document.getElementById("textAreaCell" + textAreaNumber);
    var table = nodes.createElement("table", "counter" + textAreaNumber);
    parent.appendChild(table);
    var tr = nodes.createElement("tr");
    if (nodes.isEmpty(words)) {
      tr.innerHTML = "No data to display";
      table.appendChild(tr);
      return;
    }
    table.appendChild(tr);
    var th = nodes.createElement("th");
    th.innerHTML = "Word";
    tr.appendChild(th);
    th = nodes.createElement("th");
    th.innerHTML = "Count";
    tr.appendChild(th);
    var cell;
    for (var word in words) {
      tr = nodes.createElement("tr");
      parent = document.getElementById("counter" + textAreaNumber);
      parent.appendChild(tr);
      cell = tr.insertCell(0);
      cell.innerHTML = word;
      cell = tr.insertCell(1);
      cell.innerHTML = words[word];
    }
  }, //wordCounterTable()

  //JUNIOR DEVELOPER TASK 3 - JSON functions
  appendTableHeaders: function(table, values) {
    var tr = document.createElement("tr");
    var th;
    values.forEach(function(value) {
      th = document.createElement("th");
      th.innerHTML = value;
      tr.appendChild(th);
    });
    table.appendChild(tr);
  },

  appendTd: function(tr, tdValue) {
    var td = document.createElement("td");
    td.innerHTML = tdValue;
    tr.appendChild(td);
  },

  appendTableData: function(table, data) {
    var tr;
    data.dataset.forEach(function(element) {
      tr = document.createElement("tr");
      nodes.appendTd(tr, element.schema.manifest.datasetname);
      nodes.appendTd(tr, element.schema.parameters.length);
      nodes.appendTd(tr, element.schema.columns.length);
      nodes.appendTd(tr, logic.getNvarcharElementsNumber(element.schema.parameters));
      nodes.appendTd(tr, logic.getNvarcharElementsNumber(element.schema.columns));
      nodes.appendTd(tr, logic.getDataTypeCharLengthSum(element));
      table.appendChild(tr);
    });
  }
}

var logic = {
  wordCounter: function(textAreaNumber) {
    var textArea = document.getElementById("textarea" + textAreaNumber);
    var words = textArea.value.split(/[\n+\s]/g);
    var counter = {};
    words.forEach(function(word) {
      if (word != "") {
        counter = {};
        for (var i = 0; i < words.length; ++i) {
			if(words[i] !== ''){
				if (!counter[words[i]]) {
					counter[words[i]] = 0;
				}
				counter[words[i]]++;
			}
        }
      }
    });
    nodes.wordCounterTable(textAreaNumber, counter);
  },

  setNumbers: function() {
    var range = document.getElementById("range").value;
    var values = new Array(2);
    if (/^(\d)+-(\d)+$/.test(range)) {
      values = range.split('-');
      var firstValue = parseInt(values[0]);
      var secondValue = parseInt(values[1]);
      nodes.clearDropdown();
      if (firstValue <= secondValue) {
		  nodes.addDropdownItem("dropdown", "");
        for (var number = firstValue; number <= secondValue; number++)
          nodes.addDropdownItem("dropdown", number)
      } else {
        for (var number = firstValue; number >= secondValue; number--)
          nodes.addDropdownItem("dropdown", number)
      }
    } else {
      alert("Error! Please enter numbers like the example above...");
    }
  }, //setNumbers()

  generateTextAreas: function() {
    var numberOfTextAreas = nodes.dropdownSelectedValue("dropdown");
    var parent = document.getElementById("textareas");
    parent.innerHTML = "";
    for (var textArea = 1; textArea <= numberOfTextAreas; textArea++) {
      nodes.addTextArea(parent, textArea);
    }
    nodes.addCreateTableButton(parent);
  },

  //JUNIOR DEVELOPER TASK 3 - JSON functions
  getNvarcharElementsNumber: function(elements) {
    var sum = 0;
    elements.forEach(function(element) {
      if(element.datatype == "nvarchar") {
        sum++;
      }
    })
    return sum;
  },

  getDataTypeCharLengthSum: function(dataset) {
    var sum = 0;
    dataset.schema.parameters.forEach(function(parameter) {
      if(parameter.datatypecharlength != "") {
        sum += parseInt(parameter.datatypecharlength);
      }
    });
    dataset.schema.columns.forEach(function(column) {
      if(column.datatypecharlength != "") {
        sum += parseInt(column.datatypecharlength);
      }
    });
    return sum;
  },
}


function init() {
  nodes.appendDiv("home", "top");
  var parent = document.getElementById("top");
  parent.innerHTML = "Enter numbers like the example: 1-5";
  nodes.appendForm("top", "form");
  nodes.appendDiv("form", "inputs");

  parent = document.getElementById("inputs");
  var input = nodes.createElement("input", "range");
  input.type = "text";
  parent.appendChild(input);
  input = nodes.createElement("input", "submitButton");
  input.type = "button";
  input.value = "Submit";
  parent.appendChild(input);

  nodes.appendDiv("form", "dropdown-div");

  var select = nodes.createElement("select", "dropdown");
  parent = document.getElementById("dropdown-div");
  parent.appendChild(select);

  nodes.appendDisabledOption("dropdown");

  nodes.appendDiv("home", "textareas");

  var submitButton = document.getElementById("submitButton");
  submitButton.onclick = logic.setNumbers;

  var dropdown = document.getElementById("dropdown");
  dropdown.onchange = logic.generateTextAreas;
}

window.addEventListener("load", init);