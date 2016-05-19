var skycons = new Skycons();

function getSkyconSet(weatherCode){
    switch(weatherCode){
        case "32":
        case "34":
        case "36":
            return Skycons.CLEAR_DAY;
            break;

        case "31":
        case "33":
            return Skycons.CLEAR_NIGHT;
            break;

        case "30":
        case "44":
            return Skycons.PARTLY_CLOUDY_DAY;
            break;

        case "29":
            return Skycons.PARTLY_CLOUDY_NIGHT;
            break;

        case "24":
        case "26":
        case "27":
        case "28":
            return Skycons.CLOUDY;
            break;

        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "10":
        case "11":
        case "12":
            return Skycons.RAIN;
            break;

        case "18":
            return Skycons.SLEET;
            break;

        case "16":
        case "41":
        case "42":
        case "43":
            return Skycons.SNOW;
            break;

        case "24":
            return Skycons.WIND;
            break;

        case "20":
        default:
            return Skycons.FOG;
            break;
    }
}

function getCityCondition (cityName) {
    var url="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + cityName +"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    $.getJSON(url,function(data){

        /*today*/
        var currentDate=data.query.results.channel.item.condition.date;
        var currentTemperature = data.query.results.channel.item.condition.temp;
        var currentTemperature = Math.round((currentTemperature -32)*5/9);
        var currentText=data.query.results.channel.item.condition.text;
        var code = data.query.results.channel.item.condition.code;
        var SkyconSet = getSkyconSet (code);
        $("#day0").text(currentDate);
        $(".temperature").text(currentTemperature);
        $("#weatherCondition").text(currentText);
        skycons.add ("today", SkyconSet);

        /*day1*/
        var forecastDate1=data.query.results.channel.item.forecast[0].date;
        var forecastTemperaturehigh1 = data.query.results.channel.item.forecast[0].high;
        var forecastTemperaturehigh1 = Math.round((forecastTemperaturehigh1 -32)*5/9);
        var forecastTemperaturelow1 = data.query.results.channel.item.forecast[0].low;
        var forecastTemperaturelow1 = Math.round((forecastTemperaturelow1 -32)*5/9);
        var forecastText1=data.query.results.channel.item.forecast[0].text;
        var code1 = data.query.results.channel.item.forecast[0].code;
        var SkyconSet1 = getSkyconSet (code1);
        $("#day1").text(forecastDate1);
        $("#temp1").text(forecastTemperaturelow1+"~"+forecastTemperaturehigh1+" ℃");
        $("#weatherCondition").text(forecastText1);
        skycons.add("1pic", SkyconSet1);

        /*day2*/
        var forecastDate2=data.query.results.channel.item.forecast[1].date;
        var forecastTemperaturehigh2 = data.query.results.channel.item.forecast[1].high;
        var forecastTemperaturehigh2 = Math.round((forecastTemperaturehigh2 -32)*5/9);
        var forecastTemperaturelow2 = data.query.results.channel.item.forecast[1].low;
        var forecastTemperaturelow2 = Math.round((forecastTemperaturelow2 -32)*5/9);
        var forecastText2=data.query.results.channel.item.forecast[1].text;
        var code2 = data.query.results.channel.item.forecast[1].code;
        var SkyconSet2 = getSkyconSet (code2);
        $("#day2").text(forecastDate2);
        $("#temp2").text(forecastTemperaturelow2+"~"+forecastTemperaturehigh2+" ℃");
        $("#weatherCondition").text(forecastText2);
        skycons.add("2pic", SkyconSet2);

        /*day3*/
        var forecastDate3=data.query.results.channel.item.forecast[2].date;
        var forecastTemperaturehigh3 = data.query.results.channel.item.forecast[2].high;
        var forecastTemperaturehigh3 = Math.round((forecastTemperaturehigh3 -32)*5/9);
        var forecastTemperaturelow3 = data.query.results.channel.item.forecast[2].low;
        var forecastTemperaturelow3 = Math.round((forecastTemperaturelow3 -32)*5/9);
        var forecastText3=data.query.results.channel.item.forecast[2].text;
        var code3 = data.query.results.channel.item.forecast[2].code;
        var SkyconSet3 = getSkyconSet (code3);
        $("#day3").text(forecastDate3);
        $("#temp3").text(forecastTemperaturelow3+"~"+forecastTemperaturehigh3+" ℃");
        $("#weatherCondition").text(forecastText3);
        skycons.add("3pic", SkyconSet3);

        skycons.play();
    });
}

getCityCondition("Taipei city");
getCityCondition("Tainan city");

/*
Get value from Bootstrap dropdown menu
*/
$("button").click(function(){
    $("a").each(function (index,element){
        $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + $(element).attr("cityurl") +"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",function (data,status){
        });
    })
})

$("a").click(function(){
    getCityCondition($(this).attr("cityurl"));
    $("button").text($(this).children(".cityName").text());
})