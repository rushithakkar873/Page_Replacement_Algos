/****Optimal Page Replacement Algorithm****/
// Algorithm
//Time Complexity - 

function lru() {
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

    for (i = 0; i < arr.length; i++) {
        // determine if the first page has been inserted if not then we will push it in temp
        // and update list and increment fault.
        if (temp.length == 0) //determine if the first page has been inserted
        {
            temp.push(arr[i]); //first job
            list = temp;
            fault++;
            hitMiss = 0;
        }

        else if ((temp.length >= frames) && !(temp.includes(arr[i]))) {
            // if the temp length >= frames and page is not present in temp then 
            // we will use the below function.
            var newArr = [];
            NotUsedBefore(i, arr, newArr, temp);
            newArr.pop();
            temp = newArr;
            temp.push(arr[i]);
            list = temp;
            fault++;
            hitMiss = 0;
        }

        else if (!temp.includes(arr[i])) {
            //checks whether the page exists or not
            fault++;
            temp.push(arr[i]);
            list = temp;
            hitMiss = 0;
        }

        else if (temp.includes(arr[i])) {
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
    var algoName = " Least Recently Used(LRU)";
    Summary(fault, hit, fault_rate, hit_rate, algoName);    //Calling function Summary.
    Graph(fault_rate, hit_rate);    //Calling function Graph.
    DisplayBlock();   //Calling function DisplayBlock.
}

// Using this function we will slice the array and check and replace that page which is not used
// in longest period of time in past.
function NotUsedBefore(i, arr, newArr, temp) 
{
    var slicedArr = arr.slice(0, i);
    var b = 0;
    for (j = i - 1; j >= 0; j--) 
    {
        if (b < temp.length) 
        {
            for (k = 0; k < temp.length; k++) 
            {
                if (slicedArr[j] == temp[k] && !(newArr.includes(temp[k]))) 
                {
                    newArr.push(temp[k]);
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
}