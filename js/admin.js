var QN=0;

//Modal selector--->
var signIn = new bootstrap.Modal(document.getElementById('signIn'));
var uploadCSVCard = new bootstrap.Modal(document.getElementById('uploadCSV'));
var card = new bootstrap.Modal(document.getElementById('card'));
var uploadImageCard = new bootstrap.Modal(document.getElementById('uploadImage'));
var OCRModal = new bootstrap.Modal(document.getElementById('OCR'));

//OCR Modal--->
//var loadedImage = document.getElementById("loadedImage");
var detectedImage = document.getElementById("detectedImage");
var OCRInfoHead = document.getElementById("OCRHead");
var OCRInfoBody = document.getElementById("OCRBody");
var OCRInfoFooter = document.getElementById("OCRFooter");
var OCRInfo = document.getElementById("OCRInfo");
var OCRAssembleButton = document.getElementById("OCRAssembleButton");
var OCRSaveButton = document.getElementById("OCRSaveButton");
var OCRProgress = document.getElementById("OCRProgress");
var myCanvas = document.getElementById("overlay");



//Upload Image Modal--->
var imageLocation = document.getElementById("imageLocation");
var uploadImageButton = document.getElementById("uploadImageButton");
var uploadedImages = document.getElementById("uploadedImages");


//parse CSV modal --->
var info = document.getElementById("showInfo");
var fileLocation = document.getElementById("fileLocation");
var parseButton = document.getElementById("parseButton");
var uploadButton = document.getElementById("uploadButton");

var parseInfoHead = document.getElementById("resultHead");
var parseInfoBody = document.getElementById("resultBody");
var parseInfoFooter = document.getElementById("resultFooter");
var parseInfo = document.getElementById("parseInfo");


//Question display modal--->
var sn =document.getElementById("sn");
var subject=document.getElementById("subject");
var question = document.getElementById("question");
var option1 = document.getElementById("Option1");
var option2 = document.getElementById("Option2");
var option3 = document.getElementById("Option3");
var option4 = document.getElementById("Option4");
var nextButton = document.getElementById("Next");
var prevButton = document.getElementById("Prev"); 





