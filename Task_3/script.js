var nodes = {
  appendDiv: function(parentId, childId) {
    var parentDiv = document.getElementById(parentId);
    var newDiv = nodes.createElement("div", childId);
    nodes.append(parentDiv, newDiv);
  },

  clearDiv: function(divId) {
    var div = document.getElementById(divId);
    div.innerHTML = "";
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
    parent = document.getElementById(parentId);
    nodes.append(parent, option);
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
    nodes.append(div, textarea);
  },

  appendElementInParent: function(parentId, childTag, childId) {
    var parent = document.getElementById(parentId);
    var child = nodes.createElement(childTag, childId);
    nodes.append(parent, child);
  },

  appendForm: function(parentId, formId) {
    var form = nodes.createElement("form", formId);
    var parent = document.getElementById(parentId, formId);
    nodes.append(parent, form);
  },

  appendSelect: function(parentId, selectId) {
    var select = nodes.createElement("select", selectId)
    var parent = document.getElementById(parentId, selectId);
    nodes.append(parent, select);
  },

  addTextArea: function(parent, textAreaNumber) {
    var textArea = document.createElement("textarea");
    textArea.value = "Text Area " + textAreaNumber;
    textArea.id = "textarea"+textAreaNumber;
    nodes.append(parent, textArea);
  },

  clearDiv(divElement) {
    while(divElement.hasChildnodes()) {
      divElement.removeChild(divElement.firstChild);
    }
  },

  addCreateTableButton: function(parent) {
    var button = nodes.createElement("button", "createTable");
    button.onclick = nodes.createTable;
    button.innerHTML = "Create Table";
    nodes.append(parent, button);
  },

  isEmpty: function(map) {
    for(var key in map) {
      return !map.hasOwnProperty(key);
    }
    return true;
  },

  createTable: function() {
    var parent;
    var numberOfTextAreas = document.getElementById("textareas").childElementCount - 1;
    var tableDiv = document.getElementById("table-section");
    if(tableDiv == null) {
      nodes.appendDiv("home", "table-section");
      tableDiv = document.getElementById("table-section");
    }
    else {
      nodes.clearDiv(tableDiv);
    }

    parent = document.getElementById("table-section");
    var table = nodes.createElement("table", "mainTable");
    nodes.append(parent, table);
    var tr = nodes.createElement("tr", "first-row");
    nodes.append(table, tr);
    tr = nodes.createElement("tr", "second-row");
    nodes.append(table, tr);
    var th;
    var td;
    for(var textArea = 1; textArea <= numberOfTextAreas; textArea++) {
      th = nodes.createElement("th");
      th.innerHTML = "Text Area " + textArea;
      tr = document.getElementById("first-row");
      nodes.append(tr, th);
      tr = document.getElementById("second-row");
      td = nodes.createElement("td", "textAreaCell" + textArea);
      nodes.append(tr, td);
      logic.wordCounter(textArea);
    } //for
  }, //createTable()

  wordCounterTable: function(textAreaNumber, words) {
    parent = document.getElementById("textAreaCell" + textAreaNumber);
    table = nodes.createElement("table", "counter" + textAreaNumber);
    nodes.append(parent, table);
    var tr = nodes.createElement("tr");
    if(nodes.isEmpty(words)){
      tr.innerHTML = "No data to display";
      nodes.append(table, tr);
      return;
    }
    nodes.append(table, tr);
    var th = nodes.createElement("th");
    th.innerHTML = "Word";
    nodes.append(tr, th);
    th = nodes.createElement("th");
    th.innerHTML = "Count";
    nodes.append(tr, th);
    var cell;
    for(var word in words) {
      tr = nodes.createElement("tr");
      parent = document.getElementById("counter" + textAreaNumber);
      nodes.append(parent, tr);
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
    var words = textArea.value.split(' ');
    var counter = { };
    words.forEach( function(word) {
      if(word != "") {
        counter = { };
        for(var i = 0; i < words.length; ++i) {
            if(!counter[words[i]])
                counter[words[i]] = 0;
            ++counter[words[i]];
        }
      }
    });
    nodes.wordCounterTable(textAreaNumber, counter);
  },

  setNumbers: function() {
    var range = document.getElementById("range");
    var values = new Array(2);
    if(/^(\d)+-(\d)+$/.test(range)) { 
      values = range.split('-');

      var firstValue = parseInt(values[0]);
      var secondValue = parseInt(values[1]);
      nodes.clearDropdown();
      if(firstValue <= secondValue) {
        for(number = firstValue; number <= secondValue; number++)
          nodes.addDropdownItem("dropdown", number)
      }
      else {
        for(number = firstValue; number >= secondValue; number--)
          nodes.addDropdownItem("dropdown", number)
      }
    }
    else
      alert("Error! Please enter numbers like the example above...");
  }, //setNumbers()

  generateTextAreas: function() {
    var numberOfTextAreas = nodes.dropdownSelectedValue("dropdown");
    var parent = document.getElementById("textareas");
    nodes.clearDiv(parent);
    for(var textArea = 1; textArea <= numberOfTextAreas; textArea++) {
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
  var home = document.getElementById("home");
  var table = document.createElement("table");
  home.appendChild(table);
  var thValues = ["Database Name", "Number Parameters", "Number Columns",
  "Number NVARCHAR Parameters", "Number NVARCHAR Columns", "SUM datatypecharlength" ];
  nodes.appendTableHeaders(table, thValues);
  nodes.appendTableData(table, data);
}

window.addEventListener("load", init);