var javascript = {
  importData: function() {
    var languages;
    var speakers2008;
    var speakers2009;
    var speakers2010;
    for (var i = 0; i < json.dataset.data.length; i++) {
      languages = json.dataset.data[i].Language;
      speakers2010 = json.dataset.data[i].Speakers_2010;
      speakers2008 = json.dataset.data[i].Speakers_2008;
      speakers2009 = json.dataset.data[i].Speakers_2009;
      data.push([languages, speakers2008, speakers2009, speakers2010]);
    }
  },

  getBarCategories: function() {
    var categoriesNode = "<categories>";
    for (var i = 0; i < data.length; i++) {
      categoriesNode += "<category label='" + data[i][0] + "'></category>";
    }
    categoriesNode += "</categories>";
    return categoriesNode;
  },

  getBarData: function(year) {
    var color=["1bcbe2", "27a51c", "ffb13d"];
    var dataNode = "<data color='" + color[year-1] + "' seriesName='Speakers in " + (year + 2007) + "'>";
    dataNode += javascript.getBarData_Set(year);
    dataNode += "</data>";
    return dataNode;
  },

  getBarData_Set: function(year) {
    var setNodes = "";
    for (var i = 0; i < data.length; i++) {
      setNodes += "<set value='" + data[i][year] + "' toolText='" + data[i][year] + "'></set>";
    }
    return setNodes;
  },

  bar: function(type) {
    var baseNode = "<base depth='0' bgColor='ffffff,e6e6e6' bgAngle='225' showValues='1' chartTopMargin='10' chartRightMargin='10' chartBottomMargin='0' chartLeftMargin='10' ></base>";
	var barsNode = "<bars isColumn='1' barsGradientOpacity='50' barsHoverColor='default' barsSpacing='25' barsGradientAngle='90' barsMaxHeightCoef='0.13'></bars>";
	var canvasNode = "<canvas canvasPadding='20' canvasBgColor='e6e6e6,ffffff' canvasBgAlpha='100' canvasBgAngle='225' outCnvBaseFont='Segoe UI,Tahoma,Verdana' outCnvBaseFontSize='12'></canvas>";
    var divlinesNode = "<divlines numDivLines='4' showAlternateHGridColor='1' AlternateHGridAlpha='100' AlternateHGridColor='CCCCCC' divLineColor='999999'></divlines>";
    var headingsNode = "<headings rotateCategoryNames='1' caption=''></headings>";
    var legendNode = "<legend showLegend='1'></legend>";
	var scalesNode = "<scales xAxisMinValue='0' xAxisMaxValue='100' yAxisMinValue='0' yAxisMaxValue='100'></scales>";
    var categoriesNode = javascript.getBarCategories();
    var dataNode = "";
    if (type != "all_Years") {
		dataNode += javascript.getBarData(3);
    }else {
		dataNode += javascript.getBarData(1);
		dataNode += javascript.getBarData(2);
		dataNode += javascript.getBarData(3);
	}
    var chart = "<chart>" +
      baseNode +
      barsNode +
      canvasNode +
      divlinesNode +
      headingsNode +
      legendNode +
      categoriesNode +
      dataNode +
	  scalesNode +
      "</chart>";
    return chart;
  },

  getPieSetNodes: function() {
    var setNodes = "";
    for (var i = 0; i < data.length; i++) {
      setNodes += "<set value='" + data[i][3] +"' label='" + data[i][0] + ": '></set>";
    }
    return setNodes;
  },

  pie: function() {
    var baseNode = "<base showChartsBase='1' baseFont='Tahoma,Verdana' baseFontColor='666666' baseFontSize='9' overlay='default' innerRadius='0' chartShadow='1' bgColor='cdcdcd,ffffff' bgAngle='90' bgAlpha='100' printPreview='1' showBorder='0' borderWidth='1'></base>";
    var setNodes = javascript.getPieSetNodes();
    var legendNode = "<legend legend='1'  legendBgAngle='45' legendBorderWidth='1'  legendBorderColor='999999' legendBackground='EAEAEA,FFFFFF' legendWidth='200' legendPosition='right'></legend>";
    var headings = "<headings caption='Number of speakers in 2010'></headings>";
    var chart = "<chart>" +
      baseNode +
      setNodes +
      legendNode +
      headings +
      "</chart>";
    return chart;
  },

  getLineCategories: function() {
    var categoriesNode = "<categories>";
    for (var i = 0; i < data.length; i++) {
      categoriesNode += "<category label='" + data[i][0] + "' x='" + (i + 1) + "' showVerticalLine='1'></category>";
    }
    categoriesNode += "</categories>";

    return categoriesNode;
  },

  getLineData_Set: function(year) {
    var setNodes = "";
    for (var i = 0; i < data.length; i++) {
      setNodes += "<set x='" + (i + 1) + "' y='" + data[i][year] + "' toolText='" + data[i][0] + ": " + data[i][year] + "'></set>";
    }
    return setNodes;
  },

  getLineData: function(year) {
    var dataNode = "<data seriesName='Speakers in " + (year + 2007) + "'>";
    dataNode += javascript.getLineData_Set(year);
    dataNode += "</data>";
    return dataNode;
  },

  line: function(type) {
    var chart = "<chart>";
    var anchorsNode = "<anchors showAnchors='1' anchorRadius='3' anchorAlpha='100' anchorBorderThickness='3' anchorBgColor='FFFFFF'></anchors>";
    var baseNode = "<base chartLeftMargin='8' chartRightMargin='10' chartBottomMargin='4' chartTopMargin='6' bgColor='F3F3F3,FFFFFF' bgAlpha='100' bgAngle='45' showChartsBase='1' baseFont='Segoe UI,Tahoma,Verdana' baseFontColor='000000' baseFontSize='10'></base>";
    var canvasNode = "<canvas canvasBgDepth='2' canvasBaseColor='00FF00' canvasBgColor='000000' canvasBgAlpha='0' canvasBgAngle='45' canvasPadding='10' outCnvBaseFontColor='808080' outCnvBaseFont='Arial' canvasBorderColor='999999' canvasBorderThickness='1'></canvas>";
    var divlinesNode = "<divlines divLineColor='DFDFDF' forseShowZeroSeparator='0' showZeroSeparator='0' zeroSeparatorColor='707070' zeroSeparatorAlpha='0.6' zeroSeparatorBorderColor='707070' zeroSeparatorBorderWidth='1' showAlternateHGridColor='0' AlternateHGridColor='CCCCCC' AlternateHGridAlpha='30'></divlines>";
    var headingsNode = "<headings rotateCategoryNames='1' showXAxisValues='1' showCategoryLabels='1' categoriesAxisName='categories' PYAxisName='pyaxisname' SYAxisName='syaxisname' showAxisHeadingsOnHover='1'></headings>";
    var legendNode = "<legend showLegend='1' legendBgAlpha='0' legendBackgroundColor='EAEAEA' legendBorderAlpha='0' legendPadding='0' legendShadow='0' legendBorderColor='999999' legendBorderWidth='1'></legend>";
    var numeralNode = "<numeral numberPrefix='' numberSuffix='' numDivLines='3' decimals='0'></numeral>";
    var scalesNode = "<scales xAxisMinValue='0' xAxisMaxValue='100' yAxisMinValue='0' yAxisMaxValue='100'></scales>";
    var tooltipNode = "<tooltip toolTipBgColor='ffffdd' toolTipBorderColor='000000' toolTipBorderWidth='1' toolTipFontFamily='Tahoma, Arial' toolTipFontSize='10' toolTipFontColor='333333'></tooltip>";
    var stylesNode = "<styles><definition><style name='LineShadow' type='shadow' color='777777' distance='-4'></style><style name='myCaptionFont' type='font' font='Tahoma' size='13' color='333333' bold='1' ></style></definition><application><apply toObject='DATAPLOT' styles='LineShadow' ></apply><apply toObject='Caption' styles='myCaptionFont' ></apply></application></styles>";
    var categoriesNode = javascript.getLineCategories();
	var dataNode = "";
    if (type != "all_Years") {
		dataNode += javascript.getLineData(3);
    }else {
		dataNode += javascript.getLineData(1);
		dataNode += javascript.getLineData(2);
		dataNode += javascript.getLineData(3);
	}
    chart +=
      anchorsNode +
      baseNode +
      canvasNode +
      divlinesNode +
      headingsNode +
      legendNode +
      numeralNode +
      scalesNode +
      tooltipNode +
      categoriesNode +
      dataNode +
      stylesNode +
      "</chart>";
    return chart;
  },

  showBarChart: function(type) {
    var div = document.getElementById("home");
    div.innerHTML = "";

    var xmlData = javascript.bar(type);
    var xmlChart = new BarChartXML(div, xmlData);
    xmlChart.initialize('100%', '100%');
  },

  showLineChart: function(type) {
    var div = document.getElementById("home");
    div.innerHTML = "";

    var xmlData = javascript.line(type);
    var xmlChart = new TrendChartXML(div, xmlData);
    xmlChart.initialize('100%', '100%');
  },

  showPieChart: function() {
    var div = document.getElementById("home");
    div.innerHTML = "";

    var xmlData = javascript.pie();
    var xmlChart = new PieChartXML(div, xmlData);
    xmlChart.initialize('100%', '100%');
  },
}

function init() {
  javascript.importData();
  javascript.showBarChart();
}

window.addEventListener("load", init);