var firebaseConfig = {
    apiKey: "AIzaSyBARGMaLEXgTkYW_WMtwBI4UXBhQi_p2xs",
    authDomain: "quizbull.firebaseapp.com",
    projectId: "quizbull",
    storageBucket: "quizbull.appspot.com",
    messagingSenderId: "839759877408",
    appId: "1:839759877408:web:985b6a7fb5db1f9c93b345",
    measurementId: "G-8KYYL93NLK"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();


uploadedImages.addEventListener('click', function(e){
    if(e.target && e.target.id.slice(0,5)=="Image"){
		openImage(e.target.id.slice(5));
     }
 });

fileLocation.onchange = function () {
  if(this.value != null)
	  {
		parseButton.disabled=false;  
	  }
};

imageLocation.onchange = function () {
  if(this.value != null)
	  {
		uploadImageButton.disabled=false;  
	  }
};



firebase.auth().onAuthStateChanged((user) => {
  if (user != null && user.phoneNumber=="+9779848606672") {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User	  
	  
		  	signIn.hide();
	  		card.hide();
		 	uploadCSVCard.hide();
	  		uploadImageCard.hide()
	  
	 
  } else {
	  	card.hide();
	   	uploadCSVCard.hide();
	  	uploadImageCard.hide();
    	//signIn.show();
	 
  }
});




function uploadCSV(){
imageLocation.value=null;
clearCSVModal();
uploadCSVCard.show();
}

function questionModalClose(){

	if(fileLocation.files[0]!=null){
		uploadCSVCard.show();
	}
	else if(imageLocation.files[0]!=null){
		OCRModal.show();
	}
		
}


function logOut(){
		
		firebase.auth().signOut().then(() => {
		
			window.location.href="quiz_signIn.html";
			
		}).catch((error) => {
			
		window.alert(error.code+" : "+ error.message)
			
});
		
	}


function myParse(){
	
	config = {
	delimiter: "",	// auto-detect
	newline: "",	// auto-detect
	quoteChar: '"',
	escapeChar: '"',
	header: true,
	transformHeader: undefined,
	dynamicTyping: true,
	preview: 0,
	encoding: "",
	worker: false,
	comments: false,
	step: undefined,
	complete: function(results, file) { parseInfo.hidden=false;
										parseInfoBody.innerHTML="Parsing complete:";
									   parseInfoBody.innerHTML+="<br>Total records parsed="+results.data.length;
									   
									   if(results.error != null){
										 parseInfoBody.innerHTML+="<br>Total No of Errors="+results.error.length;
										   parseInfo.classList.remove("alert-success");
										   parseInfo.classList.add("alert-danger");
										   
									   }else{
										   parseInfoBody.innerHTML+="<br>No Errors Encountered!!! Safe to Upload.";
										   uploadButton.disabled=false;
										   parseInfo.classList.add("alert-success");
										   parseInfo.classList.remove("alert-danger");
									   }
									   
										window.parsedData=results.data;
										},
	error: function(error, file) {		parseInfo.hidden=false;
										parseInfo.innerHTML=error;
										},
	download: false,
	downloadRequestHeaders: undefined,
	downloadRequestBody: undefined,
	skipEmptyLines: false,
	chunk: undefined,
	chunkSize: undefined,
	fastMode: undefined,
	beforeFirstChunk: undefined,
	withCredentials: undefined,
	transform: undefined,
	delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
};
	
	Papa.parse(fileLocation.files[0], config);
	
}

function reviewData(event){
if(event.id=="CSVReview")
	{
			QN=0;
	uploadCSVCard.hide();
	card.show();
	  	next();
		
	}

else if(event.id=="OCRAssembleButton")	
	{
			QN=0;
	OCRModal.hide();
	card.show();
		next();
	}

}





function next(){

	clearCard();
	QN=QN+1;
	loadCard(QN,window.parsedData[QN-1]);
	MathJax.typeset();
}


function previous(){
	
	
	clearCard();
	QN=QN-1;
	loadCard(QN,window.parsedData[QN-1]);
	MathJax.typeset();
	
}



function clearCard(){
	
		option1.disabled=true;
		option2.disabled=true;
		option3.disabled=true;
		option4.disabled=true;
	
		option1.classList.remove("bg-danger");
		option1.classList.remove("bg-success");
		option1.classList.remove("text-white");
	
		option2.classList.remove("bg-danger");
		option2.classList.remove("bg-success");
		option2.classList.remove("text-white");
	
		option3.classList.remove("bg-danger");
		option3.classList.remove("bg-success");
		option3.classList.remove("text-white");
	
		option4.classList.remove("bg-danger");
		option4.classList.remove("bg-success");
		option4.classList.remove("text-white");

	sn.innerHTML='<span class="placeholder col-7"></span>';
	subject.innerHTML='<span class="placeholder col-5">';
	question.innerHTML=' <span class="placeholder col-12"></span> <span class="placeholder col-12"></span> <span class="placeholder col-4"></span>';
	option1.innerHTML = '<span class="placeholder col-12 bg-primary">';
	option2.innerHTML = '<span class="placeholder col-12 bg-primary">';
	option3.innerHTML = '<span class="placeholder col-12 bg-primary">';
	option4.innerHTML = '<span class="placeholder col-12 bg-primary">';
	
		
	
}

function loadCard(id,doc){
	
		sn.innerHTML="Question "+id;
		
		question.innerHTML=doc.Question;
		option1.innerHTML=doc.Option1;
		option2.innerHTML=doc.Option2;
		option3.innerHTML=doc.Option3;
		option4.innerHTML=doc.Option4;
		window.answer = doc.Answer;
		
	
	subject.innerHTML=doc.Tag1;
	
		option1.disabled=false;
		option2.disabled=false;
		option3.disabled=false;
		option4.disabled=false;
	
	if(id==1 && id==window.parsedData.length){
	prevButton.disabled=true;
	nextButton.disabled=true;
	}else if(id==1){
	prevButton.disabled=true;
	nextButton.disabled=false;
	}else if(id==window.parsedData.length){
	prevButton.disabled=false;
	nextButton.disabled=true;
	}else{
	prevButton.disabled=false;
	nextButton.disabled=false;
}
	
	
	
}


function checkAns(ans){
	var element = document.getElementById(ans.id);
	if(element.id==window.answer){
		element.classList.add("bg-success");
		element.classList.add("text-white");
		
		option1.disabled=true;
		option2.disabled=true;
		option3.disabled=true;
		option4.disabled=true;
		
		element.disabled=false;
		
		
	}else{
		element.classList.add("bg-danger");
		element.classList.add("text-white");
	}
	
}



function UploadCSVFirebase(){
	
	uploadButton.disabled=true;
	parseButton.disabled=true;
	parseInfo.hidden=false;
	parseInfoHead.innerHTML="Uploading File to the server."
	parseInfoBody.innerHTML="";
	parseInfoFooter.innerHTML="Please Be Patient..."
	
	
	window.parsedData.forEach( function (question,index) {
	
	var docData = {
    Question: question.Question,
    Option1: question.Option1,
	Option2: question.Option2,
	Option3: question.Option3,
	Option4: question.Option4,
	Answer: question.Answer,
    Correct: question.Correct,
	Wrong: question.Wrong,
	Skipped: question.Skipped,
  	LastAccessed:firebase.firestore.FieldValue.serverTimestamp(),
    Tag: [question.Tag1, question.Tag2, question.Tag3, question.Tag4, question.Tag5, question.Tag6],
    photoURL: null,
    };	
		
		
		
		
	db.collection("qBank").add(docData)
.then((docRef) => {
		if((index+1)==window.parsedData.length){
			parseInfo.hidden=false;
			parseInfoHead.innerHTML="Uploading Completed."
			parseInfoFooter.innerHTML="Please check the log."
		}
    parseInfoBody.innerHTML+="<br>Question "+(index+1)+" written with ID: "+docRef.id;
})
.catch((error) => {
	
		if((index+1)==window.parsedData.length){
			
			parseInfo.classList.remove("alert-success");
			parseInfo.classList.add("alert-danger");
    		parseInfoBody.innerHTML+="<br>Error adding Question "+(index+1)+": "+error.code+"::"+error.message;
			
			
			parseInfo.hidden=false;
			parseInfoHead.innerHTML="Uploading Completed."
			parseInfoFooter.innerHTML="Please check the log."
		}else{
		parseInfo.classList.remove("alert-success");
		parseInfo.classList.add("alert-danger");
    	parseInfoBody.innerHTML+="<br>Error adding Question "+(index+1)+": "+error.code+"::"+error.message;
			
		}

});
		
		
		
	});	
	
	
		
}


function clearCSVModal(){
	
	
	fileLocation.value=null;
	parseButton.disabled=true;
	uploadButton.disabled=true;
	parseInfo.hidden=true;
	
}


function uploadImage(){
imageLocation.value=null;
clearCSVModal();
uploadImageCard.show();	
	
}

function viewImage(){
	uploadImageCard.hide();
	clearImageCard();
	
	for(i=0;i<=imageLocation.files.length-1;i++)
	{
		createImageCard(i,imageLocation.files[i]);
	}
	
	
	
}

function clearImageCard(){
	
	uploadedImages.innerHTML="";
	
}


function createImageCard(SN,imageHolder){
	
	var imagePlaceholder = document.createElement("img");
	//imagePlaceholder.classList.add("card-img-top");
	imagePlaceholder.style="width:100%; max-height:290px;";
	imagePlaceholder.classList.add("p-2");
	imagePlaceholder.id="Image"+SN;
	imagePlaceholder.src=URL.createObjectURL(imageHolder);
	
	//.onClick=openImage(this);
	
	imagePlaceholder.type="button";
	
	var td1= document.createElement("td");
	td1.height="290px";
	td1.appendChild(imagePlaceholder);
	
	var row1 =document.createElement("tr");
	row1.appendChild(td1);
	
		
	var fileNameHeader = document.createElement("div");
	fileNameHeader.classList.add("text-break");
	fileNameHeader.classList.add("p-2");
	fileNameHeader.innerHTML=imageHolder.name;

	
	var td2 =document.createElement("td");
	td2.height="30px";
	td2.appendChild(fileNameHeader);
	
	var row2 =document.createElement("tr");
	row2.appendChild(td2);
	
	var table =document.createElement("table");
	table.classList.add("shadow");
	table.classList.add("alert-success");
	table.classList.add("m-2");
	table.height="320px";
	table.appendChild(row1);
	table.appendChild(row2);
	
	
	var imageCard = document.createElement("div");
	imageCard.classList.add("col-12");
	imageCard.classList.add("col-md-2");
	imageCard.classList.add("d-flex");
	imageCard.classList.add("justify-content-center");
	
	imageCard.appendChild(table);
	
	uploadedImages.appendChild(imageCard);
	
}

function openImage(SN){
	
		OCRModal.show();
	
	openedImage = document.getElementById("Image"+SN).src;
	
	//loadedImage.src=openedImage;

	
 	detectedImage.onload=function(){
		myCanvas.setAttribute("width", detectedImage.naturalWidth);
  		myCanvas.setAttribute("height", detectedImage.naturalHeight);
	
	};
		
	detectedImage.src=openedImage;
	

	//loadedImage.style="max-height:400px;";
	OCRInfoFooter.type=SN;
	OCRInfoHead.innerHTML=imageLocation.files[SN].name+"<p>Size: "+((Math.round(imageLocation.files[SN].size/1048576)>0)?(imageLocation.files[SN].size/1048576).toFixed(2)+" MB":(imageLocation.files[SN].size/1024.00).toFixed(2)+" KB");;
	OCRInfo.hidden=false;
	
}


function OCR(ID){
	
const worker = Tesseract.createWorker({
	langPath: "/Tesseract/TrainedData/",
	gzip: false,
  logger: m =>{ 
	OCRInfoBody.innerHTML=m.status;
	var pro = Math.round(m.progress*100);
	OCRProgress.style.width=pro+"%";
	if(pro==100 && m.status=="recognizing text"){
	OCRInfoBody.innerHTML="Done!!!";
	
	}
 }
}
);

(async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
	  'tessedit_pageseg_mode':'3',
	  'tessedit_ocr_engine_mode': '2',
	  'tessedit_char_whitelist': "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ?,.'()-+&%$! "
  });
  const result = await worker.recognize(document.getElementById("Image"+ID.type).src);
  	console.log("Original Result");
	console.log(result);
	window.result=result;
	
	//result.data.words.forEach(drawRecRed);
	//result.data.lines.forEach(drawRecGreen);
	//result.data.paragraphs.forEach(drawRecBlue);

  await worker.terminate();
	OCRAssembleButton.disabled=false;
})();
	
}



