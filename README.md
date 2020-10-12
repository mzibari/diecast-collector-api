# Diecast Collector API

## API Reference 
Diecast Collector API is organized around **REST**. It accepts **form encoded** request bodies, returns **JSON encoded** responses.

It does not use authentication.

## Endpoints
[https://glacial-wave-70292.herokuapp.com/api/](https://glacial-wave-70292.herokuapp.com/api/)         

## Endpoints


***
### ```1./users``` : 
Returns a JSON object of all users  
```[```  
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"id":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"username":"mahmood",```   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"email":"mahmood@email.com",```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"user_password":"password1"```     
&nbsp;&nbsp;&nbsp;&nbsp;```},```   
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"id":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"username":"mahmood2",```   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"email":"mahmood2@email.com",```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"user_password":"password2"```     
&nbsp;&nbsp;&nbsp;&nbsp;```}```  
```]```

***
### ```2./users/:user_id```
Returns a JSON object with the requested user_id   
```[```  
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"id":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"username":"mahmood",```   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"email":"mahmood@email.com",```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"user_password":"password1"```     
&nbsp;&nbsp;&nbsp;&nbsp;```}```  
```]```  <br> <br> 
When the user_id doesn't exist, it returns an error  
```{"error":"User doesn't exist"}```
***

### ```3./cars```
Returns a JSON object containing all the cars       
```[```  
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```""id":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"model":"Skyline",```   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"make":1992,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"description":"Greatest Japanese car of the nineties"```     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"manufacturer":"HotWheels"```     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"scale":"1/64"```     
&nbsp;&nbsp;&nbsp;&nbsp;```},```   
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```""id":2,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"model":"Supra",```   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"make":1992,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"description":"Great Japanese car"```     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"manufacturer":"HotWheels"```     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"scale":"1/64"```   
&nbsp;&nbsp;&nbsp;&nbsp;```}```  
```]``` <br><br>


### ```4./cars/:car_id```
Returns a JSON object with the requested car_id       
```[```  
&nbsp;&nbsp;&nbsp;&nbsp;```{```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```""id":1,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"model":"Skyline",```   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"make":1992,```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```"description":"Greatest Japanese car of the nineties"```   


When the user_id doesn't exist, it returns an error  
```{"error":"User doesn't exist"}```
***
