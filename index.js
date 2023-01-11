const { createApp } = Vue

  createApp({
    data() {
      return {
            recordatorios: [],
            campoFiltro: "",
            textoInput: ""
        }
    },
    methods: 
    {
        // Metodo para añadir nuevas notas
        submit(){
            recordatorios = this.recordatorios.push({
                codigoNota: this.recordatorios.length+1,
                titulo: this.textoInput,
                prioridad: 0,
                hecho: false,
                fechaCreacion: new Date()
            });
            this.textoInput = "";
        },
        // Metodo para borrar todas las notas completadas
        borrarTareas(){
            let tareasNoCompletadas = this.recordatorios.filter((nota)=>nota.hecho == false );
            this.recordatorios = tareasNoCompletadas;
        },
        // Metodo para borrar una nota
        borrarNota(recordatorio){
            let index = this.recordatorios.indexOf(recordatorio);
            this.recordatorios.splice(index,1);
        }
    },
    computed:
    {
        // Metodo para contar el numero de tareas totales
        tareasTotales(){
            return this.recordatorios.length;
        },
        // Metodo para contar el numero de tareas completadas
        tareasCompletadas(){
            return this.recordatorios.filter( (nota) => nota.hecho == false).length;
        },
        // Metodo para filtrar las notas y ordenarlas de mayor a menor importancia
        recordatoriosFiltrados(){
            let miArrayFiltrado =  this.recordatorios.filter( (nota)=> nota.titulo.toLowerCase().includes(this.campoFiltro.toLowerCase()));
            return miArrayFiltrado.sort(function(a,b){
                return a.prioridad - b.prioridad;            
            });
        },
        calcularMinutos(){
            let fechaActual = new Date();
            let fechaCreo = this.recordatorios.fechaCreacion;
            let diferencia = fechaActual - fechaCreo;
            let minutos = Math.floor(diferencia / 1000 / 60);
            return minutos;
        }
    },
    mounted(){
        console.log("Cargando del local storage");
        if (localStorage.getItem('recordatorios')) {
            this.recordatorios = JSON.parse(localStorage.getItem('recordatorios'));
        }
    },
    watch:
    {
        // Metodo para guardar las notas en el local storage
        recordatorios: {
            handler(){
                console.log("Guardando en el local storage");
                localStorage.setItem('recordatorios', JSON.stringify(this.recordatorios));
            },
            deep: true,
        }
    }
}).mount('#app')