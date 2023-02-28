

const loadPhone = async(searchText,dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
const res = await fetch(url);
const data=await res.json();
displayPhone(data.data,dataLimit);

}

// show limited item to use a slice 
const displayPhone =(phones, dataLimit) =>{
const phoneContainer=document.getElementById('phone-container');
phoneContainer.textContent = '';

// display show only 20  item=and show all
const showAll=document.getElementById('show-all');
if(dataLimit && phones.length > 20){
    phones = phones.slice(0,20);
  
showAll.classList.remove('d-none');
}
else{
showAll.classList.add('d-none')
}

//display warning 
const noPhone=document.getElementById('no-phone-found');
if(phones.length===0){
    noPhone.classList.remove('d-none');
}
else{
    noPhone.classList.add('d-none')
}

// warning end

// card add a photo and all details
phones.forEach(phone => {
    const phoneDiv=document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML=`
        <div class="card p-4">
               <img src="${phone.image}" class="card-img-top" alt="...">
               <div class="card-body">
             <h5 class="card-title">${phone.phone_name}</h5>
             <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
             <button onclick="loadPhonedetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
              </div>
          </div>
    `;

    phoneContainer.appendChild(phoneDiv);
// stop loader 


});
}
const processSearch=(dataLimit)=>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
loadPhone(searchText,dataLimit)
}

// search field
document.getElementById('btn-search').addEventListener('click', function(){
// loading section start
processSearch(10);

})
    // search input field enterKey
     document.getElementById('search-field').addEventListener('keypress', function(e){

      if(e.key==='Enter'){
        processSearch(10);
    }
    });


// start loader in upload data  = by-defoult hide
const toggleSpinner=isLoading =>{
    const loaderSection=document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        
    loaderSection.classList.add('d-none')
    }
}



// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click',function(){
processSearch();

})
const loadPhonedetails = async id =>{
const url=`https://openapi.programming-hero.com/api/phone/${id}`
const res = await fetch(url);
const data = await res.json();
displayPhoneDetails(data.data);

}

const displayPhoneDetails = phone => {
    // console.log(phone);
 const modalTitle = document.getElementById('phoneDetailModalLabel')
modalTitle.innerText=phone.name;
const PhoneDetails=document.getElementById('Phone-details');
PhoneDetails.innerHTML=`
<p>Release Date :${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'} </p>
<p>Storage : ${phone.mainFeatures ? phone.mainFeatures.storage :'No storage information Found'}</p>
<p>Others : ${phone.others ? phone.others.Bluetooth : 'No Bluetooth information Found'}</p>
`

}
// loadPhone('apple');