//Draw Green Rectangle
function drawRecGreen(para,SN){
	
	var ctx = myCanvas.getContext("2d");
		
	//ctx.lineWidth = 10;
	ctx.strokeStyle = "#00FF00";
	
	ctx.strokeRect(para.bbox.x0,para.bbox.y0, para.bbox.x1-para.bbox.x0,para.bbox.y1-para.bbox.y0);
	
	centerx=Math.round((para.bbox.x1+para.bbox.x0)/2);
	centery=Math.round((para.bbox.y1+para.bbox.y0)/2);
	heightx=para.bbox.x1-para.bbox.x0;
	heighty=para.bbox.y1-para.bbox.y0;
	
	ctx.strokeStyle = "#00FF00";
	ctx.fillStyle="#00FF00"
	ctx.font ="60px sans-serif";
	ctx.textAlign="center";
	ctx.textBaseline = "middle";
	ctx.fillText(SN+1, centerx, centery);
	
}

//Draw Red Rectangle
function drawRecRed(para,SN){
	
	var ctx = myCanvas.getContext("2d");
		
	//ctx.lineWidth = 10;
	ctx.strokeStyle = "#FF0000";
	
	ctx.strokeRect(para.bbox.x0,para.bbox.y0, para.bbox.x1-para.bbox.x0,para.bbox.y1-para.bbox.y0);
	
	centerx=Math.round((para.bbox.x1+para.bbox.x0)/2);
	centery=Math.round((para.bbox.y1+para.bbox.y0)/2);
	heightx=para.bbox.x1-para.bbox.x0;
	heighty=para.bbox.y1-para.bbox.y0;
	
	ctx.strokeStyle = "#FF0000";
	ctx.fillStyle="#FF0000"
	ctx.font = heighty+"px sans-serif";
	ctx.textAlign="center";
	ctx.textBaseline = "middle";
	ctx.fillText(SN+1, centerx, centery);
	
}

