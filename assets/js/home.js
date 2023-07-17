function codeforces() {
    console.log(navigator);
    // var st = $('.start');
    // st.each(function() {
    //   var currentValue = $(this).text(); // Get the current value of the div
    //   console.log(currentValue);
    //   var modifiedValue = unixconverter(currentValue); // Call your custom function to modify the value
    //   console.log(modifiedValue);
    //   $(this).text(modifiedValue); // Update the value of the div
    // });
    var dt = $('.duration');
    dt.each(function() {
      var currentValue = $(this).text(); // Get the current value of the div
      console.log(currentValue);
      var modifiedValue = durationconverter(currentValue); // Call your custom function to modify the value
      console.log(modifiedValue);
      $(this).text(modifiedValue); // Update the value of the div
    });
    // var dt = $('.rela');
    // dt.each(function() {
    //   var currentValue = $(this).text(); // Get the current value of the div
    //   console.log(currentValue);
    //   var modifiedValue = realtiveconverter(currentValue); // Call your custom function to modify the value
    //   console.log(modifiedValue);
    //   $(this).text(modifiedValue); // Update the value of the div
    // });
  }
  codeforces();

  // function realtiveconverter(relative){
  //   var currentTimestamp = Math.floor(Date.now() / 1000); // Divide by 1000 to convert milliseconds to seconds
  //   console.log(currentTimestamp);
  //   return unixconverter(currentTimestamp-relative);
  // }

  function durationconverter(duration){
    let hours = duration/3600;
    let minutes = (duration%3600)/60;
    var formatedduration="";
    if(hours>0){
      formatedduration += hours+' hours ';
    }else if(minutes>0){
      formatedduration += minutes+' minutes';
    }
    return formatedduration;
  }

  // function unixconverter(unix_timestamp){
  //   // Create a new JavaScript Date object based on the timestamp
  //   // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  //   var date = new Date(unix_timestamp * 1000);
  //   // Hours part from the timestamp
  //   var hours = date.getHours();
  //   // Minutes part from the timestamp
  //   var minutes = "0" + date.getMinutes();
  //   // Seconds part from the timestamp
  //   var seconds = "0" + date.getSeconds();
  //   // Will display time in 10:30:23 format
  //   var formattedTime = hours + ':' + minutes + ':' + seconds;
  //   console.log(formattedTime);
  //   return formattedTime;
  // }