//212b74fda81302afaf00fb3bd31e29f1
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
var cityAarry = [];
$(document).ready(function(){
    $("button").on("click", function(){
        event.preventDefault();
        var city = $("#city").val();
        if (cityAarry.includes(city)){
            searchWeather(city);
        }
        else{
            searchWeather(city);
            makeCityButton(city);
        }
        console.log(city);
        $("#city").val("");



    });
//save in local storage later
//new div 
    function makeCityButton(city){
        if(cityAarry.includes(city)){
            return;
        }
        else{
            cityAarry.push(city);
            var buttonDiv = document.createElement("div");
            var newButton = document.createElement("button");
            $(newButton).val(city);
            $(newButton).text(city);
            $(buttonDiv).append(newButton);
            $("#city-buttons").append(buttonDiv);
            
        }
    }
    function searchWeather(city){
        $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q="+city+ "&appid=212b74fda81302afaf00fb3bd31e29f1&units=imperial"
        })

        .then(function(response){
            console.log(response);
            var iconurl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            //run today stuff first
            $("#today").css("border-style", "solid");
            $("#today").css("border-color", "gray");
            var weatherImage = document.createElement("img");
            $(weatherImage).attr("src", iconurl); 
            $("#city-day").text(response.name);
            $("#city-day").append(weatherImage);
            
            $("#temperature").text("Temperature: "+ response.main.temp+" F");
            $("#humidity").text("Humidity: "+ response.main.humidity+" %");
            $("#windspeed").text("Wind Speed: "+ response.wind.speed+" MPH");


            fiveDayForcast(city);
            uv(response.coord.lat, response.coord.lon);
            //uv(response.coord.lat, response.coord.lon);

        });
    }
    function getDayFormat(response, i){
        var dateSplit = response.list[i].dt_txt.split(" ");
        var dateArray = dateSplit[0].split("-");
        var date = dateArray[1]+"/"+dateArray[2]+"/"+dateArray[0];
        return date;
    }
    function fiveDayForcast(city){
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q="+city+ "&appid=212b74fda81302afaf00fb3bd31e29f1&units=imperial"
            })
    
            .then(function(response){
                //only ptint the 3pm one so every 5
                //$("#forcast").empty();
                for(var i =0; i<response.list.length; i++){
                    if((response.list[i].dt_txt).includes("15:00:00")){
                        //console.log(response)
                        date = getDayFormat(response, i);
                        var newCard = document.createElement("div");
                        $(newCard).addClass("card");

                        var day = document.createElement("p");
                        $(day).addClass("day");
                        day.append(date);

                        var iconurl = "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
                        var weatherImage = document.createElement("img");
                        $(weatherImage).attr("src", iconurl); 

                        var temp = document.createElement("p");
                        temp.append("Temp: "+response.list[i].main.temp+" F");
                        
                        var humidity = document.createElement("p");
                        humidity.append("Humidity:  "+response.list[i].main.humidity+"%");

                        newCard.append(day,weatherImage,temp,humidity);
                        $("#forcast").append(newCard);
                    }

                }
    
    
            });
    }

    
    
    //new fuction to get uv new ajax call with lat log 

    function uv(lat, lon){
        $.ajax({
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=212b74fda81302afaf00fb3bd31e29f1"
        })

        .then(function(response){
            console.log(response.value);
            var uvIndex = response.value;
            var stringUvIndex = uvIndex.toString();
            console.log(stringUvIndex);
            $("#UV-index").text("UV Index: ");
            var uvCard = document.createElement("div");
            $(uvCard).addClass("card uvcard");
            $(uvCard).text(stringUvIndex);
            $("#UV-index").append(uvCard);
            uvColor(uvIndex);
        });
    }
    function uvColor(uvIndex){
        if(uvIndex<=2){
            $(".uvcard").css("background-color","green");
        }
        else if(uvIndex>2 && uvIndex<6){
            $(".uvcard").css("background-color","yellow");
        }
        else if(uvIndex>6 && uvIndex<7){
            $(".uvcard").css("background-color","orange");
        }
        else if(uvIndex>7){
            $(".uvcard").css("background-color","red");
        }
    }

});