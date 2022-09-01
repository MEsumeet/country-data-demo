
// declarations

const countryCard = document.getElementById("countryCard");
const searchInput = document.getElementById("searchInp");
const graph = document.getElementById("graph");
const btnName = document.querySelector(".name");
const btnCapital = document.querySelector(".capital");
const btnPopulation = document.querySelector(".population");
const graphIcon = document.querySelector(".graphIcon");
let flag = true;


// functions

// 'search' input event callback
const searchFilter = (e) => {
    countryCard.classList.remove("d-none");
    //to get the input value
    let val = (e.target.value).toLowerCase().trim();           
    let temp_arr = countries.filter(ele => ele.name.toLowerCase().trim().includes(val));
    templating(temp_arr);   
}

// 'name' btn event callback
const nameSort = (e) => {
    countryCard.classList.remove("d-none");
    if(flag){
        // Sort by `name` in ascending order
        let sortedArr = _.orderBy(countries, ['name'], ['asc']);
        templating(sortedArr);
    }else{
        // Sort by `name` in descending order
        let sortedArr = _.orderBy(countries, ['name'], ['desc']);
        templating(sortedArr);
    }
    flag = !flag;
}

// 'capital' btn event callback
const capitalSort = (e) => {
    countryCard.classList.remove("d-none");
    if(flag){
        // Sort by `capital` in ascending order
        let sortedArr = _.orderBy(countries, ['capital'], ['asc']);
        templating(sortedArr);
    }else{
        // Sort by `capital` in descending order
        let sortedArr = _.orderBy(countries, ['capital'], ['desc']);
        templating(sortedArr);
    }
    flag = !flag;
}

// 'population' btn event callback
const populationSort = (e) => {
    countryCard.classList.remove("d-none");
    if(flag){
        // Sort by `population` in ascending order
        let sortedArr = _.orderBy(countries, ['population'], ['asc']);
        templating(sortedArr);
    }else{
        // Sort by `population` in descending order
        let sortedArr = _.orderBy(countries, ['population'], ['desc']);
        templating(sortedArr);
    }
    flag = !flag;
}

// 'graph' icon event callback
const displayGraph = (e) => {
    countryCard.classList.add("d-none");
    graph.classList.remove("d-none");
    populationGraph();
}

// templating function
function templating(arr){
    let result = '';
    arr.forEach(ele => {
        result += `
                <div class="col-md-3 mb-20">
                    <div class="card">
                        <div class="card-body">
                            <figure class="country">
                                <img src="${ele.flag}" alt="${ele.name}" title="${ele.name} flag">
                                <figcaption>
                                    <h5>${ele.name}</h5>
                                    <dl class="row">
                                        <dt class="col-sm-6">Capital:</dt>
                                        <dd class="col-sm-6">${ele.capital}</dd>
                                        <dt class="col-sm-6">Language:</dt>
                                        <dd class="col-sm-6">${lngFormatting(ele.languages)}</dd>
                                        <dt class="col-sm-6">Population:</dt>
                                        <dd class="col-sm-6">${ele.population}</dd>
                                    </dl>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
        `;
    });
    countryCard.innerHTML = result;
}
templating(countries);

// for language formatting
function lngFormatting(array){
    let str = '';
    let last = array[array.length - 1];
    _.each(array, (ele) => {
        if(ele != last){
            str = str + ele + ', ';
        }else{
            str+= ele;
        }
    })
    return str
}
// for graph templating
function populationGraph(){
    // to get: array with countries whose population is greater than 100M
    let arr = countries
                    .filter(ele => ele.population > 100000000)
                    .sort((a, b) => b.population - a.population);

    let xValues = arr.map(ele => ele.name);         //country names
    let yValues = arr.map(ele => ele.population);   //population

    new Chart("myChart", {
        type: "horizontalBar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: "red",
                data: yValues
            }]  
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "World Country Population"
            }
        }
    });
}

// events
searchInput.addEventListener("keyup", searchFilter);
btnName.addEventListener("click", nameSort);
btnCapital.addEventListener("click", capitalSort);
btnPopulation.addEventListener("click", populationSort);
graphIcon.addEventListener("click", displayGraph);
