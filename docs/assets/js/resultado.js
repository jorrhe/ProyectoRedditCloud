window.addEventListener("load",() =>{

    let r = window.location.search.split("r=");

    if(r.length === 1){
        alert("Ha ocurrido un error");
        window.location.href = "/";
        return;
    }

    switch (r[1]){
        case "s1":
            cargarGraficaS1();
            break;
    }

});


function cargarGraficaS1(){

    let select = document.createElement("select");
    select.id = "select";

    DATA_S1.forEach(el => {
        let o = document.createElement("option");
        o.innerHTML = el;
        select.appendChild(o);
    })

    document.querySelector("#extra").appendChild(select);

    let choices = new Choices("#select",{
        shouldSort: false,
        loadingText: "Cargando...",
        noResultsText: 'Sin resultados',
        noChoicesText: 'No choices to choose from',
        itemSelectText: '',
        removeItems: false,
        resetScrollPosition: false
    });

    select.addEventListener("change",() => {
        let valor = select.value;
        alert(valor);
    });

}