//Draw Blue Rectangle
function drawRecBlue(para,SN){
	
	var ctx = myCanvas.getContext("2d");
		
	//ctx.lineWidth = 10;
	ctx.strokeStyle = "#0000FF";
	
	ctx.strokeRect(para.bbox.x0,para.bbox.y0, para.bbox.x1-para.bbox.x0,para.bbox.y1-para.bbox.y0);
	
	centerx=Math.round((para.bbox.x1+para.bbox.x0)/2);
	centery=Math.round((para.bbox.y1+para.bbox.y0)/2);
	heightx=para.bbox.x1-para.bbox.x0;
	heighty=para.bbox.y1-para.bbox.y0;
	
	ctx.strokeStyle = "#0000FF";
	ctx.fillStyle="#0000FF"
	ctx.font = heighty+"px sans-serif";
	ctx.textAlign="center";
	ctx.textBaseline = "middle";
	ctx.fillText(SN+1, centerx, centery);
	
}


/*
function detectQuestions(data){
	var Question=[];
	var Option1=[];
	var Option2=[];
	var Option3=[];
	var Option4=[];
	var SN=-1;
	const quesHead="Q.";
	const op1Head="(a)";
	const op2Head="(b)";
	const op3Head="(c)";
	const op4Head="(d)";
	var currRead;
	
	
	for(i=0;i<data.words.length;i++){
		
		let text=data.words[i].text;
		
		if((text.charCodeAt(0)>=65 && text.charCodeAt(0)<=90)){
			if(currRead !="Question"){
				console.log("question detected: First letter Capital");
				SN++;
				Question[SN]=(text.substr(-1)==" ")?(text):(text+" ");
				currRead="Question";
			}else{
				console.log("Possible Error: Question inside a question.");
			}
		}else if(text.slice(0,2)==quesHead){
			if(currRead !="Question"){
				console.log("question detected: Starting matches QuestionHead");
				SN++;
				Question[SN]=(text.substr(-1)==" ")?(text.slice(2)):(text.slice(2)+" ");
				currRead="Question";
			}else{
				console.log("Possible Error: Question inside a question.");
			}
		}else if(text.slice(0,3)==op1Head||text.slice(0,3)==op2Head || text.slice(0,3)==op3Head || text.slice(0,3)==op4Head){
			switch(text.slice(0,3)){
					
				case op1Head:
					if(currRead!="Option1"){
						Option1[SN]=(text.substr(-1)==" ")?(text.slice(3)):(text.slice(3)+" ");
						currRead="Option1";
					}else{
						console.log("Possible Error:Option1 encountered twice");
					}
					break;
				case op2Head:
					if(currRead!="Option2"){
						Option2[SN]=(text.substr(-1)==" ")?(text.slice(3)):(text.slice(3)+" ");
						currRead="Option2";
					}else{
						console.log("Possible Error:Option2 encountered twice");
					}
					break;	
				case op3Head:
					if(currRead!="Option3"){
						Option3[SN]=(text.substr(-1)==" ")?(text.slice(3)):(text.slice(3)+" ");
						currRead="Option3";
					}else{
						console.log("Possible Error:Option3 encountered twice");
					}
					break;	
				case op4Head:
					if(currRead!="Option4"){
						Option4[SN]=(text.substr(-1)==" ")?(text.slice(3)):(text.slice(3)+" ");
						currRead="Option4";
					}else{
						console.log("Possible Error:Option4 encountered twice");
					}
					break;	
			}
		}else{
			switch(currRead){
					
				case "Question":
					Question[SN]+=(text.substr(-1)==" ")?(text):(text+" ");;
					break;
				case "Option1":
					Option1[SN]+=(text.substr(-1)==" ")?(text):(text+" ");
					break;
				case "Option2":
					Option2[SN]+=(text.substr(-1)==" ")?(text):(text+" ");
					break;	
				case "Option3":
					Option3[SN]+=(text.substr(-1)==" ")?(text):(text+" ");
					break;
				case "Option4":
					Option4[SN]+=(text.substr(-1)==" ")?(text):(text+" ");
					break;	
			}
		}
			
			

		}
	
	
	for(i=0;i<=SN-1;i++)
		{
			window.parsedData=[];
			window.parsedData[i]={
				Question:Question[i],
				Option1: Option1[i],
				Option2: Option1[i],
				Option3: Option1[i],
				Option4: Option1[i],
				Answer: "Option1"
			}
			console.log("Question "+(i+1)+"::"+Question[i]+"::"+Option1[i]+"::"+Option2[i]+"::"+Option3[i]+"::"+Option4[i]);		
		}	
}
*/


