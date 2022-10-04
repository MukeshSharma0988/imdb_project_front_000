const url = "http://www.omdbapi.com/?apikey=80ce8b80&";
function imgUrlcheck(u) {
  if (u == "N/A") {
    return "noImage.webp";
  } else {
    return u;
  }
}
async function getImage() {
  let gt = document.getElementById("blp");
  let slider = document.getElementById("slider");
  let sideImage = document.getElementById("SiderImg");

  let data = {
    fornt: ["the lord of the rings", "house of  the dragon", "mr robot"],
    forntside: ["spiderman2", "ironman2", "Thor"],
    title: ["most Popular", "super hero"],
    movieName: ["thor", "spiderman", "batman ", "superman ", "iron man"],
  };
  let allfont = [];
  for (let x of data.fornt) {
    let res = await fetch(`${url}t=${x}`).then((response) => response.json());
    allfont.push(res);
  }
  Promise.all([allfont]).then((res) => {
    let x = 0;
    for (let y of allfont) {
      slider.children[x].children[0].src = imgUrlcheck(y.Poster);
      slider.children[
        x
      ].children[0].onclick = `locate("/detail.html?${y.Title}",2)`;
      x++;
    }
  });
  let allfontside = [];
  for (let x of data.forntside) {
    let res = await fetch(`${url}t=${x}`).then((response) => response.json());
    allfontside.push(res);
  }
  Promise.all([allfontside]).then((res) => {
    for (let y of allfont) {
      temp = `<div class="divcl">
      <div><img src="${imgUrlcheck(
        y.Poster
      )}" alt=""  onclick='locate("/detail.html?${
        y.Title
      }",2)'style="width: 100px;"></div>
      <div style="margin-left: 11px; margin-top: 19px;">
          <div onclick='locate("/detail.html?${y.Title}",2)'>${y.Title}</div>
          <div style="font-size: small;">${y.Plot}</div>
      </div>
      </div>`;
      sideImage.appendChild(ConvertStringToHTML(temp));
    }
  });

  let allRes = [];
  for (let x of data.movieName) {
    let res = await fetch(`${url}t=${x}`).then((response) => response.json());
    // .then((res) => res.json())
    // .then((res) => {
    allRes.push(res);
    //console.log(allRes);
    // });
  }

  Promise.all([allRes]).then((res) => {
    console.log("res", res);
    let temp = ``;
    for (let x of data.title) {
      temp = `<div class="lab">
        <label>${x}</label>
      </div>
      <div class="imgCon" id="">`;
      console.log(allRes);
      console.log("ok1");
      for (let y of allRes) {
        console.log("ok");
        let template = `
              
              <div class="cadr">
                  <div><img src="${imgUrlcheck(y.Poster)}" alt=""></div>
                  <div class="cardBtn">
  
  
                      <button onclick="imgUrlchange('${y.imdbID}','${y.Title}' )"><img  id="${y.imdbID}" src="7.png" style="width:20px;height:20px"</button>
                  </div>
                  <div>
  
                      <p>${y.Title}</p>
                  </div>
                  <input type="button" onclick='locate("/detail.html?${
                    y.Title
                  }",2)' value="detail">
  
              </div>`;
        temp += template;

        // console.log("ok");
      }
      temp += `</div>`;
      gt.appendChild(ConvertStringToHTML(temp));
    }
  });
}
function removeAllChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
let ConvertStringToHTML = function (str) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, "text/html");
  return doc.body;
};

