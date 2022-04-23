var inputs, arr, frames, hitMiss;

function RefreshPage() 
{
  window.location.reload(); //It'll reload the page.
  
}

/*****************************/
function valueHandling() 
{
  //requests
  inputs = document.getElementById("string"); //Getting value of string entered by user.
  arr = inputs.value.split(" "); //splitting the inputs into an array.
  frames = document.getElementById("frames").valueAsNumber; //Getting value of frames entered by user.

  var flag = 0;

  //Condition to check whether the frames entered by user is positive integer or not.
  if (frames < 0 || frames % 1 != 0) 
  {
    window.alert("Negative or decimal values are not accepted!");
    flag++;
    RefreshPage();
  }

  //Condition to check whether the string entered by user is positive integer or not.
  for (var i = 0; i < arr.length; i++) 
  {
    if (arr[i] < 0 || arr[i] % 1 != 0) 
    {
      window.alert("Negative or decimal values are not accepted!");
      flag++;
      RefreshPage();
      break;
    }
  }
  // if condition to run the selected algorithm.
  if (flag == 0) 
  {
    var select = document.getElementById('algoo');
    if (select.value == 'fifo') 
    {
      fifo();
    }
    else if (select.value == 'optimal') 
    {
      opt();
    }
    else if (select.value == 'lru') 
    {
      lru();
    }
    else 
    {
      lifo();
    }
  }
}

/****Function to add pages.****/
function AddPages(i, table, list) 
{
  // for loop to add the pages in to the table and show hit or miss.
  for (j = 1; j < list.length + 1; j++) 
  {
    table.rows[j].cells[i + 1].innerHTML = list[j - 1];
  }
  if (hitMiss == 0) 
  {
    table.rows[frames + 1].cells[i + 1].innerHTML = "MISS";
    table.rows[list.indexOf(arr[i]) + 1].cells[i+1].style.backgroundColor = "Red";
  }
  else 
  {
    table.rows[frames + 1].cells[i + 1].innerHTML = "HIT";
    table.rows[list.indexOf(arr[i]) + 1].cells[i+1].style.backgroundColor = "Green";
  }
}

/****Function to add frames****/
// Time Complexity of this loop is: O(n*m) where n = no. of frames and m = arr.length.
function AddFrames(table) 
{
  // for loop to add the frames.
  for (var i = 1; i <= frames + 1; i++) 
  {
    var insertRow = table.insertRow(-1); //Inserts new row.
    insertRow.setAttribute("id", "frame" + i); //Adds id to new inserted row.
    var cell1 = insertRow.insertCell(-1); //Inserts new cell.
    if (i == frames + 1) 
    {
      cell1.innerHTML = "Status: ";
      cell1.setAttribute("id", "status");
    } 
    else 
    {
      cell1.innerHTML = "Frame " + i + ": "; //Adds html in cell html.
      cell1.setAttribute("id", "arr" + i); //Set id of cell.
    }
    // insert the page references.
    for (var j = 1; j <= arr.length; j++) 
    {
      var currentRow = document.getElementById("frame" + i); //Getting current row.
      var column = currentRow.insertCell(-1); //Inserts new cell in current row.
      column.setAttribute("id", "col" + j); //Add the id to recent added cell.
    }
  }
}

/****Function to put the request inside the table.****/
function pageReference(rowReq) 
{
  // for loop to put the requests (page references given by user) inside the table.
  for (var i = 0; i < arr.length; i++) 
  {
    var column = rowReq.insertCell(-1); //Inserts new column.
    column.innerHTML = arr[i]; //Set column html to arr[i].
  }
}

/****Function to give the output.****/
function Summary(fault, hit, fault_rate, hit_rate, algoName) 
{
  // this will give the value to each required output.
  document.getElementById("frame").innerHTML += frames;
  document.getElementById("reference").innerHTML += arr;
  document.getElementById("algo").innerHTML += algoName;
  document.getElementById("faults").innerHTML += fault;
  document.getElementById("faultrate").innerHTML += fault_rate.toFixed(2) + "" + "%";
  document.getElementById("hits").innerHTML += hit;
  document.getElementById("hitrate").innerHTML += hit_rate.toFixed(2) + "" + "%";
}

/****Function to show graph.****/
function Graph(fault_rate, hit_rate) 
{
  //Graph Section
  var xValues = ["Page Fault Rate", "Page Hit Rate"];  // it will give the xValues for the pie chart.
  var yValues = [fault_rate.toFixed(2), hit_rate.toFixed(2)]; // it will give the yValues.
  var barColors = ["#00aba9", "#e8c3b9"]; // it will specify the colour of each section of pie chart.
  // this will create a new pie chart and will set some attributes to it.
  new Chart("myChart", 
  {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Page Fault and Hit Rate Pie Chart:",
      },
    },
  }
  );
}

/****Function to make display style as block.****/
function DisplayBlock() 
{
  // this will return the display type which is block element i.e. 
  // the entire line will be filled and nothing can be displayed on its left or right.
  document.getElementById("algo").style.display = "block";
  document.getElementById("frame").style.display = "block";
  document.getElementById("reference").style.display = "block";
  document.getElementById("faults").style.display = "block";
  document.getElementById("faultrate").style.display = "block";
  document.getElementById("hits").style.display = "block";
  document.getElementById("hitrate").style.display = "block";
  document.getElementById("myChart").style.display = "block";
}