/*

function setFeatures(result){
	
	var cumulativeLineGap=0;
	var cumulativeWordSpacing=0;
	var cumulativeTextHeight = 0;
	var snWords=0;
	var snWordGaps=0;
	var snLineGaps=0;
	function setFeaturesBlocks(block,SN,blocks){
	
		
		
		function setFeaturesParagraphs(paragraph,SN,paragraphs){
					
						var lineGap=0;
			
					
			function setFeaturesLines(line,SN,lines){
					
					var wordSpacing=0;
					var textHeight=0;
					
					function setFeaturesWords(word,SN,words){
						snWords++;
						let area = (word.bbox.x1-word.bbox.x0)*(word.bbox.y1-word.bbox.y0);
						let cgx=Math.round((word.bbox.x1+word.bbox.x0)/2);
						let cgy=Math.round((word.bbox.y1+word.bbox.y0)/2);
						let height=word.bbox.y1-word.bbox.y0;
						word.bbox.area=area;
						word.bbox.cgx=cgx;
						word.bbox.cgy=cgy;
						textHeight+=height;
						if(SN < words.length-1){
							wordSpacing+=(words[SN+1].bbox.x0-words[SN].bbox.x1);
							snWordGaps++;
						}
						
					}

				line.words.forEach(setFeaturesWords);
				
				
				let prevWords = (snWords-line.words.length);
				let prevWordGaps = (snWordGaps-(line.words.length-1));
				
				cumulativeTextHeight=(cumulativeTextHeight*prevWords+textHeight)/snWords;
				
				cumulativeWordSpacing=(snWordGaps>0)?((cumulativeWordSpacing*prevWordGaps+wordSpacing)/snWordGaps):0;
				
				textHeight=Math.round(textHeight/(line.words.length));
				wordSpacing=Math.round(wordSpacing/(line.words.length-1));
				
				let area = (line.bbox.x1-line.bbox.x0)*(line.bbox.y1-line.bbox.y0);
				let cgx=Math.round((line.bbox.x1+line.bbox.x0)/2);
				let cgy=Math.round((line.bbox.y1+line.bbox.y0)/2);
				
				line.bbox.area=area;
				
				line.textHeight=textHeight;
				line.wordSpacing=wordSpacing;
				
				line.bbox.cgx=cgx;
				line.bbox.cgy=cgy;	
				
					if(SN < lines.length-1){
							lineGap+=(lines[SN+1].bbox.y0-lines[SN].bbox.y1);
							snLineGaps++;
					}
				
				
				}
			
			paragraph.lines.forEach(setFeaturesLines);
			
			let prevLineGap = snLineGaps - (paragraph.lines.length-1);
			
			cumulativeLineGap=(snLineGaps>0)?(cumulativeLineGap*prevLineGap+lineGap)/snLineGaps:0;
			
			lineGap=((paragraph.lines.length-1)>0)?Math.round(lineGap/(paragraph.lines.length-1)):0;
			let area = (paragraph.bbox.x1-paragraph.bbox.x0)*(paragraph.bbox.y1-paragraph.bbox.y0);
			let cgx=Math.round((paragraph.bbox.x1+paragraph.bbox.x0)/2);
			let cgy=Math.round((paragraph.bbox.y1+paragraph.bbox.y0)/2);
			paragraph.bbox.cgx=cgx;
			paragraph.bbox.cgy=cgy;	
			paragraph.bbox.area=area;
			paragraph.bbox.lineGap = lineGap;
		}
		block.paragraphs.forEach(setFeaturesParagraphs);
		let cgx=Math.round((block.bbox.x1+block.bbox.x0)/2);
		let cgy=Math.round((block.bbox.y1+block.bbox.y0)/2);
		block.bbox.cgx=cgx;
		block.bbox.cgy=cgy;

	}
	result.data.blocks.forEach(setFeaturesBlocks);
	result.data.lineGap=cumulativeLineGap;
	result.data.wordSpacing=cumulativeWordSpacing;
	result.data.textHeight=cumulativeTextHeight;
	
}

*/

