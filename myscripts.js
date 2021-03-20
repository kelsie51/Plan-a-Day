$(document).ready(function() {
  
  const now = moment().format('MMMM Do YYYY');

  let nowHour24 = moment().format('H');
  let nowHour12 = moment().format('h');

  let $dateHeading = $('#navbar-subtitle');
  $dateHeading.text(now);
  
  const saveIcon = "./images/save-regular.svg"; // using font awesome icon https://fontawesome.com/license

  let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

  if (storedPlans !== null) {
    planTextArr = storedPlans;
  } else {

    planTextArr = new Array(9);
   
  }

  let $plannerDiv = $('#plannerContainer');
  
  $plannerDiv.empty();

 
  for (let hour = 9; hour <= 17; hour++) {

    let index = hour - 9;
    
    let $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.addClass('plannerRow');
    $rowDiv.attr('hour-index',hour);
  
    // Start building Time box portion of row
    let $col2TimeDiv = $('<div>');
    $col2TimeDiv.addClass('col-md-2');
  
    // create timeBox element (contains time)
    const $timeBoxSpn = $('<span>');
    // can use this to get value
    $timeBoxSpn.attr('class','timeBox');
    
    // format hours for display
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    
    $timeBoxSpn.text(`${displayHour} ${ampm}`);

    $rowDiv.append($col2TimeDiv);
    $col2TimeDiv.append($timeBoxSpn);
    // box portion 

    // input portion

    let $dailyPlanSpn = $('<input>');

    $dailyPlanSpn.attr('id',`input-${index}`);
    $dailyPlanSpn.attr('hour-index',index);
    $dailyPlanSpn.attr('type','text');
    $dailyPlanSpn.attr('class','dailyPlan');


    $dailyPlanSpn.val( planTextArr[index] );
    
    
    let $col9IptDiv = $('<div>');
    $col9IptDiv.addClass('col-md-9');

    
    $rowDiv.append($col9IptDiv);
    $col9IptDiv.append($dailyPlanSpn);

    let $col1SaveDiv = $('<div>');
    $col1SaveDiv.addClass('col-md-1');

    let $saveBtn = $('<i>');
    $saveBtn.attr('id',`saveid-${index}`);
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"far fa-save saveIcon");
    
   
    $rowDiv.append($col1SaveDiv);
    $col1SaveDiv.append($saveBtn);

    updateRowColor($rowDiv, hour);
    
    $plannerDiv.append($rowDiv);
  };

  function updateRowColor ($hourRow,hour) { 

    if ( hour < nowHour24) {
         $hourRow.css("background-color","lightgrey")
    } else if ( hour > nowHour24) {
         $hourRow.css("background-color","lightgreen")
    } else {      
      $hourRow.css("background-color","tomato")
    }
  };

  $(document).on('click','i', function(event) {
    event.preventDefault();  

    let $index = $(this).attr('save-id');

    let inputId = '#input-'+$index;
    let $value = $(inputId).val();

    planTextArr[$index] = $value;
   
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });  

  $(document).on('change','input', function(event) {
    event.preventDefault();      

    let i = $(this).attr('hour-index');
  });
});