/****Optimal Page Replacement Algorithm****/
// Algorithm
// Time Complexity: O(a*b*c) where a = arr.length, b = slicedArr.length and c = temp.length.

function opt() 
{
  //list to be updated
  var list = [];

  //temp to store each step
  var temp = [];

  //page fault
  var fault = 0;
  var hit = 0;
  var table = document.getElementById("tab"); //table in html
  table.style.display = "table";
  var rowReq = document.getElementById("req"); //requesting row of prebuilt table in html.

  pageReference(rowReq);    //Calling function pageReference.
  AddFrames(table);   //Calling function AddFrames.

  for (i = 0; i < arr.length; i++) 
  {
    // determine if the first page has been inserted if not then we will push it in temp
    // and update list and increment fault.
    if (temp.length == 0) //determine if the first page has been inserted
    {
      temp.push(arr[i]); //first job
      list = temp;
      fault++;
      hitMiss = 0;
    }

    else if ((temp.length >= frames) && !(temp.includes(arr[i]))) 
    {
      // if the temp length >= frames and page is not present in temp then 
      // we will use the below function.
      var newArr = [];
      NotUsedAhead(i, arr, newArr, temp);
      newArr.pop();
      temp = newArr;
      temp.push(arr[i]);
      list = temp;
      fault++;
      hitMiss = 0;
    }

    else if (!temp.includes(arr[i])) 
    {
      //checks whether the page exists or not
      fault++;
      temp.push(arr[i]);
      list = temp;
      hitMiss = 0;
    }

    else if (temp.includes(arr[i])) 
    {
      // if temp contain the page then update list and increment hit.
      // list = temp;
      hit++;
      hitMiss = 1;
    }

    // for loop to add the pages in to the table and show hit or miss.
    list = temp;
    AddPages(i, table, list);
  }

  // Hit-fault ratio
  var fault_rate = (fault / arr.length) * 100;
  var hit_rate = (hit / arr.length) * 100;
  var algoName = " Optimal (OPT)";
  Summary(fault, hit, fault_rate, hit_rate, algoName);    //Calling function Summary.
  Graph(fault_rate, hit_rate);    //Calling function Graph.
  DisplayBlock();   //Calling function DisplayBlock.
}

// Using this function we will slice the array and check and replace that page which is not used
// in longest period of time in future.
// Time Complexity: O(n*m) where n = slicedArr.length and m = temp.length.
function NotUsedAhead(i, arr, newArr, temp)
{
  var slicedArr = arr.slice(arr.indexOf(arr[i]), arr.length);
  var b = 0;
  for (a = 0; a < slicedArr.length; a++) 
  {
    if (b < temp.length) 
    {
      for (c = 0; c < temp.length; c++) 
      {
        if (slicedArr[a] == temp[c] && !(newArr.includes(temp[c]))) 
        {
          newArr.push(temp[c]);
          b++;
          break;
        }
      }
    }
    else 
    {
      break;
    }
  }
  for (c = 0; c < temp.length; c++)
  {
    if (!(newArr.includes(temp[c]))) 
    {
      newArr.push(temp[c]);
    }
  }
  
}