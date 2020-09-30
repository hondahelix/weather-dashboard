//212b74fda81302afaf00fb3bd31e29f1
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

$(document).ready(function(){
    $("#search-city").on("click", function(){
        event.preventDefault();
        var city = $("#city").val();
        console.log(city);
        $("#city").val("");
        searchWeather(city);

    });
//save in local storage later
//new div 

    function searchWeather(city){
        $.ajax({
        method: "GET",
        url: "api.openweathermap.org/data/2.5/weather?q="+city+ "&appid=212b74fda81302afaf00fb3bd31e29f1&units=imperial"
        })

        .then(function(response){
            console.log(response);
            //run today stuff first
            

            fiveDayForcast(city);

        });
    }
    function fiveDayForcast(city){
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q="+city+ "&appid=212b74fda81302afaf00fb3bd31e29f1&units=imperial"
            })
    
            .then(function(response){
                //only ptint the 3pm one so every 5
                console.log(response.list.length);
                for(var i =0; i<response.list.length; i++){
                    if((response.list[i].dt_txt).includes("15:00:00")){
                        var dateSplit = response.list[i].dt_txt.split(" ");
                        var dateArray = dateSplit[0].split("-");
                        var date = dateArray[1]+"/"+dateArray[2]+"/"+dateArray[0];

                        var newCard = document.createElement("div");
                        $(newCard).addClass("card");

                        var day = document.createElement("p");
                        $(day).addClass("day");
                        day.append(date);
                        //picture?
                        var temp = document.createElement("p");
                        temp.append("Temp: "+response.list[i].main.temp+" F");
                        
                        var humidity = document.createElement("p");
                        humidity.append("Humidity:  "+response.list[i].main.humidity+"%");

                        newCard.append(day,temp,humidity);
                        $("#forcast").append(newCard);
                    }

                }
    
    
            });
    }
    //new function cards/daily forcast
    
    
    //new fuction to get uv new ajax call with lat log 




});