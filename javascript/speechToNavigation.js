var mic_icon = document.getElementsByClassName("mic_icon");

// console.log(mic_icon[0]);

mic_icon[0].addEventListener("click", recordCommand);

function recordCommand() 
{
  var recognition = new webkitSpeechRecognition();
  recognition.lang = "en-GB";
  recognition.onresult = function (event) 
  {
    console.log(event);
    if (event.results[0][0].transcript == "go to home page" || event.results[0][0].transcript == "go to homepage") {
      window.location = "index.html";
    } else if (event.results[0][0].transcript == "go to terminologies page" || event.results[0][0].transcript == "go to terminologiespage") {
      window.location = "terminologies.html";
    } else if (event.results[0][0].transcript == "go to algorithms page" || event.results[0][0].transcript == "go to algorithmspage") {
      window.location = "algopage.html";
    } else if (event.results[0][0].transcript == "go to simulation page" || event.results[0][0].transcript == "go to simulationpage") {
      window.location = "simulation.html";
    } else if (event.results[0][0].transcript == "go to about page" || event.results[0][0].transcript == "go to aboutpage") {
      window.location = "index.html#about_head";
    } else {
      alert("Please speak correct command");
    }
  };
  recognition.start();
}
