async function app() {
  let endpoint = 'cakes.json';
  let server = await fetch(endpoint);
  let response = await server.json();

  let cake_holder = document.getElementById('cake-holder');
  let cake_type = document.getElementById('cake-type');

  let cake_container = document.createElement('div');
  let cake = document.createElement('div');
  let cake_img = document.createElement('div');
  let cake_data = document.createElement('div');
  let name = document.createElement('input');
  let price = document.createElement('input');
  let disc = document.createElement('p');

  name.readOnly = true;
  price.readOnly = true;
  cake_container.classList.add('cake-container');
  cake.classList.add('cake');
  cake_img.classList.add('cake-img');
  cake_data.classList.add('cake-data');
  name.classList.add('name');
  price.classList.add('price');
  disc.classList.add('discription');
  cake.dataset.on = 'false';

  cake_img.style.backgroundBlendMode = 'muliply';
  for (let i = 0; i < response.cakes.length; i++) {
    name.value = response.cakes[i].title;
    disc.innerText = response.cakes[i].detailDescription;
    cake_img.style.backgroundImage = `url(${response.cakes[i].image}), linear-gradient(rgba(0, 0, 0, 0.162), rgba(0, 0, 0, 0.262))`;
    price.value = '$' + getRandomInt(20, 50);
    cake.dataset.type = response.cakes[i].tag;

    cake.appendChild(cake_img);
    cake_data.append(name);
    cake_data.append(price);
    cake_data.append(disc);
    cake.append(cake_data);
    cake_container.append(cake);
    cake_holder.append(cake_container.cloneNode(true));
  }

  let a_cake = document.getElementsByClassName('cake');
  console.log(a_cake);
  for (let i = 0; i < a_cake.length; i++) {
    a_cake[i].addEventListener('click', () => {
      if (a_cake[i].dataset.on == 'false') {
        a_cake[i].style.height = '100%';
        a_cake[i].dataset.on = 'true';
      } else {
        a_cake[i].style.height = '200px';
        a_cake[i].dataset.on = 'false';
      }
    });
  }
  var firstClick = 0;
  cake_type.addEventListener('click', () => {
    if (firstClick == 0) {
      firstClick++;
    } else {
      firstClick = 0;
      console.log(cake_type.value);


      for(let i = 0; i < a_cake.length; i++)
      {
        a_cake[i].classList.remove('hide');
      }
      for (let i = 0; i < a_cake.length; i++) {
        console.log(a_cake[i].dataset.type)
        if (a_cake[i].dataset.type == cake_type.value) {
          
        } else {
          a_cake[i].classList.add('hide');
        }
      }
    }
  });
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
app();
