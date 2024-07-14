let myLead = [];
const input = document.getElementById('input-el');
const button = document.getElementById('input-btn');
const del = document.getElementById('del-btn');
const ul = document.getElementById('ul-el');
const leadsLocal = JSON.parse(localStorage.getItem('myLead'));
const tab = document.getElementById('tab-btn');

if (leadsLocal) {
	myLead = leadsLocal;
	output(myLead);
}
console.log(leadsLocal);
function output(leads) {
	let holdItems = ' ';
	for (let i = 0; i < leads.length; i++) {
		holdItems += `
    <li>
        <a target='_blank' href=' ${leads[i]} '>
              ${leads[i]} 
        </a>
     </li>`;
		console.log(leads[i]);
	}
	ul.innerHTML = holdItems;
}
function handleInput() {
	if (input.value.trim() !== '') { 
			myLead.push(input.value.trim());
			localStorage.setItem('myLead', JSON.stringify(myLead));
			console.log(myLead);
			output(myLead);
			input.value = ''; 
	}
}
del.addEventListener('dblclick', function () {
	localStorage.clear();
	myLead = [];
	input.value = '';
	output(myLead);
});
button.addEventListener('click', function () {
handleInput()
});

input.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		input.value = ' ';
		handleInput()//Was working on a function to make it so when I entere input gets empty and the button is also triggered but fialed
		console.log("worked");
	}
});
tab.addEventListener('click', function () {
	//chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	//});
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		myLead.push(tabs[0].url);
		localStorage.setItem('myLead', JSON.stringify(myLead));
		output(myLead);
	})

});
