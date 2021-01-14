//Use Modules to a better reuseabilty and refactor the code
//console.log(module);
exports.getDate= function() {
  let today = new Date();
  let currentDay = today.getDay(); // 0 Sunday 1,2,3,4,5 6saturday
  let options = {
    month: "numeric",
    day: "numeric",
    year: "numeric"
  };

  return today.toLocaleDateString("en-US" , options);
}

exports.getDay=function(){
  let today = new Date();
  let currentDay = today.getDay(); // 0 Sunday 1,2,3,4,5 6saturday
  let options = {
    weekday: "long"
  };

  return "Today is "+today.toLocaleDateString("en-US" , options);
}
