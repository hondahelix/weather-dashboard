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
        url: "https://api.openweathermap.org/data/2.5/forecast?q="+city+ "&appid=212b74fda81302afaf00fb3bd31e29f1&units=imperial"
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
                    if(response.list[i].dt_txt==="15:00:00"){
                        var newCard = "<div class='card'>" +response.list[i].main.temp+"</div>";
                        $("#forcast").append(newCard);
                    }

                }
    
    
            });
    }
    //new function cards/daily forcast
    
    
    //new fuction to get uv new ajax call with lat log 




});