function swap(x,y){
		let temp=x;
		x=y;
		y=temp;
	}

function max(x,y){
	if(x >= y){return x;}
	else{return y;}
}
function min(x,y){
	if(x<=y){return x;}
	else{return y;}
}


function createColumn(result){
	
	var index=0;
	var Column=[];
	
	
	var fontSize=0;
	for(i=0;i<result.data.words.length;i++){
		fontSize+=result.data.words[i].font_size;
	}
	fontSize/=result.data.words.length;
	//var lineGap=fontSize;
	
	
	for (i=0;result.data.words.length>0;i++){
		
		
		
		//required colx0 colx1 returns an element if lyambda % of area is contained within the limits of colx0 and colx1 and element area doesnot deviate by (1-lyambda)% 
		function isContained(element){
	
		var lyambda = 0.4;	
			
		var SN=0;
		

		var x0=element.bbox.x0;
		var x1=element.bbox.x1;
		var y0=element.bbox.y0;
		var y1=element.bbox.y1;


		if(x1>=colx0 && y1>=coly0)				//is contained to right bottom of the word
		{
			var elementArea=(x1-x0)*(y1-y0);
			var enclosedArea=(x1-max(colx0,x0))*(y1-max(coly0,y0));

												 
			if(enclosedArea >= lyambda*elementArea){
				return true;
			} //&& elementArea<=((2-lyambda)*columnArea) && elementArea >= (lyambda*columnArea)){
			else{
				return false;
			}
		}else {
				return false;
			}

		}
	function withinFontSize(element,SN,elements){
			
			lyambda=2; ///factor for increasing font Size for inclusion
			
			cx0=Column[index].bbox.x0;
			cx1=Column[index].bbox.x1;
			cy0=Column[index].bbox.y0;
			cy1=Column[index].bbox.y1;
			
			ex0=element.bbox.x0;
			ex1=element.bbox.x1;
			ey0=element.bbox.y0;
			ey1=element.bbox.y1;
			
			selx0=((cx0-lyambda*fontSize)>0)?(cx0-lyambda*fontSize):0;
			selx1=((cx1+lyambda*fontSize)>0)?(cx1+lyambda*fontSize):0;
			sely0=((cy0-lyambda*fontSize)>0)?(cy0-lyambda*fontSize):0;
			sely1=((cy1+lyambda*fontSize)>0)?(cy1+lyambda*fontSize):0;
			
			
			if(SN==0 && Pass!=2)	//First encounter
			{
				Column[index].bbox.x0=ex0;
				Column[index].bbox.x1=ex1;
				Column[index].bbox.y0=ey0;
				Column[index].bbox.y1=ey1;
				return true;
				
			}else if(((ex0<=selx1)&&(ex1>=selx0)&&(ey1>=sely0)&&(ey0<=sely1)) )//touches the bbox of already sel elements+fontsize*lyambda margin on all sides 
			{
					 
					 
					Column[index].bbox.x0=(Column[index].bbox.x0<element.bbox.x0)?(Column[index].bbox.x0):(element.bbox.x0);
					Column[index].bbox.x1=(Column[index].bbox.x1>element.bbox.x1)?(Column[index].bbox.x1):(element.bbox.x1);
					Column[index].bbox.y0=(Column[index].bbox.y0<element.bbox.y0)?(Column[index].bbox.y0):(element.bbox.y0);
					Column[index].bbox.y1=(Column[index].bbox.y1>element.bbox.y1)?(Column[index].bbox.y1):(element.bbox.y1);
					return true;
					 
			}else{
				return false;
			}
				
	}
				
				/*
			}else if(element.bbox.y0<Column[index].bbox.y1)//overlaps
			{
				
				var overlappedHeight=min(element.bbox.y1,Column[index].bbox.y1)-element.bbox.y0;
				
				if(overlappedHeight==(element.bbox.y1-element.bbox.y0))  //totally overlapped
				{
					return true;
				}else	//partially overlapped
				{
					overflowHeight=(element.bbox.y1-element.bbox.y0)-overlappedHeight;
					//totalElementWidth+=overlappedHeight+lineGap;
					
					
					Column[index].bbox.x0=(Column[index].bbox.x0<element.bbox.x0)?(Column[index].bbox.x0):(element.bbox.x0);
					Column[index].bbox.x1=(Column[index].bbox.x1>element.bbox.x1)?(Column[index].bbox.x1):(element.bbox.x1);
					Column[index].bbox.y0=(Column[index].bbox.y0<element.bbox.y0)?(Column[index].bbox.y0):(element.bbox.y0);
					Column[index].bbox.y1=(Column[index].bbox.y1>element.bbox.y1)?(Column[index].bbox.y1):(element.bbox.y1);
					
					return true;
				}
				
			}
			else if(element.bbox.y0 <= (Column[index].bbox.y1+(lyambda*lineGap))) {
			
			Column[index].bbox.x0=(Column[index].bbox.x0<element.bbox.x0)?(Column[index].bbox.x0):(element.bbox.x0);
			Column[index].bbox.x1=(Column[index].bbox.x1>element.bbox.x1)?(Column[index].bbox.x1):(element.bbox.x1);
			Column[index].bbox.y0=(Column[index].bbox.y0<element.bbox.y0)?(Column[index].bbox.y0):(element.bbox.y0);
			Column[index].bbox.y1=(Column[index].bbox.y1>element.bbox.y1)?(Column[index].bbox.y1):(element.bbox.y1);
			return true;
				
			}else{
				return false;
			}
		*/
		
		function removeDuplicate(value){
			if(!(Column[index].words.includes(value))){
				return true;
			}else{
				return false;
			}
		}
		
			
		
		var colx0 = result.data.words[0].bbox.x0;
		var colx1 = result.data.words[0].bbox.x1;
		var coly0 = result.data.words[0].bbox.y0;
		var coly1 = result.data.words[0].bbox.y1;
		
		//var selected = result.data.words.filter(isContained)//.sort(function(a, b){return (a.bbox.y0 - b.bbox.y0)});
		
		//console.log("Selected::"+selected.length);

		Column[index]={};
		Column[index].bbox={};
		var Pass = 1;
		
		var filtered = result.data.words.filter(withinFontSize);
		console.log("Filtered 1st Pass"+filtered.length);
		
		Pass=2;
		
		filtered = result.data.words.filter(withinFontSize);
		console.log("Filtered 2nd Pass"+filtered.length);
		
		Column[index].words=filtered;
		console.log("Column Created");
		result.data.words=result.data.words.filter(removeDuplicate);//value => !( Column[index].paragraphs.includes(value)));
		console.log("Duplicates Removed");
		index++;
		console.log("Index Increased::"+index);
	}
	
	result.data.columns=Column;

	
}


