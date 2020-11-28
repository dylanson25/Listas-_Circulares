var btnAgregar = document.querySelector('#btnAgregar')

var lista = document.querySelector("#lista")
class Base {
    constructor(nombreBase, minutos, posicion) {
        this.nombreBase = nombreBase
        this.minutos = minutos
        this.siguiente = null
    }
    articleToHtml() {
        let productString = '<li>';
        for (let key in this) {
            productString += `<div>${key}: ${this[key]}</div>`;
        }
        return productString + "</li>";
    }
    articleToHtmlRecorrido(base, hora) {
        let productString = '<li>';
        for (let key in this) {
            productString += `<div>${key}: ${this[key]}</div>`;
        }
        let texto = "Estas en " + base + " a las " + hora;
        return texto + productString + "</li>";
    }
}

class BaseBus {
    constructor() {
        this.inicio = null
        this.tamaño = 0
    }
    agregarBase(nuevo) {
        if (this.inicio === null) {
            this.inicio = nuevo
            nuevo.siguiente = this.inicio
        } else {
            let aux = this.inicio
            while (aux.siguiente !== this.inicio) {
                aux = aux.siguiente
            }
            aux.siguiente = nuevo
            nuevo.siguiente = this.inicio
        }
        this.tamaño++
        this.mostrar()
    }
    eliminarBase(nombre) {
        if(!this.inicio){
            return false
        }
        else if (this.tamaño === 1) {
            this.inicio = null
            this.tamaño--
            return true
        }
        else if (this.inicio.nombreBase === nombre) {
            console.log('a qui esta')
            this.inicio = this.inicio.siguiente
            let aux = this.inicio
            while (aux.siguiente.nombreBase !== nombre) {
                aux = aux.siguiente
            }
            aux.siguiente = this.inicio  
        }
        else {
            let aux = this.inicio
            while (aux.siguiente.nombreBase !== nombre) {
                aux = aux.siguiente
            }
            aux.siguiente = aux.siguiente.siguiente
        }
        this.tamaño--
        this.mostrar()
        return true
    }
    buscarBase(nombre) {
        if(this.inicio !== null){
            let aux = this.inicio
            while(aux.nombreBase != nombre){
                aux = aux.siguiente
            }
            return aux
        }else{
            return false
        }
    }
    mostrar() {
        if (!this.inicio) return false
        lista.innerHTML = ""
        let aux = this.inicio
        do {
            lista.innerHTML += aux.articleToHtml()
            aux = aux.siguiente
        } while (aux.nombreBase != this.inicio.nombreBase)
    }
    crearRecorrido(baseIn, horaIn, horaFin){
        lista.innerHTML = ""
        let baseaux = this.buscarBase(baseIn)
        console.log(baseaux)
        let horaaux = Number(horaIn)
        
        while(horaaux < horaFin){
            lista.innerHTML += baseaux.articleToHtmlRecorrido(baseaux.nombreBase, horaaux)
            baseaux = baseaux.siguiente
            horaaux += Number(baseaux.minutos)
        }
        lista.innerHTML += baseaux.articleToHtmlRecorrido(baseaux.nombreBase, horaaux)
    }

}

let baseBus1 = new BaseBus()



btnAgregar.addEventListener("click", () => {
    let base1 = new Base(document.querySelector('#nombreBase').value, Number(document.querySelector('#tiempoBase').value))
    baseBus1.agregarBase(base1)
    console.log(base1)
})

btnEliminar.addEventListener("click", () => {
    var eliminarBase = document.querySelector("#eliminarBase")
    baseBus1.eliminarBase(eliminarBase.value)
})

btnBuscar.addEventListener("click", () => {
    let base = baseBus1.buscarBase(document.querySelector("#buscarBase").value)
    lista.innerHTML = ""
    lista.innerHTML += base.articleToHtml()
})

btnMostar.addEventListener("click", () => {
    baseBus1.mostrar()
})
btnCrearRecorrido.addEventListener("click", () => {
    baseBus1.crearRecorrido(document.querySelector("#baseInicio").value, 
                            document.querySelector("#horaInicio").value, 
                            document.querySelector("#horaFin").value)
})