async function getSreachResult() {
  let ele = document.getElementById("ser");
  console.log(ele.value.length);
  let res = "";
  let clo = document.getElementById("srbo");
  let schbx = document.getElementById("schiteam");
  let template =
    ' <li><img src="1.jpg" alt="">' +
    "<a>" +
    "<p>brahmastra</p>" +
    "<p>brahmastra is bollywood movie that base on accicint weaoean</p>" +
    "</a>" +
    " </li>";
  if (ele.value.length > 2) {
    res = await fetch(`${url}s=${ele.value}`);
  } else {
    res = await fetch(`${url}t=${ele.value}`);
  }
  if (ele.value.length == 0) {
    removeAllChild(schbx);
    clo.classList.add("hide");
  } else {
    removeAllChild(schbx);
    const data = await res.json();
    clo.classList.remove("hide");

    console.log(data);
    let disc = data.Plot;
    if (ele.value.length < 3) {
      if (disc.length > 70) {
        disc = disc.substr(0, 70);
      }
      let template = ` <li onclick = locate("/detail.html?${data.Title}",2)><img src="${data.Poster}" alt="">
            <a href='/detail.html?${data.Title}'>
                <p>${data.Title}</p>
                <p>${disc}</p>
            </a>
        </li>`;
      schbx.appendChild(ConvertStringToHTML(template));
    } else {
      if (data.Response == "True") {
        console.log(data.Response);
        for (let x = 0; x < 5; x++) {
          console.log(data.Search[x].Poster);
          let template = ` <li onclick = locate("/detail.html?${data.Search[x].Title}"><img
                src="${data.Search[x].Poster}" alt="">
            <a href='/detail.html?${data.Search[x].Title}'>
                <p onclick = locate("/detail.html?${data.Search[x].Title}",2)>${data.Search[x].Title}</p>
                <p onclick = locate("/detail.html?${data.Search[x].Title}",2)>${data.Search[x].Year}</p>
            </a>
            </li>`;
          schbx.appendChild(ConvertStringToHTML(template));
        }
      }
    }
  }
}
async function getSearchOutput() {
  let ele = document.getElementById("ser");
  let sch = document.getElementById("srchRe");
  let sr = document.getElementById("srTi");
  var ur = document.location.href;
  params = ur.split("?")[1];
  console.log(params);
  ele.value = params;
  console.log(ele.value);
  let res = "";
  let Srele = `<td>
                  <a href="#">
                      <img src="1.jpg" alt="">
                      <p>brahmastra</p>
                   </a>

              </td>`;

  if (ele.value.length > 2) {
    res = await fetch(`${url}s=${ele.value}`);
  } else {
    res = await fetch(`${url}t=${ele.value}`);
  }

  if (ele.value.length == 0) {
    removeAllChild(sch);
    let nameEle = `<p> Search IMDb by typing a word or phrase in the search box at the top of this page. </p>`;
    sr.innerHTML = nameEle;
  } else {
    removeAllChild(sch);
    let nameEle = `<p>result for </p>
                 <h5>"${ele.value}" </h5>`;
    sr.innerHTML = nameEle;
    const data = await res.json();
    if (ele.value.length < 2) {
      let Srele = `<td>
                  <a href="">
                      <img src="${data.Poster}" alt="">
                      <p>${data.Title}</p>
                   </a>

              </td>`;
      sch.appendChild(ConvertStringToHTML(template));
    } else {
      if (data.Response == "True") {
        console.log(data.Search);
        for (let x = 0; x < data.Search.length; x++) {
          console.log(data.Search[x].Poster);
          let Srele = `<td>
          <a href="/detail.html?${data.Search[x].Title}">
              <img src="${data.Search[x].Poster}" alt="">
              <p>${data.Search[x].Title}</p>
           </a>

      </td>`;
          sch.appendChild(ConvertStringToHTML(Srele));
        }
      }
    }
  }
}
function locate(url, pge) {
  let ele = document.getElementById("ser");

  const base_url = "http://127.0.0.1:5500/";
  if (pge == 1) {
    url = url + "?" + ele.value;
  }
  console.log(url);
  document.location.href = url;
}
function navCode(id) {
  let parent = document.getElementById(id);
  let ele = `<nav class="navbar navbar-expand-lg bg-light" style="height: 50%;">
    <div class="container-fluid">
        <a class="navbar-brand wh" href="#" style="margin-left: 22%;">imdb</a>
        <img src="menuBtn.png" alt="error" width="40px" height="40px" style="margin: 20px;">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">



                <form class="d-flex" role="search">
                    <div class="dropdown">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false"
                            style="background:white; color:black;">
                            All
                        </a>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    <input id=ser oninput="getSreachResult()" value=""
                        class="form-control me-2 margin-left:20px" type="search" placeholder="Search"
                        aria-label="Search" style="width: 600px;">
                    <img src="./searchBtn.png" onclick="locate('searchPage.html',1)" alt="network error"
                        width="40px" height="40px" style="background: white;margin-left: -8px;">
                </form>
        </div>
    </div>
</nav>
<div id=srbo class="srBx hide">
    <ul id="schiteam">

        <li><img src="1.jpg" alt="">
            <a>brahmastra</a>
            <p>brahmastra is bollywood movie that base on accicint weaoean</p>
        </li>
        <li><img src="1.jpg" alt="">
            <a>brahmastra</a>
            <p>brahmastra is bollywood movie that base on accicint weaoean</p>
        </li>
    </ul>
</div>`;
  parent.appendChild(ele);
}
// favourate html
function favDataInsert(title, work) {
  debugger;
  let data = localStorage.getItem("favdata");
  console.log("add data");
  let movie = [];
  if (work === "add") {
    // console.log(data);
    if (data) {
      movie = JSON.parse(data);
      console.log(movie);
      movie.push(title);
    } else {
      movie.push(title);
      console.log(title);
      console.log("ok2");
    }
    // console.log(movie);
  } else if (work === "remove") {
    if (data) {
      movie = JSON.parse(data);
      let mov = [];
      for(let i=0; i<movie.length; i++){
        if(movie[i]!=title){
          mov.push(movie[i]);
        }
      }
      movie = mov;
      console.log("movie   :  ",movie);
    } else {
      alert("not data present");
    }
  }
  localStorage.setItem("favdata", JSON.stringify(movie));
  alert("data succafully modify");
}
async function favDataShow() {
  let ele = document.getElementById("favData");

  let data = localStorage.getItem("favdata");
  console.log(data);

  if (data) {
    let parsedData = JSON.parse(data);
    let allRes = [];
    parsedData.forEach(async (element) => {
      console.log(element);
      let res = fetch(`${url}t=${element}`).then((response) => response.json());
      // .then((response) =>
      //   response.json()
      // );
      allRes.push(res);
    });
    Promise.all(allRes).then((res) => {
      // return res.map((d) => d.json());
      console.log(res);
      for (let element of res) {
        let template = `<div id="${element.imdbID}" class="favConIt">
       <div>
           <img onclick='locate("/detail.html?${element.Title}",2)'src="${element.Poster}" alt="" style=" width: 90px;">
         </div>
         <div class="favmcon">
            <div>
                <div onclick='locate("/detail.html?${element.Title}",2)' class="favmti">${element.Title} (${element.Year})</div>

                <small>${element.Year} | ${element.Genre}</small>
            </div>
            <div class="favrate">
                <div><img src="4.png" alt="error" style="width: 38px;"></div>
                 <div onclick='locate("/detail.html?${element.Title}",2)'style="font-size: xx-large;">${element.imdbRating}</div>
           </div>

         </div>
       <button class="favbtn"  onclick="removeFromfavPage(${element.imdbID},${element.Title})"><img src="6.png"></button>
    </div>`;
        ele.appendChild(ConvertStringToHTML(template));
      }
    });

    // console.log(allRes);
    // allRes.forEach((element) => {
    //   console.log(element);
    //
  }
}
function removeFromfavPage(id, title) {
  // let ele = document.getElementById(id).children[2];
  // ele.innerHTML= `<img src="5.jpg">`;
  let ele = document.getElementById(id);
  ele.parentNode.removeChild(ele);
  favDataInsert(title, "remove");
}
async function loadDt() {
  var ur = document.location.href;
  let params = ur.split("?")[1];
  console.log(params);
  let dt = document.getElementById("dti");
  let dx = document.getElementById("dtx");
  let dtr = document.getElementById("ratid");
  let dti = document.getElementById("dticon");
  let dtdis = document.getElementById("dtdi");
  let dtcrna = document.getElementById("catCo");
  let dttyu = document.getElementById("dtty");
  let dtacu = document.getElementById("dtac");
  let res = await fetch(`${url}t=${params}`).then((response) =>
    response.json()
  );
  let data = res;
  console.log(data);
  let ele = `<h1>${data.Title}</h1>`;
  let el = `<li>${data.Year}</li>
  <span>.</span>
  <li>${data.Runtime}</li>`;
  let eli = ` <div>imdb rating</div>
                    <div class="rateIt">
                        <div><img src="4.png"></div>
                        <div class="loRate">
                            <div class="loPe">${data.imdbRating}</div>
                            <smal class="CoPe">${data.imdbVotes}</small>
                        </div>
                    </div>`;
  let elicon = `<img src="${imgUrlcheck(data.Poster)}" class="dtimg">`;
  let elico = `<div>${data.Plot}</div>`;
  let s = "";
  let ty = data.Genre.split(",");
  console.log(ty);
  for (let x = 0; x < ty.length; x++) {
    s += `<li>${ty[x]}</li>`;
  }
  let elcr = `<div class="dtmt">${data.Director} ${data.Writer} </div>`;
  let elac = `<div class="dtmt">${data.Actors}</div>`;
  dt.appendChild(ConvertStringToHTML(ele));
  dx.appendChild(ConvertStringToHTML(el));
  dtr.appendChild(ConvertStringToHTML(eli));
  dti.appendChild(ConvertStringToHTML(elicon));
  dtdis.appendChild(ConvertStringToHTML(elico));
  console.log(dtcrna);
  dtcrna.appendChild(ConvertStringToHTML(elcr));

  console.log(ConvertStringToHTML(elcr));
  dtacu.appendChild(ConvertStringToHTML(elac));
  dttyu.appendChild(ConvertStringToHTML(s));
}
function imgUrlchange(id,title ){
  let img = document.getElementById(id);
  console.log(title);
  console.log(typeof(img.src),img.src);
  if (img.src=="http://127.0.0.1:5500/7.png"){
    img.src = "http://127.0.0.1:5500/6.png";
    favDataInsert(title,'add');

  }
  else{
    img.src = "http://127.0.0.1:5500/7.png";
    favDataInsert(title,'remove');
  }


}