function analyse(){

		function removeUnwantedWords(value){
		let height = value.font_size;
			if(height<=(1-lyambda1)*fontSize || height>=(1+lyambda1)*fontSize){
				console.log("Over/Under Sized word Removed::"+value.text);
				return false;
			}else if(value.text.slice(0,1)=="Q" && value.text.slice(-1).charCodeAt(0)>=48 && value.text.slice(-1).charCodeAt(0)<=57){
				console.log("Question Head Removed::"+value.text);
				return false;
			//}else if(value.font_id != font) {
				//console.log("Unknown Font Removed::"+value.text);
				//return false;
			}else{
				return true;
			}
		}
	
		function detectFont(word,SN,words){
			if(word.font_id in fontID){
				fontID[word.font_id]++;
			}else{
				fontID[word.font_id]=1;
			}	
		}
	
	function removeSmallColumns(column,SN,columns){
		if(column.words.length>2){
			return true;
		}else{
			return false;
		}
	}
	
	
	lyambda1=0.3;    //factor for excluding and including a word based on its font size. lower excludes more
	
	
	
	result=window.result;
	
	
	
	
	var fontSize=0;
	for(i=0;i<result.data.words.length;i++){
		fontSize+=result.data.words[i].font_size;
	}
	fontSize/=result.data.words.length;
	console.log("passed font size calculation")
	
	var fontID={};
	result.data.words.forEach(detectFont);
	
	font =Object.keys(fontID).reduce((a, b) => fontID[a] > fontID[b] ? a : b);  
	
	console.log("Font Detected::"+font);
	
	result.data.words=result.data.words.filter(removeUnwantedWords);
	console.log("passed unwanted word removal")
	
	//result.data.paragraphs=result.data.paragraphs.sort(function(a, b){return (a.bbox.x0 - b.bbox.x0)});
	createColumn(result);
	console.log("Passed column creation");
	
	result.data.columns=result.data.columns.filter(removeSmallColumns);
	console.log("Passed Small column Filter");
	
	result.data.columns.forEach(drawRecGreen);	
	console.log("Passed green rec ceration");
	
	for(i=0;i<result.data.columns.length;i++){
		
		result.data.columns[i].words.forEach(drawRecRed);
	}
	
	console.log("passed red rec creation");
	
}

