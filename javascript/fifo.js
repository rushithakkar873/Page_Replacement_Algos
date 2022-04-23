/****FIFO Page Replacement Algorithm****/
//algorithm
// Time Complexity: O(m*p) where m = arr.length and p = list.length.

function fifo() 
{
  //list to be updated
  var list = [];

  //temp to store each step
  var temp = [];

  //page fault
  var fault = 0;
  var hit = 0;
  var table = document.getElementById("tab"); //Getting table from html.
  table.style.display = "table";
  var rowReq = document.getElementById("req"); //requesting row of prebuilt table in html.

  pageReference(rowReq);    //Calling function pageReference.
  AddFrames(table);   //Calling function AddFrames.

  for (i = 0; i < arr.length; i++) 
  {
    if (temp.length == 0) 
    {
      // determine if the first page has been inserted if not then we will push it in temp
      // and update list and increment fault.
      temp.push(arr[i]); //first page inserted
      list = temp;
      fault++;
      hitMiss = 0;
    } 
    
    else if (temp.length >= frames && !temp.includes(arr[i])) 
    {
      // if the temp length >= frames and input is not present in temp then we will use shift() 
      // to remove the first page and replace with the current page and increment fault.
      temp.shift(); //it'll remove the first element of an array
      temp.push(arr[i]); //add the element in the temp
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
    
    else 
    {
      // if temp contain the page then update list and increment hit.
      list = temp;
      hit++;
      hitMiss = 1;
    }

    list = temp;
    AddPages(i, table, list);
  }

  // Hit-fault ratio
  var fault_rate = (fault / arr.length) * 100;
  var hit_rate = (hit / arr.length) * 100;
  var algoName = " First in first out (FIFO)";
  Summary(fault, hit, fault_rate, hit_rate, algoName);  //Calling function Summary.
  Graph(fault_rate, hit_rate);    //Calling function Graph.
  DisplayBlock();   //Calling function DisplayBlock.
}